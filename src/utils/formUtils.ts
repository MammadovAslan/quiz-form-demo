export const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
};
