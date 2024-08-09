import React, { useState } from 'react';
import { FaHome, FaBox, FaCog } from 'react-icons/fa';
import './App.css';

const sections = {
  home: "Anasayfa",
  orders: "Sipariş",
  settings: "Ayarlar"
};

function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="app-container">
      <div className="sidebar">
        <button onClick={() => setActiveSection('home')}>
          <FaHome /> Anasayfa
        </button>
        <button onClick={() => setActiveSection('orders')}>
          <FaBox /> Sipariş
        </button>
        <button onClick={() => setActiveSection('settings')}>
          <FaCog /> Ayarlar
        </button>
      </div>
      <div className="main-content">
        {activeSection === 'home' && <div>Bu Anasayfa İçeriği</div>}
        {activeSection === 'orders' && <div>Bu Sipariş İçeriği</div>}
        {activeSection === 'settings' && <div>Bu Ayarlar İçeriği</div>}
      </div>
    </div>
  );
}

export default App;
