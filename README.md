# M2-Machine-Learning

---

This project is a web-based application that allows users to upload an image, and it predicts the class of the image using a pre-trained ONNX model on the CIFAR-10 dataset. The application is built using **FastAPI** for the backend and **React** for the frontend.

## Features

- **Image Upload**: Upload any image for classification.
- **Real-time Predictions**: Get the predicted class.
- **ONNX Model Integration**: Uses a pre-trained VGG model for CIFAR-10 classification.
- **Modern Frontend**: Built with React for the user interface.

## Tech Stack

### Backend
- **Framework**: FastAPI
- **Model**: ONNX Runtime for running the pre-trained VGG model
- **Image Processing**: Pillow for image handling and preprocessing

### Frontend
- **Framework**: React
- **HTTP Client**: Axios for making API calls
- **Styling**: CSS for a clean and modern UI

---

## Getting Started

### Prerequisites

Make sure you have the following installed:
- **Python** (3.11 or later)
- **Node.js** (20.x or later)
- **npm** or **yarn**
- **FastAPI**: Install using `pip install fastapi uvicorn pillow`
- **PyTorch**: 

### Installation

1. **Clone the Repository**:
   ```bash
   git clone git@github.com:SorenMesselier-Sentis/M2-Machine-Learning.git
   cd M2-Machine-Learning
   ```

2. **Set Up the Backend**:
   - Navigate to the api folder:
     ```bash
     cd api
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Place the pre-trained ONNX model (`vgg_cifar10_model.onnx`) in the `api/model` directory.
   - Start the backend server:
     ```bash
     uvicorn main:app --reload
     ```
   - The backend will be available at: [http://localhost:8000](http://localhost:8000)

3. **Set Up the Frontend**:
   - Navigate to the frontend folder:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm start
     ```
   - The frontend will be available at: [http://localhost:3000](http://localhost:3000)

---

## Usage

1. **Upload an Image**: Select an image file from your local system using the file input.
2. **Get Predictions**: Click the "Predict" button to send the image to the backend for processing.
3. **View Results**:
   - The predicted class (e.g., *frog*, *cat*, etc.).
   - Confidence scores for all classes in the CIFAR-10 dataset.

---

## Directory Structure

```
M2-Machine-Learning/
├── api/
│   ├── main.py                # FastAPI backend
│   ├── model/
│   │   └── vgg_cifar10_model.onnx  # Pre-trained ONNX model
│   └── requirements.txt       # Backend dependencies
├── react-image-classifier/
│   ├── src/
│   │   ├── App.js             # Main app component
│   │   ├── ImageUploader.js   # Image upload & prediction component
│   │   └── App.css            # Styles for the app
│   ├── public/
│   │   └── sample/  # Example images to test the model
│   └── package.json           # Frontend dependencies
├── cirfamodel/  # Model training
└── README.md                  # Project documentation
```

---

## API Endpoints

### `POST /predict/`

- **Description**: Accepts an image and returns the predicted class along with confidence scores.
- **Request**:
  - File: Image file (e.g., PNG, JPG).
- **Response** (Example):
  ```json
  {
    "predicted_class": "frog",
    "confidence_scores": [
      -2.12, -4.51, 1.51, 1.24, 1.00,
      0.54, 1.57, -1.49, -2.99, -4.33
    ]
  }
  ```