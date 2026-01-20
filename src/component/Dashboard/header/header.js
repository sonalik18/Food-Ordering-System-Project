import React, { useState } from "react";
import logo from '../image/snapbite-logo.png';
import cartimg from '../image/cart.jpg';
import '../header/header.css';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";

function Header() {
    const { cartTotalQUantity } = useSelector((state) => state.cart);
    const history = useHistory();
    const [location, setLocation] = useState("Your location");
    const [searchText, setSearchText] = useState("");
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);

    function AddCart() {
        history.push('/cart');
    }

    function Profile() {
        history.push('/profile');
    }

    function gotoHome() {
        history.push('/home');
    }

    function Logout() {
        history.push('/login');
    }

    function handleSearch(e) {
        e.preventDefault();
        if (searchText.trim()) {
            history.push(`/search?query=${searchText}`);
        }
    }

    async function getCurrentLocation() {
        setLocation("Detecting...");

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(
                        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=e006c6e352344ab8b46273292197d56b`
                    );
                    const data = await response.json();
                    const components = data.results[0]?.components || {};

                    const mohalla =
                        components.neighbourhood ||
                        components.suburb ||
                        components.hamlet ||
                        components.village ||
                        components.town;
                    const city = components.city || components.county;
                    const state = components.state;

                    const fullLocation = [mohalla, city, state].filter(Boolean).join(", ");
                    setLocation(fullLocation || "Location not found");
                    setShowLocationDropdown(false);
                } catch (error) {
                    console.error("Location fetch error:", error);
                    setLocation("Location not found");
                }
            },
            (error) => {
                console.error("Geolocation error:", error);
                setLocation("Location not found");
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 10000
            }
        );
    }

    return (
        <div className="header">
            <img src={logo} alt="Logo" className='logo' onClick={gotoHome} />

            {/* 📍 Location Picker */}
            <div className="location-wrapper">
                <div
                    className="location-box"
                    onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                >
                    <MdLocationOn className="location-icon" />
                    <span className="location-text">{location}</span>
                    <FaChevronDown className="dropdown-icon" />
                </div>

                {showLocationDropdown && (
                    <div className="location-dropdown-box">
                        <div className="location-dropdown" onClick={getCurrentLocation}>
                            <MdLocationOn className="detect-icon" />
                            <div>
                                <div className="detect-text">Detect current location</div>
                                <div className="detect-sub">Using GPS</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 🔍 Search Bar */}
            <form onSubmit={handleSearch} className="search-bar-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search your favourite food like dosa, pizza, biryani..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {/* 🛒 Cart */}
            <div className="cart-section">
                <button className="cart-button" onClick={AddCart}>
                    <img src={cartimg} alt="cart" />
                </button>
                <span className="msg">{cartTotalQUantity}</span>
            </div>

            {/* 🔘 Navigation */}
            <button className="cart-button" onClick={gotoHome}>
                <p style={{ color: "white", marginTop: '12px' }}>Home</p>
            </button>
            <button className="cart-button" onClick={Profile}>
                <p style={{ color: "white", marginTop: '12px' }}>Profile</p>
            </button>
            <button className="cart-button" onClick={Logout}>
                <p style={{ color: "white", marginTop: '12px' }}>Log out</p>
            </button>
        </div>
    );
}

export default Header;
