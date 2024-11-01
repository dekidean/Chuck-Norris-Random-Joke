import React, { useState, useEffect } from "react";
import axios from "axios";

const ChuckNorrisRandomJoke = () => {
  const [categories, setCategories] = useState([]); // State za skladistenje joke kategorija
  const [selectedCategory, setSelectedCategory] = useState(""); // State selektovanje kategorija
  const [joke, setJoke] = useState(""); // State to skladistenje fetched joke

  const API_ROOT = "https://api.chucknorris.io/jokes"; //API  koji koristimo da se ne bi ponavljali

  // Funkcija za fetch kategorija za API
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_ROOT}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Funkcija za fetch za random joke
  const fetchJoke = async () => {
    try {
      const url = selectedCategory
        ? `${API_ROOT}/random?category=${selectedCategory}`
        : `${API_ROOT}/random`;
      const response = await axios.get(url);
      setJoke(response.data.value);
    } catch (error) {
      console.error("Error fetching the joke:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <h1>Chuck Norris Jokes</h1>

      {/* Selektovanje komponente za display kategorije */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Button za fetchvanje random joke */}
      <button onClick={fetchJoke}>Get Random Joke</button>

      {/* Prikaz fore joke */}
      <p>{joke}</p>
    </>
  );
};

export default ChuckNorrisRandomJoke;
