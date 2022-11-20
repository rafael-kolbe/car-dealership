import logo from "../assets/logo.svg";

export default function Card({ children }) {
  return (
    <>
      <div className="absolute flex flex-col justify-between w-[593px] h-[620px] rounded-lg bg-white shadow-md shadow-gray-400">
        <div className="z-1 flex justify-center items-center w-[593px] h-[176px] bg-[#17120F] rounded-lg">
          <img src={logo} />
        </div>
        {children}
      </div>
    </>
  );
}
