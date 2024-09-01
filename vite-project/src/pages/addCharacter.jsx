import React, { useState } from "react"



export function AddCharater({setIsLoggedIn}){

    const [characterName, setCharacterName] = useState('');
    const [characterImage, setCharacterImage] = useState(null);
    const [movie, setMovie] = useState('');
    const [series, setSeries] = useState('');

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCharacterImage(file); // Atualiza o estado com o arquivo selecionado
        } else {
            console.warn("Nenhum arquivo foi selecionado.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('characterName', characterName);
        formData.append('characterImage', characterImage);
        formData.append('movie', movie);
        formData.append('series', series);

        try{
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            const response = await fetch('http://localhost:3002/character', {
                method: 'POST',
                body: formData,
            });
            
            const data = await response.json();
            if (response.ok) {
                alert('Character added successfully!');
            } else {
                alert(data.message || 'Error adding character');
            }

        } catch (error) {
            alert('An error occurred while adding the character. Please try again later.');
            console.error(error);
        }
        
        // Reseta o formulário após enviar
        setCharacterName('');
        setCharacterImage(null);
        setMovie('');
        setSeries('');
    };

    const handleLogout = () =>{
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };



    return(
        <>
            <div className="flex flex-col min-h-screen">
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
                                    <button  onClick={handleLogout} className="text-black hover:bg-rose-900 hover:text-white border-rose-900 transition duration-300 border px-3 py-2 rounded-3xl text-sm font-medium">
                                        Logout
                                    </button>
                            </div>  
                        </div>
                    </div>
                </nav>
            <div className="flex max-w-4xl mx-auto py-16">
                <div className="w-1/2 bg-zinc-100 p-8 rounded-l-2xl shadow-lg">
                    <h2 className="text-2xl font-semibold text-rose-900 mb-6">How to Add a Character</h2>
                    <ul className="space-y-4 text-black">
                        <li>
                            <strong>Character Name:</strong> Provide the full name of the character.
                        </li>
                        <li>
                            <strong>Image:</strong> Upload a clear image of the character.
                        </li>
                        <li>
                            <strong>Movie:</strong> Specify the movie(s) the character appeared in.
                        </li>
                        <li>
                            <strong>Series:</strong> If the character appeared in any series, mention them.
                        </li>
                    </ul>
                </div>

                <div className="w-1/2 bg-white p-8 rounded-r-2xl shadow-lg">
                    <h2 className="text-2xl font-semibold text-rose-900 mb-6">Add a New Character</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-black text-sm font-bold mb-2" htmlFor="characterName">
                                Character Name
                            </label>
                            <input
                                type="text"
                                id="characterName"
                                className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-900"
                                value={characterName}
                                onChange={(e) => setCharacterName(e.target.value)}
                                placeholder="Enter character name"
                            />
                        </div>

                        <div>
                            <label className="block text-black text-sm font-bold mb-2" htmlFor="characterImage">
                                Character Image
                            </label>
                            <input
                                type="file"
                                id="characterImage"
                                className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-900"
                                onChange={handleImageUpload}
                            />
                        </div>

                        <div>
                            <label className="block text-black text-sm font-bold mb-2" htmlFor="movie">
                                Movie
                            </label>
                            <input
                                type="text"
                                id="movie"
                                className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-900"
                                value={movie}
                                onChange={(e) => setMovie(e.target.value)}
                                placeholder="Enter movie(s)"
                            />
                        </div>

                        <div>
                            <label className="block text-black text-sm font-bold mb-2" htmlFor="series">
                                Series
                            </label>
                            <input
                                type="text"
                                id="series"
                                className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-900"
                                value={series}
                                onChange={(e) => setSeries(e.target.value)}
                                placeholder="Enter series"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-rose-900 text-white py-2 rounded-xl hover:bg-rose-700 transition duration-300"
                            onClick={handleSubmit}
                        >
                            Add Character
                        </button>
                    </form>
                </div>
            </div>
            <footer className="w-full py-4 border-t border-gray-300 shadow-black flex items-center justify-between bg-white">
                    <div className="text-gray-600 text-sm px-4 py-2">
                        by Gi Ferreira
                    </div>
                    <div className="flex space-x-4 text-gray-600 text-sm pr-4">
                        <a href="#" className="hover:underline">Privacy Policy</a>
                        <a href="#" className="hover:underline">Terms and conditions</a>
                        <a href="#" className="hover:underline">Cookies</a>
                    </div>
            </footer>
            </div>
        </>
    )
}