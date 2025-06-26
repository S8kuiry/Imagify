import { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [credit, setCredit] = useState(0);
  const [resultImage,setResultImage] = useState("")
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token');
    setToken("");
    setUser(null);
    setCredit(0);
  };

  const loadCreditData = async () => {
    if (!token) return;

    try {
      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/image/generate-image`,
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // ✅ CORRECTED HERE
          },
        }
      );
  
      if (data.success) {
        
        loadCreditData();
        toast.success(data.message);
        return data.resultImage;
      } else {
        toast.error(data.message);
        loadCreditData();
        if (data.creditBalance === 0 || data.creditBalance < 0) {
          navigate('/buy');
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      loadCreditData();
    }
  };
  

  useEffect(() => {
    if(token){
        loadCreditData();

    }
    
  }, [token]);

  const value = {
    user, setUser,
    showLogin, setShowLogin,
    token, setToken,
    credit, setCredit,
    backendUrl,
    logout,
    loadCreditData,
    generateImage,
    resultImage,setResultImage,navigate
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
