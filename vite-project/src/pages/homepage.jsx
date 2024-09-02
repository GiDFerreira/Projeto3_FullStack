import React from 'react'
import { useState } from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css';
import { useNavigate } from 'react-router-dom';


export function HomePage({setIsLoggedIn}) {

    const slideImages = [
        './ratattouile.jpg',
        './tangled.jpg',
        './tangled1.jpg'
    ]

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    

    const handleLogin = async () => {
        console.log("Attempting to login...");
        console.log("Username:", username);
        console.log("Password:", password);
        
        if (username && password) {
            try{
                const response = await fetch('https://localhost:3002/login', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: username, password: password
                    }),
                });
                console.log("Response status:", response.status);
        
                const data = await response.json();
                console.log("Response data:", data);
        
                if (response.ok && data.token) {
                    localStorage.setItem('token', data.token);
                    setIsLoggedIn(true);
                    console.log("Navigating to /search");
                    navigate("/search");
                } else {
                    alert(data.message || "Invalid credentials");
                }
            } catch (error) {
                alert("An error occurred while trying to log in. Please try again later.");
                console.log("Error:", error)
            }
        } else {
            alert('Please fill in both username and password fields');
        }
    };

    

    return (
        <>
        <nav className="bg-zinc-100">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0">
                            <img
                                className="h-8 w-auto"
                                src="./D.png"
                                alt="disney"
                            />
                            </div>
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-4">
                                    <a href="#"
                                    className="text-black hover:bg-rose-900 hover:text-white transition duration-300 px-3 py-2 rounded-3xl text-sm font-medium">
                                    Home
                                    </a>
                                    <a href="#"
                                    className="text-black hover:bg-rose-900 hover:text-white transition duration-300 px-3 py-2 rounded-3xl text-sm font-medium">
                                    Search
                                    </a>
                                    <a href="#"
                                    className="text-black hover:bg-rose-900 hover:text-white transition duration-300 px-3 py-2 rounded-3xl text-sm font-medium">
                                    Characters
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 ">
                                <button className="bg-rose-900 text-pink-300 hover:bg-rose-300 hover:text-white transition duration-300 px-3 py-2 rounded-3xl text-sm font-medium">
                                    Create Account
                                </button>
                                <button className="text-black hover:bg-rose-900 hover:text-white border-rose-900 transition duration-300 border px-3 py-2 rounded-3xl text-sm font-medium">
                                    Login
                                </button>
                        </div>  
                    </div>
                </div>
            </nav>
            <div className="relative min-h-[calc(100vh-4rem)]">
                <div className="absolute inset-0 z-0">
                        <Slide easing="ease" duration={10000} transitionDuration={1000} arrows={false}>
                            {slideImages.map((each, index) => (
                                <div key={index} className="h-full">
                                    <img 
                                        src={each} 
                                        alt={`Slide ${index + 1}`} 
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            ))}
                        </Slide>
                    </div>
                        
                    <div className="relative z-10 w-full h-full flex items-center justify-center p-10">
                        <div className="bg-white bg-opacity-50 p-8 rounded-2xl shadow-lg w-full max-w-md">
                            <h2 className="text-2xl font-semibold mb-6 text-black">Login</h2>
                            <h2 className="text-sm font-semibold mb-6  text-zinc-600">Sign in to search about your favorites characters</h2>
                                    <div className="mb-4">
                                        <label className="block text-black text-sm font-bold mb-2" htmlFor="username">
                                            Email
                                        </label>
                                        <input className="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center" id="username" type="text" placeholder="Email Adress" onChange={(e) => setUsername(e.target.value)}/>
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
                                            Password
                                        </label>
                                        <input className="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline text-center" id="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                        <p className='text-sm font-semibold mb-6  text-zinc-600'>Do not have an account? <span className="hover:text-rose-950 cursor-pointer">Click Here</span></p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button onClick={handleLogin} className="bg-rose-900 text-pink-300 hover:bg-rose-300 hover:text-white transition duration-300 px-3 py-2 rounded-3xl text-sm font-medium">
                                            Sign In now
                                        </button>
                                    </div>
                        </div>
                    </div>
                        

            </div>
        
        </>
        
    )
}