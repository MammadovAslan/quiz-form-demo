export const preventSubmit = (e: React.KeyboardEvent<HTMLInputElement>): void => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
};
