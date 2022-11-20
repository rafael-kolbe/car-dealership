import edit_icon from "../assets/icons/edit_icon.svg";
import delete_icon from "../assets/icons/delete_icon.svg";
import Button from "./Button";
import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [sales, setSales] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  function handlePrevPage() {
    page > 1 ? setPage(page - 1) : setPage(Math.ceil(cars.length / 10));
  }

  function handleNextPage() {
    page < Math.ceil(cars.length / 10) ? setPage(page + 1) : setPage(1);
  }

  function handleNew() {
    navigate("/dashboard/cars/new");
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

  async function handleDelete(carId) {
    try {
      await api.delete(`/car/${carId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const newCars = cars;
      const carIndex = newCars.findIndex(car => car.id === carId);
      newCars.splice(carIndex, 1);
      setCars([...newCars]);
    } catch (error) {
      window.alert(error.response.data.message);
    }
  }

  useEffect(() => {
    getCars();
    getSales();
  }, []);

  return (
    <>
      <h1 className="bold text-[32px] text-[#17120F] mb-[74px]">Cars</h1>
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
            <span className="w-[200px] mr-[280px]">Model</span>
            <span className="w-[100px] mr-[180px]">Price</span>
            <span>Sold</span>
          </div>
          <div>
            {cars.length > 0 &&
              paginate(cars, 10, page).map(car => {
                const formattedPrice = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(car.price / 100);

                let sales_num = 0;
                sales.forEach(sale => sale.car_id === car.id && sales_num++);

                return (
                  <div key={car.id} className="flex items-center px-5 py-3">
                    <span className="w-[200px] mr-[280px]">{car.car_model}</span>
                    <span className="w-[100px] mr-[180px]">{formattedPrice}</span>
                    <span className="w-[40px] mr-[160px]">{sales_num}</span>
                    <img className="mr-[44px] cursor-pointer" src={edit_icon} onClick={() => console.log("edit")} />
                    <img className="cursor-pointer" src={delete_icon} onClick={() => handleDelete(car.id)} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
