import React, { useState } from "react";
import foodItems from "../../foodimage";
import "./searchdish.css"; // लक्षात ठेवा: small letters वापरा जर file name तसंच आहे

function Temp() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const filtered = foodItems.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search dish..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div className="search-results">
        {results.length === 0 ? (
          <p>No dish found</p>
        ) : (
          results.map((item) => (
            <div key={item.id} className="dish-card">
              <img src={item.url} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>₹{item.rate}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Temp;
