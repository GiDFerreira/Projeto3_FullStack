import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export function SearchYourCharacter({setIsLoggedIn}){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Estado de carregamento
    const [characters, setCharacters] = useState([]); // Estado dos personagens
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogout = () =>{
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://localhost:3002/search',{
                method: 'GET',
                headers: {
                    'Content-type' : 'application/json',
                },
            })
            const data = await response.json();
            setCharacters(data); 
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alert("An error occurred while trying to search for character")
            console.log("Error:", error)
        }
    }

    useEffect(() => {
        handleSearch(); // Faz a busca ao carregar o componente
    }, []);

    

    return (
        <>
            <div className="flex flex-col min-h-screen">
            <nav className="bg-zinc-100 shadow-lg">
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
                                <button onClick={handleLogout} className="text-black hover:bg-rose-900 hover:text-white border-rose-900 transition duration-300 border px-3 py-2 rounded-3xl text-sm font-medium">
                                    Logout
                                </button>
                        </div>  
                    </div>
                </div>
            </nav>      
            <div className=" flex-grow px-4 py-4 flex items-center justify-center z-50 w-full h-auto bg-opacity-5 bg-rose-700 pt-5">
                <div className="flex flex-col items-center justify-center pt-1">
                    
                    <div className="flex items-center space-x-2">
                        <input type="search" 
                        name="searchinput" 
                        id="searchinput" 
                        placeholder="Search your character here..."
                        className="flex items-center shadow appearance-none border rounded-3xl w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-left" />
                        <button type="submit" onClick={handleSearch} className="shadow apparence-none bg-rose-950 text-pink-300 hover:bg-rose-300 hover:text-white transition duration-300 px-3 py-2 rounded-3xl text-sm font-medium"><SearchIcon className="size-5" /></button>
                    </div>
                    <div className="charactersContainer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                characters && characters.length > 0 && characters.map((character, index) => (
                                    <div key={index} className="divFilm bg-white rounded-lg overflow-hidden shadow-lg">
                                        <img src={`https://localhost:3002/${character.image}`} alt={character.name} className="imgFilm w-full h-48 object-cover" />
                                        <div className="p-6">
                                            <h2 className="text-lg font-semibold mb-2">{character.name}</h2>
                                            <ul className="filmUl text-gray-600 text-sm">
                                                {character.films && character.films.length > 0 ? (
                                                    character.films.map((film, index) => (
                                                        <li key={index} className="filmLi">{film}</li>
                                                    ))
                                                ) : (
                                                    <li>Esse personagem não possui filmes</li>
                                                )}
                                            </ul>
                                            <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition duration-300">
                                                Read more
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
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