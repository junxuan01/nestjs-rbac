const mySetInterval = (callback: () => void, delay: number) => {
  const fn = () => {
    callback();
    setTimeout(() => {
      fn();
    }, delay);
  };
  setTimeout(fn, delay);
};
mySetInterval(() => console.log(new Date()), 1000);
