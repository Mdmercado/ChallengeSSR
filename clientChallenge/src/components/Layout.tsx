import { Outlet } from "react-router-dom";
import Header from "./Header";
import Loading from "./Loading";
import { useLoading } from "../contexts/LoadingContext";

const Layout = () => {
  const { isLoading } = useLoading();
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-4">
        {isLoading && <Loading />}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
