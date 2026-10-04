import HeroSection from "@/components/hero/hero-section";
import FeaturedHotels from "@/components/sections/featured-hotels";
import AmenitiesStrip from "@/components/sections/amenities-strip";
import Testimonials from "@/components/sections/testimonials";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturedHotels />
      <AmenitiesStrip />
      <Testimonials />
    </div>
  );
}
