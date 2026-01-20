import React from "react";
import '../categories.css';
import Food from "../../../../foodimage";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTocart } from "../../../cart/cartslice";

function Junkfood() {
  const dispatch = useDispatch();
  const Food2 = Food.filter((ele) => ele.titlename === 'JunkFood');
  const history = useHistory();

  function prevImage() {
    const box = document.querySelector('.itali-card-image');
    const width = box.clientWidth;
    box.scrollLeft -= width;
  }

  function nextImage() {
    const box = document.querySelector('.itali-card-image');
    const width = box.clientWidth;
    box.scrollLeft += width;
  }

  function detailed(id) {
    history.push(`/singledish?id=${id}`);
  }

  function Alldish(titleId) {
    history.push(`/alldish?id=${titleId}`);
  }

  function AddtoCart(ele) {
    dispatch(addTocart(ele));
  }

  function order() {
    history.push('/cart');
  }

  return (
    <div className="indi-css">
      <h3>Junk Food</h3>

      <div className="main-image">
        <button className="leftImageArrowStyles" onClick={prevImage}>❰❰</button>
        <button className="rightImageArrowStyles" onClick={nextImage}>❱❱</button>

        <div className="itali-card-image">
          {Food2.map((ele) => (
            <div key={ele.id} className='Perslide'>
              <img src={ele.url} alt={ele.title} onClick={() => detailed(ele.id)} />

              <p>{ele.title} [{ele.quantity}]</p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>₹{ele.rate}</span>
                <span style={{ color: "orange", fontWeight: "500", fontSize: "14px" }}>⭐ {ele.star}</span>
              </div>

              
              <button className="slide-cart-button" onClick={() => AddtoCart(ele)}>+ Add to Cart</button>
            </div>
          ))}

          <button onClick={() => Alldish(Food2[0].titleId)} className='imsa'>See more</button>
        </div>
      </div>
    </div>
  );
}

export default Junkfood;
