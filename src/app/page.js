"use client"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/upload");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-100">

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-6xl font-bold text-green-800 mb-6">
          Your Personal Recipe Helper
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Snap a photo of your ingredients, and we'll suggest delicious recipes!
        </p>
        <button 
        onClick={handleGetStarted}
        className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-300">
          Get Started
        </button>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-green-800 text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-2xl font-bold text-green-700 mb-2">Snap a Photo</h3>
              <p className="text-gray-600">
                Take a picture or upload a photo of your ingredients.
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🧾</div>
              <h3 className="text-2xl font-bold text-green-700 mb-2">Identify Ingredients</h3>
              <p className="text-gray-600">
                Our AI will analyze the photo and list the ingredients.
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🍳</div>
              <h3 className="text-2xl font-bold text-green-700 mb-2">Get Recipes</h3>
              <p className="text-gray-600">
                Receive personalized recipes based on your ingredients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}