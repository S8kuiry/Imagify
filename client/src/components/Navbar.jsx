import React, { useEffect } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const {
    setShowLogin, logout, user, credit, loadCreditData, token
  } = useAppContext();

  useEffect(() => {
    if (token) {
      loadCreditData();
    }
  }, [token]);

  return (
    <header className="flex items-center justify-between py-4 px-24 w-full absolute top-0 left-0">
      <img
        src={assets.logo}
        alt="Logo"
        onClick={() => navigate('/')}
        className="w-28 sm:w-32 lg:w-40 cursor-pointer"
      />

      {user ? (
        <div className="flex items-center gap-4">
          <button className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'>
            <img className='w-5' src={assets.credit_star} alt="credit" />
            <p className='text-xs sm:text-sm font-medium text-gray-500'>Credits Left : {credit}</p>
          </button>
          <p className='text-gray-600 max-sm:hidden pl-4'>Hi, {user.name}</p>
          <div className="relative group">
            <img src={assets.profile_icon} className='w-10 drop-shadow' alt="profile" />
            <div className="absolute hidden group-hover:block top-0 right-0 z-10 rounded pt-12 ">
              <ul className='list-none m-0 p-2 bg-white rounded-md border-none shadow-lg text-sm w-[100px]'>
                <li onClick={logout} className='py-1 px-2 cursor-pointer border-none '>LogOut</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/buy')} className="text-gray-800 hover:underline cursor-pointer">Pricing</button>
          <button
            onClick={() => setShowLogin(true)}
            className="bg-gray-900 text-white py-2 px-4 rounded-full w-[125px] transition">
            Login
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
