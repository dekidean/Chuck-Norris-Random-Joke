import React, { useState, useEffect } from "react";
import axios from "axios";

const ChuckNorrisRandomJoke = () => {
  // State za kategorije
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  // Za sale
  const [joke, setJoke] = useState("");

  // Fetch kategorija
  useEffect(() => {
    axios
      .get("https://api.chucknorris.io/jokes/categories")
      .then((response) => {
        setCategories(response.data); // skladistenje kategorija
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Funkcija za fetchovanje random fora
  const fetchRandomJoke = () => {
    let apiUrl = "https://api.chucknorris.io/jokes/random";

    // Ako je kategorija selektovana, ubaci URL
    if (selectedCategory) {
      apiUrl = `https://api.chucknorris.io/jokes/random?category=${selectedCategory}`;
    }

    // Fetchrandom sale
    axios
      .get(apiUrl)
      .then((response) => {
        setJoke(response.data.value); // Setovanje sale u state-u
      })
      .catch((error) => {
        console.error("Error fetching the joke:", error);
      });
  };

  return (
    <div>
      <h1>Chuck Norris Jokes</h1>

      {/* Selektovanje komponente za sala kategorije */}
      <div>
        <label htmlFor="category-select">Select a Joke Category:</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Any Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Dugme za Fetchovanje Random sale */}
      <div>
        <button onClick={fetchRandomJoke}>Get a Random Joke</button>
      </div>

      {/* Prikazi */}
      <div>
        {joke && (
          <p>
            <strong>Joke:</strong> {joke}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChuckNorrisRandomJoke;
