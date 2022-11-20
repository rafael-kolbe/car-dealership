import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (!username || !password) {
        window.alert("Fill in all fields!");
        return;
      }

      const response = await api.post("/login", { username, password });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      window.alert(error.response.data.message);
    } finally {
      setUsername("");
      setPassword("");
    }
  }

  return (
    <form className="flex flex-col justify-center items-center gap-8 w-full h-full" onSubmit={handleSubmit} autoComplete="off">
      <input
        className="text-center w-[311px] h-[59px] p-[20px] rounded-md border-2 border-gray-300 focus:border-gray-700"
        type="text"
        placeholder="username"
        value={username}
        onChange={event => setUsername(event.target.value)}
      />
      <input
        className="text-center w-[311px] h-[59px] p-[20px] rounded-md border-2 border-gray-300 focus:border-gray-700"
        type="password"
        placeholder="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
      />
      <div className="w-[311px]">
        <Button color={"orange"} title={"Enter"} handleClick={handleSubmit} />
      </div>
    </form>
  );
}
