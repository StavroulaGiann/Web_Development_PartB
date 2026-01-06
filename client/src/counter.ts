// Initializes a simple click counter on the given button element
export function setupCounter(element: HTMLButtonElement) {
  // Internal counter state
  let counter = 0;

  // Updates the counter value and the button's displayed text
  const setCounter = (count: number) => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  };

  // Increment the counter each time the button is clicked
  element.addEventListener("click", () => setCounter(counter + 1));

  // Initialize the counter with value 0
  setCounter(0);
}
