// components/Counter.tsx
// This component should receive an `initialCount` number prop
// Pass that initial count as the initial value of a piece of state called count

import { useState } from 'react';

// Render buttons to increase, decrease and reset
const Counter = ({ initialCount }: { initialCount: number }) => {
  const [count, setCount] = useState(initialCount);

  const handleIncrease = () => setCount((c) => c + 1);

  // const handleDecrease: React.MouseEventHandler<HTMLButtonElement> = (e) => {
  const handleDecrease = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    if (target.value === '-') setCount((c) => c - 1);
  };

  return (
    <>
      <p>Initial count: {count}</p>
      <button type='button' onClick={handleIncrease}>
        Increase
      </button>
      <button type='button' value={'-'} onClick={handleDecrease}>
        Decrease
      </button>
      <button type='button' onClick={() => setCount(initialCount)}>
        Reset
      </button>
    </>
  );
};

export default Counter;
