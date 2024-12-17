import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const token = localStorage.getItem('accessToken');

            const response = await axios.get('http://localhost:8000/api/v1/users/current-user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                setUserData(response.data.data);
            } else {
                alert('Failed to fetch user data');
            }
        }
        fetchCurrentUser();
    }, []);

    return (
        <nav className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 p-4 shadow-md sticky">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <h1 className="text-3xl text-white font-semibold tracking-widest">TripSync</h1>
                </div>

                <div className="flex space-x-6 items-center">
                    <Link to="/" className="text-gray-200 hover:text-white transition-colors no-underline duration-300 px-3 py-2 rounded-lg">
                        Home
                    </Link>
                    <Link to="/about" className="text-gray-200 hover:text-white transition-colors no-underline duration-300 px-3 py-2 rounded-lg">
                        about
                    </Link>
                    <Link to="/getBookings" className="text-gray-200 hover:text-white transition-colors no-underline duration-300 px-3 py-2 rounded-lg">
                        View your Trip
                    </Link>


                    {userData ? (
                        <Link onClick={() => localStorage.removeItem('accessToken')} className="text-white bg-gray-900 hover:bg-gray-700 transition-colors no-underline duration-300 px-4 py-2 rounded-lg">
                            Logout
                        </Link>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Link to="/signup" className="text-white bg-gray-900 hover:bg-gray-700 transition-colors no-underline duration-300 px-4 py-2 rounded-lg">
                                Sign Up
                            </Link>
                            <Link to="/login" className="text-white bg-gray-900 hover:bg-gray-700 transition-colors no-underline duration-300 px-4 py-2 rounded-lg">
                                Login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
        // <div className="bg-gray-800 text-white px-6 py-4">
        //   {/* Container for the navbar */}
        //   <div className="flex items-center justify-between max-w-7xl mx-auto">
        //     {/* Left side - navigation links */}
        //     <ul className="flex space-x-8 text-lg">
        //       <li className="hover:text-gray-400 cursor-pointer transition-all">Home</li>
        //       <li className="hover:text-gray-400 cursor-pointer transition-all">About</li>
        //       <li className="hover:text-gray-400 cursor-pointer transition-all">Contact</li>
        //     </ul>

        //     {/* Right side - buttons */}
        //     {userData ? (
        //       <div className="flex items-center space-x-4">
        //         <span className="mr-2 text-lg">Welcome, {userData.fullname}</span>
        //         <button
        //           onClick={() => localStorage.removeItem('accessToken')}
        //           className="text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-all"
        //         >
        //           Logout
        //         </button>
        //       </div>
        //     ) : (
        //       <div className="flex items-center space-x-4">
        //         <button
        //           onClick={() => navigate('/login')}
        //           className="bg-transparent border-2 border-white text-white py-2 px-6 rounded-lg hover:bg-white hover:text-gray-800 transition-all"
        //         >
        //           Sign In
        //         </button>
        //         <button
        //           onClick={() => navigate('/signup')}
        //           className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all"
        //         >
        //           Sign Up
        //         </button>
        //       </div>
        //     )}
        //   </div>
        // </div>
    );
}

export default Navbar;
