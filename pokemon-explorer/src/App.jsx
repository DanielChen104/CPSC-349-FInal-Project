import { useState, useEffect } from "react";

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonListimages, setPokemonListimages] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState("");


  useEffect(() => {
    const offset = page * 8;

  async function loadPage() {

    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=8`
    );
    const data = await res.json();

    setPokemonList(data.results); 

    const fullData = await Promise.all(
      data.results.map(poke => fetch(poke.url).then(r => r.json()))
    );

    setPokemonListimages(fullData.map(p => p.sprites.front_default));
  }
    loadPage();
  }, [page]);


  const handleNextPage = () => {
    setPage(page+1);
  };

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
    <div style={{ textAlign: "center", background: "#ffffffff", height: "100vh",}}>
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
      <div  style={{height: "87%", background: "#3B4CCA", marginTop: "3%", display: "flex", flexDirection: "row", padding: "10px"}}>
        <div style={{background: "#ffffffff", width: "30%", display: "flex", flexDirection: "column"}}>
          <div style ={{height: "12.5%", background: "#e6e932ff", outline: "2.5px solid black", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px"}}>
             &nbsp; &nbsp;No {pokemonList[0]?.url.split("/").at(-2)}  &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; {pokemonList[0]?.name.toUpperCase()}
          </div>
          <div style ={{height: "12.5%", background: "#e7ea34ff", outline: "2.5px solid black", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px"}}>
            &nbsp; &nbsp;No {pokemonList[1]?.url.split("/").at(-2)}  &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; {pokemonList[1]?.name.toUpperCase()}
          </div>
          <div style ={{height: "12.5%", background: "#e7ea34ff", outline: "2.5px solid black", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px"}}>
            &nbsp; &nbsp;No {pokemonList[2]?.url.split("/").at(-2)}  &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; {pokemonList[2]?.name.toUpperCase()}
          </div>
          <div style ={{height: "12.5%", background: "#e6e932ff", outline: "2.5px solid black", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px"}}>
            &nbsp; &nbsp;No {pokemonList[3]?.url.split("/").at(-2)}  &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; {pokemonList[3]?.name.toUpperCase()}
          </div>
          <div style ={{height: "12.5%", background: "#e6e932ff", outline: "2.5px solid black", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px"}}>
            &nbsp; &nbsp;No {pokemonList[4]?.url.split("/").at(-2)}  &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; {pokemonList[4]?.name.toUpperCase()}
          </div>
          <div style ={{height: "12.5%", background: "#e6e932ff", outline: "2.5px solid black", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px"}}>
            &nbsp; &nbsp;No {pokemonList[5]?.url.split("/").at(-2)}  &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; {pokemonList[5]?.name.toUpperCase()}
          </div>
          <div style ={{height: "12.5%", background: "#e6e932ff", outline: "2.5px solid black", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px"}}>
            &nbsp; &nbsp;No {pokemonList[6]?.url.split("/").at(-2)}  &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; {pokemonList[6]?.name.toUpperCase()}
          </div>
          <div style ={{height: "12.5%", background: "#e6e932ff", outline: "2.5px solid black", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px"}}>
            &nbsp; &nbsp;No {pokemonList[7]?.url.split("/").at(-2)}  &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; {pokemonList[7]?.name.toUpperCase()}
          </div> 
        </div>
        <div style={{background: "#ffffffff", width: "20%"}}>
          <div style ={{height: "12.5%", background: "#d6d3d3ff", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px", justifyContent: "center"}}>
            <img src={pokemonListimages[0]} alt={pokemonList[0]?.name} style={{ imageRendering: "pixelated", maxHeight: "100%", width: "auto", transform: "scale(1.7)"}}/>
          </div>
          <div style ={{height: "12.5%", background: "#d6d3d3ff", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px", justifyContent: "center"}}>
            <img src={pokemonListimages[1]} alt={pokemonList[1]?.name} style={{ imageRendering: "pixelated", maxHeight: "100%", width: "auto", transform: "scale(1.7)"}}/>
          </div>
          <div style ={{height: "12.5%", background: "#d6d3d3ff", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px", justifyContent: "center"}}>
            <img src={pokemonListimages[2]} alt={pokemonList[2]?.name} style={{ imageRendering: "pixelated", maxHeight: "100%", width: "auto", transform: "scale(1.7)"}}/>
          </div>
          <div style ={{height: "12.5%", background: "#d6d3d3ff", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px", justifyContent: "center"}}>
            <img src={pokemonListimages[3]} alt={pokemonList[3]?.name} style={{ imageRendering: "pixelated", maxHeight: "100%", width: "auto", transform: "scale(1.7)"}}/>
          </div>
          <div style ={{height: "12.5%", background: "#d6d3d3ff", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px", justifyContent: "center"}}>
            <img src={pokemonListimages[4]} alt={pokemonList[4]?.name} style={{ imageRendering: "pixelated", maxHeight: "100%", width: "auto", transform: "scale(1.7)"}}/>
          </div>
          <div style ={{height: "12.5%", background: "#d6d3d3ff", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px", justifyContent: "center"}}>
            <img src={pokemonListimages[5]} alt={pokemonList[5]?.name} style={{ imageRendering: "pixelated", maxHeight: "80%", width: "auto", transform: "scale(1.7)"}}/>
          </div>
          <div style ={{height: "12.5%", background: "#d6d3d3ff", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px", justifyContent: "center"}}>
            <img src={pokemonListimages[6]} alt={pokemonList[6]?.name} style={{ imageRendering: "pixelated", maxHeight: "100%", width: "auto", transform: "scale(1.7)"}}/>
          </div>
          <div style ={{height: "12.5%", background: "#d6d3d3ff", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px", justifyContent: "center"}}>
            <img src={pokemonListimages[7]} alt={pokemonList[7]?.name} style={{ imageRendering: "pixelated", maxHeight: "80%", width: "auto", transform: "scale(1.7)"}}/>
          </div>
        </div>
        <div style={{background: "#116423ff", width: "50%", display: "flex", flexDirection: "column", alignItems: "center"}}>
          <div style={{fontSize: "50px", fontWeight: "bold", color: "white", textAlign: "center", marginTop: "20px", background: "#ffffffff", width: "40%", height: "10%", borderRadius: "15px"}}>
            
            
          </div>
        </div>
      </div>
              <button onClick={handleNextPage}>Next Page</button>
    </div>
  );
}
