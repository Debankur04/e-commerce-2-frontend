import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [activeTab, setActiveTab] = useState('description')

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products])

  return productData ? (
    <div className="max-w-6xl mx-auto px-4 py-8 fade-in">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        {/* Product Main Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images Section */}
          <div className="w-full lg:w-3/5">
            <div className="flex flex-col-reverse md:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex md:flex-col md:w-24 overflow-x-auto md:overflow-y-auto hide-scrollbar">
                {productData.image.map((item, index) => (
                  <div 
                    key={index} 
                    onClick={() => setImage(item)} 
                    className={`flex-shrink-0 mb-2 p-1 cursor-pointer rounded-md transition-all ${image === item ? 'border-2 border-blue-500' : 'border border-gray-200 hover:border-gray-400'}`}
                  >
                    <img src={item} className="w-20 h-20 object-cover" alt={`${productData.name} - view ${index + 1}`} />
                  </div>
                ))}
              </div>
              
              {/* Main Image */}
              <div className="flex-1 bg-gray-50 rounded-lg p-4">
                <img 
                  className="w-full h-auto object-contain max-h-96" 
                  src={image} 
                  alt={productData.name} 
                />
              </div>
            </div>
          </div>
          
          {/* Product Info Section */}
          <div className="w-full lg:w-2/5">
            <div className="sticky top-4">
              <h1 className="text-3xl font-semibold text-gray-800">{productData.name}</h1>
              
              <div className="flex items-center gap-1 mt-2">
                <div className="flex">
                  {[1, 2, 3, 4].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-500">(122 reviews)</p>
              </div>
              
              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900">{currency}{productData.price}</span>
              </div>
              
              <div className="mt-4">
                <p className="text-gray-600">{productData.description}</p>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Select Size</h3>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {productData.sizes.map((item, index) => (
                    <button 
                      key={index} 
                      onClick={() => setSize(item)} 
                      className={`py-2 text-sm font-medium rounded transition-all ${
                        item === size 
                          ? 'bg-blue-500 text-white border border-blue-500' 
                          : 'bg-gray-100 text-gray-800 border border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => addToCart(productData._id, size)} 
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </button>
              
              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flex flex-col space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p>100% Original product</p>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>Cash on delivery available</p>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <p>Easy return within 7 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Reviews Section */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="flex border-b">
          <button 
            onClick={() => setActiveTab('description')} 
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'description' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            Description
          </button>
          <button 
            onClick={() => setActiveTab('reviews')} 
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'reviews' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            Reviews (122)
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'description' ? (
            <div className="prose max-w-none">
              <p className="mb-4 text-gray-600">
                An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
              </p>
              <p className="text-gray-600">
                E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
              </p>
            </div>
          ) : (
            <div className="text-gray-600">
              <p className="italic text-center">Review content would appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
        <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
}

export default Product