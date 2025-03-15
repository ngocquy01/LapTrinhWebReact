import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Iphone 14 Pro Max", image: "/images/ip14.jpg", price: 16200000 },
  { id: 2, name: "SamSung Galaxy A55", image: "/images/galaxya55.jpg", price: 8000000 },
  { id: 3, name: "Iphone 16 Pro Max", image: "/images/ip16.jpg", price: 30000000 },
  { id: 4, name: "Huawei Mate 60 Pro", image: "/images/huawei.jpg", price: 28000000 },
  { id: 5, name: "Vivo X200 Pro", image: "/images/vivo.jpg", price: 21000000 },
  { id: 6, name: "Xiaomi 15 Pro 5G", image: "/images/xiaomi.jpg", price: 21000000 },
  { id: 7, name: "SamSung Galaxy S24 Ultra", image: "/images/samsung.jpg", price: 22000000 },
  { id: 8, name: "Oppo Reno 13 Pro", image: "/images/oppo.jpg", price: 20000000 }
];

function ProductList({ addToCart }) {
  return (
    <div className="container">
      <h1 className="title">Danh Sách Sản Phẩm</h1>
      <Link to="/cart" className="cart-button">🛒 Giỏ hàng</Link>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>Giá: {product.price.toLocaleString()} VND</p>
            <Link to={`/product/${product.id}`}><button className="orange-button">Xem Chi Tiết</button></Link>
            <button className="orange-button" onClick={() => addToCart(product)}>Thêm vào giỏ</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} className="detail-image" />
      <p>Giá: {product.price.toLocaleString()} VND</p>
      <button className="orange-button" onClick={() => addToCart(product)}>Thêm vào giỏ hàng</button>
      <br /><Link to="/" className="back-link">Quay lại danh sách</Link>
    </div>
  );
}

function Cart({ cart, removeFromCart }) {
  
  return (
    <div className="cart-container">
      <h1>🛍️ Giỏ Hàng</h1>
      {cart.length === 0 ? <p>Giỏ hàng trống</p> : (
        <div className="cart-list">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-image" />
              <p>{item.name} - {item.price.toLocaleString()} VND</p>
              <button className="remove-button" onClick={() => removeFromCart(index)}>Xóa</button>
            </div>
          ))}
        </div>
      )}
      <div className="cart-actions">
        <Link to="/" className="continue-button">Tiếp tục mua hàng</Link>
        <button className="checkout-button">Thanh toán</button>
      </div>
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const addToCart = (product) => setCart([...cart, product]);
  const removeFromCart = (index) => setCart(cart.filter((_, i) => i !== index));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
      </Routes>
    </Router>
  );
}
