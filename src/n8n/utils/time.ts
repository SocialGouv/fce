export const makeTimeBlock = () => {
  let total = 0;
  let startTime: number | null = null;
  let previous = 0;

  return {
    start: () => {
      startTime = Date.now();
    },

    end: () => {
      if (startTime !== null) {
        total += Date.now() - startTime;
        previous += Date.now() - startTime;
        startTime = null;
      }
    },

    getTotal: () => {
      return total;
    },

    clearPrevious: () => {
      previous = 0;
    },

    getPrevious: () => {
      return previous;
    }
  }
}
