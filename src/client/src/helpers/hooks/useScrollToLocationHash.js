import { useEffect } from "react";

export const useScrollToLocationHash = ({ location, offset = -50 }) => {
  useEffect(() => {
    const scrollTarget = document.getElementById(location.hash.slice(1));
    window.scrollTo({
      behavior: scrollTarget ? "smooth" : "auto",
      top: scrollTarget
        ? scrollTarget.getBoundingClientRect().top + window.pageYOffset + offset
        : 0,
    });
  }, [location, location.hash, offset]);
};
