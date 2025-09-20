import { Link, useParams } from "react-router-dom";

export default function SuccessPage() {
  const { uid } = useParams();

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10 text-center">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        🎉 Registration Successful!
      </h1>
      <p className="text-gray-700 mb-6">
        You have successfully registered for Event #{uid}.  
        Our team will verify your payment receipt and confirm shortly.
      </p>
      <Link
        to="/"
        className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700"
      >
        Back to Home
      </Link>
    </div>
  );
}
