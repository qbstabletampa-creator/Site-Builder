import { useSEO } from "@/hooks/useSEO";
import ProductTopBar from "@/components/product/ProductTopBar";
import ProductHero from "@/components/product/ProductHero";
import FeatureFlow from "@/components/product/FeatureFlow";
import ParallaxCards from "@/components/product/ParallaxCards";
import SpecSheet from "@/components/product/SpecSheet";
import PricingConfigurator from "@/components/product/PricingConfigurator";

const hudMetrics = [
  { label: "Film Views Generated", value: "12.4K", unit: "avg" },
  { label: "Coach Response Rate", value: "68", unit: "%" },
  { label: "Scholarship Value", value: "$15M+", unit: "total" },
  { label: "Placement Success", value: "94", unit: "%" },
];

const features = [
  {
    title: "Custom Curated Highlights",
    description:
      "Professionally edited highlight reels designed to showcase your best throws, decision-making, and athleticism. Tailored to what college coaches want to see.",
    metric: { value: "12.4K", label: "Avg Views" },
  },
  {
    title: "College Coaches Contact Database",
    description:
      "Direct access to our proprietary database of college coaching contacts at every level — from NAIA to Power Five programs.",
    metric: { value: "850+", label: "Contacts" },
  },
  {
    title: "Recruiting Evaluation",
    description:
      "Honest, data-driven assessment of where you stand in the recruiting landscape. We identify realistic targets and reach schools.",
    metric: { value: "40+", label: "D1 Placements" },
  },
  {
    title: "Scholarship & NIL Marketing",
    description:
      "Strategic guidance on maximizing scholarship opportunities and building NIL value before, during, and after the recruiting process.",
    metric: { value: "$11M+", label: "NIL Generated" },
  },
];

const mediaSlots = [
  { label: "Highlight Reel", sublabel: "Professional Edit" },
  { label: "Coach Outreach", sublabel: "Campaign Dashboard" },
  { label: "Evaluation Report", sublabel: "Recruiting Analysis" },
  { label: "NIL Portfolio", sublabel: "Brand Strategy" },
];

const parallaxCards = [
  {
    label: "Film Session",
    sublabel: "Highlight Curation",
    gradientFrom: "#1a1a0f",
    gradientTo: "#0a0a05",
  },
  {
    label: "Camp Showcase",
    sublabel: "Live Evaluation",
    gradientFrom: "#0f1a1a",
    gradientTo: "#050a0a",
  },
  {
    label: "Signing Day",
    sublabel: "Commitment Ceremony",
    gradientFrom: "#1a0f1a",
    gradientTo: "#0a050a",
  },
];

const specItems = [
  { label: "Professional Film Editing", detail: "Multi-angle highlight reel" },
  { label: "Recruiting Profile Creation", detail: "NCSA & Hudl optimization" },
  { label: "Coach Outreach Campaigns", detail: "Personalized email sequences" },
  { label: "Camp & Combine Preparation", detail: "Event selection & training" },
  { label: "NIL Strategy & Valuation", detail: "Brand positioning plan" },
  { label: "Ongoing Recruiting Updates", detail: "Bi-weekly status reports" },
];

const pricingTiers = [
  { name: "Highlight Only", subtitle: "Film editing package", price: "Contact" },
  { name: "Full Exposure", subtitle: "Complete recruiting", price: "Contact", popular: true },
  { name: "Elite Package", subtitle: "Training + exposure", price: "Contact" },
];

const pricingFeatures = [
  { label: "Professional Film Editing", tiers: [true, true, true] },
  { label: "Recruiting Profile", tiers: [false, true, true] },
  { label: "Coach Outreach Campaign", tiers: [false, true, true] },
  { label: "Camp & Combine Prep", tiers: [false, true, true] },
  { label: "NIL Strategy", tiers: [false, false, true] },
  { label: "Academy Training Sessions", tiers: [false, false, true] },
  { label: "Dedicated Recruiting Advisor", tiers: [false, false, true] },
];

export default function Exposure() {
  useSEO({
    title: "Collegiate Exposure | QB Recruiting & Highlights — The QB Stable",
    description:
      "Custom highlight reels, college coach database access, recruiting evaluations, and NIL strategy. 40+ D1 QBs produced. Get seen by the right programs.",
    path: "/exposure",
  });

  return (
    <>
      <ProductTopBar ctaLabel="Request Highlight Assessment" />

      <ProductHero
        eyebrow="Collegiate Exposure"
        title="Get Seen"
        description="Quarterback highlights, recruiting evaluation, and scholarship marketing. Your path to collegiate football starts here."
        hudMetrics={hudMetrics}
      />

      <FeatureFlow
        sectionLabel="Exposure Services"
        features={features}
        theme="light"
        mediaSlots={mediaSlots}
      />

      <ParallaxCards
        cards={parallaxCards}
        sectionLabel="The Exposure Process"
      />

      <SpecSheet items={specItems} theme="light" />

      <PricingConfigurator
        heading="Exposure Packages"
        tiers={pricingTiers}
        features={pricingFeatures}
        ctaText="Request Highlight Assessment"
        ctaLink="/#intake"
        theme="dark"
      />
    </>
  );
}
