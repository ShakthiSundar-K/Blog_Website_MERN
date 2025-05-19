import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  // Calculate time difference for "posted X days ago"
  const getTimeAgo = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffTime = Math.abs(now - postDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  // Get author initials for avatar
  const getAuthorInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  // Handle card click to navigate to blog detail page with blog data as state
  const handleCardClick = () => {
    navigate(`/blog-detail/${blog._id}`, { state: { blogData: blog } });
  };

  return (
    <div
      className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer'
      onClick={handleCardClick}
    >
      <img
        src={blog.image}
        alt={blog.title}
        className='w-full h-48 object-cover'
      />
      <div className='p-6'>
        <div className='flex justify-between items-center mb-3'>
          <span className='px-3 py-1 bg-teal-500/10 text-teal-500 text-xs font-medium rounded-full'>
            {blog.category}
          </span>
          <span className='text-xs text-charcoal-800/50'>
            {getTimeAgo(blog.createdAt)}
          </span>
        </div>
        <h3 className='text-xl font-bold mb-2 line-clamp-2'>{blog.title}</h3>
        <p className='text-charcoal-800/70 text-sm mb-4 line-clamp-3'>
          {blog.content}
        </p>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <div className='w-8 h-8 rounded-full bg-coral-500/20 flex items-center justify-center text-coral-500 font-medium'>
              {getAuthorInitials(blog.author)}
            </div>
            <span className='ml-2 text-sm text-charcoal-800/70'>
              {blog.author}
            </span>
          </div>
          <button
            className='text-teal-500 hover:text-teal-600 text-sm font-medium'
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/blog-detail/${blog._id}`, {
                state: { blogData: blog },
              });
            }}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
