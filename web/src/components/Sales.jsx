import edit_icon from "../assets/icons/edit_icon.svg";
import delete_icon from "../assets/icons/delete_icon.svg";
import Button from "./Button";
import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Sales() {
  const [cars, setCars] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [sales, setSales] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  function handleNew() {
    navigate("/dashboard/sales/new");
  }

  function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  function handlePrevPage() {
    page > 1 ? setPage(page - 1) : setPage(Math.ceil(sales.length / 10));
  }

  function handleNextPage() {
    page < Math.ceil(sales.length / 10) ? setPage(page + 1) : setPage(1);
  }

  async function getCars() {
    try {
      const response = await api.get("/car", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setCars([...response.data]);
    } catch (error) {
      window.alert(error.response.data.message);
    }
  }

  async function getSellers() {
    try {
      const response = await api.get("/seller", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSellers([...response.data]);
    } catch (error) {
      window.alert(error.response.data.message);
    }
  }

  async function getSales() {
    try {
      const response = await api.get("/sale", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSales([...response.data]);
    } catch (error) {
      window.alert(error.response.data.message);
    }
  }

  async function handleDelete(saleId) {
    try {
      await api.delete(`/sale/${saleId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const newSales = sales;
      const saleIndex = newSales.findIndex(sale => sale.id === saleId);
      newSales.splice(saleIndex, 1);
      setSales([...newSales]);
    } catch (error) {
      window.alert(error.response.data.message);
    }
  }

  useEffect(() => {
    getCars();
    getSellers();
    getSales();
  }, []);

  return (
    <>
      <h1 className="bold text-[32px] text-[#17120F] mb-[74px]">Sales</h1>
      <div>
        <div className="flex justify-between w-full">
          <div className="flex justify-between w-[260px]">
            <div className="w-[108px] mb-8">
              <Button color={"orange"} title={"Prev Page"} handleClick={handlePrevPage} />
            </div>
            <div className="w-[108px] mb-8">
              <Button color={"orange"} title={"Next Page"} handleClick={handleNextPage} />
            </div>
          </div>
          <div className="w-[108px] mb-8">
            <Button color={"orange"} title={"New"} handleClick={handleNew} />
          </div>
        </div>
        <div className="absolute flex flex-col w-[1096px]">
          <div className="z-1 flex items-center w-full h-[43px] bg-[#17120F] rounded-lg text-white px-5 py-3">
            <span className="w-[110px] mr-[120px]">Date</span>
            <span className="w-[150px] mr-[120px]">Car</span>
            <span className="w-[100px] mr-[150px]">Sold For</span>
            <span>Seller</span>
          </div>
          <div>
            {sales.length > 0 &&
              paginate(sales, 10, page).map(sale => {
                const formattedDate = sale.sold_at.split(" ")[0];
                const car = cars.find(car => car.id === sale.car_id) || [];
                const formattedPrice = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(sale.sold_for / 100);
                const seller = sellers.find(seller => seller.id === sale.seller_id) || [];

                return (
                  <div key={sale.id} className="flex items-center px-5 py-3">
                    <span className="w-[110px] mr-[120px]">{formattedDate}</span>
                    <span className="w-[150px] mr-[120px]">{car.car_model || <i>Deleted Car</i>}</span>
                    <span className="w-[100px] mr-[150px]">{formattedPrice}</span>
                    <span className="w-[120px] mr-[100px]">{seller.name || <i>Deleted Seller</i>}</span>
                    <img className="mr-[44px] cursor-pointer" src={edit_icon} onClick={() => console.log("edit")} />
                    <img className="cursor-pointer" src={delete_icon} onClick={() => handleDelete(sale.id)} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
