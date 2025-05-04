import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Cart Header */}
      <div className="mb-8">
        <div className="text-3xl">
          <Title text1={'YOUR'} text2={'CART'} />
        </div>
        <p className="text-gray-500 mt-2">
          {cartData.length} {cartData.length === 1 ? 'item' : 'items'} in your shopping cart
        </p>
      </div>

      {/* Empty Cart Message */}
      {cartData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <p className="text-lg font-medium">Your cart is empty</p>
          <button 
            onClick={() => navigate('/')} 
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition duration-300"
          >
            Continue Shopping
          </button>
        </div>
      )}

      {/* Cart Items */}
      <div className="bg-white rounded-lg shadow-sm">
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          
          return (
            <div 
              key={index} 
              className={`py-6 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                index !== cartData.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              {/* Product Info */}
              <div className="flex items-center gap-6 flex-1">
                <div className="h-24 w-24 bg-gray-50 rounded-md flex items-center justify-center overflow-hidden">
                  <img 
                    className="h-full w-full object-cover" 
                    src={productData.image[0]} 
                    alt={productData.name} 
                  />
                </div>
                
                <div className="flex flex-col">
                  <p className="font-medium text-gray-800">{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p className="font-semibold text-indigo-600">{currency}{productData.price}</p>
                    <span className="px-3 py-1 bg-gray-100 rounded-md text-gray-600 text-sm font-medium">
                      {item.size}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Quantity and Remove */}
              <div className="flex items-center gap-6 mt-4 sm:mt-0">
                <div className="flex items-center">
                  <label htmlFor={`quantity-${item._id}-${item.size}`} className="sr-only">Quantity</label>
                  <input 
                    id={`quantity-${item._id}-${item.size}`}
                    onChange={(e) => e.target.value === '' || e.target.value === '0' 
                      ? null 
                      : updateQuantity(item._id, item.size, Number(e.target.value))
                    } 
                    className="border border-gray-300 rounded-md px-3 py-1 w-16 text-center" 
                    type="number" 
                    min={1} 
                    defaultValue={item.quantity} 
                  />
                </div>
                
                <button 
                  onClick={() => updateQuantity(item._id, item.size, 0)} 
                  className="text-gray-400 hover:text-red-500 transition duration-300"
                  aria-label="Remove item"
                >
                  <img className="w-5 h-5" src={assets.bin_icon} alt="Remove" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Cart Total and Checkout */}
      {cartData.length > 0 && (
        <div className="mt-8 flex flex-col sm:flex-row sm:justify-end">
          <div className="w-full sm:w-[450px] bg-white rounded-lg shadow-sm p-6">
            <CartTotal />
            <div className="mt-6">
              <button 
                onClick={() => navigate('/place-order')} 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md font-medium transition duration-300"
              >
                PROCEED TO CHECKOUT
              </button>
              <button 
                onClick={() => navigate('/')} 
                className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-md font-medium transition duration-300"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart