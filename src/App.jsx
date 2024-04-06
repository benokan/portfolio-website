import { BrowserRouter, Routes, Route } from "react-router-dom";

import { About, Contact, Experience, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
// Assuming PostsList and Post are correctly placed under ./components/Blog/
import { PostsList } from "./components/Blog/PostsList";
import { Post } from "./components/Blog/Post"; 

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <div className='relative z-0 bg-dark-blue '>
            <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
              <Hero />
            </div>
            <About />
            <Experience />
            <Tech />
            <Works />
            <div className='relative z-0'>
              <Contact />
              <StarsCanvas />
            </div>
          </div>
        } />
        {/* Blog route for listing posts */}
        <Route path="/blog" element={<PostsList />} />
        {/* Route for viewing an individual post */}
        <Route path="/blog/post/:pageId" element={<Post />} />
        {/* You can add more routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
