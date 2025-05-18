import React, { useState, useRef, useEffect } from "react";
import {
  Image,
  Save,
  Tag,
  Coffee,
  ArrowUpRight,
  Loader2,
  Check,
  X,
} from "lucide-react";
import api from "../services/ApiService";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const EditBlog = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Get blog data from location state or fetch it
  const passedBlogData = location.state?.blogData;

  // Editor state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showTipsBox, setShowTipsBox] = useState(true);
  const [expandedTips, setExpandedTips] = useState(false);
  const [isLoading, setIsLoading] = useState(!passedBlogData);
  const fileInputRef = useRef(null);
  const categoryRef = useRef(null);

  // Available blog categories
  const categories = [
    "Technology",
    "Travel",
    "Food & Cooking",
    "Health & Wellness",
    "Personal Development",
    "Business",
    "Arts & Culture",
    "Education",
    "Science",
  ];

  // Writing tips array
  const writingTips = [
    "Great stories often start with a captivating first paragraph that draws readers in instantly.",
    "Use specific details rather than general statements to make your writing more vivid.",
    "Break up long paragraphs to improve readability and visual appeal.",
    "End your post with a question or call to action to engage readers.",
    "Include relevant personal experiences to connect with your audience.",
  ];

  // Fetch blog data if not passed through location state
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await api.get(
          `${ApiRoutes.Get_Blog.path.replace(":id", id)}`,
          {
            authenticate: ApiRoutes.Get_Blog.authenticate,
          }
        );

        const blogData = response.data;
        setTitle(blogData.title);
        setContent(blogData.content);
        setCategory(blogData.category);

        if (blogData.image) {
          setImage(blogData.image);
          setPreview(blogData.image);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        toast.error("Failed to load blog data");
        navigate("/my-blogs");
      }
    };

    if (passedBlogData) {
      // Use passed data if available
      setTitle(passedBlogData.title);
      setContent(passedBlogData.content);
      setCategory(passedBlogData.category);

      if (passedBlogData.image) {
        setImage(passedBlogData.image);
        setPreview(passedBlogData.image);
      }
    } else if (id) {
      // Otherwise fetch data
      fetchBlogData();
    }
  }, [id, passedBlogData, navigate]);

  // Handle click outside category menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategoryMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Show tips box on component mount
  useEffect(() => {
    setShowTipsBox(true);
  }, []);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // File size validation (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    // Create image preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      setImage(reader.result); // Store base64 string
    };
    reader.readAsDataURL(file); // Convert to base64
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Toggle expanded tips
  const toggleTips = () => {
    setExpandedTips(!expandedTips);
  };

  // Close tips box
  const closeTipsBox = () => {
    setShowTipsBox(false);
  };

  // Update blog post
  const updatePost = async () => {
    const formData = {
      title,
      content,
      category,
      image,
    };

    // Basic validation
    if (!title || !content) {
      toast.error("Please add a title and content for your blog");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.put(
        ApiRoutes.Update_Blog.path.replace(":id", id),
        formData,
        {
          authenticate: ApiRoutes.Update_Blog.authenticate,
        }
      );
      toast.success(response.message || "Blog updated successfully");
      // Show success state
      setIsSaved(true);
      // Navigate back to blog detail or my blogs page
      setTimeout(() => {
        navigate("/blogs");
      }, 1500);
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error(error.message || "Failed to update blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get placeholder text based on time of day
  const getPlaceholderText = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good morning! Share your thoughts with the world...";
    } else if (hour < 18) {
      return "What's on your mind this afternoon?";
    } else {
      return "Evening thoughts tend to be the most reflective...";
    }
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Loader2 size={32} className='animate-spin text-teal-600' />
        <span className='ml-2 text-slate-700'>Loading blog content...</span>
      </div>
    );
  }

  return (
    <div className='flex flex-col min-h-screen bg-slate-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      {/* Top toolbar */}
      <div className='bg-white border-b border-slate-200 px-4 py-3 flex justify-between items-center sticky top-0 z-10'>
        <div className='flex items-center gap-2'>
          <Coffee className='text-teal-600' size={24} />
          <span className='font-semibold text-slate-800'>StorySpace</span>
        </div>

        <div className='flex items-center gap-3'>
          {/* Category selector */}
          <div className='relative' ref={categoryRef}>
            <button
              onClick={() => setShowCategoryMenu(!showCategoryMenu)}
              className='flex items-center gap-2 px-3 py-1.5 text-sm rounded-full bg-slate-100 hover:bg-slate-200 transition-colors'
            >
              <Tag size={16} className='text-slate-600' />
              <span>{category || "Category"}</span>
            </button>

            {showCategoryMenu && (
              <div className='absolute right-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-20'>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-100 transition-colors ${
                      category === cat ? "bg-slate-100 text-teal-600" : ""
                    }`}
                    onClick={() => {
                      setCategory(cat);
                      setShowCategoryMenu(false);
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Image upload button */}
          <button
            onClick={triggerFileInput}
            className='flex items-center gap-2 px-3 py-1.5 text-sm rounded-full bg-slate-100 hover:bg-slate-200 transition-colors'
          >
            <Image size={16} className='text-slate-600' />
            <span>{preview ? "Change Cover" : "Add Cover"}</span>
          </button>
          <input
            type='file'
            ref={fileInputRef}
            onChange={handleImageChange}
            accept='image/*'
            className='hidden'
          />

          {/* Update button */}
          <button
            onClick={updatePost}
            disabled={isSubmitting}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-medium text-white transition-colors ${
              isSaved ? "bg-green-500" : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className='animate-spin' />
                <span>Updating...</span>
              </>
            ) : isSaved ? (
              <>
                <Check size={16} />
                <span>Updated!</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Update</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main editor area */}
      <div className='flex-1 flex flex-col items-center pb-20'>
        <div className='w-full max-w-3xl px-4 py-6'>
          {/* Cover image */}
          {preview && (
            <div className='mb-8 rounded-xl overflow-hidden h-64 md:h-80 w-full relative'>
              <img
                src={preview}
                alt='Cover'
                className='w-full h-full object-cover'
              />
              <button
                onClick={() => {
                  setPreview(null);
                  setImage(null);
                }}
                className='absolute top-2 right-2 bg-white bg-opacity-75 rounded-full p-1.5 hover:bg-opacity-100 transition-all'
              >
                <X size={16} className='text-slate-700' />
              </button>
            </div>
          )}

          {/* Title input */}
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Your Story Title'
            className='w-full text-4xl font-bold mb-6 px-0 py-2 border-0 border-b-2 border-transparent focus:border-b-teal-500 bg-transparent outline-none'
          />

          {/* Content textarea */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={getPlaceholderText()}
            className='w-full text-lg leading-relaxed resize-none min-h-[400px] px-0 py-2 border-0 bg-transparent outline-none'
          />
        </div>
      </div>

      {/* Editing tips sidebar with close button and expandable tips */}
      {showTipsBox && (
        <div className='fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-slate-200 p-4 max-w-xs transition-all duration-300'>
          <div className='flex justify-between items-center mb-2'>
            <h3 className='font-semibold text-slate-800 flex items-center gap-2'>
              <Coffee size={16} className='text-teal-600' />
              <span>Editing Tips</span>
            </h3>
            <button
              onClick={closeTipsBox}
              className='text-slate-400 hover:text-slate-600 transition-colors'
            >
              <X size={16} />
            </button>
          </div>

          {expandedTips ? (
            <div className='text-sm text-slate-600 space-y-3'>
              {writingTips.map((tip, index) => (
                <p
                  key={index}
                  className='pb-2 border-b border-slate-100 last:border-0'
                >
                  {tip}
                </p>
              ))}
            </div>
          ) : (
            <p className='text-sm text-slate-600 mb-3'>{writingTips[0]}</p>
          )}

          <div className='flex justify-end'>
            <button
              onClick={toggleTips}
              className='text-xs text-teal-600 hover:text-teal-800 transition-colors'
            >
              {expandedTips ? "Less tips ↑" : "More tips ↓"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBlog;
