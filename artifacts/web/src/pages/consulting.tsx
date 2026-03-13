import { useSEO } from "@/hooks/useSEO";
import ProductTopBar from "@/components/product/ProductTopBar";
import ProductHero from "@/components/product/ProductHero";
import FeatureFlow from "@/components/product/FeatureFlow";
import ParallaxCards from "@/components/product/ParallaxCards";
import SpecSheet from "@/components/product/SpecSheet";
import PricingConfigurator from "@/components/product/PricingConfigurator";

const hudMetrics = [
  { label: "Practice Efficiency", value: "97.3", unit: "score" },
  { label: "Drill Reactivity Index", value: "84", unit: "%" },
  { label: "Coaching Programs", value: "125+", unit: "total" },
  { label: "Rep Quality Metric", value: "96.1", unit: "%" },
];

const features = [
  {
    title: "Indy Architecture Audit",
    description:
      "A complete teardown of your practice structure, drill selection, and session flow. We rebuild your individual workout architecture from the ground up.",
    metric: { value: "97.3", label: "Efficiency Score" },
  },
  {
    title: "Reactive Drill Protocols",
    description:
      "Drill design that prioritizes read-react processing over scripted repetition. Train decision-making, not just mechanics.",
    metric: { value: "84%", label: "Reactivity Index" },
  },
  {
    title: "Closed Loop vs Open Loop Drills",
    description:
      "Understanding when to use predictable vs. chaotic training environments. We build drill progressions that mirror game conditions.",
    metric: { value: "3.2x", label: "Transfer Rate" },
  },
  {
    title: "Mechanics & Sequencing",
    description:
      "Biomechanical analysis of throwing mechanics with sequenced correction protocols. Fix the root cause, not the symptom.",
    metric: { value: "125+", label: "Programs Built" },
  },
];

const mediaSlots = [
  { label: "Practice Audit", sublabel: "Session Architecture" },
  { label: "Drill Design", sublabel: "Protocol Development" },
  { label: "Film Study", sublabel: "Mechanical Analysis" },
  { label: "Program Delivery", sublabel: "Coach Workshop" },
];

const parallaxCards = [
  {
    label: "Drill Design Lab",
    sublabel: "Protocol Engineering",
    gradientFrom: "#1a1a0f",
    gradientTo: "#0a0a05",
  },
  {
    label: "Coach Workshop",
    sublabel: "Methodology Transfer",
    gradientFrom: "#0f1a1a",
    gradientTo: "#050a0a",
  },
  {
    label: "On-Field Implementation",
    sublabel: "Live Coaching",
    gradientFrom: "#1a0f1a",
    gradientTo: "#0a050a",
  },
];

const specItems = [
  { label: "Full Practice Architecture Review", detail: "Session-by-session breakdown" },
  { label: "Custom Drill Library Creation", detail: "50+ reactive protocols" },
  { label: "Video Analysis & Feedback", detail: "Frame-by-frame mechanics" },
  { label: "Coaching Staff Consultation", detail: "Group & 1-on-1 sessions" },
  { label: "Season-Long Program Design", detail: "Periodized development plan" },
  { label: "Quarterly Progress Reviews", detail: "Data-driven assessments" },
];

const pricingTiers = [
  { name: "Single Audit", subtitle: "One-time review", price: "Contact" },
  { name: "Season Package", subtitle: "Full season support", price: "Contact", popular: true },
  { name: "Program Build", subtitle: "Complete overhaul", price: "Contact" },
];

const pricingFeatures = [
  { label: "Practice Architecture Audit", tiers: [true, true, true] },
  { label: "Custom Drill Library", tiers: [false, true, true] },
  { label: "Video Analysis Sessions", tiers: [false, true, true] },
  { label: "Coaching Staff Workshops", tiers: [false, true, true] },
  { label: "Season Program Design", tiers: [false, false, true] },
  { label: "Quarterly Reviews", tiers: [false, false, true] },
  { label: "On-Site Implementation", tiers: [false, false, true] },
];

export default function Consulting() {
  useSEO({
    title: "Strategic Consulting | Practice Architecture & Drill Design — The QB Stable",
    description:
      "Quarterback biomechanics consulting and drill protocol design for coaches and programs. Indy architecture audits, reactive drill protocols, and custom program builds.",
  });

  return (
    <>
      <ProductTopBar ctaLabel="Schedule Indy Audit" />

      <ProductHero
        eyebrow="Strategic Consulting"
        title="Practice Architecture"
        description="Quarterback biomechanics consulting and drill protocol design for coaches and programs seeking the competitive edge."
        hudMetrics={hudMetrics}
      />

      <FeatureFlow
        sectionLabel="Consulting Services"
        features={features}
        theme="light"
        mediaSlots={mediaSlots}
      />

      <ParallaxCards
        cards={parallaxCards}
        sectionLabel="The Methodology"
      />

      <SpecSheet items={specItems} theme="light" />

      <PricingConfigurator
        heading="Consulting Packages"
        tiers={pricingTiers}
        features={pricingFeatures}
        ctaText="Schedule Indy Audit"
        ctaLink="/#intake"
        theme="dark"
      />
    </>
  );
}
