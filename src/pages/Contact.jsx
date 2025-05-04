import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section with Title */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-8 mb-16">
        <div className="text-3xl text-center">
          <Title text1={'CONTACT'} text2={'US'} />
        </div>
        <p className="text-center text-gray-600 mt-4">
          We'd love to hear from you. Reach out to our team with any questions or inquiries.
        </p>
      </div>

      {/* Contact Content Section */}
      <div className="flex flex-col md:flex-row gap-16 mb-24">
        {/* Left Side - Map/Image */}
        <div className="w-full md:w-1/2">
          <div className="relative overflow-hidden rounded-lg shadow-lg h-full">
            <img 
              className="w-full h-full object-cover"
              src={assets.contact_img} 
              alt="Our Store Location" 
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <div className="flex items-center text-white mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Find Us</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Information */}
        <div className="w-full md:w-1/2 flex flex-col gap-8">
          {/* Store Information */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-indigo-800 mb-6">Our Store</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-gray-700">
                    54709 Willms Station <br />
                    Suite 350, Washington, USA
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-gray-700">
                    Tel: <a href="tel:+14155550132" className="text-indigo-600 hover:text-indigo-800">(415) 555-0132</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-gray-700">
                    Email: <a href="mailto:admin@forever.com" className="text-indigo-600 hover:text-indigo-800">admin@forever.com</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-gray-700">
                    <span className="font-medium">Hours:</span><br />
                    Monday - Friday: 9AM - 8PM<br />
                    Saturday - Sunday: 10AM - 6PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Careers Section */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Careers at Forever</h2>
            <p className="text-gray-700 mb-6">
              Learn more about our teams and job openings. Join our innovative and growing family.
            </p>
            <button className="inline-flex items-center px-8 py-3 border border-indigo-600 text-indigo-600 bg-white hover:bg-indigo-600 hover:text-white transition-all duration-300 rounded-md font-medium">
              Explore Jobs
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
        <h2 className="text-2xl font-semibold text-indigo-800 mb-6 text-center">Send Us a Message</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your email"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              id="subject"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Subject of your message"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your message"
            ></textarea>
          </div>
          <div className="md:col-span-2 text-center">
            <button 
              type="submit"
              className="px-8 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Newsletter */}
      <div className="mb-8">
        <NewsletterBox />
      </div>
    </div>
  )
}

export default Contact