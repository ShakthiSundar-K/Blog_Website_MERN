import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ApiRoutes from "../utils/ApiRoutes";
import api from "../services/ApiService";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Get blog data from location state if available
  const passedBlogData = location.state?.blogData;

  const [blog, setBlog] = useState(passedBlogData || null);
  const [isLoading, setIsLoading] = useState(!passedBlogData);
  const [error, setError] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setIsLoading(true);

        // Check if current user is the author
        const currentUserData = sessionStorage.getItem("user");

        if (currentUserData) {
          const currentUser = JSON.parse(currentUserData);
          const blogData = passedBlogData || blog;

          // Check if the user ID matches the blog author's ID
          const authorId = blogData?.userId?._id || blogData?.userId;
          const userId = currentUser?.userId;

          setIsAuthor(userId === authorId);
        } else {
          setIsAuthor(false);
        }
      } catch (err) {
        console.error("Error fetching blog details:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id, passedBlogData, blog]);

  // Updated to pass blog data when navigating to edit page
  const handleEdit = () => {
    navigate(`/edit-blog/${id}`, { state: { blogData: blog } });
  };

  const handleDeleteConfirm = async () => {
    // Check if title matches
    if (confirmTitle !== blog.title) {
      setDeleteError("Title does not match. Please try again.");
      return;
    }

    try {
      const response = await api.delete(
        ApiRoutes.Delete_Blog.path.replace(":id", id),
        { authenticate: ApiRoutes.Delete_Blog.authenticate }
      );
      console.log("Blog deleted successfully:", response);
      navigate("/blogs");
    } catch (err) {
      console.error("Error deleting blog:", err);
      setDeleteError(err.message);
    }
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Estimate reading time
  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-pattern py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center'>
        <div className='flex flex-col items-center animate-fadeIn'>
          <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500'></div>
          <p className='mt-4 text-teal-500 font-medium'>Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className='min-h-screen bg-pattern py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto'>
          <div
            className='bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-sm'
            role='alert'
          >
            <div className='flex'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-5 w-5 text-red-500'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='ml-3'>
                <p className='text-sm font-medium'>
                  {error || "Blog not found"}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate("/blogs")}
            className='mt-6 inline-flex items-center px-5 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 mr-2'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z'
                clipRule='evenodd'
              />
            </svg>
            Back to All Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-pattern'>
      {/* Hero Section */}
      <div className='relative h-[50vh] sm:h-[65vh]'>
        <div className='absolute inset-0 bg-charcoal-800/30 z-10'></div>
        <img
          src={blog.image}
          alt={blog.title}
          className='w-full h-full object-cover'
        />
        {/* Gradient overlay */}
        <div className='absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-charcoal-800/90 to-transparent z-10'></div>

        {/* Navigation */}
        <div className='absolute top-0 left-0 w-full p-6 z-20'>
          <button
            onClick={() => navigate("/blogs")}
            className='inline-flex items-center text-white hover:text-teal-200 font-medium transition duration-200 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 mr-2'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z'
                clipRule='evenodd'
              />
            </svg>
            Back to All Blogs
          </button>
        </div>

        {/* Hero content positioned over the image */}
        <div className='absolute bottom-0 left-0 z-20 w-full p-6 sm:p-12 max-w-4xl mx-auto'>
          <div className='flex flex-wrap items-center gap-3 mb-4'>
            <span className='px-3 py-1 bg-coral-500 text-white text-xs font-bold rounded-full'>
              {blog.category}
            </span>
            <span className='text-white/80 text-sm flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4 mr-1'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              {calculateReadingTime(blog.content)}
            </span>
            <span className='text-white/80 text-sm'>
              {formatDate(blog.createdAt)}
            </span>
          </div>

          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6'>
            {blog.title}
          </h1>

          {/* Author Info */}
          <div className='flex items-center'>
            <div className='w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-coral-500 flex items-center justify-center text-white font-medium text-lg shadow-lg'>
              {blog.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className='ml-4'>
              <h3 className='font-medium text-white'>{blog.author}</h3>
              <p className='text-sm text-white/70'>Content Creator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className='max-w-4xl mx-auto px-4 sm:px-6 relative z-20 -mt-6 sm:-mt-12'>
        <div className='bg-white rounded-xl shadow-xl overflow-hidden animate-fadeIn'>
          {/* Author Actions */}
          {isAuthor && (
            <div className='flex items-center gap-4 p-6 sm:p-10 border-b border-slate-100'>
              <button
                onClick={handleEdit}
                className='inline-flex items-center px-4 py-2 border border-teal-500 text-sm font-medium rounded-md text-teal-600 bg-white hover:bg-teal-50 transition duration-200'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4 mr-2'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                  />
                </svg>
                Edit Article
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className='inline-flex items-center px-4 py-2 border border-red-500 text-sm font-medium rounded-md text-red-600 bg-white hover:bg-red-50 transition duration-200'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4 mr-2'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                  />
                </svg>
                Delete Article
              </button>
            </div>
          )}

          {/* Blog Content */}
          <div className='p-6 sm:p-10'>
            <div className='prose prose-lg max-w-none prose-headings:font-playfair prose-headings:text-charcoal-800 prose-p:text-charcoal-800/90 prose-p:leading-relaxed prose-img:rounded-xl'>
              <div className='whitespace-pre-wrap'>{blog.content}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden'>
            <div className='absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-red-600 to-red-700'></div>
            <h3 className='text-xl font-bold mb-2 text-charcoal-800'>
              Delete Article
            </h3>
            <p className='text-slate-600 mb-6'>
              This action cannot be undone. Please type{" "}
              <strong className='text-red-600 font-semibold'>
                "{blog.title}"
              </strong>{" "}
              to confirm deletion.
            </p>

            <div className='mb-6'>
              <label
                htmlFor='confirm-title'
                className='block text-sm font-medium text-slate-700 mb-1'
              >
                Confirmation
              </label>
              <input
                id='confirm-title'
                type='text'
                placeholder='Type article title to confirm'
                className='w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500'
                value={confirmTitle}
                onChange={(e) => setConfirmTitle(e.target.value)}
              />
              {deleteError && (
                <p className='text-red-600 text-sm mt-2'>{deleteError}</p>
              )}
            </div>

            <div className='flex justify-end gap-3'>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setConfirmTitle("");
                  setDeleteError("");
                }}
                className='px-5 py-2.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium transition duration-200'
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={confirmTitle !== blog.title}
                className={`px-5 py-2.5 rounded-lg text-white font-medium transition duration-200 ${
                  confirmTitle === blog.title
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-red-300 cursor-not-allowed"
                }`}
              >
                Delete Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
