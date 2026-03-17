import HeroSection from "@/components/home/HeroSection";
import TelemetryBar from "@/components/home/TelemetryBar";
import AlumniTicker from "@/components/home/AlumniTicker";
import AuthorityStatement from "@/components/home/AuthorityStatement";
import CoachBio from "@/components/home/CoachBio";
import ServicesGrid from "@/components/home/ServicesGrid";
import StableStandard from "@/components/home/StableStandard";
import ReviewVault from "@/components/home/ReviewVault";
import FaqIntake from "@/components/home/FaqIntake";
import LeadMagnet from "@/components/home/LeadMagnet";
import { useSEO } from "@/hooks/useSEO";

export default function Home() {
  useSEO({
    title: "The QB Stable | Quarterback Training Tampa, FL — Beyond the Throw",
    description: "The QB Stable is Tampa's premier quarterback training institution. $53M+ in NFL contracts, 40+ D1 QBs. Elite development, collegiate exposure, and strategic consulting.",
  });
  return (
    <>
      <HeroSection />
      <TelemetryBar />
      <AlumniTicker />
      <AuthorityStatement />
      <CoachBio />
      <ServicesGrid />
      <StableStandard />
      <ReviewVault />
      <LeadMagnet />
      <FaqIntake />
    </>
  );
}
