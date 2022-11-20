import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Form({ title, label1, label2, label3 }) {
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [thirdInput, setThirdInput] = useState("");
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(`/dashboard/${title.toLowerCase()}`);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    async function createCar() {
      try {
        if (!firstInput || !secondInput) {
          window.alert("Fill in all fields!");
        }

        const response = await api.post(
          "/car",
          { carModel: firstInput, price: Number(secondInput) },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        window.alert(response.data.message);
      } catch (error) {
        if (typeof error.response.data.message !== "object") {
          window.alert(error.response.data.message);
        }
        window.alert("Car Model: " + error.response.data.message?.carModel[0]);
        window.alert("Price: " + error.response.data.message?.price[0]);
      } finally {
        setFirstInput("");
        setSecondInput("");
      }
    }

    async function createSeller() {
      try {
        if (!firstInput) {
          window.alert("Fill in all fields!");
        }

        const response = await api.post(
          "/seller",
          { name: firstInput },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        window.alert(response.data.message);
      } catch (error) {
        if (typeof error.response.data.message !== "object") {
          window.alert(error.response.data.message);
        }
        window.alert("Name: " + error.response.data.message?.name[0]);
      } finally {
        setFirstInput("");
      }
    }

    async function createSale() {
      try {
        if (!firstInput || !secondInput || !thirdInput) {
          window.alert("Fill in all fields!");
        }

        const response = await api.post(
          "/sale",
          { sellerName: firstInput, carModel: secondInput, soldFor: Number(thirdInput) },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        window.alert(response.data.message);
      } catch (error) {
        if (typeof error.response.data.message !== "object") {
          window.alert(error.response.data.message);
        }
        window.alert("Seller Name: " + error.response.data.message?.sellerName[0]);
        window.alert("Car Model: " + error.response.data.message?.carModel[0]);
        window.alert("Price: " + error.response.data.message?.soldFor[0]);
      } finally {
        setFirstInput("");
        setSecondInput("");
        setThirdInput("");
      }
    }

    switch (title) {
      case "Cars":
        createCar();
        break;
      case "Sellers":
        createSeller();
        break;
      case "Sales":
        createSale();
        break;
    }
  }

  return (
    <div>
      <h1 className="bold text-[32px] text-[#17120F] mb-[74px]">{title}</h1>
      <div className="flex flex-col gap-8 ml-[50px]">
        <div className="w-[108px]">
          <Button color={"gray"} title={"Go Back"} handleClick={handleGoBack} />
        </div>
        <form className="flex flex-col items-end gap-8 w-[311px]" onSubmit={handleSubmit} autoComplete="off">
          {label1 && (
            <input
              className="text-center w-[311px] h-[59px] p-[20px] rounded-md border-2 border-gray-300 focus:border-gray-700"
              type="text"
              placeholder={label1}
              value={firstInput}
              onChange={event => setFirstInput(event.target.value)}
            />
          )}
          {label2 && (
            <input
              className="text-center w-[311px] h-[59px] p-[20px] rounded-md border-2 border-gray-300 focus:border-gray-700"
              type="text"
              placeholder={label2}
              value={secondInput}
              onChange={event => setSecondInput(event.target.value)}
            />
          )}
          {label3 && (
            <input
              className="text-center w-[311px] h-[59px] p-[20px] rounded-md border-2 border-gray-300 focus:border-gray-700"
              type="text"
              placeholder={label3}
              value={thirdInput}
              onChange={event => setThirdInput(event.target.value)}
            />
          )}
          <div className="w-[108px]">
            <Button color={"orange"} title={"Create"} handleClick={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
}
