import Link from "next/link";

export function Navbar() {
    return (
        <nav className="bg-white shadow-lg drop-shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-green-700">Recipe Helper</div>
            <div className="flex space-x-4">
                <Link href="/" className="text-gray-700 hover:text-green-700">Home</Link>
                <Link href="/contact" className="text-gray-700 hover:text-green-700">Contact</Link>
            </div>
          </div>
        </div>
      </nav>
    )
}