import { Route, Routes } from "react-router-dom";
// Import QueryClient and QueryClientProvider
import SignInForm from "./_auth/forms/SignInForm.tsx";
import SignUpForm from "./_auth/forms/SignUpForm.tsx";
import Home from "./_root/Pages/Home";
import AuthLayout from "./_auth/AuthLayout";
import Explore from "./_root/Pages/Explore";
import PostDetails from "./_root/Pages/PostDetails";
import Profile from "./_root/Pages/Profile";
import UpdateProfile from "./_root/Pages/UpdateProfile";
import EditPost from "./_root/Pages/EditPost";
import CreatPost from "./_root/Pages/CreatPost";
import AllUsers from "./_root/Pages/AllUsers";
import Saved from "./_root/Pages/Saved";
import RootLayout from "./_root/RootLayout";
import PostsLike from "./_root/Pages/PostsLike.tsx";
import YourPosts from "./_root/Pages/YourPosts .tsx";

const App = () => {
  return (
    <Routes>
      {/**public routs */}
      <Route element={<AuthLayout />}>
        <Route path="/signIn" element={<SignInForm />} />
        <Route path="/signUp" element={<SignUpForm />} />
      </Route>

      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/all-users" element={<AllUsers />} />
        <Route path="/create-post" element={<CreatPost />} />
        <Route path="/updatePost/:id" element={<EditPost />} />
        <Route path="posts/:id" element={<PostDetails />} />
        <Route path="profile/:id" element={<Profile />}>
          <Route index element={<YourPosts />} />
          <Route path="posts-likes" element={<PostsLike />} />
          <Route path="saved" element={<Saved />} />
        </Route>
        <Route path="/update-profile/:id" element={<UpdateProfile />} />
      </Route>
    </Routes>
  );
};

export default App;
