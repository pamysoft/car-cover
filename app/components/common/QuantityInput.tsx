import React, { useState } from 'react';

interface QuantityInputProps {
  min?: number;
  max?: number;
  initialQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
}

const QuantityInput: React.FC<QuantityInputProps> = ({
  min = 1,
  max = 100,
  initialQuantity = 1,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrement = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  const handleDecrement = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (value >= min && value <= max) {
      setQuantity(value);
      onQuantityChange?.(value);
    }
  };

  return (
    <div className="flex min-h-[47px] w-[142px] items-center border border-[#121212]">
      <button
        type="button"
        onClick={handleDecrement}
        className="flex h-full min-h-[47px] min-w-[45px] items-center justify-center p-2 text-center text-black"
        aria-label="Decrease quantity"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-[20px] w-[10px]" viewBox="0 0 10 2"><path fill="currentColor" fillRule="evenodd" d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 1 1 0 1H1A.5.5 0 0 1 .5 1" clipRule="evenodd"></path></svg>
      </button>
      <input
        type="number"
        className="mx-2 h-full min-h-[47px] w-full border-none text-center focus:border-none focus:outline-none"
        value={quantity}
        onChange={handleChange}
        min={min}
        max={max}
      />
      <button
        type="button"
        onClick={handleIncrement}
        className="flex h-full min-h-[47px] min-w-[45px] items-center justify-center p-2 text-center"
        aria-label="Increase quantity"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-[20px] w-[10px]" viewBox="0 0 10 10"><path fill="currentColor" fillRule="evenodd" d="M1 4.51a.5.5 0 0 0 0 1h3.5l.01 3.5a.5.5 0 0 0 1-.01V5.5l3.5-.01a.5.5 0 0 0-.01-1H5.5L5.49.99a.5.5 0 0 0-1 .01v3.5l-3.5.01z" clipRule="evenodd"></path></svg>
      </button>
    </div>
  );
};

export default QuantityInput;
