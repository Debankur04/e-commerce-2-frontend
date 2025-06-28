import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const OrderStatusBadge = ({ status }) => {
  const getStatusColor = () => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-500';
      case 'shipped':
        return 'bg-blue-500';
      case 'processing':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
      <p className="text-sm md:text-base">{status}</p>
    </div>
  );
};

const EmptyOrders = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <div className="text-gray-400 text-6xl mb-4">📦</div>
    <h3 className="text-xl font-medium text-gray-700 mb-2">No orders yet</h3>
    <p className="text-gray-500 text-center max-w-md">
      When you place orders, they will appear here for you to track and review.
    </p>
  </div>
);

const OrderItem = ({ item, currency, onTrack }) => {
  const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="py-6 border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-start gap-6">
        <div className="w-20 h-24 bg-gray-100 rounded-md overflow-hidden">
          <img 
            className="w-full h-full object-cover" 
            src={item.image[0]} 
            alt={item.name} 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/80x96';
            }}
          />
        </div>
        <div>
          <h3 className="font-medium text-base text-gray-800">{item.name}</h3>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-600">
            <p className="font-medium">{currency}{item.price}</p>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <p>Qty: {item.quantity}</p>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <p>Size: {item.size}</p>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            <p>Ordered on: <span className="text-gray-700">{formattedDate}</span></p>
            <p className="mt-1">Payment method: <span className="text-gray-700">{item.paymentMethod}</span></p>
          </div>
        </div>
      </div>
      <div className="md:w-1/3 flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-end lg:items-center gap-4 justify-between">
        <OrderStatusBadge status={item.status} />
        <button 
          onClick={() => onTrack(item)} 
          className="border border-gray-300 hover:border-gray-400 px-4 py-2 text-sm font-medium rounded-md transition-colors bg-white hover:bg-gray-50"
        >
          Track Order
        </button>
      </div>
    </div>
  );
};

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrderData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!token) {
        setIsLoading(false);
        return;
      }

      // Using fetch instead of axios
      const response = await fetch(`${backendUrl}/api/order/userorders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        const allOrdersItem = [];
        data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date
            });
          });
        });
        setOrderData(allOrdersItem.reverse());
      } else {
        setError(data.message || 'Failed to load orders');
      }
    } catch (error) {
      setError('Error loading orders. Please try again.');
      console.error('Error loading orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrackOrder = (item) => {
    console.log('Tracking order:', item);
    // Here you would typically implement order tracking functionality
    // For now, let's just refresh the orders
    loadOrderData();
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className=" mx-auto px-4 sm:px-6 py-8 bg-warmWhite">
      <div className="mb-8 text-3xl">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={loadOrderData}
            className="mt-2 text-sm text-red-700 hover:text-red-800 underline"
          >
            Try again
          </button>
        </div>
      ) : orderData.length === 0 ? (
        <EmptyOrders />
      ) : (
        <div className="bg-cream p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="p-4 border-b bg-gray-50 rounded-lg">
            <h2 className="text-lg font-medium text-gray-800">Order History</h2>
            <p className="text-sm text-gray-500 mt-1">Track and manage your recent orders</p>
          </div>
          <div className="divide-y divide-gray-100">
            {orderData.map((item, index) => (
              <OrderItem 
                key={index} 
                item={item} 
                currency={currency} 
                onTrack={handleTrackOrder} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;