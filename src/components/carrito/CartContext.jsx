import { createContext, useState, useEffect } from "react";

// Crear el contexto
export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [cartItems, orders]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === id);
      if (!existingItem) return prevItems;

      if (existingItem.quantity === 1) {
        return prevItems.filter((item) => item.id !== id);
      }
      return prevItems.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const removeAllFromCart = () => {
    setCartItems([]);
  };

  const removeOrder = (index) => {
    setOrders((preOrders) =>
      preOrders.filter((_, orderindex) => orderindex !== index)
    );
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const placeOrder = (address) => {
    const newOrder = {
      items: [...cartItems],
      address,
      date: new Date().toLocaleString(),
      total: totalPrice,
    };

    setOrders([...orders, newOrder]);
    removeAllFromCart(); // Vaciar el carrito después de realizar el pedido
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        removeAllFromCart,
        totalPrice,
        placeOrder,
        orders,
        removeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
