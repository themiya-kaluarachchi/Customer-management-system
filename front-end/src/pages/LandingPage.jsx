import FeaturesSection from "../components/landing/FeaturesSection";
import HeroSection from "../components/landing/HeroSection";
import LandingFooter from "../components/landing/LandingFooter";
import LandingNav from "../components/landing/LandingNav";


export default function LandingPage() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#0a0f1e", fontFamily: "Georgia, serif" }}
    >
      <LandingNav />
      <HeroSection />
      <FeaturesSection />
      <LandingFooter />
    </div>
  );
}