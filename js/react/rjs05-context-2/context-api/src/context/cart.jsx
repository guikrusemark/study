import { createContext } from "react";

const cartContext = createContext();
const cartProvider = ({ children }) => {
  const [ carrinho, setCarrinho ] = useState([]);
  return (
    <cartContext.Provider value={ { carrinho, setCarrinho } }>
      { children }
    </cartContext.Provider>
  );
};

export { cartContext, cartProvider };
