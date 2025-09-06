import { TrendingUp, Crown, Flame } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const trendingPoets = [
  { name: "Maya Rivera", username: "maya_poetry", followers: "12.5K", avatar: "/placeholder.svg", trending: true },
  { name: "Alex Chen", username: "alexwrites", followers: "8.2K", avatar: "/placeholder.svg", trending: false },
  { name: "Sarah Williams", username: "ocean_poet", followers: "15.8K", avatar: "/placeholder.svg", trending: true },
];

const trendingPoems = [
  { title: "Midnight Reflections", author: "Luna Martinez", likes: "2.3K", trending: "hot" },
  { title: "Urban Dreams", author: "David Kim", likes: "1.8K", trending: "rising" },
  { title: "Ocean Whispers", author: "Sarah Williams", likes: "3.1K", trending: "hot" },
];

const TrendingSection = () => {
  return (
    <section className="py-12 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-gold rounded-full mb-4">
            <TrendingUp className="w-6 h-6 text-background" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
            Trending This Week
          </h2>
          <p className="text-muted-foreground">
            Discover the most loved poetry and rising poets in our community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Trending Poets */}
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center mb-6">
              <Crown className="w-5 h-5 text-primary mr-2" />
              <h3 className="text-xl font-semibold text-card-foreground">Top Poets</h3>
            </div>
            <div className="space-y-4">
              {trendingPoets.map((poet, index) => (
                <div key={poet.username} className="flex items-center justify-between group hover:bg-background/50 rounded-lg p-2 transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                        <AvatarImage src={poet.avatar} alt={poet.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {poet.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {index === 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <Crown className="w-3 h-3 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-card-foreground group-hover:text-primary transition-colors">
                        {poet.name}
                      </p>
                      <p className="text-sm text-muted-foreground">@{poet.username}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-card-foreground">{poet.followers}</p>
                    <div className="flex items-center space-x-1">
                      {poet.trending && (
                        <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Poems */}
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center mb-6">
              <Flame className="w-5 h-5 text-primary mr-2" />
              <h3 className="text-xl font-semibold text-card-foreground">Hot Poems</h3>
            </div>
            <div className="space-y-4">
              {trendingPoems.map((poem, index) => (
                <div key={poem.title} className="group hover:bg-background/50 rounded-lg p-2 transition-colors duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {poem.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">by {poem.author}</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <span className="text-sm font-medium text-primary">{poem.likes} likes</span>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            poem.trending === "hot" 
                              ? "bg-red-500/10 text-red-500" 
                              : "bg-orange-500/10 text-orange-500"
                          }`}
                        >
                          <Flame className="w-3 h-3 mr-1" />
                          {poem.trending === "hot" ? "Hot" : "Rising"}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-primary/30 ml-4">
                      #{index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;