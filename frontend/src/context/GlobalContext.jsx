import { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Al cargar la app
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = savedCart.reduce((acc, item) => acc + item.cantidad, 0);
    setCartItemCount(totalItems);

    const savedUser = JSON.parse(localStorage.getItem('usuario'));
    setIsLoggedIn(!!savedUser);
  }, []);

  return (
    <GlobalContext.Provider value={{
      cartItemCount,
      setCartItemCount,
      isLoggedIn,
      setIsLoggedIn
    }}>
      {children}
    </GlobalContext.Provider>
  );
};