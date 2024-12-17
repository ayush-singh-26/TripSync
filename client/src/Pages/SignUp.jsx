import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(formData);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post("https://tripsync-qm7n.onrender.com/api/v1/users/register",
        {
          fullname: formData.fullname,
          email: formData.email,
          password: formData.password,
        }
      );

      setMessage("User registered successfully!");
      navigate('/login');
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-stretch text-white">
      {/* Left Image Section */}
      <div
        className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)",
        }}
      >
        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        <div className="w-full px-24 z-10">
          <h1 className="text-5xl font-bold text-left tracking-wide">
            Keep it special
          </h1>
          <p className="text-3xl my-4">
            Capture your personal memory in a unique way, anywhere.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div
        className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
        style={{ backgroundColor: "#161616" }}
      >
        <div className="w-full py-6 z-20">
          <p className="my-6 text-3xl text-gray-300">Sign up to your account</p>
          <div className="space-y-6">
            {message && <p className={`text-${loading ? "blue" : "red"}-500`}>{message}</p>}

            <form
              className="space-y-4 flex flex-col items-center"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="fullname"
                placeholder="Full name"
                value={formData.fullname}
                onChange={handleInputChange}
                className="p-2 w-1/2 text-lg bg-black border-2 border-gray-600 text-white rounded-xl focus:outline-none focus:border-gray-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="p-2 w-1/2 text-lg bg-black border-2 border-gray-600 text-white rounded-xl focus:outline-none focus:border-gray-500"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="p-2 w-1/2 text-lg bg-black border-2 border-gray-600 text-white rounded-xl focus:outline-none focus:border-gray-500"
              />
              <button
                aria-label="Sign up"
                type="submit"
                disabled={loading}
                className={`uppercase block w-1/3 p-2 text-lg rounded-full ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-indigo-500 hover:bg-indigo-600 focus:outline-none"
                }`}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>

            <div className="my-4">
              <a href="#" className="text-sm text-gray-400 hover:text-white">
                Already have an account?
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
