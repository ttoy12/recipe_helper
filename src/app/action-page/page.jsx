"use client"
export default function ActionPage() {
    return (
      <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-100">
        {/* Navbar or Back Button */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-green-800 mb-8">Upload or Take a Photo</h1>
  
          {/* Upload Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Upload a Photo</h2>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700"
            />
          </div>
  
          {/* Camera Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Take a Photo</h2>
            <button
              className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
              onClick={() => alert("Camera functionality to be implemented")}
            >
              Open Camera
            </button>
          </div>
        </div>
      </div>
    );
  }