import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import AdminPanel from "./AdminPanel";
import UserPanel from "./UserPanel";

const Dashboard = () => {
  const { token, user } = useAuth();
  console.log("user", user);

  if (!token) {
    return <Navigate to="/" />;
  }
  return <>{user?.role.name === "admin" ? <AdminPanel /> : <UserPanel />}</>;
};

export default Dashboard;
