import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";

const categories = [
  "All",
  "Romantic",
  "Motivational", 
  "Nature",
  "Philosophical",
  "Spiritual",
  "Life",
  "Love",
  "Friendship",
  "Hope"
];

const FilterBar = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleCategories = isExpanded ? categories : categories.slice(0, 6);

  return (
    <div className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-primary" />
            <h3 className="font-medium text-foreground">Categories</h3>
          </div>
          {categories.length > 6 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary hover:text-primary/80"
            >
              {isExpanded ? (
                <>
                  <X className="w-4 h-4 mr-1" />
                  Less
                </>
              ) : (
                `+${categories.length - 6} more`
              )}
            </Button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {visibleCategories.map((category) => (
            <Badge
              key={category}
              variant={activeCategory === category ? "default" : "secondary"}
              className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-gold"
                  : "bg-card text-card-foreground border border-border hover:border-primary"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;