import { useState } from "react";
import { Search, Heart, User, Menu, X, Plus, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="/src/assets/poetry-logo.png" 
              alt="PoetryVerse" 
              className="w-8 h-8 rounded-lg"
            />
            <h1 className="text-xl font-heading font-semibold text-primary">
              PoetryVerse
            </h1>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search poetry, poets, or tags..."
                className="pl-10 bg-card border-border focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="default" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Upload
            </Button>
            <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
              <User className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-foreground hover:text-primary"
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-primary"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search poetry, poets, or tags..."
                className="pl-10 bg-card border-border focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col space-y-2">
              <Button variant="ghost" className="justify-start text-foreground hover:text-primary">
                <Heart className="w-5 h-5 mr-2" />
                Liked Poems
              </Button>
              <Button variant="ghost" className="justify-start text-foreground hover:text-primary">
                <Bell className="w-5 h-5 mr-2" />
                Notifications
              </Button>
              <Button variant="default" className="justify-start bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Upload Poetry
              </Button>
              <Button variant="ghost" className="justify-start text-foreground hover:text-primary">
                <User className="w-5 h-5 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;