import { Hero } from '../src/components/home/hero'
import { FeaturedProducts } from '../src/components/home/featured-products'
import { Categories } from '../src/components/home/categories'
import { Features } from '../src/components/home/features'
import { Newsletter } from '../src/components/home/newsletter'
import { HomepagePopup } from '../src/components/popup/HomepagePopup'

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Features />
      <Newsletter />
      <HomepagePopup />
    </div>
  )
}
