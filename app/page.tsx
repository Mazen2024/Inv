import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-purple-400 flex items-center justify-center ">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl capitalize text-gray-900 font-bold mb-10">
            inventory management
          </h1>
          <p className="text-gray-600 mb-8 text-xl max-w-2xl mx-auto tracking-wide leading-10">
            Inventory all your IT and non-IT assets, including your software licenses, with the native IT asset management capabilities of ServiceDesk Plus. Maximize the visibility of your hardware and software assets with multiple discovery modes
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              className="bg-purple-600 text-white px-10 py-3 font-semibold rounded-lg hover:bg-purple-700 transition-all duration-300 ease-in-out"
              href='/sign-in'>
              Sign In
            </Link>
            <Link
              className="bg-white text-black px-8 py-3 font-semibold rounded-lg border-2 border-purple-600 hover:bg-purple-500 hover:text-white transition-all duration-300 ease-in-out"
              href='#'>
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
