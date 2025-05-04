import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const {setShowSearch, getCartCount, navigate, token, setToken, setCartItems} = useContext(ShopContext);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    return (
        <div className='sticky top-0 z-50 bg-white shadow-md border-none'>
            <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
                {/* Logo */}
                <Link to='/' className='flex-shrink-0'>
                    <img src={assets.logo} className='w-36 transition-transform hover:scale-105' alt="Logo" />
                </Link>

                {/* Desktop Navigation */}
                <ul className='hidden md:flex gap-8 text-sm'>
                    <NavLink to='/' className={({isActive}) => 
                        `border-b-2 ${isActive ? 'border-black' : 'border-transparent'} py-2 px-1 transition-all hover:border-gray-400`}>
                        HOME
                    </NavLink>
                    <NavLink to='/collection' className={({isActive}) => 
                        `border-b-2 ${isActive ? 'border-black' : 'border-transparent'} py-2 px-1 transition-all hover:border-gray-400`}>
                        COLLECTION
                    </NavLink>
                    <NavLink to='/about' className={({isActive}) => 
                        `border-b-2 ${isActive ? 'border-black' : 'border-transparent'} py-2 px-1 transition-all hover:border-gray-400`}>
                        ABOUT
                    </NavLink>
                    <NavLink to='/contact' className={({isActive}) => 
                        `border-b-2 ${isActive ? 'border-black' : 'border-transparent'} py-2 px-1 transition-all hover:border-gray-400`}>
                        CONTACT
                    </NavLink>
                </ul>

                {/* Action Buttons */}
                <div className='flex items-center gap-6'>
                    {/* Search Icon */}
                    <button 
                        onClick={() => { setShowSearch(true); navigate('/collection') }}
                        className='p-2 rounded-full hover:bg-gray-100 transition-colors'>
                        <img src={assets.search_icon} className='w-5' alt="Search" />
                    </button>
                    
                    {/* Profile Icon */}
                    <div className='group relative'>
                        <button 
                            onClick={() => token ? null : navigate('/login')}
                            className='p-2 rounded-full hover:bg-gray-100 transition-colors'>
                            <img className='w-5' src={assets.profile_icon} alt="Profile" />
                        </button>
                        
                        {/* Dropdown Menu */}
                        {token && 
                        <div className='group-hover:block hidden absolute right-0 pt-2'>
                            <div className='flex flex-col gap-1 w-40 py-3 px-4 bg-white shadow-lg rounded-lg text-gray-600'>
                                <p className='cursor-pointer hover:bg-gray-50 py-2 px-3 rounded transition-colors'>My Profile</p>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:bg-gray-50 py-2 px-3 rounded transition-colors'>Orders</p>
                                <p onClick={logout} className='cursor-pointer hover:bg-gray-50 py-2 px-3 rounded transition-colors'>Logout</p>
                            </div>
                        </div>}
                    </div>
                    
                    {/* Cart Icon */}
                    <Link to='/cart' className='relative p-2 rounded-full hover:bg-gray-100 transition-colors'>
                        <img src={assets.cart_icon} className='w-5' alt="Cart" />
                        {getCartCount() > 0 && (
                            <span className='absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                                {getCartCount()}
                            </span>
                        )}
                    </Link>
                    
                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setVisible(true)}
                        className='p-2 rounded-full hover:bg-gray-100 transition-colors md:hidden'>
                        <img src={assets.menu_icon} className='w-5' alt="Menu" />
                    </button>
                </div>

                {/* Mobile Sidebar */}
                {visible && (
                    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden' onClick={() => setVisible(false)}>
                        <div 
                            className='absolute top-0 right-0 bottom-0 w-64 bg-white shadow-lg' 
                            onClick={(e) => e.stopPropagation()}>
                            
                            {/* Close Button */}
                            <div className='flex justify-between items-center p-4 border-b'>
                                <h2 className='font-bold'>Menu</h2>
                                <button onClick={() => setVisible(false)} className='p-2'>
                                    <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="Close" />
                                </button>
                            </div>
                            
                            {/* Mobile Navigation */}
                            <div className='flex flex-col'>
                                <NavLink 
                                    onClick={() => setVisible(false)} 
                                    className={({isActive}) => 
                                        `py-3 px-6 border-b ${isActive ? 'bg-gray-50 font-medium' : ''}`} 
                                    to='/'>
                                    HOME
                                </NavLink>
                                <NavLink 
                                    onClick={() => setVisible(false)} 
                                    className={({isActive}) => 
                                        `py-3 px-6 border-b ${isActive ? 'bg-gray-50 font-medium' : ''}`} 
                                    to='/collection'>
                                    COLLECTION
                                </NavLink>
                                <NavLink 
                                    onClick={() => setVisible(false)} 
                                    className={({isActive}) => 
                                        `py-3 px-6 border-b ${isActive ? 'bg-gray-50 font-medium' : ''}`} 
                                    to='/about'>
                                    ABOUT
                                </NavLink>
                                <NavLink 
                                    onClick={() => setVisible(false)} 
                                    className={({isActive}) => 
                                        `py-3 px-6 border-b ${isActive ? 'bg-gray-50 font-medium' : ''}`} 
                                    to='/contact'>
                                    CONTACT
                                </NavLink>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar