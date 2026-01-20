import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Food from '../../foodimage';
import { useDispatch } from 'react-redux';
import { addTocart } from '../cart/cartslice';
import '../home/categories/categories.css';

function Search() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const params = new URLSearchParams(location.search);
  const query = params.get("query")?.toLowerCase() || "";

  const searchResults = Food.filter(item =>
    item.title.toLowerCase().includes(query)
  );

  const handleDetails = (id) => {
    history.push(`/singledish?id=${id}`);
  };

  const handleCart = (item) => {
    dispatch(addTocart(item));
  };

  return (
    <div className="category-list">
      <div className="search-wrapper">
        <h2 className="search-title">
          Search Results for: <span>{query}</span>
        </h2>

        <div className="All-dish-card">
          {searchResults.length > 0 ? (
            searchResults.map((ele) => (
              <div key={ele.id} className="Perslide">
                <img
                  src={ele.url}
                  alt={ele.title}
                  onClick={() => handleDetails(ele.id)}
                />
                <p>{ele.title} [{ele.quantity}]</p>
                <span>₹{ele.rate}</span>
                <button className="slide-cart-button" onClick={() => handleCart(ele)}>
                  + Add to Cart
                </button>
              </div>
            ))
          ) : (
            <h3 className="no-results">No items found</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
