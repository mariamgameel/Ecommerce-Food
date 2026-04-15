import React from 'react'
import Hero from './Hero.jsx/Hero'
import OurCategories from './ourCategories/ourCategories';
import PopularItems from './Popular/Popular';
import Offers from './Offers/Offers';
import Testimonials from './Testimonials/Testimonials';
import CTASection from './Cta/Cta';

export default function Home() {
  return (
    <div>
      <Hero />
      <OurCategories />
      <PopularItems />
      <Offers />
      <Testimonials />
      <CTASection />
    </div>
  )
}