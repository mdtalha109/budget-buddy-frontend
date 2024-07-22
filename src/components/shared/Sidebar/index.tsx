
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { FaTachometerAlt, FaWallet, FaPiggyBank, FaUserCircle, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { clearToken } from '../../../redux/authSlice';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);

  const dispatch = useDispatch()

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`flex p-2 md:p-4 fixed flex-col h-full  bg-primary  text-white shadow-lg   ${isOpen ? 'w-64' : 'w-[70px]'}`}>
      <div className=" flex  justify-center items-center">
        <h1 className={`text-2xl font-bold ${isOpen ? 'block' : 'hidden'}`}>{t("app.title")}</h1>
        <button className='md:hidden' onClick={toggleSidebar}>
          {isOpen ? <FaTimes  size={24} /> : <FaBars className={`${isOpen ? '' : 'text-center'}`} size={24} />}
        </button>
      </div>
      <nav className="mt-10 flex-1  ">
        <ul>
          <li className="mb-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center  py-2 rounded-lg transition duration-300 ${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'}
                ${isOpen ? 'px-2': 'justify-center'}
                `
              }
            >
              <FaTachometerAlt className={`${isOpen ? 'mr-2': ''}`} />
              <span className={`${isOpen ? 'inline' : 'hidden'}`}>{t("app.dashboard")}</span>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/expenses"
              className={({ isActive }) =>
                `flex items-center  py-2 rounded-lg transition duration-300 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}
                ${isOpen ? 'px-2': 'justify-center'}
                `
              }
           
            >
              <FaWallet className={`${isOpen ? 'mr-2': ''}`} />
              <span className={`${isOpen ? 'inline' : 'hidden'}`}>{t("expense.title")}</span>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/incomes"
              className={({ isActive }) =>
                `flex items-center py-2 rounded-lg transition duration-300 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}
                ${isOpen ? 'px-2': 'justify-center'}
                `
              }
             
            >
              <FaPiggyBank className={`${isOpen ? 'mr-2': ''}`}  />
              <span className={`${isOpen ? 'inline' : 'hidden'}`}>{t("income.title")}</span>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center py-2 rounded-lg transition duration-300 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}
                ${isOpen ? 'px-2': 'justify-center'}
                `
              }
             
            >
              <FaUserCircle className={`${isOpen ? 'mr-2': ''}`} />
              <span className={`${isOpen ? 'inline' : 'hidden'}`}>{t("app.profile")}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="">
        <button
          onClick={() => {
            dispatch(clearToken())
          }}
          className="flex items-center w-full px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition duration-300"
        >
          <FaSignOutAlt className="mr-3" />
          <span className={`${isOpen ? 'inline' : 'hidden'}`}>{t("app.logout")}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
