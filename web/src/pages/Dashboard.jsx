import logo from "../assets/logo.svg";
import dashboard_icon from "../assets/icons/dashboard_icon.svg";
import car_icon from "../assets/icons/car_icon.svg";
import seller_icon from "../assets/icons/seller_icon.svg";
import sales_icon from "../assets/icons/sales_icon.svg";
import leave_icon from "../assets/icons/leave_icon.svg";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ children }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-100">
      <div className="absolute flex w-[1400px] h-[858px] rounded-lg bg-white shadow-md shadow-gray-400">
        <aside className="z-1 flex flex-col justify-between items-center w-[224px] h-[858px] bg-[#17120F] rounded-lg py-12 px-8">
          <div>
            <div className="flex justify-center items-center mb-[70px]">
              <img className="w-[102px] h-[24px]" src={logo} />
            </div>
            <div className="flex gap-4 w-full text-white mb-8 cursor-pointer hover:text-[#F07C62]" onClick={() => navigate("/dashboard")}>
              <img src={dashboard_icon} />
              <h2>Dashboard</h2>
            </div>
            <div className="flex gap-4 w-full text-white mb-8 cursor-pointer hover:text-[#F07C62]" onClick={() => navigate("/dashboard/cars")}>
              <img src={car_icon} />
              <h2>Cars</h2>
            </div>
            <div className="flex gap-4 w-full text-white mb-8 cursor-pointer hover:text-[#F07C62]" onClick={() => navigate("/dashboard/sellers")}>
              <img src={seller_icon} />
              <h2>Sellers</h2>
            </div>
            <div className="flex gap-4 w-full text-white mb-8 cursor-pointer hover:text-[#F07C62]" onClick={() => navigate("/dashboard/sales")}>
              <img src={sales_icon} />
              <h2>Sales</h2>
            </div>
            <img />
          </div>
          <img className="cursor-pointer" src={leave_icon} onClick={() => navigate("/")} />
        </aside>
        <main>
          <div className="w-[1176px] h-full p-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
