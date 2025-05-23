import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import ApiRoutes from "../utils/ApiRoutes";
import api from "../services/ApiService";
import toast from "react-hot-toast";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(["All"]);
  const [authors, setAuthors] = useState(["All"]);
  // Change to arrays to support multiple selections
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [selectedAuthors, setSelectedAuthors] = useState(["All"]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Predefined categories
  const predefinedCategories = [
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

  // Fetch blogs based on selected filters
  const fetchBlogs = async (
    categoryFilters = ["All"],
    authorFilters = ["All"]
  ) => {
    try {
      setIsLoading(true);

      // Prepare query string - important change here for multiple selections
      let queryParams = new URLSearchParams();

      // Add categories to query (if not "All")
      if (!categoryFilters.includes("All")) {
        categoryFilters.forEach((category) => {
          queryParams.append("category", category);
        });
      }

      // Add authors to query (if not "All")
      if (!authorFilters.includes("All")) {
        authorFilters.forEach((author) => {
          queryParams.append("author", author);
        });
      }

      // Construct endpoint with query string
      const queryString = queryParams.toString();
      const endpoint = queryString
        ? `${ApiRoutes.Get_Blogs.path}?${queryString}`
        : ApiRoutes.Get_Blogs.path;

      console.log("Fetching blogs from endpoint:", endpoint);

      const response = await api.get(endpoint, {
        authenticate: ApiRoutes.Get_Blogs.authenticate,
      });

      const data = response.data || [];
      setBlogs(data);

      // Only update categories and authors on initial load or when resetting filters
      if (categoryFilters.includes("All") && authorFilters.includes("All")) {
        // Extract unique categories from the data
        const uniqueCategories = Array.from(
          new Set(data.map((blog) => blog.category))
        );

        // Merge predefined categories with those from data
        const mergedCategories = Array.from(
          new Set(["All", ...predefinedCategories, ...uniqueCategories])
        );
        setCategories(mergedCategories);

        // Extract unique authors from the data
        const uniqueAuthors = Array.from(
          new Set(data.map((blog) => blog.userId?.name).filter(Boolean))
        );
        setAuthors(["All", ...uniqueAuthors]);

        toast.success(response.message);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Apply filters and close modal
  const applyFilters = () => {
    fetchBlogs(selectedCategories, selectedAuthors);
    setIsFilterModalOpen(false);
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedCategories(["All"]);
    setSelectedAuthors(["All"]);
    fetchBlogs(["All"], ["All"]);
    setIsFilterModalOpen(false);
  };

  // Handle removing a specific filter
  const removeFilter = (type, value) => {
    if (type === "category") {
      const newCategories = selectedCategories.filter((cat) => cat !== value);
      setSelectedCategories(newCategories.length ? newCategories : ["All"]);
      fetchBlogs(
        newCategories.length ? newCategories : ["All"],
        selectedAuthors
      );
    } else if (type === "author") {
      const newAuthors = selectedAuthors.filter((auth) => auth !== value);
      setSelectedAuthors(newAuthors.length ? newAuthors : ["All"]);
      fetchBlogs(selectedCategories, newAuthors.length ? newAuthors : ["All"]);
    }
  };

  // Filter Modal Component
  const FilterModal = () => {
    // Use temporary state for categories and authors
    const [tempCategories, setTempCategories] = useState([
      ...selectedCategories,
    ]);
    const [tempAuthors, setTempAuthors] = useState([...selectedAuthors]);

    // Toggle selection for a category
    const toggleCategory = (category) => {
      if (category === "All") {
        setTempCategories(["All"]);
        return;
      }

      let newCategories = [...tempCategories];

      // Remove "All" if it's there
      newCategories = newCategories.filter((cat) => cat !== "All");

      if (newCategories.includes(category)) {
        // Remove the category if already selected
        newCategories = newCategories.filter((cat) => cat !== category);
        // If no categories left, add "All"
        if (newCategories.length === 0) {
          newCategories = ["All"];
        }
      } else {
        // Add the category
        newCategories.push(category);
      }

      setTempCategories(newCategories);
    };

    // Toggle selection for an author
    const toggleAuthor = (author) => {
      if (author === "All") {
        setTempAuthors(["All"]);
        return;
      }

      let newAuthors = [...tempAuthors];

      // Remove "All" if it's there
      newAuthors = newAuthors.filter((auth) => auth !== "All");

      if (newAuthors.includes(author)) {
        // Remove the author if already selected
        newAuthors = newAuthors.filter((auth) => auth !== author);
        // If no authors left, add "All"
        if (newAuthors.length === 0) {
          newAuthors = ["All"];
        }
      } else {
        // Add the author
        newAuthors.push(author);
      }

      setTempAuthors(newAuthors);
    };

    // Handle Apply button click
    const handleApply = () => {
      setSelectedCategories(tempCategories);
      setSelectedAuthors(tempAuthors);
      fetchBlogs(tempCategories, tempAuthors);
      setIsFilterModalOpen(false);
    };

    return (
      <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto'>
        <div className='bg-white dark:bg-charcoal-900 rounded-2xl shadow-xl w-full max-w-md transform transition-all overflow-hidden'>
          {/* Modal Header with gradient */}
          <div className='bg-gradient-to-r from-teal-500 to-indigo-600 p-6'>
            <div className='flex justify-between items-center'>
              <h3 className='text-2xl font-bold text-white'>Filter Blogs</h3>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className='text-white hover:text-white/80 transition-colors'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <p className='text-white/90 mt-2'>
              Fine-tune your blog discovery experience
            </p>
          </div>

          {/* Modal Body */}
          <div className='p-6 max-h-[70vh] overflow-y-auto'>
            {/* Category Section */}
            <div className='mb-8'>
              <h4 className='text-lg font-semibold mb-4 flex items-center text-charcoal-800 dark:text-white'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 mr-2 text-teal-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
                  />
                </svg>
                Categories
              </h4>
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      tempCategories.includes(category)
                        ? "bg-teal-500 text-white shadow-md"
                        : "bg-gray-100 hover:bg-teal-100 text-charcoal-700 hover:text-teal-600"
                    }`}
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Author Section */}
            <div className='mb-6'>
              <h4 className='text-lg font-semibold mb-4 flex items-center text-charcoal-800 dark:text-white'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 mr-2 text-indigo-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                  />
                </svg>
                Authors
              </h4>
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                {authors.map((author) => (
                  <button
                    key={author}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      tempAuthors.includes(author)
                        ? "bg-indigo-500 text-white shadow-md"
                        : "bg-gray-100 hover:bg-indigo-100 text-charcoal-700 hover:text-indigo-600"
                    }`}
                    onClick={() => toggleAuthor(author)}
                  >
                    {author}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className='bg-gray-50 dark:bg-charcoal-800 px-6 py-4 flex justify-between items-center'>
            <button
              onClick={resetFilters}
              className='text-gray-500 hover:text-red-500 font-medium flex items-center transition-colors'
            >
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
                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                />
              </svg>
              Reset
            </button>
            <div className='flex space-x-3'>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors'
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className='px-6 py-2 bg-gradient-to-r from-teal-500 to-indigo-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all'
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-offwhite py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex justify-center items-center h-64'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500'></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-offwhite py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div
            className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
            role='alert'
          >
            <strong className='font-bold'>Error!</strong>
            <span className='block sm:inline'> {error}</span>
          </div>
        </div>
      </div>
    );
  }

  // Count total active filters
  const totalActiveFilters =
    (selectedCategories.includes("All") ? 0 : selectedCategories.length) +
    (selectedAuthors.includes("All") ? 0 : selectedAuthors.length);

  return (
    <div className='min-h-screen bg-offwhite py-12 px-4 sm:px-6 lg:px-8 bg-pattern'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4 text-gradient'>
            Discover Blogs
          </h1>
          <p className='text-lg md:text-xl text-charcoal-800/70 max-w-3xl mx-auto'>
            Explore a world of insightful articles written by talented authors
          </p>
        </div>

        {/* Filter Button */}
        <div className='flex justify-center mb-10'>
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className='flex items-center px-5 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all group border border-gray-100'
          >
            <span className='mr-2 bg-gradient-to-r from-teal-500 to-indigo-600 p-2 rounded-full group-hover:scale-110 transition-transform'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4 text-white'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'
                />
              </svg>
            </span>
            <span className='font-medium text-charcoal-800'>Filter Blogs</span>
            {totalActiveFilters > 0 && (
              <span className='ml-2 bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full'>
                {totalActiveFilters}
              </span>
            )}
          </button>
        </div>

        {/* Active filters display */}
        {totalActiveFilters > 0 && (
          <div className='mb-6 flex justify-center flex-wrap gap-2'>
            <div className='text-sm text-charcoal-800/70'>Active filters:</div>

            {/* Display active category filters */}
            {!selectedCategories.includes("All") &&
              selectedCategories.map((category) => (
                <div
                  key={`cat-${category}`}
                  className='bg-teal-100 text-teal-800 text-sm px-3 py-1 rounded-full flex items-center'
                >
                  Category: {category}
                  <button
                    onClick={() => removeFilter("category", category)}
                    className='ml-2 text-teal-600 hover:text-teal-800'
                  >
                    ✕
                  </button>
                </div>
              ))}

            {/* Display active author filters */}
            {!selectedAuthors.includes("All") &&
              selectedAuthors.map((author) => (
                <div
                  key={`auth-${author}`}
                  className='bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full flex items-center'
                >
                  Author: {author}
                  <button
                    onClick={() => removeFilter("author", author)}
                    className='ml-2 text-indigo-600 hover:text-indigo-800'
                  >
                    ✕
                  </button>
                </div>
              ))}

            {/* Clear all button */}
            {totalActiveFilters > 0 && (
              <button
                onClick={resetFilters}
                className='text-sm text-red-600 hover:text-red-800 underline ml-2'
              >
                Clear all
              </button>
            )}
          </div>
        )}

        {/* Blog grid */}
        {blogs.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className='text-center py-12'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-16 w-16 mx-auto text-teal-500/50 mb-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
              />
            </svg>
            <h3 className='text-xl font-bold mb-2'>No blogs found</h3>
            <p className='text-charcoal-800/70'>
              {!selectedCategories.includes("All") &&
              !selectedAuthors.includes("All")
                ? `No blogs found with the selected categories and authors.`
                : !selectedCategories.includes("All")
                ? `No blogs found in the selected categories.`
                : !selectedAuthors.includes("All")
                ? `No blogs found by the selected authors.`
                : "No blogs available at the moment."}
            </p>
          </div>
        )}
      </div>

      {/* Render the filter modal if open */}
      {isFilterModalOpen && <FilterModal />}
    </div>
  );
};

export default AllBlogs;
