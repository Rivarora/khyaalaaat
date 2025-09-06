import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FilterBar from "@/components/FilterBar";
import PoetryFeed from "@/components/PoetryFeed";
import TrendingSection from "@/components/TrendingSection";

const Index = ({ onOpenUploadModal }) => {
  return (
    <div className="min-h-screen bg-background">
      <Header onOpenUploadModal={onOpenUploadModal}>A</Header>
      <main>
        <HeroSection onOpenUploadModal={onOpenUploadModal} />
        <FilterBar />
        <PoetryFeed />
        <TrendingSection />
      </main>
    </div>
  );
};

export default Index;
