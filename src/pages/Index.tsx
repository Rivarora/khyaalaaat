import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FilterBar from "@/components/FilterBar";
import PoetryFeed from "@/components/PoetryFeed";
import TrendingSection from "@/components/TrendingSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FilterBar />
        <PoetryFeed />
        <TrendingSection />
      </main>
    </div>
  );
};

export default Index;
