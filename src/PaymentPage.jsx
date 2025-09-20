import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PaymentPage() {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState(null);

  const handleFileChange = (e) => {
    setReceipt(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!receipt) {
      alert("Please upload payment receipt");
      return;
    }

    // Save receipt reference (for backend integration)
    localStorage.setItem("paymentReceipt", receipt.name);

    // Navigate to success page
    navigate(`/event/${uid}/success`);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-xl font-bold text-center text-indigo-700 mb-6">
        Payment for Event #{uid}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold">Upload Payment Receipt</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700"
        >
          Submit & Confirm
        </button>
      </form>
    </div>
  );
}
