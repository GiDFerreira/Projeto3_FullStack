import React from 'react'

export function HomePage() {
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
                                src="{D}"
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
            <div className="max-w-full h-full py-14 mx-auto space-y-10">
                <div className="px-36 bg-zinc-100 flex flex-col items-center space-y-8 space-x-10">
                    <p className="flex items-center text-zinc-950 font-medium text-6xl">
                        Search your favorites characters
                    </p>
                    <p className="flex items-center text-zinc-950 font-medium">
                        Explore our extensive collection of Disney characters and discover detailed information about each one of them. Sign in to add new ones to your list!
                    </p>
                    <div className="flex py-6 space-x-8">
                        <button className="text-black hover:bg-rose-900 hover:text-white px-3 py-2 rounded-3xl text-sm font-medium">
                            Loggin
                        </button>
                        <button className="text-black hover:bg-rose-900 hover:text-white px-3 py-2 rounded-3xl text-sm font-medium">
                            Search Characters
                        </button>
                    </div>
                </div>
            </div>
        </>
        
    )
}