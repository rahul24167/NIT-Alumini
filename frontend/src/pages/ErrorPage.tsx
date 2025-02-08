import { useNavigate } from 'react-router-dom';
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-center">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-red-600">Oops!</h1>
        <p className="mt-2 text-lg text-gray-700">Something went wrong.</p>
        <p className="mt-4 text-gray-500">Please try again later or contact support if the issue persists.</p>
        <button 
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => {navigate('/')}}
        >
          Go to home page
        </button>
      </div>
    </div>
  );
};

export default ErrorPage