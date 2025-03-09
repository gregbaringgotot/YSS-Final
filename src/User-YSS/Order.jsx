import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../Database/Firebase'; // Adjust the import path as needed

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  // Fetch orders from Firestore
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        navigate('/login'); // Redirect to login if user is not logged in
        return;
      }

      try {
        const ordersCollection = collection(db, 'orders');
        const q = query(ordersCollection, where('userUID', '==', user.uid));
        const querySnapshot = await getDocs(q);

        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (isLoading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center py-8">No orders found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6 font-cousine">YOUR ORDERS</h1>

      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="border-b pb-4 mb-4">
            <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
            <p className="text-sm text-gray-600">Status: {order.status}</p>
            <p className="text-sm text-gray-600">
              Order Date: {new Date(order.timestamp).toLocaleDateString()}
            </p>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Items</h3>
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <img
                    src={item.image || item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-lg font-semibold">₱{item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>

          {/* Shipping Address */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
            <p className="text-gray-700">{order.address.name}</p>
            <p className="text-gray-700">{order.address.phone}</p>
            <p className="text-gray-700">{order.address.email}</p>
            <p className="text-gray-700">{order.address.street}</p>
            <p className="text-gray-700">{order.address.city}</p>
            <p className="text-gray-700">
              Delivery Date: {new Date(order.address.deliveryDate).toLocaleDateString()}
            </p>
          </div>

          {/* Order Summary */}
          <div className="border-t pt-4">
            <div className="flex justify-between font-bold text-lg">
              <p>ORDER TOTAL:</p>
              <p>₱{order.subtotal.toFixed(2)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;