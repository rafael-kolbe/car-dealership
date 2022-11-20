export default function Button({ color, title, handleClick }) {
  return (
    <>
      {color === "orange" && (
        <button className="w-full h-[34px] bg-[#F07C62] rounded-md text-white hover:bg-[#c44528]" onClick={handleClick}>
          {title}
        </button>
      )}
      {color === "gray" && (
        <button className="w-full h-[34px] bg-[#6B7280] rounded-md text-white hover:bg-[#585a5c]" onClick={handleClick}>
          {title}
        </button>
      )}
      {color === "red" && (
        <button className="w-full h-[34px] bg-[#C30202] rounded-md text-white hover:bg-[#8f1c1c]" onClick={handleClick}>
          {title}
        </button>
      )}
    </>
  );
}
