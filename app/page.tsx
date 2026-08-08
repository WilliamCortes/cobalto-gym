import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import Ticker from "@/components/landing/Ticker";
import Services from "@/components/landing/Services";
import WhyUs from "@/components/landing/WhyUs";
import Pricing from "@/components/landing/Pricing";
import Schedule from "@/components/landing/Schedule";
import Testimonials from "@/components/landing/Testimonials";
import Story from "@/components/landing/Story";
import Location from "@/components/landing/Location";
import CtaSection from "@/components/landing/CtaSection";
import Footer from "@/components/landing/Footer";
import WaFloat from "@/components/landing/WaFloat";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Services />
        <WhyUs />
        <Pricing />
        <Schedule />
        <Testimonials />
        <Story />
        <Location />
        <CtaSection />
      </main>
      <Footer />
      <WaFloat />
    </>
  );
}
