import React, { useState, useEffect } from 'react';

const NewOrderForm = ({ formData, handleChange, handleSubmit, handleOrderSelect, selectedOrder }) => {
    const [orderOptions, setOrderOptions] = useState({
        noOnions: false,
        noPotatoes: false,
    });

    const handleOptionChange = (e) => {
        const { name, checked } = e.target;
        setOrderOptions({
            ...orderOptions,
            [name]: checked,
        });
    };

    // Update selectedOrder when orderOptions change
    useEffect(() => {
        if (selectedOrder) {
            handleOrderSelect({
                ...selectedOrder,
                name: `${selectedOrder.name}${orderOptions.noOnions ? ' (TSUZ)' : ''}${orderOptions.noPotatoes ? ' (PTSIZ)' : ''}`
            });
        }
    }, [orderOptions]);

    const renderOrderOptions = () => (
        <div className="mt-4 p-3 bg-white rounded-lg shadow-lg">
            <h3 className="text-md font-semibold mb-2">Seçenekler</h3>
            <div className="flex flex-col space-y-2">
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        name="noOnions"
                        checked={orderOptions.noOnions}
                        onChange={handleOptionChange}
                        className="form-checkbox h-4 w-4 text-orange-500"
                    />
                    <span className="ml-2 text-gray-700">TSUZ</span>
                </label>
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        name="noPotatoes"
                        checked={orderOptions.noPotatoes}
                        onChange={handleOptionChange}
                        className="form-checkbox h-4 w-4 text-orange-500"
                    />
                    <span className="ml-2 text-gray-700">PTSIZ</span>
                </label>
            </div>
        </div>
    );

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg flex">
            {/* Form */}
            <div className="w-2/3 pr-3">
                <h2 className="text-xl font-semibold mb-4">Yeni Sipariş</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
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
                    <div className="mb-3">
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
                    <div className="mb-3">
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
                        className="w-full px-3 py-2 bg-orange-500 text-white font-semibold rounded-md shadow-md hover:bg-orange-600 transition duration-300 text-sm"
                    >
                        Siparişi Tamamla
                    </button>
                </form>
            </div>
            {/* Order Selection */}
            <div className="w-1/3 bg-gray-100 p-3 rounded-lg">
                <h2 className="text-lg font-semibold mb-3">Hızlı Sipariş</h2>
                <div className="space-y-3">
                    <div 
                        onClick={() => handleOrderSelect({ name: 'Hatay Durum', price: '100 TL', image: 'path/to/tavuk-durum.jpg' })}
                        className={`flex flex-col items-start p-3 bg-white rounded-lg cursor-pointer shadow-sm transition duration-300 ease-in-out hover:bg-gray-200 ${selectedOrder?.name === 'Hatay Dürüm' ? 'bg-gray-200' : ''}`}
                    >
                        <div className="flex items-center w-full">
                            <img src="https://cdn.getiryemek.com/products/1679578350049_500x375.jpeg" alt="Hatay Dürüm" className="w-16 h-16 object-cover rounded-md mr-3" />
                            <div>
                                <div className="text-lg font-semibold">Hatay Dürüm</div>
                                <div className="text-gray-500">100 TL</div>
                            </div>
                        </div>
                        {selectedOrder?.name === 'Hatay Durum' && renderOrderOptions()}
                    </div>
                    <div 
                        onClick={() => handleOrderSelect({ name: 'Zurna Durum', price: '120 TL', image: 'path/to/tavuk-durum.jpg' })}
                        className={`flex flex-col items-start p-3 bg-white rounded-lg cursor-pointer shadow-sm transition duration-300 ease-in-out hover:bg-gray-200 ${selectedOrder?.name === 'Zurna Dürüm' ? 'bg-gray-200' : ''}`}
                    >
                        <div className="flex items-center w-full">
                            <img src="https://www.hataysaucedoner.com.tr/wp-content/uploads/2023/03/hatay-sauce-doner-zurna.png" alt="Zurna Dürüm" className="w-16 h-16 object-cover rounded-md mr-3" />
                            <div>
                                <div className="text-lg font-semibold">Zurna Dürüm</div>
                                <div className="text-gray-500">120 TL</div>
                            </div>
                        </div>
                        {selectedOrder?.name === 'Zurna Durum' && renderOrderOptions()}
                    </div>
                    <div 
                        onClick={() => handleOrderSelect({ name: 'Kasarli Durum', price: '150 TL', image: 'path/to/tavuk-durum.jpg' })}
                        className={`flex flex-col items-start p-3 bg-white rounded-lg cursor-pointer shadow-sm transition duration-300 ease-in-out hover:bg-gray-200 ${selectedOrder?.name === 'Kaşarlı Dürüm' ? 'bg-gray-200' : ''}`}
                    >
                        <div className="flex items-center w-full">
                            <img src="https://e7.pngegg.com/pngimages/298/8/png-clipart-doner-kebab-durum-pizza-turkish-cuisine-pizza-food-recipe-thumbnail.png" alt="Kaşarlı Dürüm" className="w-16 h-16 object-cover rounded-md mr-3" />
                            <div>
                                <div className="text-lg font-semibold">Kaşarlı Dürüm</div>
                                <div className="text-gray-500">150 TL</div>
                            </div>
                        </div>
                        {selectedOrder?.name === 'Kasarli Durum' && renderOrderOptions()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewOrderForm;
