import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section with Title */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-8 mb-16">
        <div className="text-3xl text-center">
          <Title text1={'ABOUT'} text2={'US'} />
        </div>
      </div>

      {/* Main Content Section */}
      <div className="my-12 flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-5/12">
          <img 
            className="w-full rounded-lg shadow-lg object-cover h-auto" 
            src={assets.about_img} 
            alt="About Forever" 
          />
        </div>
        <div className="flex flex-col justify-center gap-6 md:w-7/12 text-gray-700">
          <p className="text-lg leading-relaxed">
            Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
          </p>
          <p className="text-lg leading-relaxed">
            Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
          </p>
          <h3 className="text-xl font-semibold text-indigo-800 mt-4">Our Mission</h3>
          <p className="text-lg leading-relaxed">
            Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-8 mb-16">
        <div className="text-2xl text-center pb-8">
          <Title text1={'WHY'} text2={'CHOOSE US'} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-8 transition-transform duration-300 hover:transform hover:scale-105">
            <h3 className="text-lg font-semibold text-indigo-800 mb-4">Quality Assurance</h3>
            <p className="text-gray-700">We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 transition-transform duration-300 hover:transform hover:scale-105">
            <h3 className="text-lg font-semibold text-indigo-800 mb-4">Convenience</h3>
            <p className="text-gray-700">With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 transition-transform duration-300 hover:transform hover:scale-105">
            <h3 className="text-lg font-semibold text-indigo-800 mb-4">Exceptional Customer Service</h3>
            <p className="text-gray-700">Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority.</p>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="mb-12">
        <NewsletterBox />
      </div>
    </div>
  )
}

export default About