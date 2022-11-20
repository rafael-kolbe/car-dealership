import { Routes, Route, Outlet, Navigate, useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Graphs from "../components/Graphs";
import Cars from "../components/Cars";
import Sellers from "../components/Sellers";
import Sales from "../components/Sales";
import Form from "../components/Form";
import api from "../services/api";

async function isAuthenticated() {
  const navigate = useNavigate();

  try {
    const response = await api.get("/authentication", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.status === 204;
  } catch (error) {
    navigate("/");
    window.alert(error.response.data.message);
    return false;
  }
}

function ProtectedRoutes({ redirectTo }) {
  return isAuthenticated() ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default function WebRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoutes redirectTo="/" />}>
        <Route
          path="/dashboard"
          element={
            <Dashboard>
              <Graphs />
            </Dashboard>
          }
        />
        <Route
          path="/dashboard/cars"
          element={
            <Dashboard>
              <Cars />
            </Dashboard>
          }
        />
        <Route
          path="/dashboard/cars/new"
          element={
            <Dashboard>
              <Form title={"Cars"} label1={"Car Model"} label2={"Price"} />
            </Dashboard>
          }
        />
        <Route
          path="/dashboard/sellers"
          element={
            <Dashboard>
              <Sellers />
            </Dashboard>
          }
        />
        <Route
          path="/dashboard/sellers/new"
          element={
            <Dashboard>
              <Form title={"Sellers"} label1={"Name"} />
            </Dashboard>
          }
        />
        <Route
          path="/dashboard/sales"
          element={
            <Dashboard>
              <Sales />
            </Dashboard>
          }
        />
        <Route
          path="/dashboard/sales/new"
          element={
            <Dashboard>
              <Form title={"Sales"} label1={"Seller Name"} label2={"Car Model"} label3={"Price"} />
            </Dashboard>
          }
        />
      </Route>
    </Routes>
  );
}
