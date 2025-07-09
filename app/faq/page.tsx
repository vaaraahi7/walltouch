'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Search, HelpCircle } from '../../src/lib/icons'

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openItems, setOpenItems] = useState<number[]>([])

  const faqData = [
    {
      category: 'Orders & Shipping',
      questions: [
        {
          question: 'How do I place an order?',
          answer: 'You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. You can pay using various methods including credit/debit cards, UPI, or cash on delivery.'
        },
        {
          question: 'What are your delivery charges?',
          answer: 'We offer free shipping on orders above ₹500. For orders below ₹500, a shipping charge of ₹50 applies. COD orders have an additional ₹25 handling fee.'
        },
        {
          question: 'How long does delivery take?',
          answer: 'Delivery times vary by location: Hyderabad (3-4 days), Nearby states like Telangana, AP, Maharashtra, Karnataka (4-5 days), Other states (5-7 days). You can check exact delivery time by entering your pincode on product pages.'
        },
        {
          question: 'Can I track my order?',
          answer: 'Yes, once your order is shipped, you will receive a tracking number via SMS and email. You can use this to track your order status.'
        }
      ]
    },
    {
      category: 'Products & Pricing',
      questions: [
        {
          question: 'How do I measure for wallpaper?',
          answer: 'Measure the width and height of your wall in inches. For wallpapers, add 2-3 inches extra for trimming. For blinds, measure the exact window frame size. Check our "How to Measure" tab on product pages for detailed instructions.'
        },
        {
          question: 'What is the difference between your wallpaper types?',
          answer: 'We offer customized wallpapers (with media selection - Non-woven ₹70/sq ft, Vinyl stickers ₹80/sq ft) and regular wallpapers (₹1,500 per roll, 50 sq ft coverage). Custom wallpapers allow size and media customization.'
        },
        {
          question: 'How is blind pricing calculated?',
          answer: 'Blind pricing is per square foot: Regular blinds ₹60/sq ft, Customized blinds ₹75/sq ft, Zebra blinds ₹90/sq ft. Enter your window dimensions and we calculate the total automatically.'
        },
        {
          question: 'Can I get custom sizes?',
          answer: 'Yes, all our wallpapers and blinds can be customized to your exact measurements. Simply enter your wall or window dimensions on the product page.'
        }
      ]
    },
    {
      category: 'Installation & Support',
      questions: [
        {
          question: 'Do you provide installation services?',
          answer: 'Yes, we offer professional installation services in Hyderabad and nearby areas. Contact us for pricing and scheduling. We also provide detailed DIY installation guides.'
        },
        {
          question: 'What tools do I need for DIY installation?',
          answer: 'For wallpapers: adhesive, smoothing brush, cutting tools, measuring tape. For blinds: mounting hardware, drill, level, screws. Complete tool lists are available in the Installation Guidance tab on product pages.'
        },
        {
          question: 'What if I need help during installation?',
          answer: 'Our support team is available Mon-Sat 9AM-7PM to help with installation queries. You can call us or send a message through our contact form.'
        }
      ]
    },
    {
      category: 'Returns & Refunds',
      questions: [
        {
          question: 'What is your return policy?',
          answer: '30-day return policy for unused items in original packaging. Custom-cut items are non-returnable. Return shipping costs apply. Refunds are processed within 7-10 business days.'
        },
        {
          question: 'How do I return an item?',
          answer: 'Contact our support team to initiate a return. We will provide return instructions and a return authorization number. Pack the item securely in original packaging.'
        },
        {
          question: 'When will I get my refund?',
          answer: 'Refunds are processed within 7-10 business days after we receive and inspect the returned item. The amount will be credited to your original payment method.'
        }
      ]
    },
    {
      category: 'Account & Payment',
      questions: [
        {
          question: 'Do I need to create an account to order?',
          answer: 'While you can browse products without an account, creating one helps you track orders, save addresses, and get personalized recommendations.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept credit/debit cards, UPI payments, net banking, and cash on delivery (COD). All online payments are secure and encrypted.'
        },
        {
          question: 'Is cash on delivery available?',
          answer: 'Yes, COD is available across India with a ₹25 handling fee. You can pay in cash when the order is delivered to your address.'
        }
      ]
    }
  ]

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our products, orders, and services.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQ.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const globalIndex = categoryIndex * 100 + questionIndex
                  const isOpen = openItems.includes(globalIndex)
                  
                  return (
                    <div key={questionIndex} className="bg-white rounded-lg shadow-sm border border-gray-200">
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
          
          {filteredFAQ.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No results found for "{searchTerm}"</p>
              <button
                onClick={() => setSearchTerm('')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="max-w-2xl mx-auto mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="tel:+919876543210"
              className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
