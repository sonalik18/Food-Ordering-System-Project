import React from "react";
import '../categories.css';
import Food from "../../../../foodimage";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTocart } from "../../../cart/cartslice";
import '../../../header/header.css';

function Chatfood() {
  const dispatch = useDispatch();
  const Food3 = Food.filter((ele) => ele.titlename === 'chat');
  const history = useHistory();

  function AddtoCart(ele) {
    dispatch(addTocart(ele));
  }

  function prevImage() {
    const box = document.querySelector('.korean-card-image');
    const width = box.clientWidth;
    box.scrollLeft -= width;
  }

  function nextImage() {
    const box = document.querySelector('.korean-card-image');
    const width = box.clientWidth;
    box.scrollLeft += width;
  }

  function detail(id) {
    history.push(`/singledish?id=${id}`);
  }

  function Alldish(titleId) {
    history.push(`/alldish?id=${titleId}`);
  }

  function order() {
    history.push('/cart');
  }

  return (
    <div className="indi-css">
      <h3>Chat Food</h3>

      <div className="main-image">
        <button className="leftImageArrowStyles" onClick={prevImage}>❰❰</button>
        <button className="rightImageArrowStyles" onClick={nextImage}>❱❱</button>

        <div className="korean-card-image">
          {
            Food3.map((ele) => (
              <div key={ele.id} className='Perslide'>
                <img src={ele.url} alt={ele.title} onClick={() => detail(ele.id)} />
                <p>{ele.title} [{ele.quantity}]</p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>₹{ele.rate}</span>
                  <span style={{ color: "orange", fontWeight: "500", fontSize: "14px" }}>⭐ {ele.star}</span>
                </div>

              
                <button className="slide-cart-button" onClick={() => AddtoCart(ele)}>+ Add to Cart</button>
              </div>
            ))
          }

          <button onClick={() => Alldish(Food3[0].titleId)} className='imsa'>See more</button>
        </div>
      </div>
    </div>
  );
}

export default Chatfood;
