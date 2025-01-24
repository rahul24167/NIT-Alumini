const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="w-full bg-blue-500 text-white py-4 text-center">
        <h1 className="text-3xl font-bold">Welcome to NIT Alumini Page</h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <h2 className="text-2xl font-semibold mb-4">Your Gateway to Amazing Features</h2>
        <p className="text-gray-700 mb-6 text-center max-w-lg">
          Explore our platform and see how it can help you achieve your goals. 
          Sign up today to get started on your journey with us!
        </p>
        <div className="flex space-x-4">
          <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition">
            Get Started
          </button>
          <button className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md transition">
            Learn More
          </button>
        </div>
      </main>

      <footer className="w-full bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};


export default LandingPage