import "./ScrollToTopButton.scss";

import React, { useEffect, useState } from "react";

import TopArrow from "../../../../shared/Icons/TopArrow.jsx";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <button className="scroll-to-top-button" onClick={scrollToTop}>
          <TopArrow />
          Haut de page
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
