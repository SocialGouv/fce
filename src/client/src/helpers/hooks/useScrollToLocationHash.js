import { useEffect } from "react";

export const useScrollToLocationHash = ({ location, offset = -50 }) => {
  useEffect(() => {
    // Function to handle scrolling
    const handleScrollToElement = () => {
      const elementId = location.hash.slice(1);
      const element = document.getElementById(elementId);

      if (element) {
        const top =
          element.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({
          behavior: "smooth",
          left: 0,
          top,
        });
      }
    };

    // Debounce to ensure that DOM is ready in case of dynamic content
    const timeoutId = setTimeout(handleScrollToElement, 100);

    return () => clearTimeout(timeoutId);
  }, [location.hash, offset]); // Only re-run effect if hash or offset changes
};
