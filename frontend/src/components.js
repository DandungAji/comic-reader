import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Heart, 
  Share2, 
  Star, 
  Play, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  User,
  Bell,
  BookOpen,
  Calendar,
  TrendingUp,
  Filter,
  Eye,
  MessageCircle,
  BarChart3,
  Clock,
  Target,
  Award,
  Users,
  BookMarked,
  Activity,
  PieChart,
  LineChart,
  Download
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { format, subDays, startOfWeek, endOfWeek } from 'date-fns';

// Mock Data
export const mockComics = [
  {
    id: 1,
    title: "Jackson's Diary",
    author: "Paola Barbato",
    genre: "Romance",
    rating: 9.8,
    views: "2.1M",
    likes: 45000,
    thumbnail: "https://images.pexels.com/photos/31334946/pexels-photo-31334946.jpeg",
    description: "A heartwarming story about love, friendship, and growing up.",
    status: "Ongoing",
    episodes: 15,
    isCompleted: false
  },
  {
    id: 2,
    title: "Our Walk Home",
    author: "Geum Ga",
    genre: "Drama",
    rating: 9.5,
    views: "1.8M",
    likes: 38000,
    thumbnail: "https://images.unsplash.com/photo-1620075267033-09d12ec75b40",
    description: "A touching tale of two friends walking through life together.",
    status: "Completed",
    episodes: 23,
    isCompleted: true
  },
  {
    id: 3,
    title: "Super Armor",
    author: "Lim Dall-young",
    genre: "Action",
    rating: 9.7,
    views: "3.2M",
    likes: 52000,
    thumbnail: "https://images.unsplash.com/photo-1619023491350-d04814cf6a35",
    description: "Epic battles and incredible powers in a futuristic world.",
    status: "Ongoing",
    episodes: 45,
    isCompleted: false
  },
  {
    id: 4,
    title: "The Sichuan Tang Clan's",
    author: "STUDIO MASSSTAR",
    genre: "Fantasy",
    rating: 9.6,
    views: "2.8M",
    likes: 47000,
    thumbnail: "https://images.unsplash.com/photo-1666705520192-418fb959244e",
    description: "Ancient martial arts meet modern storytelling.",
    status: "Ongoing",
    episodes: 32,
    isCompleted: false
  },
  {
    id: 5,
    title: "The Second Chance Convenience Store",
    author: "Yeon-woo",
    genre: "Slice of life",
    rating: 9.4,
    views: "1.5M",
    likes: 31000,
    thumbnail: "https://images.pexels.com/photos/6214570/pexels-photo-6214570.jpeg",
    description: "Finding hope and new beginnings in everyday moments.",
    status: "Ongoing",
    episodes: 18,
    isCompleted: false
  },
  {
    id: 6,
    title: "SubZero",
    author: "Junepurrr",
    genre: "Romance",
    rating: 9.9,
    views: "4.1M",
    likes: 68000,
    thumbnail: "https://images.unsplash.com/photo-1705831156575-a5294d295a31",
    description: "A princess and a dragon prince's forbidden love story.",
    status: "Completed",
    episodes: 156,
    isCompleted: true
  },
  {
    id: 7,
    title: "Midnight Poppy Land",
    author: "Lilydusk",
    genre: "Romance",
    rating: 9.7,
    views: "3.5M",
    likes: 55000,
    thumbnail: "https://images.unsplash.com/photo-1740297223378-38c5ee91d459",
    description: "A dangerous world where love knows no boundaries.",
    status: "Ongoing",
    episodes: 78,
    isCompleted: false
  },
  {
    id: 8,
    title: "The Remarried Empress",
    author: "Alphatart",
    genre: "Drama",
    rating: 9.8,
    views: "5.2M",
    likes: 89000,
    thumbnail: "https://images.unsplash.com/photo-1695671548955-74a180b8777d",
    description: "Political intrigue and romance in the royal court.",
    status: "Ongoing",
    episodes: 124,
    isCompleted: false
  }
];

