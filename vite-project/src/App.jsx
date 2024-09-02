import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from './pages/homepage';
import { Search } from './pages/search';
import { AddCharater } from './pages/addCharacter';
import { CharacterApiProvider } from './context/disneyApi';
import { SearchYourCharacter } from './pages/searchYourCharacter';




function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    return (
        <CharacterApiProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage setIsLoggedIn={setIsLoggedIn} />} />
                    <Route 
                        path="/search" 
                        element={isLoggedIn ? <Search setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />} 
                    />
                    <Route 
                        path="/add-character" 
                        element={isLoggedIn ? <AddCharater setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />} 
                    />
                    <Route 
                        path="/search-your-character" 
                        element={isLoggedIn ? <SearchYourCharacter setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />}
                    />
                </Routes>
            </Router>
        </CharacterApiProvider>
        
    );
}

export default App
