import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name:'Order Payment',
            description:'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response)
                try {
                    
                    const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay',response,{headers:{token}})
                    if (data.success) {
                        navigate('/orders')
                        setCartItems({})
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error)
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }
            
            switch (method) {
                // API Calls for COD
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break;

                case 'stripe':
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}})
                    if (responseStripe.data.success) {
                        const {session_url} = responseStripe.data
                        window.location.replace(session_url)
                    } else {
                        toast.error(responseStripe.data.message)
                    }
                    break;

                case 'razorpay':
                    const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {headers:{token}})
                    if (responseRazorpay.data.success) {
                        initPay(responseRazorpay.data.order)
                    }
                    break;

                default:
                    break;
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Complete Your Order</h1>
            
            <form onSubmit={onSubmitHandler} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    {/* Left Side - Delivery Information */}
                    <div className="flex-1 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-200">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
                                Delivery Information
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input 
                                        required 
                                        onChange={onChangeHandler} 
                                        name="firstName" 
                                        value={formData.firstName} 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                                        type="text" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input 
                                        required 
                                        onChange={onChangeHandler} 
                                        name="lastName" 
                                        value={formData.lastName} 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                                        type="text" 
                                    />
                                </div>
                            </div>
                            
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input 
                                    required 
                                    onChange={onChangeHandler} 
                                    name="email" 
                                    value={formData.email} 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                                    type="email" 
                                />
                            </div>
                            
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                                <input 
                                    required 
                                    onChange={onChangeHandler} 
                                    name="street" 
                                    value={formData.street} 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                                    type="text" 
                                />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <input 
                                        required 
                                        onChange={onChangeHandler} 
                                        name="city" 
                                        value={formData.city} 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                                        type="text" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                    <input 
                                        onChange={onChangeHandler} 
                                        name="state" 
                                        value={formData.state} 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                                        type="text" 
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                                    <input 
                                        required 
                                        onChange={onChangeHandler} 
                                        name="zipcode" 
                                        value={formData.zipcode} 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                                        type="number" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                    <input 
                                        required 
                                        onChange={onChangeHandler} 
                                        name="country" 
                                        value={formData.country} 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                                        type="text" 
                                    />
                                </div>
                            </div>
                            
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input 
                                    required 
                                    onChange={onChangeHandler} 
                                    name="phone" 
                                    value={formData.phone} 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                                    type="number" 
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Side - Order Summary and Payment */}
                    <div className="flex-1 p-6 lg:p-8 bg-gray-50">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
                                Order Summary
                            </h2>
                            <div className="bg-white p-4 rounded-md shadow-sm mb-6">
                                <CartTotal />
                            </div>
                        </div>
                        
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
                                Payment Method
                            </h2>
                            
                            <div className="mb-6">
                                <div 
                                    onClick={() => setMethod('cod')} 
                                    className={`flex items-center gap-3 p-4 border rounded-md cursor-pointer transition-all ${method === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                                >
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${method === 'cod' ? 'border-blue-500' : 'border-gray-300'}`}>
                                        {method === 'cod' && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                                    </div>
                                    <span className="font-medium">Cash on Delivery</span>
                                </div>
                                
                                {/* Uncomment these blocks if you want to re-enable Stripe and Razorpay options
                                <div 
                                    onClick={() => setMethod('stripe')} 
                                    className={`mt-3 flex items-center gap-3 p-4 border rounded-md cursor-pointer transition-all ${method === 'stripe' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                                >
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${method === 'stripe' ? 'border-blue-500' : 'border-gray-300'}`}>
                                        {method === 'stripe' && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                                    </div>
                                    <img className="h-6" src={assets.stripe_logo} alt="Stripe" />
                                </div>
                                
                                <div 
                                    onClick={() => setMethod('razorpay')} 
                                    className={`mt-3 flex items-center gap-3 p-4 border rounded-md cursor-pointer transition-all ${method === 'razorpay' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                                >
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${method === 'razorpay' ? 'border-blue-500' : 'border-gray-300'}`}>
                                        {method === 'razorpay' && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                                    </div>
                                    <img className="h-6" src={assets.razorpay_logo} alt="Razorpay" />
                                </div>
                                */}
                            </div>
                            
                            <button 
                                type="submit" 
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PlaceOrder