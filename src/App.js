import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";

function App() {

  const [cart, setCart] = useState([]);

  //Function to add the product to the cart

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...existingProduct, quantity: existingProduct.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  };

  //Function to remove the product to the cart or decrease its quantity

  const removeFromCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct.quantity === 1) {
      setCart(cart.filter(item => item.id !== product.id));
    } else {
      setCart(cart.map(item =>
        item.id === product.id ? { ...existingProduct, quantity: existingProduct.quantity - 1 } : item
      ));
    }
  };
  return (

    <Router>
      <div className="p-4">

        {/* Navigation bar */}
        <nav className="flex justify-between items-center bg-red-50 p-4">
          <Link to="/" className="text-xl font-bold">Products</Link>
          <Link to="/cart" className="text-xl font-bold"><span><i class="fa-solid fa-cart-shopping"></i></span>Cart({cart.length})</Link>
        </nav>

        {/* Routes */}
        <Routes>

          <Route path="/" element={<ProductPage addToCart={addToCart} cart={cart} />} />
          <Route path="/cart" element={<CartPage cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />} />

        </Routes>

      </div>
    </Router>

  );
}

export default App;
