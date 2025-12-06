import { useState, useEffect, use } from "react";
import {Bar} from 'react-chartjs-2';

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonListimages, setPokemonListimages] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [moveData, setMoveData] = useState(null);
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

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  }
  const handlePokemonSelect = (pokemon) => {
    fetch(pokemon.url)
      .then((res) => res.json())
      .then((data) => {
        setCurrentPokemon(data);
        handleMovesData(data.moves);
      }
      );
    
  };

  const handleMovesData = (moves) => {

    const damageClassNames = Promise.all(
      moves.map((m) =>
        fetch(m.move.url)
          .then((res) => res.json())
          .then((data) => data.type.name)
      )
    );
    damageClassNames.then((data) => setMoveData(data));
  }

  const barData = {
    labels: currentPokemon ? currentPokemon.stats.map(s => s.stat.name) : [],
    datasets: [
      {
        label: 'Base Stats',
        data: currentPokemon ? currentPokemon.stats.map(s => s.base_stat) : [],
        backgroundColor: 'rgba(59, 76, 202, 0.6)',
        borderWidth: 0,
      },
    ],
  };
  
  const navButtonStyle = {
    padding: "12px 26px",
    fontSize: "18px",
    fontWeight: 600,
    borderRadius: "999px",
    border: "none",
    background: "#ffcb05",
    color: "#2a75bb",
    cursor: "pointer",
    boxShadow: "0 4px 0 #b88900",
    minWidth: "150px"
  };

  const disabledNavButtonStyle = {
    ...navButtonStyle,
    opacity: 0.5,
    cursor: "not-allowed",
    boxShadow: "none"
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

        const pokemonId = data.id;
        const newPage = Math.floor((pokemonId - 1) / 8);
        setPage(newPage);

        setCurrentPokemon(data);
        handleMovesData(data.moves);
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
      
      {/* Pokemon Name Area*/}
      <div  style={{height: "87%", background: "#3B4CCA", marginTop: "1%", display: "flex", flexDirection: "row", padding: "10px"}}>
        <div style={{background: "#ffffffff", width: "30%", display: "flex", flexDirection: "column"}}>
          <div onClick={() => handlePokemonSelect(pokemonList[0])} style ={{cursor: "pointer", height: "12.5%", background: "#e6e932ff", outline: "2.5px solid black", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px"}}>
             &nbsp; &nbsp;No {pokemonList[0]?.url.split("/").at(-2)}  &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; {pokemonList[0]?.name.toUpperCase()}
          </div>
          <div onClick={() => handlePokemonSelect(pokemonList[1])} style ={{cursor: "pointer", height: "12.5%", background: "#e7ea34ff", outline: "2.5px solid black", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px"}}>
            &nbsp; &nbsp;No {pokemonList[1]?.url.split("/").at(-2)}  &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; {pokemonList[1]?.name.toUpperCase()}
          </div>
          <div onClick={()  => handlePokemonSelect(pokemonList[2])} style ={{cursor: "pointer", height: "12.5%", background: "#e7ea34ff", outline: "2.5px solid black", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px"}}>
            &nbsp; &nbsp;No {pokemonList[2]?.url.split("/").at(-2)}  &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; {pokemonList[2]?.name.toUpperCase()}
          </div>
          <div onClick={() => handlePokemonSelect(pokemonList[3])} style ={{cursor: "pointer", height: "12.5%", background: "#e6e932ff", outline: "2.5px solid black", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px"}}>
            &nbsp; &nbsp;No {pokemonList[3]?.url.split("/").at(-2)}  &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; {pokemonList[3]?.name.toUpperCase()}
          </div>
          <div onClick={() => handlePokemonSelect(pokemonList[4])} style ={{cursor: "pointer", height: "12.5%", background: "#e6e932ff", outline: "2.5px solid black", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px"}}>
            &nbsp; &nbsp;No {pokemonList[4]?.url.split("/").at(-2)}  &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; {pokemonList[4]?.name.toUpperCase()}
          </div>
          <div onClick={() => handlePokemonSelect(pokemonList[5])} style ={{cursor: "pointer", height: "12.5%", background: "#e6e932ff", outline: "2.5px solid black", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px"}}>
            &nbsp; &nbsp;No {pokemonList[5]?.url.split("/").at(-2)}  &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; {pokemonList[5]?.name.toUpperCase()}
          </div>
          <div onClick={() => handlePokemonSelect(pokemonList[6])} style ={{cursor: "pointer", height: "12.5%", background: "#e6e932ff", outline: "2.5px solid black", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px"}}>
            &nbsp; &nbsp;No {pokemonList[6]?.url.split("/").at(-2)}  &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; {pokemonList[6]?.name.toUpperCase()}
          </div>
          <div onClick={() => handlePokemonSelect(pokemonList[7])} style ={{cursor: "pointer", height: "12.5%", background: "#e6e932ff", outline: "2.5px solid black", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px"}}>
            &nbsp; &nbsp;No {pokemonList[7]?.url.split("/").at(-2)}  &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; {pokemonList[7]?.name.toUpperCase()}
          </div> 
        </div>

        {/* Pokemon Image Area*/}
        <div style={{background: "#ffffffff", width: "20%", zIndex: "2"}}>
          <div onClick={() => handlePokemonSelect(pokemonList[0])} style ={{outline: currentPokemon?.name == pokemonList[0]?.name ? "5px solid black" : "none" ,cursor: "pointer", height: "12.5%", background: "#d6d3d3ff", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px", justifyContent: "center"}}>
            <img src={pokemonListimages[0]} alt={pokemonList[0]?.name} style={{ imageRendering: "pixelated", maxHeight: "100%", width: "auto", transform: "scale(1.7)"}}/>
          </div>
          <div onClick={() => handlePokemonSelect(pokemonList[1])} style ={{outline: currentPokemon?.name == pokemonList[1]?.name ? "5px solid black" : "none" , cursor: "pointer", height: "12.5%", background: "#d6d3d3ff", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px", justifyContent: "center"}}>
            <img src={pokemonListimages[1]} alt={pokemonList[1]?.name} style={{ imageRendering: "pixelated", maxHeight: "100%", width: "auto", transform: "scale(1.7)"}}/>
          </div>
          <div onClick={() => handlePokemonSelect(pokemonList[2])} style ={{outline: currentPokemon?.name == pokemonList[2]?.name ? "5px solid black" : "none"  ,cursor: "pointer", height: "12.5%", background: "#d6d3d3ff", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px", justifyContent: "center"}}>
            <img src={pokemonListimages[2]} alt={pokemonList[2]?.name} style={{ imageRendering: "pixelated", maxHeight: "100%", width: "auto", transform: "scale(1.7)"}}/>
          </div>
          <div onClick={() => handlePokemonSelect(pokemonList[3])} style ={{outline: currentPokemon?.name == pokemonList[3]?.name ? "5px solid black" : "none", cursor: "pointer", height: "12.5%", background: "#d6d3d3ff", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px", justifyContent: "center"}}>
            <img src={pokemonListimages[3]} alt={pokemonList[3]?.name} style={{ imageRendering: "pixelated", maxHeight: "100%", width: "auto", transform: "scale(1.7)"}}/>
          </div>
          <div onClick={() => handlePokemonSelect(pokemonList[4])} style ={{outline: currentPokemon?.name == pokemonList[4]?.name ? "5px solid black" : "none" ,cursor: "pointer", height: "12.5%", background: "#d6d3d3ff", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px", justifyContent: "center"}}>
            <img src={pokemonListimages[4]} alt={pokemonList[4]?.name} style={{ imageRendering: "pixelated", maxHeight: "100%", width: "auto", transform: "scale(1.7)"}}/>
          </div>
          <div onClick={() => handlePokemonSelect(pokemonList[5])} style ={{outline: currentPokemon?.name == pokemonList[5]?.name ? "5px solid black" : "none" ,cursor: "pointer", height: "12.5%", background: "#d6d3d3ff", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px", justifyContent: "center"}}>
            <img src={pokemonListimages[5]} alt={pokemonList[5]?.name} style={{ imageRendering: "pixelated", maxHeight: "80%", width: "auto", transform: "scale(1.7)"}}/>
          </div>
          <div onClick={() => handlePokemonSelect(pokemonList[6])} style ={{outline: currentPokemon?.name == pokemonList[6]?.name ? "5px solid black" : "none" ,cursor: "pointer", height: "12.5%", background: "#d6d3d3ff", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px", justifyContent: "center"}}>
            <img src={pokemonListimages[6]} alt={pokemonList[6]?.name} style={{ imageRendering: "pixelated", maxHeight: "100%", width: "auto", transform: "scale(1.7)"}}/>
          </div>
          <div onClick={() => handlePokemonSelect(pokemonList[7])} style ={{outline: currentPokemon?.name == pokemonList[7]?.name ? "5px solid black" : "none" ,cursor: "pointer", height: "12.5%", background: "#d6d3d3ff", textAlign: "center", alignItems: "center", display: "flex", fontSize: "40px", justifyContent: "center"}}>
            <img src={pokemonListimages[7]} alt={pokemonList[7]?.name} style={{ imageRendering: "pixelated", maxHeight: "80%", width: "auto", transform: "scale(1.7)"}}/>
          </div>
        </div>

        {/* Right Side*/}
        <div style={{background: "#116423ff", width: "50%", display: "flex", flexDirection: "column", height: "100%", padding: "10px"}}>
          <div style={{alignSelf: "center", fontSize: "35px", fontWeight: "bold", color: "black", textAlign: "center", marginTop: "20px", background: "#ffffffff", width: "40%", height: "10%", borderRadius: "15px"  }}>
            Typing
             <br/>
            {currentPokemon ? currentPokemon.types.map(t => t.type.name.toUpperCase()).join(" / ") : "Select a Pokemon"}
          </div>
          
          

          {/* Pokemon Moves*/}
          <div style={{display: "flex", justifyContent: "space-between", marginTop: "20px", width: "100%", flexDirection: "row", height: "80%", gap: "10px"}}>

            <div style={{background: "white", height: "60%", width: "150%", alignSelf: "flex-start", justifyContent: "space-around", flexDirection: "row", marginLeft: "20px", marginTop: "20px",}}> 
              <Bar data={barData} options={{indexAxis: "y", responsive: true, maintainAspectRatio: false, scales:{
                x: {beginAtZero: true, max: 260}
              }}}/>
            </div>

            <div style={{width: "100%", alignSelfL: "flex-end", display: "flex", flexDirection: "column",}}>
              <div style={{outline: "1px solid black", background: "#ffffffff", height: "5%", width: "100%", marginRight: "20px", marginTop: "20px", zIndex: "2"}}>
                <h2> Learnable Moves</h2>
              </div>
              <div className="scrollable-container" style={{fontSize: "20px", background: "white", width: "100%", height: "120%", borderRadius: "5px", marginRight: "20px", overflowY: "auto", maxHeight: "55%", flexDirection: "row"}}>
                {currentPokemon ? currentPokemon.moves.map(m => 
                  <div style={{outline: "1px solid black", margin: "5px", borderRadius: "5px", background: "#ffffffff", height: "60px"}}>
                  {m.move.name.toUpperCase()}
                  <br/>
                  {moveData ? moveData[currentPokemon.moves.indexOf(m)] : ""}
                  </div>
                ) : "Select a Pokemon"}
              </div>
            </div>

            
          </div>
        </div>

        {/* Buttons*/}
      </div>
      <div style={{ marginTop: "8px", paddingBottom: "16px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
        <div style={{ display: "flex", gap: "18px" }}>
          <button
            onClick={handlePreviousPage}
            disabled={page === 0}
            style={page === 0 ? disabledNavButtonStyle : navButtonStyle}
          >
            ◀ Previous Page
          </button>
          <button
            onClick={() => setPage(0)}
            style={navButtonStyle}
          >
            First Page
          </button>
          <button
            onClick={handleNextPage}
            style={navButtonStyle}
          >
            Next Page ▶
          </button>
        </div>
      </div>
    </div>
  );
}
