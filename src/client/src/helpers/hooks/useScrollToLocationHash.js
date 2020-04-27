import { useEffect } from "react";

export const useScrollToLocationHash = ({ location, offset = 0 }) => {
  useEffect(() => {
    const scrollTarget = document.getElementById(location.hash.slice(1));
    window.scrollTo({
      behavior: scrollTarget ? "smooth" : "auto",
      top: scrollTarget ? scrollTarget.offsetTop + offset : 0
    });
  }, [location, offset]);
};
