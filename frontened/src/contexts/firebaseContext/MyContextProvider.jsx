import React, { useEffect } from "react";
import MyContext from "./MyContext.jsx";
import { useState } from "react";

function MyContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('users'));
    user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [])


  return (
    <MyContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      loading, 
      setLoading
    }}>
      {children}
    </MyContext.Provider>
  )
}


export default MyContextProvider;