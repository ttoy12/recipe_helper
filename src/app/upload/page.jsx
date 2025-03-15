"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();
  const [uploadedImage, setUploadedImage] = useState(null); // Store uploaded image
  const [ingredients, setIngredients] = useState([]); // Store identified ingredients
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleGoBack = () => {
    router.push("/"); // Navigate back to the home page
  };

  const handleCancel = () => {
    console.log("cancel clicked");
    setUploadedImage(null); // Clear uploaded image
    setIngredients([]); // Clear ingredients
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageBase64 = e.target.result.split(",")[1]; // Remove the data URL prefix
        setUploadedImage(e.target.result); // Set the uploaded image URL

        // Send the image to the backend for analysis
        setIsLoading(true);
        try {
          const response = await fetch("/api/upload/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: imageBase64 }),
          });

          console.log("API response:", response); // Log the API response

          if (response.ok) {
            const data = await response.json();
            setIngredients(data.ingredients); // Set the identified ingredients
          } else {
            console.error("Error analyzing image:", response.statusText);
          }
        } catch (error) {
          console.error("Error analyzing image:", error);
        } finally {
          setIsLoading(false);
        }
      };
      reader.readAsDataURL(file);
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

        {/* Upload Photo UI */}
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
                className="w-1/3 rounded-lg"
              />
            </div>
          )}
          {isLoading && <p className="text-gray-600">Analyzing image...</p>}
          {ingredients.length > 0 && (
            <div className="mt-4">
              {/* Display Identified Ingredients */}
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                Ingredients
              </h3>
              <ul className="pl-4 list-disc">
                {ingredients
                  .slice(1, ingredients.findIndex((line) => line.startsWith("Recipes")))
                  .map((ingredient, index) => (
                    <li key={index} className="text-gray-600 mb-2">
                      {ingredient}
                    </li>
                  ))}
              </ul>

              {/* Display Recipes */}
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                Recipes
              </h3>
              {ingredients
                .slice(ingredients.findIndex((line) => line.startsWith("Recipes")) + 1)
                .map((line, index) => {
                  if (line.startsWith("Recipe")) {
                    // Render as a header
                    return (
                      <h4 key={index} className="text-xl font-bold text-green-700 mt-6 mb-2">
                        {line}
                      </h4>
                    );
                  } else {
                    // Render as a regular paragraph
                    return (
                      <p key={index} className="text-gray-600 mb-2">
                        {line}
                      </p>
                    );
                  }
                })}
            </div>
          )}
          <button
            onClick={handleCancel}
            className="bg-gray-500 text-white px-8 py-2 rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 mt-4"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}