import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className='flex flex-col '>
      <Navbar />
      <main className='flex-grow'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
