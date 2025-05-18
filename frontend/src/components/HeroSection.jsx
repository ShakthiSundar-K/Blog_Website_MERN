import React, { useState, useEffect } from "react";
import Logo from "./Logo";

const HeroSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(Array(3).fill(false));

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    // Set visibility with slight delay between elements
    const timer = setTimeout(() => {
      const newVisible = [...isVisible];
      newVisible[0] = true;
      setIsVisible(newVisible);

      setTimeout(() => {
        newVisible[1] = true;
        setIsVisible([...newVisible]);

        setTimeout(() => {
          newVisible[2] = true;
          setIsVisible([...newVisible]);
        }, 300);
      }, 300);
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Featured posts data
  const featuredPosts = [
    {
      title: "The Art of Mindful Writing",
      category: "Lifestyle",
      author: "Emma Johnson",
      image: "/api/placeholder/600/400",
    },
    {
      title: "Future of Web Development",
      category: "Technology",
      author: "Michael Chen",
      image: "/api/placeholder/600/400",
    },
    {
      title: "Sustainable Living Guide",
      category: "Environment",
      author: "Sarah Miller",
      image: "/api/placeholder/600/400",
    },
  ];

  return (
    <div className='relative overflow-hidden'>
      {/* Background pattern */}
      <div className='absolute inset-0 bg-pattern opacity-70'></div>

      {/* Hero main content */}
      <div className='relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'>
        <div className='pt-16 pb-24 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32'>
          {/* Main hero content */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            {/* Left column - Text content */}
            <div
              className={`transform transition-all duration-1000 ${
                isVisible[0] ? "opacity-100" : "opacity-0 translate-y-8"
              }`}
            >
              <div className='text-sm uppercase tracking-wide font-medium text-teal-500 mb-3'>
                Welcome to
              </div>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6'>
                <span className='text-charcoal-800'>
                  Express Your Ideas With{" "}
                </span>
                <span className='text-gradient'>Blogify</span>
              </h1>
              <p className='text-lg md:text-xl text-charcoal-800/80 mb-8 max-w-2xl'>
                Your platform for creating elegant, engaging, and memorable
                stories. Share your unique perspective with readers around the
                world.
              </p>

              <div className='flex flex-wrap gap-4'>
                <button className='px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
                  Start Writing
                </button>
                <button className='px-8 py-3 border-2 border-teal-500 text-teal-500 hover:bg-teal-500/10 rounded-full font-medium transition-all duration-300'>
                  Explore Blogs
                </button>
              </div>

              {/* Stats */}
              <div className='mt-12 flex flex-wrap gap-8 md:gap-12'>
                <div>
                  <p className='text-3xl font-bold text-teal-500'>10k+</p>
                  <p className='text-sm text-charcoal-800/70'>Active Writers</p>
                </div>
                <div>
                  <p className='text-3xl font-bold text-coral-500'>25k+</p>
                  <p className='text-sm text-charcoal-800/70'>
                    Published Posts
                  </p>
                </div>
                <div>
                  <p className='text-3xl font-bold text-gold'>150k+</p>
                  <p className='text-sm text-charcoal-800/70'>
                    Monthly Readers
                  </p>
                </div>
              </div>
            </div>

            {/* Right column - Floating illustration */}
            <div
              className={`flex justify-center relative transform transition-all duration-1000 delay-300 ${
                isVisible[1] ? "opacity-100" : "opacity-0 translate-y-8"
              }`}
            >
              <div className='relative w-full max-w-lg'>
                {/* Decorative elements */}
                <div className='absolute top-0 -left-4 w-72 h-72 bg-teal-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob'></div>
                <div className='absolute top-0 -right-4 w-72 h-72 bg-coral-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000'></div>
                <div className='absolute -bottom-8 left-20 w-72 h-72 bg-gold/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000'></div>

                {/* Featured image */}
                <div className='relative'>
                  <div className='absolute inset-0 bg-gradient-to-r from-teal-500/30 to-coral-500/30 rounded-lg transform rotate-6'></div>
                  <div className='relative bg-white rounded-lg shadow-xl overflow-hidden transform -rotate-2 transition-all duration-500 hover:rotate-0'>
                    <img
                      src='/api/placeholder/600/400'
                      alt='Featured blog post'
                      className='w-full h-auto object-cover'
                    />
                    <div className='p-6'>
                      <div className='inline-block px-3 py-1 bg-teal-500/10 text-teal-500 text-xs font-medium rounded-full mb-2'>
                        Featured Post
                      </div>
                      <h3 className='text-xl font-bold mb-2'>
                        The Future of Content Creation
                      </h3>
                      <p className='text-charcoal-800/70 text-sm'>
                        Explore how AI and human creativity are reshaping the
                        landscape of digital content.
                      </p>
                      <div className='mt-4 flex items-center justify-between'>
                        <div className='flex items-center'>
                          <div className='w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-500 font-medium'>
                            JD
                          </div>
                          <span className='ml-2 text-sm text-charcoal-800/70'>
                            John Doe
                          </span>
                        </div>
                        <span className='text-xs text-charcoal-800/50'>
                          5 min read
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wave divider */}
          <div className='absolute bottom-0 left-0 right-0'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 1440 120'
              fill='#fff'
            >
              <path d='M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z'></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Add custom styling for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
