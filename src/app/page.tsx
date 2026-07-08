import HeroSection from "@/components/hero/hero-section";
import FeaturedRooms from "@/components/sections/featured-rooms";
import AmenitiesStrip from "@/components/sections/amenities-strip";
import Testimonials from "@/components/sections/testimonials";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturedRooms />
      <AmenitiesStrip />
      <Testimonials />
    </div>
  );
}
