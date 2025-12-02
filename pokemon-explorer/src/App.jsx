import { useState, useEffect } from "react";

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [query, setQuery] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState("");

  // Fetch first 20 Pokémon on page load
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((res) => res.json())
      .then((data) => setPokemonList(data.results));
  }, []);

  // Search handler
  function handleSearch(e) {
    e.preventDefault();
    if (!query) return;

    fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Pokémon not found");
        return res.json();
      })
      .then((data) => {
        setPokemon(data);
        setError("");
      })
      .catch(() => {
        setPokemon(null);
        setError("No Pokémon found. Try again!");
      });
  }

  return (
    <div style={{ padding: "20px", textAlign: "center", background: "#FFDE59", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "40px", fontWeight: "bold", color: "#3B4CCA" }}>Pokémon Explorer</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search Pokémon by name or ID..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "6px",
            border: "1px solid #333",
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            background: "#3B4CCA",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Search Result */}
      {pokemon && (
        <div style={{ marginTop: "20px" }}>
          <h2 style={{ color: "#3B4CCA" }}>{pokemon.name.toUpperCase()}</h2>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width="150"
            height="150"
            style={{ imageRendering: "pixelated" }}
          />
          <p><strong>Height:</strong> {pokemon.height}</p>
          <p><strong>Weight:</strong> {pokemon.weight}</p>
        </div>
      )}

      {/* Pokémon List */}
      <h2 style={{ marginTop: "40px", color: "#3B4CCA" }}>Popular Pokémon</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {pokemonList.map((p) => (
          <li key={p.name} style={{ margin: "5px 0", fontSize: "18px" }}>
            {p.name.toUpperCase()}
          </li>
        ))}
      </ul>
    </div>
  );
}
