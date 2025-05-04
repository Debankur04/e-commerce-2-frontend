import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Verify = () => {
    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
    const [searchParams] = useSearchParams()
    const [verificationStatus, setVerificationStatus] = useState('verifying') // 'verifying', 'success', 'error'
    
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        try {
            if (!token) {
                return null
            }

            setVerificationStatus('verifying')
            
            const response = await axios.post(
                backendUrl + '/api/order/verifyStripe', 
                { success, orderId }, 
                { headers: { token } }
            )

            if (response.data.success) {
                setVerificationStatus('success')
                setCartItems({})
                // Add a small delay to show success message before redirecting
                setTimeout(() => {
                    navigate('/orders')
                }, 1500)
            } else {
                setVerificationStatus('error')
                // Add a small delay to show error message before redirecting
                setTimeout(() => {
                    navigate('/cart')
                }, 1500)
            }
        } catch (error) {
            console.log(error)
            setVerificationStatus('error')
            toast.error(error.message)
            // Add a small delay to show error message before redirecting
            setTimeout(() => {
                navigate('/cart')
            }, 1500)
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [token])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Payment Verification</h1>
                
                {verificationStatus === 'verifying' && (
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-600">Verifying your payment...</p>
                        <p className="text-sm text-gray-500">Please don't close this window</p>
                    </div>
                )}
                
                {verificationStatus === 'success' && (
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-green-600 font-medium">Payment successful!</p>
                        <p className="text-gray-600">Your order has been placed.</p>
                        <p className="text-sm text-gray-500">Redirecting to your orders...</p>
                    </div>
                )}
                
                {verificationStatus === 'error' && (
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <p className="text-red-600 font-medium">Payment verification failed</p>
                        <p className="text-gray-600">There was an issue with your payment.</p>
                        <p className="text-sm text-gray-500">Redirecting to your cart...</p>
                    </div>
                )}
                
                <div className="mt-8 border-t pt-6">
                    <p className="text-sm text-gray-500">
                        Order ID: {orderId || 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Verify