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
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
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
  const fileInputRef = useRef(null);
  const categoryRef = useRef(null);
  const navigate = useNavigate();

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
      alert("Image size must be less than 5MB");
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

  // Publish blog post
  const publishPost = async () => {
    const formData = {
      title,
      content,
      category,
      image,
    };

    // Basic validation
    if (!title || !content) {
      alert("Please add a title and content for your blog");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post(ApiRoutes.Create_Blog.path, formData, {
        authenticate: ApiRoutes.Create_Blog.authenticate,
      });
      toast.success(response.message);
      // Show success state
      setIsSaved(true);
      navigate("/my-blogs");
    } catch (error) {
      console.error("Error publishing blog:", error);
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
                    className='w-full text-left px-4 py-2 text-sm hover:bg-slate-100 transition-colors'
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
            <span>Add Cover</span>
          </button>
          <input
            type='file'
            ref={fileInputRef}
            onChange={handleImageChange}
            accept='image/*'
            className='hidden'
          />

          {/* Publish button */}
          <button
            onClick={publishPost}
            disabled={isSubmitting}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-medium text-white transition-colors ${
              isSaved ? "bg-green-500" : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className='animate-spin' />
                <span>Publishing...</span>
              </>
            ) : isSaved ? (
              <>
                <Check size={16} />
                <span>Published!</span>
              </>
            ) : (
              <>
                <ArrowUpRight size={16} />
                <span>Publish</span>
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
            <div className='mb-8 rounded-xl overflow-hidden h-64 md:h-80 w-full'>
              <img
                src={preview}
                alt='Cover'
                className='w-full h-full object-cover'
              />
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

      {/* Inspiration sidebar with close button and expandable tips */}
      {showTipsBox && (
        <div className='fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-slate-200 p-4 max-w-xs transition-all duration-300'>
          <div className='flex justify-between items-center mb-2'>
            <h3 className='font-semibold text-slate-800 flex items-center gap-2'>
              <Coffee size={16} className='text-teal-600' />
              <span>Writing Tips</span>
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

export default CreateBlog;
