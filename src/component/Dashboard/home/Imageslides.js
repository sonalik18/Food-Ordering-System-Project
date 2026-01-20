import React, { useState, useEffect } from "react";

function Imageslide({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); // ⏱ 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [slides.length]);

  const slideStyles = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage: `url(${slides[currentIndex].url})`,
    position: "relative",
  };

  function goToPrevious() {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }

  function goToNext() {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }

  function goToSlide(slideIndex) {
    setCurrentIndex(slideIndex);
  }

  return (
    <div className="sliderstyle">
      <div className="leftArrowStyles" onClick={goToPrevious}>❰</div>
      <div className="rightArrowStyles" onClick={goToNext}>❱</div>

      <div style={slideStyles}></div>

      <div className="dotsContainerStyles">
        {slides.map((_, slideIndex) => (
          <div
            className="dotStyle"
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
}

export default Imageslide;