export const genres = [
  "All", "Drama", "Fantasy", "Comedy", "Action", "Slice of life", "Romance", "Superhero", "Sci-fi"
];

export const dailyDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Completed"];

// Analytics Mock Data
export const mockAnalytics = {
  userStats: {
    totalComicsRead: 147,
    totalEpisodesRead: 2843,
    totalReadingTime: 89, // hours
    averageRating: 4.6,
    favoriteGenre: 'Romance',
    readingStreak: 12, // days
    joinDate: '2023-06-15',
    totalLikes: 1247,
    totalComments: 89
  },
  readingHistory: [
    { date: '2024-06-19', episodes: 12, minutes: 156 },
    { date: '2024-06-20', episodes: 8, minutes: 104 },
    { date: '2024-06-21', episodes: 15, minutes: 195 },
    { date: '2024-06-22', episodes: 10, minutes: 130 },
    { date: '2024-06-23', episodes: 7, minutes: 91 },
    { date: '2024-06-24', episodes: 13, minutes: 169 },
    { date: '2024-06-25', episodes: 9, minutes: 117 }
  ],
  genreBreakdown: [
    { name: 'Romance', value: 35, color: '#FF6B9D' },
    { name: 'Action', value: 22, color: '#4ECDC4' },
    { name: 'Fantasy', value: 18, color: '#45B7D1' },
    { name: 'Drama', value: 15, color: '#96CEB4' },
    { name: 'Comedy', value: 10, color: '#FFEAA7' }
  ],
  weeklyActivity: [
    { day: 'Mon', episodes: 8, likes: 15, comments: 3 },
    { day: 'Tue', episodes: 12, likes: 22, comments: 5 },
    { day: 'Wed', episodes: 6, likes: 11, comments: 2 },
    { day: 'Thu', episodes: 15, likes: 28, comments: 7 },
    { day: 'Fri', episodes: 10, likes: 19, comments: 4 },
    { day: 'Sat', episodes: 18, likes: 32, comments: 8 },
    { day: 'Sun', episodes: 14, likes: 25, comments: 6 }
  ],
  monthlyProgress: [
    { month: 'Jan', comics: 12, episodes: 234 },
    { month: 'Feb', comics: 15, episodes: 289 },
    { month: 'Mar', comics: 18, episodes: 356 },
    { month: 'Apr', comics: 20, episodes: 398 },
    { month: 'May', comics: 22, episodes: 445 },
    { month: 'Jun', comics: 25, episodes: 512 }
  ],
  topComics: [
    { title: 'Lore Olympus', episodes: 89, hours: 12.3, rating: 5 },
    { title: 'Tower of God', episodes: 67, hours: 9.8, rating: 5 },
    { title: 'UnOrdinary', episodes: 54, hours: 7.2, rating: 4 },
    { title: 'The Remarried Empress', episodes: 43, hours: 6.1, rating: 5 },
    { title: 'SubZero', episodes: 38, hours: 5.4, rating: 4 }
  ],
  achievements: [
    { id: 1, title: 'First Chapter', description: 'Read your first episode', unlocked: true, date: '2023-06-15' },
    { id: 2, title: 'Binge Reader', description: 'Read 50 episodes in a week', unlocked: true, date: '2023-07-22' },
    { id: 3, title: 'Genre Explorer', description: 'Read comics from 5+ genres', unlocked: true, date: '2023-08-10' },
    { id: 4, title: 'Loyal Fan', description: 'Follow 10+ series', unlocked: true, date: '2023-09-05' },
    { id: 5, title: 'Community Member', description: 'Leave 50+ comments', unlocked: false, progress: 89 },
    { id: 6, title: 'Speed Reader', description: 'Read 100 episodes in a day', unlocked: false, progress: 0 }
  ]
};

