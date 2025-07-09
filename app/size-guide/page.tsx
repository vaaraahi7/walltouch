import { Ruler, Eye, Calculator, AlertCircle } from '../../src/lib/icons'

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Size Guide</h1>
            <p className="text-xl text-gray-600">
              Learn how to measure for perfect-fitting wallpapers and blinds
            </p>
          </div>

          {/* Wallpaper Measuring */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Ruler className="h-6 w-6 mr-3 text-blue-600" />
              Measuring for Wallpaper
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Step-by-Step Instructions</h3>
                <ol className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                    <div>
                      <strong>Measure Wall Width:</strong> Use a measuring tape to measure the width of the wall from corner to corner.
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                    <div>
                      <strong>Measure Wall Height:</strong> Measure from floor to ceiling or desired height.
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                    <div>
                      <strong>Account for Doors/Windows:</strong> Subtract the area of doors and windows if they won't be covered.
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</span>
                    <div>
                      <strong>Add Extra:</strong> Add 10% extra for trimming and pattern matching.
                    </div>
                  </li>
                </ol>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-blue-900 mb-4">Wallpaper Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-800 mb-1">Wall Width (feet)</label>
                    <input type="number" className="w-full px-3 py-2 border border-blue-300 rounded-lg" placeholder="10" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-800 mb-1">Wall Height (feet)</label>
                    <input type="number" className="w-full px-3 py-2 border border-blue-300 rounded-lg" placeholder="8" />
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Calculate Required Area
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Blinds Measuring */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Eye className="h-6 w-6 mr-3 text-green-600" />
              Measuring for Blinds
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Inside Mount</h3>
                <p className="text-gray-600 mb-4">
                  For blinds that fit inside the window frame:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Measure the exact width of the window opening</li>
                  <li>• Measure the exact height of the window opening</li>
                  <li>• Measure at 3 points (top, middle, bottom) for width</li>
                  <li>• Use the smallest measurement</li>
                  <li>• No deductions needed - we'll make adjustments</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Outside Mount</h3>
                <p className="text-gray-600 mb-4">
                  For blinds that cover the entire window frame:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Measure desired width (usually 2-3" wider than frame)</li>
                  <li>• Measure desired height (usually 2-3" taller than frame)</li>
                  <li>• Ensure adequate wall space for mounting</li>
                  <li>• Consider light gaps at edges</li>
                  <li>• Mark mounting points before ordering</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <AlertCircle className="h-6 w-6 mr-3 text-red-600" />
              Common Measuring Mistakes
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-bold text-red-900 mb-2">❌ Don't Do This</h3>
                <ul className="text-red-800 space-y-1">
                  <li>• Don't measure over furniture or obstacles</li>
                  <li>• Don't assume all walls are straight</li>
                  <li>• Don't forget to account for baseboards</li>
                  <li>• Don't measure in different units</li>
                  <li>• Don't round measurements</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold text-green-900 mb-2">✅ Best Practices</h3>
                <ul className="text-green-800 space-y-1">
                  <li>• Use a metal measuring tape</li>
                  <li>• Measure twice, order once</li>
                  <li>• Record measurements in inches</li>
                  <li>• Take photos of the area</li>
                  <li>• Ask for help if unsure</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tools Needed */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calculator className="h-6 w-6 mr-3 text-purple-600" />
              Tools You'll Need
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Ruler className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900">Measuring Tape</h3>
                <p className="text-sm text-gray-600">Metal tape preferred</p>
              </div>
              
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold">📝</span>
                </div>
                <h3 className="font-bold text-gray-900">Pen & Paper</h3>
                <p className="text-sm text-gray-600">Record measurements</p>
              </div>
              
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 font-bold">📱</span>
                </div>
                <h3 className="font-bold text-gray-900">Camera</h3>
                <p className="text-sm text-gray-600">Photo reference</p>
              </div>
              
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-orange-600 font-bold">👥</span>
                </div>
                <h3 className="font-bold text-gray-900">Helper</h3>
                <p className="text-sm text-gray-600">For accuracy</p>
              </div>
            </div>
          </div>

          {/* Need Help */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Need Help Measuring?</h3>
              <p className="mb-6 opacity-90">
                Our experts are here to help you get the perfect measurements
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Contact Expert
                </a>
                <a
                  href="tel:+919876543210"
                  className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors"
                >
                  Call: +91 9876543210
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
