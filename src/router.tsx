import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import LinkTreeView from "./views/LinkTreeView";
import ProfileView from "./views/ProfileView";
import { HandleView } from "./views/HandleView";
import { NotFoundView } from "./views/NotFoundView";
import { HomeView } from "./views/HomeView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} index={true} />
          <Route path="/auth/register" element={<RegisterView />} />
        </Route>

        {/* Dashboard */}
        <Route path="/admin" element={<AppLayout />}>
          <Route index element={<LinkTreeView />} />
          <Route path="profile" element={<ProfileView />} />
        </Route>

        <Route path="/:handle" element={<AuthLayout />}>
          <Route element={<HandleView />} index={true} />
        </Route>

        <Route path="/" element={<HomeView />} />

        <Route path="/404" element={<AuthLayout />}>
          <Route element={<NotFoundView />} index={true} />
        </Route>

        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
