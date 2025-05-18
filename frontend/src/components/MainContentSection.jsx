import React, { useState, useEffect, useRef } from "react";
import {
  ChevronRight,
  Users,
  Pen,
  Globe,
  Sparkles,
  BookOpen,
  Target,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const MainContentSection = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [visibleSections, setVisibleSections] = useState([]);
  const sectionRefs = useRef([]);

  // Initialize refs array
  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, 3);
  }, []);

  // Handle scroll-based animations and visibility
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.index);
          setVisibleSections((prev) => {
            if (!prev.includes(index)) {
              return [...prev, index];
            }
            return prev;
          });
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Define features for the "Why Blogify" section
  const features = [
    {
      icon: <Pen className='w-6 h-6 text-teal-500' />,
      title: "Intuitive Editor",
      description:
        "Create beautiful content with our easy-to-use markdown editor that supports rich media embedding.",
    },
    {
      icon: <Globe className='w-6 h-6 text-teal-500' />,
      title: "Global Reach",
      description:
        "Connect with readers from around the world and grow your audience with our SEO-optimized platform.",
    },
    {
      icon: <Sparkles className='w-6 h-6 text-teal-500' />,
      title: "Customizable Design",
      description:
        "Make your blog stand out with customizable templates and design elements that reflect your personality.",
    },
    {
      icon: <Users className='w-6 h-6 text-teal-500' />,
      title: "Community Engagement",
      description:
        "Foster meaningful discussions with integrated commenting and social sharing capabilities.",
    },
    {
      icon: <BookOpen className='w-6 h-6 text-teal-500' />,
      title: "Analytics Dashboard",
      description:
        "Track your performance with comprehensive analytics to understand what resonates with your audience.",
    },
    {
      icon: <Zap className='w-6 h-6 text-teal-500' />,
      title: "Fast Performance",
      description:
        "Deliver lightning-fast experiences to your readers with our optimized platform architecture.",
    },
  ];

  // Content for the tabbed section
  const tabbedContent = [
    {
      title: "For Writers",
      content:
        "Whether you're a seasoned author or just starting your writing journey, Blogify provides all the tools you need to express yourself. Our platform simplifies the technical aspects of blogging so you can focus on what matters most—your content. With built-in SEO tools, engagement metrics, and monetization options, we help turn your passion into opportunity.",
      image: "/api/placeholder/500/300",
      stats: [
        { value: "97%", label: "Writer satisfaction" },
        { value: "2x", label: "Audience growth" },
        { value: "15min", label: "Avg. setup time" },
      ],
    },
    {
      title: "For Businesses",
      content:
        "Establish your brand's voice and authority with Blogify's business-focused features. Our enterprise solutions help you create compelling content that drives traffic, generates leads, and builds customer loyalty. With team collaboration tools, content scheduling, and detailed ROI analytics, Blogify makes content marketing measurable and effective.",
      image: "/api/placeholder/500/300",
      stats: [
        { value: "3.5x", label: "Lead generation" },
        { value: "68%", label: "Traffic increase" },
        { value: "40%", label: "Conversion boost" },
      ],
    },
    {
      title: "For Creatives",
      content:
        "Let your creativity shine with Blogify's media-rich publishing platform. Showcase your photography, design work, or multimedia projects in immersive layouts that captivate your audience. Our gallery features, portfolio templates, and visual storytelling tools help your creative work make a lasting impression.",
      image: "/api/placeholder/500/300",
      stats: [
        { value: "4.8", label: "Avg. user rating" },
        { value: "8min", label: "Avg. time on page" },
        { value: "75%", label: "Visual engagement" },
      ],
    },
  ];

  // How it works steps
  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description: "Sign up in seconds and choose your personalized blog URL.",
    },
    {
      number: "02",
      title: "Customize Your Space",
      description:
        "Select a theme and make it your own with our intuitive design tools.",
    },
    {
      number: "03",
      title: "Start Creating Content",
      description:
        "Write, format, and enhance your posts with our feature-rich editor.",
    },
    {
      number: "04",
      title: "Connect With Readers",
      description: "Publish your work and engage with your growing audience.",
    },
  ];

  // Testimonials
  const testimonials = [
    {
      quote:
        "Blogify transformed my writing hobby into a full-time career. The platform's ease of use and powerful features helped me grow my audience beyond what I thought possible.",
      author: "Sarah Johnson",
      role: "Travel Blogger",
      avatar: "SJ",
    },
    {
      quote:
        "As a business owner, content marketing was always challenging until we found Blogify. Now our team collaborates seamlessly, and our blog has become our top lead generation channel.",
      author: "Michael Chen",
      role: "Marketing Director",
      avatar: "MC",
    },
    {
      quote:
        "The visual storytelling capabilities of Blogify are unmatched. As a photographer, I need my images to look perfect, and this platform delivers every time.",
      author: "Elena Rodriguez",
      role: "Wildlife Photographer",
      avatar: "ER",
    },
  ];

  return (
    <div className='relative bg-white overflow-hidden'>
      {/* About Blogify Section */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        data-index={0}
        className={`py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-1000 transform ${
          visibleSections.includes(0)
            ? "opacity-100"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-6'>
            <span className='text-charcoal-800'>About </span>
            <span className='text-teal-500'>Blogify</span>
          </h2>
          <p className='max-w-3xl mx-auto text-lg text-charcoal-800/70'>
            Blogify was born from a simple idea: everyone has a story worth
            sharing. Our platform makes it easy for writers, businesses, and
            creatives to find their voice and connect with audiences who care
            about what they have to say.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
          <div className='order-2 lg:order-1'>
            <div className='mb-8'>
              <div className='text-teal-500 font-medium mb-2'>Our Mission</div>
              <h3 className='text-2xl font-bold mb-4'>
                Empowering Voices In The Digital Age
              </h3>
              <p className='text-charcoal-800/70'>
                We believe in the power of authentic storytelling to connect
                people, share knowledge, and inspire change. Our mission is to
                provide the most intuitive and powerful platform for creators to
                express themselves and build meaningful connections with their
                audience.
              </p>
            </div>

            <div>
              <div className='text-coral-500 font-medium mb-2'>Our Values</div>
              <h3 className='text-2xl font-bold mb-4'>
                What Drives Us Forward
              </h3>
              <ul className='space-y-3'>
                <li className='flex items-start'>
                  <ChevronRight className='mt-1 w-5 h-5 flex-shrink-0 text-teal-500' />
                  <p className='ml-2 text-charcoal-800/70'>
                    <span className='font-medium text-charcoal-800'>
                      Creativity Without Limits:
                    </span>{" "}
                    We build tools that unleash your imagination, not restrict
                    it.
                  </p>
                </li>
                <li className='flex items-start'>
                  <ChevronRight className='mt-1 w-5 h-5 flex-shrink-0 text-coral-500' />
                  <p className='ml-2 text-charcoal-800/70'>
                    <span className='font-medium text-charcoal-800'>
                      Accessibility For All:
                    </span>{" "}
                    Great storytelling shouldn't require technical expertise.
                  </p>
                </li>
                <li className='flex items-start'>
                  <ChevronRight className='mt-1 w-5 h-5 flex-shrink-0 text-gold' />
                  <p className='ml-2 text-charcoal-800/70'>
                    <span className='font-medium text-charcoal-800'>
                      Community First:
                    </span>{" "}
                    We succeed when our writers and their audiences thrive.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className='order-1 lg:order-2 relative'>
            {/* Decorative elements */}
            <div className='absolute top-1/4 -left-4 w-64 h-64 bg-teal-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob'></div>
            <div className='absolute bottom-1/4 -right-4 w-64 h-64 bg-coral-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000'></div>

            {/* Image grid */}
            <div className='relative grid grid-cols-2 gap-4'>
              <div className='p-2 bg-white rounded-lg shadow-lg transform rotate-2 hover:rotate-0 transition-all duration-300'>
                <img
                  src='/api/placeholder/300/400'
                  alt='Writers collaborating'
                  className='rounded-md w-full h-auto object-cover'
                />
              </div>
              <div className='p-2 bg-white rounded-lg shadow-lg transform -rotate-1 hover:rotate-0 transition-all duration-300 mt-8'>
                <img
                  src='/api/placeholder/300/300'
                  alt='Content creation'
                  className='rounded-md w-full h-auto object-cover'
                />
              </div>
              <div className='p-2 bg-white rounded-lg shadow-lg transform -rotate-2 hover:rotate-0 transition-all duration-300'>
                <img
                  src='/api/placeholder/300/300'
                  alt='Reader engagement'
                  className='rounded-md w-full h-auto object-cover'
                />
              </div>
              <div className='p-2 bg-white rounded-lg shadow-lg transform rotate-1 hover:rotate-0 transition-all duration-300 mt-8'>
                <img
                  src='/api/placeholder/300/400'
                  alt='Community discussion'
                  className='rounded-md w-full h-auto object-cover'
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Blogify Section with Features */}
      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        data-index={1}
        className={`py-20 bg-gradient-to-br from-teal-500/5 to-coral-500/5 transition-all duration-1000 transform ${
          visibleSections.includes(1)
            ? "opacity-100"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-6'>
              <span className='text-charcoal-800'>Why Choose </span>
              <span className='text-teal-500'>Blogify</span>
            </h2>
            <p className='max-w-3xl mx-auto text-lg text-charcoal-800/70'>
              Our platform combines powerful features with beautiful design to
              give you everything you need to create, grow, and monetize your
              blog.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {features.map((feature, index) => (
              <div
                key={index}
                className='bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'
              >
                <div className='inline-flex items-center justify-center p-3 bg-teal-500/10 rounded-full mb-4'>
                  {feature.icon}
                </div>
                <h3 className='text-xl font-bold mb-2'>{feature.title}</h3>
                <p className='text-charcoal-800/70'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Who Section (Tabbed) */}
      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        data-index={2}
        className={`py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-1000 transform ${
          visibleSections.includes(2)
            ? "opacity-100"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold mb-6'>
            <span className='text-charcoal-800'>Tailored For </span>
            <span className='text-teal-500'>Everyone</span>
          </h2>
          <p className='max-w-3xl mx-auto text-lg text-charcoal-800/70'>
            Whether you're writing as a hobby, building a brand, or creating for
            a business, Blogify adapts to your unique needs.
          </p>
        </div>

        {/* Tabs navigation */}
        <div className='flex justify-center mb-8'>
          <div className='inline-flex rounded-md p-1 bg-gray-100'>
            {tabbedContent.map((tab, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeSection === index
                    ? "bg-teal-500 text-white shadow-md"
                    : "text-charcoal-800/70 hover:text-charcoal-800"
                }`}
                onClick={() => setActiveSection(index)}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <div className='relative'>
            <div className='absolute top-0 -left-4 w-72 h-72 bg-teal-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob'></div>
            <div className='absolute bottom-0 -right-4 w-72 h-72 bg-coral-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000'></div>
            <div className='relative bg-white p-2 rounded-lg shadow-lg'>
              <img
                src={tabbedContent[activeSection].image}
                alt={tabbedContent[activeSection].title}
                className='rounded-md w-full h-auto object-cover'
              />
            </div>
          </div>

          <div>
            <h3 className='text-2xl font-bold mb-4'>
              {tabbedContent[activeSection].title}
            </h3>
            <p className='text-charcoal-800/70 mb-8'>
              {tabbedContent[activeSection].content}
            </p>

            <div className='grid grid-cols-3 gap-4'>
              {tabbedContent[activeSection].stats.map((stat, index) => (
                <div
                  key={index}
                  className='text-center p-4 bg-white rounded-lg shadow-sm'
                >
                  <p className='text-2xl font-bold text-teal-500'>
                    {stat.value}
                  </p>
                  <p className='text-sm text-charcoal-800/70'>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className='py-20 bg-gradient-to-br from-coral-500/5 to-teal-500/5'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-6'>
              <span className='text-charcoal-800'>How </span>
              <span className='text-teal-500'>It Works</span>
            </h2>
            <p className='max-w-3xl mx-auto text-lg text-charcoal-800/70'>
              Getting started with Blogify is simple. Follow these steps to
              launch your blog in minutes.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {steps.map((step, index) => (
              <div key={index} className='relative'>
                <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 z-10 relative h-full'>
                  <div className='text-4xl font-bold text-teal-500/20 mb-4'>
                    {step.number}
                  </div>
                  <h3 className='text-xl font-bold mb-2'>{step.title}</h3>
                  <p className='text-charcoal-800/70'>{step.description}</p>
                </div>

                {/* Connector line between steps */}
                {index < steps.length - 1 && (
                  <div className='hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-teal-500/30 z-0'></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-6'>
            <span className='text-charcoal-800'>What Our </span>
            <span className='text-teal-500'>Users Say</span>
          </h2>
          <p className='max-w-3xl mx-auto text-lg text-charcoal-800/70'>
            Join thousands of satisfied creators who have found their voice with
            Blogify.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className='bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300'
            >
              <div className='flex items-center justify-between mb-6'>
                <div className='w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-500 font-medium'>
                  {testimonial.avatar}
                </div>
                <div className='flex'>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className='text-gold'>
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <blockquote className='text-charcoal-800/80 italic mb-6'>
                "{testimonial.quote}"
              </blockquote>
              <div>
                <p className='font-bold'>{testimonial.author}</p>
                <p className='text-sm text-charcoal-800/70'>
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-500/10 to-coral-500/10 relative overflow-hidden'>
        {/* Background decorative elements */}
        <div className='absolute top-0 left-1/4 w-64 h-64 bg-teal-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob'></div>
        <div className='absolute bottom-0 right-1/4 w-64 h-64 bg-coral-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000'></div>

        <div className='max-w-4xl mx-auto text-center relative z-10'>
          <h2 className='text-3xl md:text-4xl font-bold mb-6'>
            <span className='text-charcoal-800'>Ready to </span>
            <span className='text-teal-500'>Share Your Story?</span>
          </h2>
          <p className='text-lg text-charcoal-800/70 mb-8 max-w-2xl mx-auto'>
            Join our community of passionate writers and start creating content
            that connects with readers around the world.
          </p>
          <div className='flex flex-wrap justify-center gap-4'>
            <button
              className='px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'
              onClick={() => navigate("/create-blog")}
            >
              Get Started For Free
            </button>
          </div>
        </div>
      </section>

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

export default MainContentSection;
