import { Button } from "@/components/ui/button";
import { Feather, Upload, Users, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23d4af37%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Main heading */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-gold rounded-full mb-6 animate-glow">
            <Feather className="w-8 h-8 text-background" />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6 animate-fade-in">
            Share Your
            <span className="block text-transparent bg-gradient-gold bg-clip-text">
              Poetry
            </span>
            with the World
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in">
            Join a vibrant community of poets. Upload your poetry images, discover amazing verses, 
            and connect with fellow writers who share your passion for words.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up">
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg font-medium shadow-gold"
          >
            <Upload className="w-5 h-5 mr-2" />
            Start Sharing Poetry
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300 px-8 py-6 text-lg font-medium"
          >
            Explore Poetry
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-card rounded-lg mb-3 mx-auto">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">10K+</div>
            <div className="text-sm text-muted-foreground">Active Poets</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-card rounded-lg mb-3 mx-auto">
              <Feather className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">50K+</div>
            <div className="text-sm text-muted-foreground">Poems Shared</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-card rounded-lg mb-3 mx-auto">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">1M+</div>
            <div className="text-sm text-muted-foreground">Likes Given</div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-8 animate-pulse">
        <div className="w-2 h-2 bg-primary rounded-full opacity-60" />
      </div>
      <div className="absolute top-1/3 right-12 animate-pulse delay-1000">
        <div className="w-3 h-3 bg-secondary rounded-full opacity-40" />
      </div>
      <div className="absolute bottom-1/4 left-16 animate-pulse delay-2000">
        <div className="w-1.5 h-1.5 bg-primary rounded-full opacity-50" />
      </div>
    </section>
  );
};

export default HeroSection;