// Header Component
export const Header = ({ onSearch, searchTerm, setSearchTerm }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <div className="bg-green-500 text-white px-3 py-1 rounded-lg font-bold text-xl">
                  WEBTOON
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <a href="#" className="text-gray-900 hover:text-green-500 px-3 py-2 text-sm font-medium">
                ORIGINALS
              </a>
              <a href="#" className="text-gray-500 hover:text-green-500 px-3 py-2 text-sm font-medium">
                CATEGORIES
              </a>
              <a href="#" className="text-gray-500 hover:text-green-500 px-3 py-2 text-sm font-medium">
                RANKINGS
              </a>
              <a href="#" className="text-gray-500 hover:text-green-500 px-3 py-2 text-sm font-medium">
                CANVAS
              </a>
            </nav>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search comics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && onSearch()}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
              />
            </div>
            
            <button className="text-gray-500 hover:text-green-500 p-2">
              <Bell className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('openAnalytics'))}
              className="text-gray-500 hover:text-green-500 p-2"
              title="Analytics"
            >
              <BarChart3 className="w-5 h-5" />
            </button>
            
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
              Log in
            </button>
            
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="px-4 py-2 space-y-1">
            <a href="#" className="block px-3 py-2 text-gray-900 hover:text-green-500">ORIGINALS</a>
            <a href="#" className="block px-3 py-2 text-gray-500 hover:text-green-500">CATEGORIES</a>
            <a href="#" className="block px-3 py-2 text-gray-500 hover:text-green-500">RANKINGS</a>
            <a href="#" className="block px-3 py-2 text-gray-500 hover:text-green-500">CANVAS</a>
          </nav>
        </div>
      )}
    </header>
  );
};

