import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { Team } from "@/components/sections/Team";
import { Services } from "@/components/sections/Services";
import CircularGallery from "@/components/CircularGallery";
import Aurora from "@/components/Aurora";

export const metadata: Metadata = {
  title: "About Us - Zinetic Music Limited",
  description:
    "Learn about Zinetic Music Limited, the leading Music Distribution Company and Record Label services provider.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black pt-10 md:pt-20 relative overflow-hidden">
      <div className="relative pt-46 md:pt-20 z-10">
        <About />
      </div>

      <div className="h-[400px] md:h-[600px] w-full bg-black relative">
        <CircularGallery
          bend={3}
          borderRadius={0.05}
          font='bold 24px "Outfit", sans-serif'
        />
      </div>
      <Services />
      <Team />
    </main>
  );
}
