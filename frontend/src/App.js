import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  Header, 
  ComicCard, 
  Section, 
  HorizontalScroll, 
  GenreFilter, 
  DailyFilter,
  ComicDetailModal,
  EpisodeReader,
  LoadingSpinner,
  Footer,
  AnalyticsDashboard,
  mockComics,
  genres,
  dailyDays
} from './components';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedDay, setSelectedDay] = useState('Sun');
  const [selectedComic, setSelectedComic] = useState(null);
  const [isReading, setIsReading] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [filteredComics, setFilteredComics] = useState(mockComics);
  const [loading, setLoading] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Listen for analytics dashboard events
  useEffect(() => {
    const handleOpenAnalytics = () => setShowAnalytics(true);
    window.addEventListener('openAnalytics', handleOpenAnalytics);
    return () => window.removeEventListener('openAnalytics', handleOpenAnalytics);
  }, []);

  // Filter comics based on search and genre
  useEffect(() => {
    let filtered = mockComics;
    
    if (searchTerm) {
      filtered = filtered.filter(comic => 
        comic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comic.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comic.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedGenre !== 'All') {
      filtered = filtered.filter(comic => comic.genre === selectedGenre);
    }
    
    setFilteredComics(filtered);
  }, [searchTerm, selectedGenre]);

  const handleSearch = () => {
    // Search functionality is handled by useEffect
    console.log('Searching for:', searchTerm);
  };

  const handleComicClick = (comic) => {
    setSelectedComic(comic);
  };

  const handleStartReading = (comic) => {
    setSelectedComic(comic);
    setIsReading(true);
    setCurrentEpisode(1);
  };

  const handleCloseReader = () => {
    setIsReading(false);
    setSelectedComic(null);
  };

  const handleNextEpisode = () => {
    if (selectedComic && currentEpisode < selectedComic.episodes) {
      setCurrentEpisode(currentEpisode + 1);
    }
  };

  const handlePrevEpisode = () => {
    if (currentEpisode > 1) {
      setCurrentEpisode(currentEpisode - 1);
    }
  };

  // Get comics by category
  const getTrendingComics = () => mockComics.slice(0, 5);
  const getGenreComics = () => {
    if (selectedGenre === 'All') {
      return mockComics;
    }
    return mockComics.filter(comic => comic.genre === selectedGenre);
  };
  const getNewComics = () => mockComics.filter(comic => !comic.isCompleted).slice(0, 5);
  const getDailyComics = () => {
    if (selectedDay === 'Completed') {
      return mockComics.filter(comic => comic.isCompleted);
    }
    // For demo purposes, return different comics for different days
    const dayIndex = dailyDays.indexOf(selectedDay);
    return mockComics.slice(dayIndex, dayIndex + 4);
  };
  const getIndieComics = () => mockComics.slice(-4);

  if (isReading && selectedComic) {
    return (
      <EpisodeReader
        comic={selectedComic}
        episodeId={currentEpisode}
        onClose={handleCloseReader}
        onNext={handleNextEpisode}
        onPrev={handlePrevEpisode}
      />
    );
  }

  return (
    <div className="App min-h-screen bg-white">
      <Header 
        onSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Discover Amazing
              <br />
              Stories
            </h1>
            <p className="text-xl mb-6 opacity-90">
              Read the world's best webcomics and connect with creators
            </p>
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Reading
            </button>
          </div>
        </div>

        {/* Trending & Popular Series */}
        <Section title="Trending & Popular Series" viewAllAction={() => console.log('View all trending')}>
          <HorizontalScroll>
            {getTrendingComics().map(comic => (
              <ComicCard 
                key={comic.id} 
                comic={comic} 
                onClick={handleComicClick}
              />
            ))}
          </HorizontalScroll>
        </Section>

        {/* Popular Series by Category */}
        <Section title="Popular Series by Category">
          <GenreFilter 
            genres={genres}
            activeGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
          />
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {getGenreComics().slice(0, 12).map(comic => (
                <ComicCard 
                  key={comic.id} 
                  comic={comic} 
                  onClick={handleComicClick}
                  size="small"
                />
              ))}
            </div>
          )}
        </Section>

        {/* Newly Released Originals */}
        <Section title="Newly Released Originals" viewAllAction={() => console.log('View all new')}>
          <HorizontalScroll>
            {getNewComics().map(comic => (
              <ComicCard 
                key={comic.id} 
                comic={comic} 
                onClick={handleComicClick}
              />
            ))}
          </HorizontalScroll>
        </Section>

        {/* Daily */}
        <Section title="Daily" viewAllAction={() => console.log('View all daily')}>
          <DailyFilter 
            days={dailyDays}
            activeDay={selectedDay}
            onDayChange={setSelectedDay}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {getDailyComics().map(comic => (
              <ComicCard 
                key={comic.id} 
                comic={comic} 
                onClick={handleComicClick}
                size="small"
              />
            ))}
          </div>
        </Section>

        {/* More stories from indie creators */}
        <Section title="More stories from indie creators" viewAllAction={() => console.log('View all indie')}>
          <HorizontalScroll>
            {getIndieComics().map(comic => (
              <ComicCard 
                key={comic.id} 
                comic={comic} 
                onClick={handleComicClick}
              />
            ))}
          </HorizontalScroll>
        </Section>

        {/* Search Results */}
        {searchTerm && (
          <Section title={`Search Results for "${searchTerm}"`}>
            {filteredComics.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredComics.map(comic => (
                  <ComicCard 
                    key={comic.id} 
                    comic={comic} 
                    onClick={handleComicClick}
                    size="small"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No comics found for "{searchTerm}"</p>
                <p className="text-gray-400 mt-2">Try searching with different keywords</p>
              </div>
            )}
          </Section>
        )}
      </main>

      <Footer />

      {/* Comic Detail Modal */}
      {selectedComic && !isReading && (
        <ComicDetailModal
          comic={selectedComic}
          onClose={() => setSelectedComic(null)}
          onStartReading={handleStartReading}
        />
      )}
    </div>
  );
}

export default App;