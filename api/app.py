from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import numpy as np
import onnxruntime as ort
from PIL import Image
import io

app = FastAPI()

# Add CORS middleware
origins = [
    "http://localhost:3000",  # React app's URL
    "http://localhost",       # Allow localhost (for development)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow the React app origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers (including Content-Type)
)

classes = (
    'plane', 'car', 'bird', 'cat',
    'deer', 'dog', 'frog', 'horse', 'ship', 'truck'
)

# Load the ONNX model
onnx_session = ort.InferenceSession("model/vgg_cifar10_model.onnx")

# Preprocessing function
def preprocess_image(image: Image.Image):
    # Resize to 32x32
    image = image.resize((32, 32))
    # Convert to numpy array and transpose to match model input shape (N, C, H, W)
    image_array = np.array(image).astype(np.float32).transpose(2, 0, 1)
    # Normalize to [0, 1]
    image_array /= 255.0
    # Add batch dimension
    image_array = np.expand_dims(image_array, axis=0)

    return image_array

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    """
    Endpoint to receive an image and return model predictions.
    """
    try:
        # Read the uploaded image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")

        input_data = preprocess_image(image)

        outputs = onnx_session.run(None, {"input": input_data})

        # Process model output (assuming classification task)
        predictions = outputs[0]
        predicted_class = int(np.argmax(predictions))
        predicted_class_name = classes[predicted_class]

        return JSONResponse(content={
            "predicted_class": predicted_class_name,
            "confidence_scores": predictions.tolist()
        })

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
