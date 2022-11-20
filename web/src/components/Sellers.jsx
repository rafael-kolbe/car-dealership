import edit_icon from "../assets/icons/edit_icon.svg";
import delete_icon from "../assets/icons/delete_icon.svg";
import Button from "./Button";
import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Sellers() {
  const [sellers, setSellers] = useState([]);
  const [sales, setSales] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  function handlePrevPage() {
    page > 1 ? setPage(page - 1) : setPage(Math.ceil(sellers.length / 10));
  }

  function handleNextPage() {
    page < Math.ceil(sellers.length / 10) ? setPage(page + 1) : setPage(1);
  }

  function handleNew() {
    navigate("/dashboard/sellers/new");
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

  async function handleDelete(sellerId) {
    try {
      await api.delete(`/seller/${sellerId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const newSellers = sellers;
      const sellerIndex = newSellers.findIndex(seller => seller.id === sellerId);
      newSellers.splice(sellerIndex, 1);
      setSellers([...newSellers]);
    } catch (error) {
      window.alert(error.response.data.message);
    }
  }

  useEffect(() => {
    getSellers();
    getSales();
  }, []);

  return (
    <>
      <h1 className="bold text-[32px] text-[#17120F] mb-[74px]">Sellers</h1>
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
            <span className="w-[200px] mr-[560px]">Name</span>
            <span className="w-[100px]">Sold</span>
          </div>
          <div>
            {sellers.length > 0 &&
              paginate(sellers, 10, page).map(seller => {
                let sales_num = 0;
                sales.forEach(sale => sale.seller_id === seller.id && sales_num++);

                return (
                  <div key={seller.id} className="flex items-center px-5 py-3">
                    <span className="w-[200px] mr-[560px]">{seller.name}</span>
                    <span className="w-[40px] mr-[160px]">{sales_num}</span>
                    <img className="mr-[44px] cursor-pointer" src={edit_icon} onClick={() => console.log("edit")} />
                    <img className="cursor-pointer" src={delete_icon} onClick={() => handleDelete(seller.id)} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
