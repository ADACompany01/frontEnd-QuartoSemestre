import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import './Portal.css';

const ClientPortalLayout = () => {
  return (
    <div className="portal-container">
      <Sidebar />
      <main className="portal-main">
        <header className="portal-header">
          <h1>Olá, Nome do Cliente</h1>
        </header>
        <Outlet />
      </main>
    </div>
  );
};

export default ClientPortalLayout;