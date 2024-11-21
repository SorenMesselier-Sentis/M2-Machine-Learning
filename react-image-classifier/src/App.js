import React from "react";
import ImageUploader from "./ImageUploader";
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">CIFAR-10 Image Classifier</h1>
        <p className="app-description">
          Upload an image of a plane, car, bird, or other objects, and our model will classify it for you.
        </p>
        <p className="app-description">
          Caution: This model is approximately sure at 75%
        </p>
      </header>
      <main className="app-main">
        <ImageUploader />
      </main>
      <footer className="app-footer">
        <p>Made with ❤️ by Soren MS</p>
      </footer>
    </div>
  );
}

export default App;
