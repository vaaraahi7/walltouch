'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import React from 'react'
import { useGlobalStore } from '../../../src/contexts/GlobalStoreContext'
import { useCartStore } from '../../../src/store/cart'
import { useWishlistStore } from '../../../src/store/wishlist'
import { Star, Heart, ShoppingCart, Minus, Plus, ArrowLeft, Truck, Shield, RotateCcw } from '../../../src/lib/icons'
import { InstallationRequest } from '../../../src/components/InstallationRequest'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  const { products } = useGlobalStore()
  const { addItem } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  // Custom pricing states
  const [wallWidth, setWallWidth] = useState('')
  const [wallHeight, setWallHeight] = useState('')
  const [selectedMedia, setSelectedMedia] = useState('')

  const [calculatedPrice, setCalculatedPrice] = useState(0)
  const [calculatedArea, setCalculatedArea] = useState(0)
  const [rollsNeeded, setRollsNeeded] = useState(0)

  // Tab and delivery states
  const [activeTab, setActiveTab] = useState('description')
  const [pincode, setPincode] = useState('')
  const [deliveryInfo, setDeliveryInfo] = useState('')

  // Find product by slug (convert name to slug format)
  const product = products.find(p => 
    p.name.toLowerCase().replace(/\s+/g, '-') === slug ||
    p.id.toString() === slug
  )

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Products</span>
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    // Validate wall measurements for custom pricing products
    if (product.customPricing) {
      if (!wallWidth || !wallHeight) {
        toast.error('Please enter wall width and height measurements')
        return
      }

      const width = parseFloat(wallWidth)
      const height = parseFloat(wallHeight)

      if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
        toast.error('Please enter valid wall measurements')
        return
      }

      // For wallpaper type, media selection is also required
      if (product.customPricing.type === 'wallpaper' && !selectedMedia) {
        toast.error('Please select a media type')
        return
      }
    }

    const finalPrice = calculatedPrice > 0 ? calculatedPrice : product.price
    let productName = product.name

    // Add custom details to product name for custom pricing items
    if (product.customPricing && wallWidth && wallHeight) {
      const details = []
      details.push(`${wallWidth}"x${wallHeight}"`)
      details.push(`${calculatedArea} sq ft`)

      if (product.customPricing.type === 'wallpaper' && selectedMedia) {
        details.push(`Media: ${selectedMedia}`)
      } else if (product.customPricing.type === 'blinds') {
        details.push(`Custom Blinds`)
      } else if (product.customPricing.type === 'regular-wallpaper') {
        details.push(`${rollsNeeded} rolls`)
      }

      productName = `${product.name} (${details.join(', ')})`
    }

    addItem({
      id: product.id.toString(),
      name: productName,
      price: finalPrice,
      image: product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      slug: product.name.toLowerCase().replace(/\s+/g, '-'),
      quantity
    })
    toast.success(`Added ${quantity} ${productName} to cart!`)
  }

  const handleWishlistToggle = () => {
    const productId = product.id.toString()
    if (isInWishlist(productId)) {
      removeFromWishlist(productId)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        slug: product.name.toLowerCase().replace(/\s+/g, '-'),
        comparePrice: product.price,
      })
      toast.success('Added to wishlist!')
    }
  }

  const inWishlist = isInWishlist(product.id.toString())

  // Delivery estimation logic
  const getDeliveryEstimate = (pincode: string) => {
    if (!pincode || pincode.length !== 6) {
      return 'Enter valid 6-digit pincode'
    }

    // Hyderabad local zone (500xxx)
    if (pincode.startsWith('500')) {
      return '3-4 business days'
    }

    // Nearby states pincodes
    const nearbyStates = [
      // Telangana
      '501', '502', '503', '504', '505', '506', '507', '508', '509',
      // Andhra Pradesh
      '515', '516', '517', '518', '519', '520', '521', '522', '523', '524', '525', '526', '527', '528', '530', '531', '532', '533', '534', '535',
      // Maharashtra
      '400', '401', '402', '403', '404', '405', '410', '411', '412', '413', '414', '415', '416', '417', '418', '419', '420', '421', '422', '423', '424', '425', '431', '441', '442', '443', '444', '445',
      // Karnataka
      '560', '561', '562', '563', '564', '565', '570', '571', '572', '573', '574', '575', '576', '577', '581', '582', '583', '584', '585', '586', '587', '590', '591',
      // Chhattisgarh
      '490', '491', '492', '493', '494', '495', '496', '497'
    ]

    const pincodePrefix = pincode.substring(0, 3)
    if (nearbyStates.includes(pincodePrefix)) {
      return '4-5 business days'
    }

    // All other states
    return '5-7 business days'
  }

  const handlePincodeCheck = () => {
    const estimate = getDeliveryEstimate(pincode)
    setDeliveryInfo(estimate)
  }

  // Calculate custom pricing
  const calculatePrice = () => {
    if (!product.customPricing || !wallWidth || !wallHeight) {
      setCalculatedPrice(product.price)
      return
    }

    const width = parseFloat(wallWidth)
    const height = parseFloat(wallHeight)

    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
      setCalculatedPrice(product.price)
      return
    }

    // Convert inches to square feet
    const areaInInches = width * height
    const areaInFeet = areaInInches / 144 // 144 square inches = 1 square foot
    const roundedArea = Math.ceil(areaInFeet) // Round up
    setCalculatedArea(roundedArea)

    let finalPrice = product.price

    switch (product.customPricing.type) {
      case 'wallpaper':
        // Customized wallpapers with media selection
        if (selectedMedia && product.customPricing.mediaOptions) {
          const mediaOption = product.customPricing.mediaOptions.find(m => m.name === selectedMedia)
          if (mediaOption) {
            finalPrice = roundedArea * mediaOption.price
          }
        }
        break

      case 'blinds':
        // Blinds with fixed price per sq ft (use product base price)
        finalPrice = roundedArea * product.price
        break

      case 'regular-wallpaper':
        // Regular wallpapers by rolls
        if (product.customPricing.rollSize) {
          const rollsRequired = Math.ceil(roundedArea / product.customPricing.rollSize)
          setRollsNeeded(rollsRequired)
          finalPrice = rollsRequired * product.price
        }
        break

      default:
        finalPrice = product.price
    }

    setCalculatedPrice(finalPrice)
  }

  // Recalculate when inputs change
  React.useEffect(() => {
    calculatePrice()
  }, [wallWidth, wallHeight, selectedMedia, product])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-blue-600">Products</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(4.5 stars)</span>
                </div>
                <div className="flex items-center space-x-4 mb-6">
                  {product.customPricing && product.customPricing.type !== 'standard' ? (
                    <div className="space-y-2">
                      {calculatedPrice > 0 ? (
                        <>
                          <span className="text-3xl font-bold text-blue-600">₹{calculatedPrice.toLocaleString()}</span>
                          <div className="text-sm text-gray-500">
                            Base price: ₹{product.price.toLocaleString()}
                            {product.customPricing.type === 'regular-wallpaper' && ' per roll'}
                            {(product.customPricing.type === 'wallpaper' || product.customPricing.type === 'blinds') && ' per sq ft'}
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="text-3xl font-bold text-gray-900">
                            ₹{product.price.toLocaleString()}
                            {product.customPricing.type === 'regular-wallpaper' && ' per roll'}
                            {(product.customPricing.type === 'wallpaper' || product.customPricing.type === 'blinds') && ' per sq ft'}
                          </span>
                          <div className="text-sm text-blue-600">Enter dimensions for final price</div>
                        </>
                      )}
                    </div>
                  ) : (
                    <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                  )}
                  <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">In Stock ({product.stock})</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Category</h3>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {product.category}
                </span>
              </div>

              {/* Custom Pricing Inputs */}
              {product.customPricing && product.customPricing.type !== 'standard' && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900">Custom Measurements</h3>

                  {/* Wall Dimensions */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Wall Width (inches)
                      </label>
                      <input
                        type="number"
                        value={wallWidth}
                        onChange={(e) => setWallWidth(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter width"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Wall Height (inches)
                      </label>
                      <input
                        type="number"
                        value={wallHeight}
                        onChange={(e) => setWallHeight(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter height"
                        min="1"
                      />
                    </div>
                  </div>

                  {/* Media Selection for Customized Wallpapers */}
                  {product.customPricing.type === 'wallpaper' && product.customPricing.mediaOptions && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Media Type
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {product.customPricing.mediaOptions.map((media) => (
                          <label
                            key={media.name}
                            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                              selectedMedia === media.name
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="media"
                              value={media.name}
                              checked={selectedMedia === media.name}
                              onChange={(e) => setSelectedMedia(e.target.value)}
                              className="sr-only"
                            />
                            <div>
                              <div className="font-medium text-gray-900">{media.name}</div>
                              <div className="text-sm text-gray-600">₹{media.price}/sq ft</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}



                  {/* Calculation Display */}
                  {wallWidth && wallHeight && calculatedArea > 0 && (
                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="font-medium text-gray-900 mb-2">Calculation Summary</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div>Dimensions: {wallWidth}" × {wallHeight}"</div>
                        <div>Area: {calculatedArea} sq ft</div>
                        {product.customPricing.type === 'regular-wallpaper' && rollsNeeded > 0 && (
                          <div>Rolls needed: {rollsNeeded} rolls</div>
                        )}
                        {calculatedPrice > 0 && (
                          <div className="text-lg font-bold text-blue-600 mt-2">
                            Total Price: ₹{calculatedPrice.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 border border-gray-300 rounded-lg min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={handleWishlistToggle}
                    className={`p-3 border rounded-lg transition-colors ${
                      inWishlist
                        ? 'border-red-300 bg-red-50 text-red-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Installation Request */}
                <div className="mt-4">
                  <InstallationRequest
                    productName={product.name}
                    productPrice={product.price}
                  />
                </div>
              </div>

              {/* Delivery Estimation */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Check Delivery</h3>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter pincode"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength={6}
                  />
                  <button
                    onClick={handlePincodeCheck}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Check
                  </button>
                </div>
                {deliveryInfo && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Truck className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-800">Delivery in {deliveryInfo}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="border-t pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-gray-600">Free Shipping</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-gray-600">1 Year Warranty</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RotateCcw className="h-5 w-5 text-purple-600" />
                    <span className="text-sm text-gray-600">30 Day Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'description', label: 'Product Description' },
                { id: 'measure', label: 'How to Measure' },
                { id: 'delivery', label: 'Delivery & Return Policy' },
                { id: 'installation', label: 'Installation Guidance' },
                { id: 'reviews', label: 'Reviews' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Product Description</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Features</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>High-quality materials</li>
                      <li>Durable and long-lasting</li>
                      <li>Easy to maintain</li>
                      <li>Professional finish</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Specifications</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li><span className="font-medium">Category:</span> {product.category}</li>
                      <li><span className="font-medium">SKU:</span> {product.sku}</li>
                      <li><span className="font-medium">Stock:</span> {product.stock} units</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'measure' && (
              <div className="prose max-w-none">
                <h3 className="text-lg font-medium text-gray-900 mb-4">How to Measure</h3>
                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                  <h4 className="font-medium text-blue-900 mb-3">Measuring Guidelines</h4>
                  <ol className="list-decimal list-inside text-blue-800 space-y-2">
                    <li>Measure the width of your wall/window in inches</li>
                    <li>Measure the height of your wall/window in inches</li>
                    <li>For wallpapers, add 2-3 inches extra for trimming</li>
                    <li>For blinds, measure the exact window frame size</li>
                    <li>Double-check your measurements before ordering</li>
                  </ol>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Tools Needed</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Measuring tape</li>
                      <li>Pencil for marking</li>
                      <li>Level (for accuracy)</li>
                      <li>Calculator</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Tips</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Measure twice, order once</li>
                      <li>Consider obstacles like switches</li>
                      <li>Account for pattern matching</li>
                      <li>Contact us for complex measurements</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="prose max-w-none">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery & Return Policy</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Delivery Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Truck className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-gray-900">Hyderabad Local</p>
                          <p className="text-sm text-gray-600">3-4 business days</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Truck className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">Nearby States</p>
                          <p className="text-sm text-gray-600">4-5 business days</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Truck className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="font-medium text-gray-900">All India</p>
                          <p className="text-sm text-gray-600">5-7 business days</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Return Policy</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>30-day return policy</li>
                      <li>Items must be unused and in original packaging</li>
                      <li>Custom-cut items are non-returnable</li>
                      <li>Return shipping costs apply</li>
                      <li>Refund processed within 7-10 business days</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'installation' && (
              <div className="prose max-w-none">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Installation Guidance</h3>
                <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                  <h4 className="font-medium text-yellow-900 mb-3">Professional Installation Available</h4>
                  <p className="text-yellow-800">We offer professional installation services in Hyderabad and nearby areas. Contact us for pricing and scheduling.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">DIY Installation</h4>
                    <ol className="list-decimal list-inside text-gray-600 space-y-2">
                      <li>Prepare the surface (clean and smooth)</li>
                      <li>Gather necessary tools</li>
                      <li>Follow manufacturer instructions</li>
                      <li>Start from one corner</li>
                      <li>Work systematically</li>
                      <li>Trim excess material carefully</li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Tools Required</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Adhesive/mounting hardware</li>
                      <li>Level and measuring tape</li>
                      <li>Cutting tools</li>
                      <li>Smoothing brush/roller</li>
                      <li>Cleaning supplies</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="prose max-w-none">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Reviews</h3>
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">R</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Rajesh Kumar</p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">2 weeks ago</span>
                    </div>
                    <p className="text-gray-600">Excellent quality and fast delivery. The installation was smooth and the final result looks amazing. Highly recommended!</p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">P</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Priya Sharma</p>
                          <div className="flex items-center">
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                            <Star className="h-4 w-4 text-gray-300" />
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">1 month ago</span>
                    </div>
                    <p className="text-gray-600">Good product quality. Delivery was on time. Installation instructions could be more detailed, but overall satisfied with the purchase.</p>
                  </div>

                  <div className="text-center">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Write a Review
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
