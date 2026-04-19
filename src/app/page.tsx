import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AmountGrid } from "@/components/AmountGrid";
import { ScheduledRechargeBanner } from "@/components/ScheduledRechargeBanner";
import { WhereToRecharge } from "@/components/WhereToRecharge";
import { Benefits } from "@/components/Benefits";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <AmountGrid />
      <ScheduledRechargeBanner />
      <WhereToRecharge />
      <Benefits />
      <Footer />
    </main>
  );
}
