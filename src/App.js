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
    <div className="flex h-screen">
      <div className="w-64 bg-gray-100 text-gray-900 p-4 fixed h-full shadow-lg">
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => setActiveSection('home')}
            className="flex items-center p-2 rounded hover:bg-gray-200"
          >
            <FaHome className="text-xl mr-2" />
            Anasayfa
          </button>
          <button
            onClick={() => setActiveSection('orders')}
            className="flex items-center p-2 rounded hover:bg-gray-200"
          >
            <FaBox className="text-xl mr-2" />
            Sipariş
          </button>
          <button
            onClick={() => setActiveSection('settings')}
            className="flex items-center p-2 rounded hover:bg-gray-200"
          >
            <FaCog className="text-xl mr-2" />
            Ayarlar
          </button>
        </div>
      </div>
      <div className="flex-1 ml-64 p-6">
        {activeSection === 'home' && <div>Bu Anasayfa İçeriği</div>}
        {activeSection === 'orders' && <div>Bu Sipariş İçeriği</div>}
        {activeSection === 'settings' && <div>Bu Ayarlar İçeriği</div>}
      </div>
    </div>
  );
}

export default App;
