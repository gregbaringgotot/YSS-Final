import React from 'react';
import { useCart } from '../Layout/CartContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Minus, Plus } from 'lucide-react';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth

function Cart() {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useCart();
  const navigate = useNavigate();
  const auth = getAuth(); // Initialize Firebase Auth

  // Get userUID from Firebase Auth
  const user = auth.currentUser;
  const userUID = user ? user.uid : null;

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
  };

  const handleUpdateQuantity = (itemId, quantity) => {
    updateCartItemQuantity(itemId, quantity);
  };

  const handleCheckout = () => {
    if (!userUID) {
      alert('You must be logged in to proceed to checkout.');
      navigate('/login'); // Redirect to login page if userUID is not available
      return;
    }

    navigate('/checkout', {
      state: {
        cartItems: cartItems,
        userUID: userUID, // Pass userUID to the Checkout component
      },
    });
  };

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header with back button */}
      <div className="mb-6">
        <button
          onClick={handleContinueShopping}
          className="flex items-center text-gray-600 hover:text-black transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          <span>Continue Shopping</span>
        </button>
        <h1 className="text-2xl font-bold mt-10 font-cousine">YOUR CART</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <button
            onClick={handleContinueShopping}
            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="hidden md:grid grid-cols-12 p-4 border-b text-sm font-medium text-gray-500">
                <div className="col-span-6">PRODUCT</div>
                <div className="col-span-2 text-center">PRICE</div>
                <div className="col-span-2 text-center">QUANTITY</div>
                <div className="col-span-2 text-center">TOTAL</div>
              </div>

              <div className="divide-y">
                {cartItems.map((item, index) => (
                  <div
                    key={`${item.id}-${item.size || index}`}
                    className="grid grid-cols-1 md:grid-cols-12 p-4 gap-4 items-center"
                  >
                    {/* Product Info */}
                    <div className="col-span-6 flex items-center">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                      <div className="ml-4">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="flex items-center text-red-500 text-sm mt-2 hover:text-red-700"
                        >
                          <Trash2 size={14} className="mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="hidden md:block col-span-2 text-center">
                      ₱{item.price.toFixed(2)}
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2 flex justify-center">
                      <div className="flex items-center border rounded-md">
                        <button
                          className="p-2 hover:bg-gray-100 text-gray-700 rounded-l-md"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center font-medium">{item.quantity}</span>
                        <button
                          className="p-2 hover:bg-gray-100 text-gray-700 rounded-r-md"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="col-span-2 text-center font-medium">
                      ₱{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4 font-cousine">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                  <span>₱{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Cash On Delivery</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <span>ESTIMATED TOTAL</span>
                  <span>₱{subtotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="bg-black text-white text-center w-full py-4 rounded-md uppercase tracking-wide font-bold text-sm hover:bg-gray-800 transition-colors"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={handleContinueShopping}
                className="text-center w-full py-3 mt-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;