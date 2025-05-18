// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./utils/ProtectedRoute";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import MyBlogs from "./pages/MyBlogs";
import AllBlogs from "./pages/AllBlogs";
import BlogDetail from "./components/BlogDetail";
import EditBlog from "./pages/EditBlog";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes without navbar */}
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />

        {/* Protected routes */}
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path='/create-blog' element={<CreateBlog />} />
          <Route path='/my-blogs' element={<MyBlogs />} />
          <Route path='/blogs' element={<AllBlogs />} />
          <Route path='/blog-detail/:id' element={<BlogDetail />} />
          <Route path='/edit-blog/:id' element={<EditBlog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
