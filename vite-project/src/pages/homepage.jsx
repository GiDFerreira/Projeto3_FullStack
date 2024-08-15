import React from 'react'
import { useState } from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css';


export function HomePage() {

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

    function openLoginAccess(){
        setIsLoginModalOpen(true)
    }

    function closeLoginAccess(){
        setIsLoginModalOpen(false)
    }

    const slideImages = [
        './ratattouile.jpg',
        './tangled.jpg',
        './tangled1.jpg'
    ]

    return (
        <>
            <nav className="bg-zinc-100">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            {/* Icon when menu is closed */}
                            <svg
                                className="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                            {/* Icon when menu is open */}
                            <svg
                                className="hidden h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                            </button>
                        </div>
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
                                    className="text-black hover:bg-rose-900 hover:text-white px-3 py-2 rounded-3xl text-sm font-medium">
                                    Home
                                    </a>
                                    <a href="#"
                                    className="text-black hover:bg-rose-900 hover:text-white px-3 py-2 rounded-3xl text-sm font-medium">
                                    Search
                                    </a>
                                    <a href="#"
                                    className="text-black hover:bg-rose-900 hover:text-white px-3 py-2 rounded-3xl text-sm font-medium">
                                    Characters
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 ">
                                <button className="text-black hover:bg-rose-900 hover:text-white px-3 py-2 rounded-3xl text-sm font-medium">
                                    Create Account
                                </button>
                                <button className="text-black hover:bg-rose-900 hover:text-white px-3 py-2 rounded-3xl text-sm font-medium">
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
                        <form>
                            <div className="mb-4">
                                <label className="block text-black text-sm font-bold mb-2" htmlFor="username">
                                    Email
                                </label>
                                <input className="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center" id="username" type="text" placeholder="Email Adress"/>
                            </div>
                            <div className="mb-6">
                                <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input className="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline text-center" id="password" type="password" placeholder="Password"/>
                                <span className=''>Do not have an account? Create Here</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <button className="bg-rose-900 text-pink-300 hover:bg-rose-300 hover:text-white px-3 py-2 rounded-3xl text-sm font-medium">
                                    Sign In now
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        
        </>
        
    )
}