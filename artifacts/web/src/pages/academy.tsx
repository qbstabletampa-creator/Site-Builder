import { useSEO } from "@/hooks/useSEO";
import ProductTopBar from "@/components/product/ProductTopBar";
import ProductHero from "@/components/product/ProductHero";
import FeatureFlow from "@/components/product/FeatureFlow";
import ParallaxCards from "@/components/product/ParallaxCards";
import SpecSheet from "@/components/product/SpecSheet";
import PricingConfigurator from "@/components/product/PricingConfigurator";
import trainingImg1 from "@assets/training/IMG_0848.jpg";
import trainingImg2 from "@assets/training/50AC11C5.jpg";
import trainingImg3 from "@assets/training/Untitled-1-03.jpg";

const hudMetrics = [
  { label: "Arm Slot Angle", value: "54.2", unit: "deg" },
  { label: "Release Velocity", value: "61.8", unit: "mph" },
  { label: "Footwork Efficiency", value: "94.1", unit: "%" },
  { label: "Mechanical Consistency", value: "93", unit: "%" },
];

const features = [
  {
    title: "QB Academy",
    description:
      "Our flagship group training program combines position-specific drills with cognitive processing exercises designed to elevate in-game decision making.",
    metric: { value: "93%", label: "Rep Quality" },
  },
  {
    title: "1-on-1 & Elite Small Groups",
    description:
      "Personalized sessions focused on individual development plans. Every rep is intentional, every correction is data-driven.",
    metric: { value: "2.4x", label: "Faster Growth" },
  },
  {
    title: "NFL Draft Prep",
    description:
      "Comprehensive pre-draft preparation covering mechanics refinement, pro-day training, and mental preparation for the evaluation process.",
    metric: { value: "$53M+", label: "NFL Contracts" },
  },
  {
    title: "College & NFL Training",
    description:
      "Off-season and in-season development for collegiate and professional quarterbacks. Maintaining the edge at the highest level.",
    metric: { value: "9", label: "NFL QBs Trained" },
  },
];

const mediaSlots = [
  { label: "Training Session", sublabel: "Biomechanics Lab", imageSrc: trainingImg1 },
  { label: "Film Room", sublabel: "Decision Analysis", imageSrc: trainingImg2 },
  { label: "Pro Day", sublabel: "Draft Preparation", imageSrc: trainingImg3 },
  { label: "Game Reps", sublabel: "Live Performance", imageSrc: trainingImg1 },
];

const parallaxCards = [
  {
    label: "Throwing Mechanics",
    sublabel: "Kinetic Chain Analysis",
    gradientFrom: "#1a1a0f",
    gradientTo: "#0a0a05",
    imageSrc: trainingImg1,
  },
  {
    label: "Cognitive Training",
    sublabel: "Processing Speed Drills",
    gradientFrom: "#0f1a1a",
    gradientTo: "#050a0a",
    imageSrc: trainingImg2,
  },
  {
    label: "Live Reps",
    sublabel: "Game Simulation",
    gradientFrom: "#1a0f1a",
    gradientTo: "#0a050a",
    imageSrc: trainingImg3,
  },
];

const specItems = [
  { label: "Biomechanical Audit & Analysis", detail: "Full kinetic chain breakdown" },
  { label: "Weekly Film Review Sessions", detail: "1-on-1 with coaching staff" },
  { label: "Customized Development Plan", detail: "Data-driven programming" },
  { label: "Progress Tracking & Reporting", detail: "Monthly metric reports" },
  { label: "Access to QB Network", detail: "Alumni & recruiting contacts" },
  { label: "Mental Performance Training", detail: "Cognitive processing drills" },
];

const pricingTiers = [
  { name: "Monthly Training", subtitle: "per month", price: "$350" },
  { name: "Six-Pack Sessions", subtitle: "6 sessions", price: "$375", popular: true },
  { name: "Elite Package", subtitle: "Custom program", price: "Contact" },
];

const pricingFeatures = [
  { label: "Biomechanical Audit", tiers: [true, true, true] },
  { label: "Weekly Film Review", tiers: [false, true, true] },
  { label: "Custom Development Plan", tiers: [false, true, true] },
  { label: "Progress Tracking", tiers: [false, true, true] },
  { label: "QB Network Access", tiers: [false, false, true] },
  { label: "Mental Performance Training", tiers: [false, false, true] },
  { label: "Priority Scheduling", tiers: [false, false, true] },
];

export default function Academy() {
  useSEO({
    title: "QB Academy | Elite Quarterback Training Programs — The QB Stable",
    description:
      "Tampa's premier QB training programs: 1-on-1 sessions, elite small groups, NFL Draft prep, and college-level development. Science-driven methodology from first rep to first round.",
    path: "/academy",
  });

  return (
    <>
      <ProductTopBar ctaLabel="Apply for Evaluation" />

      <ProductHero
        eyebrow="Elite Development"
        title="QB Academy"
        description="The premier quarterback training program in Tampa, FL. Science-driven development from first rep to first round."
        hudMetrics={hudMetrics}
      />

      <FeatureFlow
        sectionLabel="Training Programs"
        features={features}
        theme="light"
        mediaSlots={mediaSlots}
      />

      <ParallaxCards
        cards={parallaxCards}
        sectionLabel="Inside the Program"
      />

      <SpecSheet items={specItems} theme="light" />

      <PricingConfigurator
        heading="Investment in Excellence"
        tiers={pricingTiers}
        features={pricingFeatures}
        ctaText="Apply for Evaluation"
        ctaLink="/#intake"
        theme="dark"
      />
    </>
  );
}
