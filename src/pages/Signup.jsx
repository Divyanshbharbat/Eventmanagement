import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useAuth } from "../Cprovider";
import { useNavigate } from "react-router-dom";
import {toast}   from 'react-hot-toast'
import  Toaster from "react-hot-toast";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, loginWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/home");
      window.scrollTo(0, 0);
    }
  }, [user, navigate]);

  // Always scroll to top when component loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword)
      return toast.error("Please fill all fields");
    if (password !== confirmPassword)
      toast.error("Passwords do not match");

    try {
      await register(email, password);
      navigate("/home");
      window.scrollTo(0, 0);
    } catch (err) {
    if (err.code === "auth/email-already-in-use") {
    alert("This email is already registered with Google. Please login using Google or set a password in your profile.");
  } else {
    alert(err.message);
  }
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle();
      navigate("/home");
      window.scrollTo(0, 0);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
<Toaster/>
      {/* Left Side - Form */}
      <div className="flex-1 flex justify-center items-center">
        <motion.div
          className="w-full max-w-md p-10 bg-white border-2 rounded-2xl shadow-xl"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6 text-center">
            Create Account
          </h1>
          <p className="text-purple-600 mb-8 text-center">
            Sign up to manage your events efficiently
          </p>

          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
            />
            <button
              type="submit"
              className="w-full py-3 border-2 bg-purple-500 text-white rounded-lg hover:bg-purple-100 transition font-semibold"
            >
              Sign Up
            </button>
          </form>

          <div className="flex items-center justify-center space-x-3 my-4">
            <span className="border-b w-16 border-gray-300"></span>
            <span className="text-gray-500 font-medium">or</span>
            <span className="border-b w-16 border-gray-300"></span>
          </div>

          <button
            onClick={handleGoogleSignup}
            className="flex items-center justify-center w-full border border-gray-300 py-3 rounded-lg hover:shadow-lg transition"
          >
            <FcGoogle className="mr-2 text-2xl" />
            <span className="text-purple-900 font-semibold">Sign up with Google</span>
          </button>
        </motion.div>
      </div>

      {/* Right Side - Image */}
      <motion.div
        className="flex-1 hidden md:flex items-center justify-center"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
   <img
  src="https://img.freepik.com/premium-vector/sign-page-illustration-design-template_559664-159.jpg?w=1480"
  alt="Signup Illustration"
  className="w-full h-full object-contain mx-auto"
/>


      </motion.div>
    </div>
  );
}
