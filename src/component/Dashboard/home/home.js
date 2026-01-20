import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Imageslide from "./Imageslides";
import Header from "../header/header";
import '../header/header.css';
import Indianfood from "./categories/Indianfood/Indianfood";
import Footer from "../footer/footer";
import Junkfood from "./categories/Junk food/Junkfood"; // folder नावात space काढले
import Chatfood from "./categories/chat food/Chatfood"; // folder नावात space काढले
import { useSelector, useDispatch } from "react-redux";
import { getTotals } from "../cart/cartslice";
import Categories from "./categories/categories";

function Home() {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    const slides = [
        { url: require("../image/slide1.jpg"), title: 'slide1' },
        { url: require("../image/slide2.jpg"), title: 'slide2' },
        { url: require("../image/slide3.jpg"), title: 'slide3' }
    ];

    return (
        <div className="home">
            <Header />
            <div className="bg">
                <div className="main-slice">
                    <Imageslide slides={slides} />
                </div>
            </div>

            <Categories />

            <div className="categories">
                <Indianfood />
                <Junkfood />
                <Chatfood />
            </div>

            <Footer />
        </div>
    );
}

export default Home;
