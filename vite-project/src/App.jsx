import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from './pages/homepage';
import { Search } from './pages/search';
import { AddCharater } from './pages/addCharacter';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage setIsLoggedIn={setIsLoggedIn} />} />
                <Route 
                    path="/search" 
                    element={isLoggedIn ? <Search /> : <Navigate to="/" />} 
                />
                <Route 
                    path="/add-character" 
                    element={isLoggedIn ? <AddCharater /> : <Navigate to="/" />} 
                />
            </Routes>
        </Router>
    );
}

export default App
