import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import MouseFollower from './components/MouseFollower';
import { RouterProvider, useRouter } from './context/RouterContext';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';

function PageContent() {
  const { currentPath } = useRouter();

  const renderPage = () => {
    if (currentPath === '/blog') {
      return <BlogPage />;
    }
    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '');
      return <BlogPostPage slug={slug} />;
    }

    switch (currentPath) {
      case '/services':
      case '/why-us':
        return <ServicesPage />;
      case '/portfolio':
        return <PortfolioPage />;
      case '/contact':
        return <ContactPage />;
      case '/':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-text-main font-sans selection:bg-accent-warm selection:text-text-main flex flex-col justify-between relative">
      {/* Interactive Cursor Follower */}
      <MouseFollower />

      {/* Sticky Top Navbar */}
      <Navbar />

      {/* Dynamic Dedicated Page View with Rounded Bottom Sheet */}
      <main className="flex-grow relative z-10 bg-background rounded-b-[36px] sm:rounded-b-[48px] md:rounded-b-[56px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] overflow-hidden">
        {renderPage()}
      </main>

      {/* Floating Bottom Navigation Bar for Mobile Views */}
      <MobileBottomNav />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <PageContent />
    </RouterProvider>
  );
}
