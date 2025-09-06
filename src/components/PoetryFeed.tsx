import PoetryCard from "./PoetryCard";

// Mock data for demonstration
const mockPoetry = [
  {
    id: "1",
    imageUrl: "src/assets/sample-poetry-1.jpg",
    caption: "In the silence between heartbeats, I find the rhythm of the universe...",
    author: {
      name: "Maya Rivera",
      username: "maya_poetry",
      avatar: "/placeholder.svg"
    },
    likes: 1284,
    comments: 23,
    isLiked: false,
    isBookmarked: true
  },
  {
    id: "2", 
    imageUrl: "src/assets/sample-poetry-2.jpg",
    caption: "Moonlit thoughts dancing on paper, each word a whisper of eternity.",
    author: {
      name: "Alex Chen",
      username: "alexwrites",
      avatar: "/placeholder.svg"
    },
    likes: 892,
    comments: 45,
    isLiked: true,
    isBookmarked: false
  },
  {
    id: "3",
    imageUrl: "src/assets/sample-poetry-3.jpg",
    caption: "The ocean speaks in verses that only the heart can understand.",
    author: {
      name: "Sarah Williams",
      username: "ocean_poet",
      avatar: "/placeholder.svg"
    },
    likes: 2156,
    comments: 67,
    isLiked: false,
    isBookmarked: false
  },
  {
    id: "4",
    imageUrl: "/placeholder.svg",
    caption: "Coffee stains and midnight dreams, painting stories on worn pages.",
    author: {
      name: "David Kim",
      username: "midnight_muse",
      avatar: "/placeholder.svg"
    },
    likes: 743,
    comments: 12,
    isLiked: true,
    isBookmarked: true
  },
  {
    id: "5",
    imageUrl: "/placeholder.svg",
    caption: "Between the lines of yesterday and tomorrow, I write today.",
    author: {
      name: "Luna Martinez",
      username: "luna_verses",
      avatar: "/placeholder.svg"
    },
    likes: 1567,
    comments: 34,
    isLiked: false,
    isBookmarked: false
  },
  {
    id: "6",
    imageUrl: "/placeholder.svg",
    caption: "Star-crossed words finding their way home to waiting hearts.",
    author: {
      name: "James Thompson",
      username: "cosmic_poet",
      avatar: "/placeholder.svg"
    },
    likes: 934,
    comments: 28,
    isLiked: true,
    isBookmarked: true
  }
];

const PoetryFeed = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPoetry.map((poem, index) => (
            <div
              key={poem.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <PoetryCard {...poem} />
            </div>
          ))}
        </div>
        
        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-card hover:bg-card/80 text-card-foreground border border-border rounded-lg px-8 py-3 transition-all duration-300 hover:border-primary hover:shadow-gold">
            Load More Poetry
          </button>
        </div>
      </div>
    </section>
  );
};

export default PoetryFeed;