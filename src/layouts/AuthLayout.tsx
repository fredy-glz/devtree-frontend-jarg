import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";

import { Logo } from "../components/Logo";

const AuthLayout = () => {
  const token = localStorage.getItem("AUTH_TOKEN");

  if (token) return <Navigate to="/admin" />;

  return (
    <>
      <div className="bg-slate-800 min-h-screen">
        <div className="max-w-lg mx-auto pt-10 px-5">
          <Logo />
          <div className="py-10">
            <Outlet />
          </div>
        </div>
      </div>

      <Toaster position="top-right" />
    </>
  );
};

export default AuthLayout;
