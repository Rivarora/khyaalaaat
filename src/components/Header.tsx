import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, Bell, Menu, User, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import UploadModal from "./UploadModal";
import poetryLogo from "@/assets/poetry-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleUploadSuccess = () => {
    // Refresh the page to show new posts
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src={poetryLogo} 
              alt="Poetry App" 
              className="w-8 h-8"
            />
            <h1 className="text-xl font-heading font-semibold text-primary hidden sm:block">
              Poetry
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search poetry, poets, or tags..."
                className="pl-10 bg-card border-border"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Upload Button */}
                <Button 
                  size="sm" 
                  onClick={() => setIsUploadModalOpen(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground hidden sm:flex"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Upload
                </Button>
                
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  <Bell className="w-5 h-5" />
                </Button>
                
                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.email?.charAt(0).toUpperCase() || <User className="w-4 h-4" />}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => setIsUploadModalOpen(true)} className="sm:hidden">
                      <Plus className="w-4 h-4 mr-2" />
                      Upload Poetry
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Sign In
              </Button>
            )}
            
            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="sm:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden py-4 border-t border-border animate-slide-down">
            <div className="flex flex-col space-y-2">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search poetry..."
                  className="pl-10 bg-card border-border"
                />
              </div>
              
              {user && (
                <Button 
                  variant="ghost" 
                  className="justify-start"
                  onClick={() => {
                    setIsUploadModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Upload Poetry
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
      
      <UploadModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={handleUploadSuccess}
      />
    </header>
  );
};

export default Header;