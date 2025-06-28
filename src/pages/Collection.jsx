import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProduct();
  }, [sortType])

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-warmWhite">
      <div className="flex flex-col sm:flex-row gap-8 border-t pt-10">
        
        {/* Filter Sidebar */}
        <div className="w-full sm:w-64 bg-warmWhite">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
              FILTERS
            </h2>
            <button 
              onClick={() => setShowFilter(!showFilter)} 
              className="sm:hidden text-gray-500 hover:text-gray-800"
            >
              <img 
                className={`h-4 transition-transform duration-300 ${showFilter ? 'rotate-180' : ''}`} 
                src={assets.dropdown_icon} 
                alt="Toggle filters" 
              />
            </button>
          </div>
          
          {/* Active Filters Summary */}
          {(category.length > 0 || subCategory.length > 0) && (
            <div className={`mt-4 ${showFilter ? '' : 'hidden'} sm:block`}>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-700 mb-2">Active Filters:</p>
                <div className="flex flex-wrap gap-2">
                  {category.map((cat, idx) => (
                    <span key={`cat-${idx}`} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {cat}
                      <button onClick={() => setCategory(prev => prev.filter(item => item !== cat))} className="ml-1 text-indigo-600 hover:text-indigo-900">
                        ×
                      </button>
                    </span>
                  ))}
                  {subCategory.map((subCat, idx) => (
                    <span key={`subcat-${idx}`} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {subCat}
                      <button onClick={() => setSubCategory(prev => prev.filter(item => item !== subCat))} className="ml-1 text-blue-600 hover:text-blue-900">
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Category Filter */}
          <div className={`mt-6 bg-white rounded-lg shadow-sm overflow-hidden ${showFilter ? '' : 'hidden'} sm:block`}>
            <div className="border-b border-gray-200">
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 uppercase">Categories</h3>
                <div className="mt-4 space-y-3">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      value="Men" 
                      onChange={toggleCategory}
                      checked={category.includes('Men')}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">Men</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      value="Women" 
                      onChange={toggleCategory}
                      checked={category.includes('Women')}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">Women</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      value="Kids" 
                      onChange={toggleCategory}
                      checked={category.includes('Kids')}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">Kids</span>
                  </label>
                </div>
              </div>
            </div>

            {/* SubCategory Filter */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase">Type</h3>
              <div className="mt-4 space-y-3">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    value="Topwear" 
                    onChange={toggleSubCategory}
                    checked={subCategory.includes('Topwear')}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-sm text-gray-700">Topwear</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    value="Bottomwear" 
                    onChange={toggleSubCategory}
                    checked={subCategory.includes('Bottomwear')}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-sm text-gray-700">Bottomwear</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    value="Winterwear" 
                    onChange={toggleSubCategory}
                    checked={subCategory.includes('Winterwear')}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-sm text-gray-700">Winterwear</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid Section */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div className="w-full sm:w-auto mb-4 sm:mb-0">
              <Title text1={'ALL'} text2={'COLLECTIONS'} />
              <p className="text-sm text-gray-500 mt-1">
                {filterProducts.length} {filterProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>
            
            {/* Sort Options */}
            <div className="w-full sm:w-auto">
              <select 
                onChange={(e) => setSortType(e.target.value)} 
                value={sortType}
                className="w-full sm:w-auto appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="relavent">Sort by: Relevant</option>
                <option value="low-high">Sort by: Price Low to High</option>
                <option value="high-low">Sort by: Price High to Low</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {filterProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-lg font-medium">No products found</p>
              <p className="mt-2 text-gray-500">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8">
              {filterProducts.map((item, index) => (
                <ProductItem 
                  key={index} 
                  name={item.name} 
                  id={item._id} 
                  price={item.price} 
                  image={item.image} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Collection