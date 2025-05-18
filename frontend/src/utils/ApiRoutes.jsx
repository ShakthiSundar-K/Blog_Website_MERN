const ApiRoutes = {
  SignIn: {
    path: "/api/auth/login",
    authenticate: false,
  },
  SignUp: {
    path: "/api/auth/signup",
    authenticate: false,
  },
  Get_Blogs: {
    path: "/api/blogs",
    authenticate: true,
  },
  Create_Blog: {
    path: "/api/blogs",
    authenticate: true,
  },
  Update_Blog: {
    path: "/api/blogs/:id",
    authenticate: true,
  },
  Delete_Blog: {
    path: "/api/blogs/:id",
    authenticate: true,
  },
};

export default ApiRoutes;
