import { createContext } from "react";
import { useState } from "react";

export const CartContext = createContext();

const CartContextProvider = (props) => {
    const [cartList, setCartList] = useState([]);

    const addToCart = (item, quantityToAdd) => {
        let find = cartList.find(elem => elem.idItem === item.id);
        if (find === undefined) {
            setCartList([...cartList, 
                {
                    idItem: item.id,
                    imgItem: item.pictureUrl,
                    nameItem: item.title,
                    priceItem: item.price,
                    qtyItem: quantityToAdd
                }]);
        } else {
            find.qtyItem += quantityToAdd;        
        }
    }

    const clearList = () => {
        setCartList([]);
    }

    const removeItem = (id) => {
        let filter = cartList.filter(item => item.idItem !== id);
        setCartList(filter);
    }

    const calcItemsQty = () => {
        let sum = 0;
        for (let key of cartList) {
            sum += key.qtyItem;
        }
        return sum;
    }

    return(
        <CartContext.Provider value={{cartList, addToCart, clearList, removeItem, calcItemsQty}}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;