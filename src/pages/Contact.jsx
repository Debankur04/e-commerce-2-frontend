import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div className=" px-4 sm:px-6 lg:px-8 py-12 bg-warmWhite">
      {/* Hero Section with Title */}
      <div className="bg-roseGold rounded-lg p-8 mb-16">
        <div className="text-3xl text-center">
          <Title text1={'CONTACT'} text2={'US'} />
        </div>
        <p className="text-center text-charcoal mt-4">
          We'd love to hear from you. Reach out to our team with any questions or inquiries.
        </p>
      </div>

      {/* Contact Form Section */}
      <div className="bg-white rounded-lg shadow-sm p-8 mb-16 bg-warmWhite">
        <h2 className="text-2xl font-semibold mb-6 text-center">Send Us a Message</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-cream"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-cream focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your email"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              id="subject"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-cream focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Subject of your message"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 ">Message</label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-cream focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your message"
            ></textarea>
          </div>
          <div className="md:col-span-2 text-center">
            <button 
              type="submit"
              className="px-8 py-3 bg-deepBurgundy text-white rounded-md  transition-colors duration-300"
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