// Comic Card Component
export const ComicCard = ({ comic, onClick, size = "normal" }) => {
  const [isLiked, setIsLiked] = useState(false);

  const cardClass = size === "small" ? "w-32" : "w-40";
  const imageClass = size === "small" ? "h-40" : "h-52";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${cardClass} flex-shrink-0 cursor-pointer group`}
      onClick={() => onClick(comic)}
    >
      <div className="relative overflow-hidden rounded-lg shadow-md group-hover:shadow-lg transition-shadow">
        <img
          src={comic.thumbnail}
          alt={comic.title}
          className={`w-full ${imageClass} object-cover`}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
        
        {/* Hover Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className={`p-1.5 rounded-full ${isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-600'} shadow-md hover:scale-110 transition-transform`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Status Badge */}
        {comic.isCompleted && (
          <div className="absolute top-2 left-2">
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              COMPLETED
            </span>
          </div>
        )}
      </div>
      
      <div className="mt-2">
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-1 group-hover:text-green-500 transition-colors">
          {comic.title}
        </h3>
        <p className="text-gray-500 text-xs mt-1">{comic.author}</p>
        <div className="flex items-center mt-1 space-x-2">
          <div className="flex items-center">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs text-gray-600 ml-1">{comic.rating}</span>
          </div>
          <div className="flex items-center">
            <Eye className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-600 ml-1">{comic.views}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Section Component
export const Section = ({ title, children, viewAllAction }) => {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {viewAllAction && (
          <button
            onClick={viewAllAction}
            className="text-green-500 hover:text-green-600 text-sm font-medium"
          >
            View all →
          </button>
        )}
      </div>
      {children}
    </section>
  );
};

// Horizontal Scroll Container
export const HorizontalScroll = ({ children }) => {
  return (
    <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
      {children}
    </div>
  );
};

// Genre Filter
export const GenreFilter = ({ genres, activeGenre, onGenreChange }) => {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => onGenreChange(genre)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            activeGenre === genre
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

// Daily Filter
export const DailyFilter = ({ days, activeDay, onDayChange }) => {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
      {days.map((day) => (
        <button
          key={day}
          onClick={() => onDayChange(day)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            activeDay === day
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {day}
        </button>
      ))}
    </div>
  );
};

// Comic Detail Modal
export const ComicDetailModal = ({ comic, onClose, onStartReading }) => {
  const [activeTab, setActiveTab] = useState('episodes');

  if (!comic) return null;

  const mockEpisodes = Array.from({ length: comic.episodes }, (_, i) => ({
    id: i + 1,
    title: `Episode ${i + 1}`,
    thumbnail: comic.thumbnail,
    date: new Date(2024, 5, 25 - i).toLocaleDateString(),
    likes: Math.floor(Math.random() * 1000) + 100,
    comments: Math.floor(Math.random() * 500) + 50,
    isNew: i < 3
  }));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative">
            <div 
              className="h-64 bg-cover bg-center"
              style={{ 
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${comic.thumbnail})` 
              }}
            >
              <div className="absolute inset-0 flex items-end p-6">
                <div className="text-white">
                  <h1 className="text-4xl font-bold mb-2">{comic.title}</h1>
                  <p className="text-lg opacity-90">{comic.author}</p>
                  <div className="flex items-center mt-4 space-x-6">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                      <span>{comic.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-5 h-5 mr-1" />
                      <span>{comic.views}</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-5 h-5 mr-1" />
                      <span>{comic.likes.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('episodes')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    activeTab === 'episodes' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Episodes
                </button>
                <button
                  onClick={() => setActiveTab('about')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    activeTab === 'about' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  About
                </button>
              </div>
              
              <button
                onClick={() => onStartReading(comic)}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                Start Reading
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {activeTab === 'episodes' ? (
                <div className="space-y-4">
                  {mockEpisodes.map((episode) => (
                    <div key={episode.id} className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <img src={episode.thumbnail} alt={episode.title} className="w-16 h-20 object-cover rounded" />
                      <div className="ml-4 flex-1">
                        <div className="flex items-center">
                          <h3 className="font-medium">{episode.title}</h3>
                          {episode.isNew && (
                            <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">NEW</span>
                          )}
                        </div>
                        <p className="text-gray-500 text-sm">{episode.date}</p>
                        <div className="flex items-center mt-1 space-x-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <Heart className="w-4 h-4 mr-1" />
                            {episode.likes}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {episode.comments}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-gray-600">{comic.description}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Genre:</span>
                        <span className="ml-2">{comic.genre}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Status:</span>
                        <span className="ml-2">{comic.status}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Episodes:</span>
                        <span className="ml-2">{comic.episodes}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Rating:</span>
                        <span className="ml-2">{comic.rating}/10</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Episode Reader Component
export const EpisodeReader = ({ comic, episodeId, onClose, onNext, onPrev }) => {
  const [currentPage, setCurrentPage] = useState(0);
  
  // Mock episode images (using the same thumbnail for demo)
  const episodeImages = Array.from({ length: 12 }, (_, i) => comic.thumbnail);

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-semibold">{comic.title}</h1>
            <p className="text-sm text-gray-500">Episode {episodeId}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
          <div className="text-sm text-gray-500">
            {currentPage + 1} / {episodeImages.length}
          </div>
        </div>
      </div>

      {/* Reader Content */}
      <div className="flex-1 overflow-y-auto bg-gray-900 p-8">
        <div className="max-w-2xl mx-auto space-y-4">
          {episodeImages.map((image, index) => (
            <motion.img
              key={index}
              src={image}
              alt={`Page ${index + 1}`}
              className="w-full rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onLoad={() => {
                if (index === currentPage) {
                  // Auto-scroll to current page
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-t p-4 flex items-center justify-between">
        <button
          onClick={onPrev}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>
        
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            Comments (245)
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Like (1.2k)
          </button>
        </div>
        
        <button
          onClick={onNext}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

// Loading Component
export const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
  </div>
);

// Footer Component
export const Footer = () => (
  <footer className="bg-gray-100 mt-16">
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="bg-green-500 text-white px-3 py-1 rounded-lg font-bold text-xl inline-block mb-4">
            WEBTOON
          </div>
          <p className="text-gray-600 text-sm">
            Discover amazing stories and connect with creators from around the world.
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-green-500">About</a></li>
            <li><a href="#" className="hover:text-green-500">Careers</a></li>
            <li><a href="#" className="hover:text-green-500">Press</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-green-500">Help Center</a></li>
            <li><a href="#" className="hover:text-green-500">Contact</a></li>
            <li><a href="#" className="hover:text-green-500">Terms</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Connect</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-green-500">Facebook</a></li>
            <li><a href="#" className="hover:text-green-500">Twitter</a></li>
            <li><a href="#" className="hover:text-green-500">Instagram</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500">
        © 2024 Webtoon Clone. All rights reserved.
      </div>
    </div>
  </footer>
);

// Analytics Components
export const StatCard = ({ icon: Icon, title, value, subtitle, color = "text-gray-900" }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className={`text-2xl font-bold ${color} mt-1`}>{value}</p>
        {subtitle && <p className="text-gray-400 text-xs mt-1">{subtitle}</p>}
      </div>
      <div className="bg-green-100 p-3 rounded-lg">
        <Icon className="w-6 h-6 text-green-600" />
      </div>
    </div>
  </motion.div>
);

export const ChartCard = ({ title, children, className = "" }) => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border ${className}`}>
    <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
    {children}
  </div>
);

export const AchievementCard = ({ achievement }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`p-4 rounded-xl flex items-center space-x-4 ${
      achievement.unlocked 
        ? 'bg-gradient-to-r from-green-50 to-blue-50 border border-green-200' 
        : 'bg-gray-50 border border-gray-200'
    }`}
  >
    <div className={`p-3 rounded-full ${
      achievement.unlocked ? 'bg-green-500' : 'bg-gray-400'
    }`}>
      <Award className="w-6 h-6 text-white" />
    </div>
    <div className="flex-1">
      <h4 className={`font-semibold ${
        achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
      }`}>
        {achievement.title}
      </h4>
      <p className="text-sm text-gray-600">{achievement.description}</p>
      {achievement.unlocked && achievement.date && (
        <p className="text-xs text-green-600 mt-1">
          Unlocked {format(new Date(achievement.date), 'MMM dd, yyyy')}
        </p>
      )}
      {!achievement.unlocked && achievement.progress !== undefined && (
        <div className="mt-2">
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(achievement.progress / 100) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{achievement.progress}/100</p>
        </div>
      )}
    </div>
  </motion.div>
);

export const AnalyticsDashboard = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { userStats, readingHistory, genreBreakdown, weeklyActivity, monthlyProgress, topComics, achievements } = mockAnalytics;

  if (!isOpen) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'reading', label: 'Reading Stats', icon: BookOpen },
    { id: 'engagement', label: 'Engagement', icon: Heart },
    { id: 'achievements', label: 'Achievements', icon: Award }
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-50 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-white border-b p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-gray-600">Track your reading journey and discover insights</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white border-b px-6">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)] custom-scrollbar">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Key Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    icon={BookOpen}
                    title="Comics Read"
                    value={userStats.totalComicsRead}
                    subtitle="All time"
                    color="text-blue-600"
                  />
                  <StatCard
                    icon={Play}
                    title="Episodes Read"
                    value={userStats.totalEpisodesRead.toLocaleString()}
                    subtitle="All time"
                    color="text-green-600"
                  />
                  <StatCard
                    icon={Clock}
                    title="Reading Time"
                    value={`${userStats.totalReadingTime}h`}
                    subtitle="Total hours"
                    color="text-purple-600"
                  />
                  <StatCard
                    icon={Target}
                    title="Reading Streak"
                    value={`${userStats.readingStreak} days`}
                    subtitle="Current streak"
                    color="text-orange-600"
                  />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Reading Activity */}
                  <ChartCard title="Weekly Reading Activity">
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={weeklyActivity}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="episodes" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartCard>

                  {/* Genre Breakdown */}
                  <ChartCard title="Favorite Genres">
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPieChart>
                        <Pie
                          data={genreBreakdown}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {genreBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </ChartCard>
                </div>

                {/* Monthly Progress */}
                <ChartCard title="Monthly Reading Progress">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyProgress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="comics" fill="#10b981" name="Comics" />
                      <Bar dataKey="episodes" fill="#3b82f6" name="Episodes" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>
            )}

            {activeTab === 'reading' && (
              <div className="space-y-6">
                {/* Reading Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard
                    icon={Star}
                    title="Average Rating"
                    value={userStats.averageRating}
                    subtitle="Your ratings"
                    color="text-yellow-600"
                  />
                  <StatCard
                    icon={TrendingUp}
                    title="Favorite Genre"
                    value={userStats.favoriteGenre}
                    subtitle="Most read"
                    color="text-pink-600"
                  />
                  <StatCard
                    icon={Calendar}
                    title="Member Since"
                    value={format(new Date(userStats.joinDate), 'MMM yyyy')}
                    subtitle="Join date"
                    color="text-indigo-600"
                  />
                </div>

                {/* Top Comics */}
                <ChartCard title="Your Top Comics">
                  <div className="space-y-4">
                    {topComics.map((comic, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{comic.title}</h4>
                            <p className="text-sm text-gray-600">{comic.episodes} episodes • {comic.hours}h read</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < comic.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ChartCard>

                {/* Reading History */}
                <ChartCard title="7-Day Reading History">
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={readingHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(date) => format(new Date(date), 'MMM dd')}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(date) => format(new Date(date), 'MMM dd, yyyy')}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="episodes" stroke="#10b981" strokeWidth={2} name="Episodes" />
                      <Line type="monotone" dataKey="minutes" stroke="#3b82f6" strokeWidth={2} name="Minutes" />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>
            )}

            {activeTab === 'engagement' && (
              <div className="space-y-6">
                {/* Engagement Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard
                    icon={Heart}
                    title="Total Likes"
                    value={userStats.totalLikes.toLocaleString()}
                    subtitle="Given to comics"
                    color="text-red-600"
                  />
                  <StatCard
                    icon={MessageCircle}
                    title="Comments"
                    value={userStats.totalComments}
                    subtitle="Posted"
                    color="text-blue-600"
                  />
                  <StatCard
                    icon={Users}
                    title="Following"
                    value="47"
                    subtitle="Creators"
                    color="text-green-600"
                  />
                </div>

                {/* Weekly Engagement */}
                <ChartCard title="Weekly Engagement Activity">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyActivity}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="likes" fill="#ef4444" name="Likes Given" />
                      <Bar dataKey="comments" fill="#3b82f6" name="Comments Posted" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>

                {/* Engagement Timeline */}
                <ChartCard title="Engagement Over Time">
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">12.4k</div>
                        <div className="text-sm text-gray-600">Likes Received</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">3.2k</div>
                        <div className="text-sm text-gray-600">Comments on Your Reviews</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">89</div>
                        <div className="text-sm text-gray-600">Comics Bookmarked</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-600">156</div>
                        <div className="text-sm text-gray-600">Reviews Written</div>
                      </div>
                    </div>
                  </div>
                </ChartCard>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-6">
                {/* Achievement Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard
                    icon={Award}
                    title="Achievements"
                    value={`${achievements.filter(a => a.unlocked).length}/${achievements.length}`}
                    subtitle="Unlocked"
                    color="text-yellow-600"
                  />
                  <StatCard
                    icon={Activity}
                    title="Progress"
                    value={`${Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100)}%`}
                    subtitle="Completion"
                    color="text-green-600"
                  />
                  <StatCard
                    icon={Target}
                    title="Next Goal"
                    value="Community Member"
                    subtitle="89/100 comments"
                    color="text-blue-600"
                  />
                </div>

                {/* Achievement List */}
                <ChartCard title="Your Achievements">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <AchievementCard key={achievement.id} achievement={achievement} />
                    ))}
                  </div>
                </ChartCard>

                {/* Achievement Progress */}
                <ChartCard title="Achievement Progress Overview">
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-xl">
                      <h3 className="text-xl font-semibold mb-2">Reading Champion</h3>
                      <p className="opacity-90 mb-4">You're doing amazing! Keep up the great reading habits.</p>
                      <div className="bg-white bg-opacity-20 rounded-full h-3">
                        <div 
                          className="bg-white h-3 rounded-full transition-all duration-500"
                          style={{ width: '67%' }}
                        />
                      </div>
                      <p className="text-sm opacity-75 mt-2">67% towards Reading Master badge</p>
                    </div>
                  </div>
                </ChartCard>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};