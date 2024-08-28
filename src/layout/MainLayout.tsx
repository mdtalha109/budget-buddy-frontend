
import React from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../components/shared/Sidebar';

const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen h-full ">
      <Sidebar />
      <div className="flex-1 ml-[70px] lg:ml-64 bg-[#f3f5fa] dark:bg-primary-dark dark:text-white overflow-x-scroll"> 
         <div className='p-4  '>
            <Outlet />
         </div>
        
      </div>
    </div>
  );
};

export default Layout;
