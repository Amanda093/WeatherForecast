function Title({ children, size = "text-5xl", position = "text-center" }) {
  return (
    <h1 className={`${size} text-white font-bold ${position}`}>{children}</h1>
  );
}

export default Title;
