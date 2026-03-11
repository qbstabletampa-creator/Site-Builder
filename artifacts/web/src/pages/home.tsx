import HeroSection from "@/components/home/HeroSection";
import TelemetryBar from "@/components/home/TelemetryBar";
import AlumniTicker from "@/components/home/AlumniTicker";
import AuthorityStatement from "@/components/home/AuthorityStatement";
import ServicesGrid from "@/components/home/ServicesGrid";
import StableStandard from "@/components/home/StableStandard";
import ReviewVault from "@/components/home/ReviewVault";
import FaqIntake from "@/components/home/FaqIntake";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TelemetryBar />
      <AlumniTicker />
      <AuthorityStatement />
      <ServicesGrid />
      <StableStandard />
      <ReviewVault />
      <FaqIntake />
    </>
  );
}
