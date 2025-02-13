"use client"
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null); // null, "upload", or "camera"
  const [uploadedImage, setUploadedImage] = useState(null); // Store uploaded image
  const [capturedImage, setCapturedImage] = useState(null); // Store captured image
  const videoRef = useRef(null); // Reference for the video element
  const canvasRef = useRef(null); // Reference for the canvas element

  const handleGoBack = () => {
    router.push("/"); // Navigate back to the home page
  };

  const handleUploadPhoto = () => {
    setSelectedOption("upload");
  };

  const handleTakePhoto = () => {
    setSelectedOption("camera");
    startCamera();
  };

  const handleCancel = () => {
    setSelectedOption(null); // Reset to the initial state
    setUploadedImage(null); // Clear uploaded image
    setCapturedImage(null); // Clear captured image
    stopCamera(); // Stop the camera stream
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result); // Set the uploaded image URL
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop()); // Stop all tracks
      videoRef.current.srcObject = null;
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Set canvas dimensions to match video feed
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current video frame on the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas image to a data URL and set it as the captured image
      const imageUrl = canvas.toDataURL("image/png");
      setCapturedImage(imageUrl);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-100">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={handleGoBack}
          className="text-green-700 hover:text-green-800 mb-8"
        >
          &larr; Back to Home
        </button>

        {/* Initial Selection UI */}
        {!selectedOption && (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                Upload or Take a Photo
              </h2>
              <p className="text-gray-600 mb-6">
                Choose how you'd like to provide your ingredients:
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <button
                  onClick={handleUploadPhoto}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-300 flex-1"
                >
                  Upload a Photo
                </button>
                <button
                  onClick={handleTakePhoto}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-300 flex-1"
                >
                  Take a Photo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Upload Photo UI */}
        {selectedOption === "upload" && (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Upload a Photo
            </h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 mb-4"
            />
            {uploadedImage && (
              <div className="mt-4">
                <h3 className="text-xl font-bold text-green-700 mb-2">
                  Uploaded Photo
                </h3>
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="w-full h-64 rounded-lg"
                />
              </div>
            )}
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 mt-4"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Take Photo UI */}
        {selectedOption === "camera" && (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Take a Photo
            </h2>
            <div className="bg-gray-200 h-64 flex items-center justify-center mb-4">
              {capturedImage ? (
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
              )}
            </div>
            <canvas ref={canvasRef} className="hidden" />
            {!capturedImage && (
              <button
                onClick={capturePhoto}
                className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
              >
                Capture Photo
              </button>
            )}
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ml-4"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}