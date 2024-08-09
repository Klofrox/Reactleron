import React, { useState } from 'react';
import { FaHome, FaSearch, FaPrint, FaShoppingCart } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './App.css'; 
import NewOrderForm from './components/NewOrderForm.js'; 
const App = () => {
    const [activeTab, setActiveTab] = useState('ana-sayfa');
    const [formData, setFormData] = useState({
        customerName: '',
        phone: '',
        address: ''
    });
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleOrderSelect = (order) => {
        setSelectedOrder(order);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:5000/print-receipt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...formData, selectedOrder })
            });
            
            const data = await response.json();
            console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const data = {
        labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs'],
        datasets: [
            {
                label: 'Satış Miktarı',
                data: [30, 40, 35, 50, 60],
                backgroundColor: 'rgba(255, 165, 0, 0.2)', // Turuncu renk
                borderColor: 'rgba(255, 165, 0, 1)', // Turuncu renk
                borderWidth: 2
            }
        ]
    };
    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-1/6 bg-white text-black p-4 flex flex-col">
                <h2 className="text-xl font-bold mb-6 text-center">PARK 326</h2>
                <ul className="flex flex-col space-y-3">
                    <li
                        onClick={() => setActiveTab('ana-sayfa')}
                        className={`flex items-center cursor-pointer p-3 rounded-lg transition duration-300 ease-in-out hover:bg-gray-200 ${activeTab === 'ana-sayfa' ? 'bg-gray-200' : ''}`}
                    >
                        <FaHome className="w-5 h-5 text-orange-500 mr-3" />
                        <span className="text-sm font-bold">Ana Sayfa</span>
                    </li>
                    <li
                        onClick={() => setActiveTab('yeni-sipariş')}
                        className={`flex items-center cursor-pointer p-3 rounded-lg transition duration-300 ease-in-out hover:bg-gray-200 ${activeTab === 'yeni-sipariş' ? 'bg-gray-200' : ''}`}
                    >
                        <FaShoppingCart className="w-5 h-5 text-orange-500 mr-3" />
                        <span className="text-sm font-bold">Yeni Sipariş</span>
                    </li>
                    <li
                        onClick={() => setActiveTab('sipariş-sorgula')}
                        className={`flex items-center cursor-pointer p-3 rounded-lg transition duration-300 ease-in-out hover:bg-gray-200 ${activeTab === 'sipariş-sorgula' ? 'bg-gray-200' : ''}`}
                    >
                        <FaSearch className="w-5 h-5 text-orange-500 mr-3" />
                        <span className="text-sm font-bold">Sipariş Sorgula</span>
                    </li>
                    <li
                        onClick={() => setActiveTab('fiş-yazdır')}
                        className={`flex items-center cursor-pointer p-3 rounded-lg transition duration-300 ease-in-out hover:bg-gray-200 ${activeTab === 'fiş-yazdır' ? 'bg-gray-200' : ''}`}
                    >
                        <FaPrint className="w-5 h-5 text-orange-500 mr-3" />
                        <span className="text-sm font-bold">Fiş Yazdır</span>
                    </li>
                </ul>
            </div>

            <div className="flex-1 p-6">
                {activeTab === 'ana-sayfa' && (
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h1 className="text-2xl font-semibold mb-4 text-center">Satış Grafiği</h1>
                        <div className="h-80">
                            <Bar data={data} />
                        </div>
                    </div>
                )}
            {activeTab === 'yeni-sipariş' && (
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
                    <div className="mb-6">
                        <NewOrderForm
                            formData={formData}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            handleOrderSelect={handleOrderSelect}
                            selectedOrder={selectedOrder}
                        />
                     {selectedOrder && (
                    <div className="mt-4 p-3 bg-white rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">SİPARİŞ ÖZETİ</h3>
                        <p className="text-xl text-black">Fiyat: {selectedOrder.price}</p>
                        <p className="text-xl text-black">Fiyat: {selectedOrder.name}</p>

                    </div>
                )}

                    </div>
                </div>
            )}
                {activeTab === 'sipariş-sorgula' && (
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Sipariş Sorgula</h2>
                        <p>Bu sekme boş olabilir.</p>
                    </div>
                )}
                {activeTab === 'fiş-yazdır' && (
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
                        <h1 className="text-2xl font-semibold mb-4 text-center">PARK 326 Fatura Yazdırma Sistemi</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Müşteri Adı:</label>
                                <input
                                    type="text"
                                    id="customerName"
                                    name="customerName"
                                    value={formData.customerName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefon:</label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adres:</label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-orange-500 text-white font-semibold rounded-md shadow-md hover:bg-orange-600 transition duration-300 text-sm"
                            >
                                Fiş Yazdır
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
