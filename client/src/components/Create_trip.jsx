import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { SelectBudgetOptions, SelectTravellerList } from "../constants/Options";
import { useNavigate } from "react-router-dom";

function Create_trip() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        destination: "",
        days: "",
        budget: null,
        traveller: null,
    });

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    return (
        //     <div className="flex flex-col md:flex-row p-6 bg-white text-gray-800 rounded-lg shadow-md">
        //       {/* Left Section - Form */}
        //       <div className="w-full md:w-1/2 p-4">
        //         
        //         <Form>
        //           {/* Destination Input */}
        //           <Form.Group className="mb-6">
        //             <Form.Label className="text-xl text-gray-700">Where are you going?</Form.Label>
        //             <Form.Control
        //               type="text"
        //               placeholder="Enter your destination"
        //               value={formData.destination}
        //               onChange={(e) => handleChange("destination", e.target.value)}
        //               className="p-4 bg-gray-100 text-gray-800 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none"
        //             />
        //           </Form.Group>

        //           {/* Number of Days Input */}
        //           <Form.Group className="mb-6">
        //             <Form.Label className="text-xl text-gray-700">
        //               How many days are you planning your trip?
        //             </Form.Label>
        //             <Form.Control
        //               type="number"
        //               placeholder="Enter number of days"
        //               value={formData.days}
        //               onChange={(e) => handleChange("days", e.target.value)}
        //               className="p-4 bg-gray-100 text-gray-800 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none"
        //             />
        //           </Form.Group>

        //           {/* Budget Options */}
        //           <Form.Group className="mb-6">
        //             <Form.Label className="text-xl text-gray-700">What is your budget?</Form.Label>
        //             
        //           </Form.Group>

        //           {/* Traveller Options */}
        //           <Form.Group className="mb-6">
        //             <Form.Label className="text-xl text-gray-700">Who are you traveling with?</Form.Label>
        //             
        //           </Form.Group>

        //           {/* Generate Trip Button */}
        //           <Button
        //             variant="primary"
        //             onClick={() => navigate("/trip-details", { state: formData })}
        //             className="w-full py-3 mt-6 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
        //           >
        //             Generate Trip
        //           </Button>
        //         </Form>
        //       </div>

        //       {/* Right Section - Image */}
        //       <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
        //         <img
        //           src="https://via.placeholder.com/500"
        //           alt="Travel Destination"
        //           className="w-full h-auto rounded-lg shadow-lg object-cover"
        //         />
        //       </div>
        //     </div>
        <section className="min-h-screen flex items-stretch text-white">

            <div
                className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
                style={{ backgroundColor: "#161616" }}
            >
                <div
                    className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
                    style={{
                        backgroundImage:
                            "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)",
                    }}
                >
                    <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                </div>
                <div className="w-full py-5 z-20">

                    <h2 className="text-3xl font-bold text-center text-white mb-4">
                        Tell Us Your Travel Preferences
                    </h2>
                    <p className="text-center text-lg text-gray-400 mb-8">
                        Just provide some basic information, and we’ll create a personalized itinerary just for you.
                    </p>
                    <div className="space-y-6">


                        <form className="space-y-4 flex flex-col items-center">
                            <label htmlFor="">What is destination of choice?</label>
                            <input
                                type="text"
                                placeholder="Enter the destination"
                                className="p-2 w-2/3 text-sm bg-black border-2 border-gray-600 text-white rounded-xl focus:outline-none focus:border-gray-500"
                            />
                            <label htmlFor="">How many days are you planning your trip?</label>
                            <input
                                type="number"
                                placeholder="number of days to plan"
                                className="p-2 w-2/3 text-am bg-black border-2 border-gray-600 text-white rounded-xl focus:outline-none focus:border-gray-500"
                            />
                            <label htmlFor="">What is your budget?</label>
                            <div className="grid grid-cols-2 gap-3 mt-3">
                                {SelectBudgetOptions.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleChange("budget", item.title)}
                                        className={`p-2 border-2 rounded-lg text-center cursor-pointer transition-all duration-300 
                                        ${formData.budget === item.title ? "border-indigo-500 bg-indigo-50" : "border-gray-300"}`}
                                    >
                                        <div className="text-4xl mb-2">{item.icon}</div>
                                        <h5 className="text-xl font-semibold text-gray-400">{item.title}</h5>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                            <label htmlFor="">What is your budget?</label>
                            <div className="grid grid-cols-2 gap-3 mt-3">
                                {SelectTravellerList.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleChange("traveller", item.title)}
                                        className={`p-2 border-2 rounded-lg text-center cursor-pointer transition-all duration-300 
                           ${formData.traveller === item.title ? "border-indigo-500 bg-indigo-50" : "border-gray-300"}`}
                                    >
                                        <div className="text-4xl mb-2">{item.icon}</div>
                                        <h5 className="text-xl font-semibold text-gray-800">{item.title}</h5>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                            <button
                                aria-label="Sign in"
                                type="submit"
                                className="uppercase block w-1/3 p-2 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none"
                            >
                                Sign In
                            </button>
                        </form>

                        <div className="my-4">
                            <a href="#" className="text-sm text-gray-400 hover:text-white">
                                Forgot your password?
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
                style={{
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)",
                }}
            >
                <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                <div className="w-full px-24 z-10">
                    <h1 className="text-5xl font-bold text-left tracking-wide">Keep it special</h1>
                    <p className="text-3xl my-4">Capture your personal memory in unique way, anywhere.</p>
                </div>
                <div className="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4">
                    <span>
                        <svg
                            fill="#fff"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                    </span>
                    <span>
                        <svg
                            fill="#fff"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                        </svg>
                    </span>
                    <span>
                        <svg
                            fill="#fff"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                    </span>
                </div>
            </div>
        </section>
    );
}

export default Create_trip;


