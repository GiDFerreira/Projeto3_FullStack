import { createContext, useContext, useState } from "react";

export const CharacterApiContext = createContext();

export const CharacterApiProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);

  const Preview = async (disneyCharacter) => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.disneyapi.dev/character?name=${disneyCharacter}`);

        if (!response.ok) {
            throw new Error("Não foi possível buscar os dados dos personagens");
        }

        const data = await response.json();
        return data.data
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setLoading(false);
      }
  };

  const contextValue = {
    characters,
    loading,
    Preview
  };

  return (
    <CharacterApiContext.Provider value={{Preview , contextValue}}>
      {children}
    </CharacterApiContext.Provider>
  );
};

export const useContextValue = () => useContext(CharacterApiProvider);
