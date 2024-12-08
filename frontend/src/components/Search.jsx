import React, { useState } from "react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import SearchResults from "./SearchResults";
import { searchSymbol } from "../api/stockAPI";

const Search = () => {
  const [input, setInput] = useState("");
  const [bestMatches, setBestMatches] = useState([]);

  const clear = () => {
    setInput("");
    setBestMatches([]);
  };

  const updateBestMatches = async () => {
    try {
      if (input) {
        const SearchResults = await searchSymbol(input);
        const result = SearchResults.result;
        setBestMatches(result);
      }
    } catch (error) {
      setBestMatches([]);
      console.log(error);
    }
  };

  return (
    <div className="flex items-center my-4 border-2 rounded-md relative z-50 w-96">
      <input
        type="text"
        value={input}
        className="w-full px-4 py-2 focus:outline-none rounded-md"
        placeholder="Search"
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && input.trim() !== "") {
            updateBestMatches();
          }
        }}
      />
      {input && (
        <button onClick={clear} className="m-1">
          <XMarkIcon className="h-4 w-4 text-gray-500" />
        </button>
      )}
      <button
        onClick={updateBestMatches}
        className="h-8 w-8 bg-blue-600 rounded-md flex justify-center items-center m-1 p-2 transition duration-300 hover:ring-2 ring-blue-400"
      >
        <MagnifyingGlassIcon className="h-4 w-4 text-gray-100" />
      </button>
      {input && bestMatches.length > 0 && <SearchResults results={bestMatches} />}
    </div>
  );
};

export default Search;
