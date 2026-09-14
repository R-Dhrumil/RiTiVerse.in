import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import { RouterProvider, useRouter } from './context/RouterContext';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import PricingPage from './pages/PricingPage';
import WhyUsPage from './pages/WhyUsPage';
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
        return <ServicesPage />;
      case '/portfolio':
        return <PortfolioPage />;
      case '/pricing':
        return <PricingPage />;
      case '/why-us':
        return <WhyUsPage />;
      case '/contact':
        return <ContactPage />;
      case '/':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-main font-sans selection:bg-accent-warm selection:text-text-main flex flex-col justify-between relative">
      {/* Sticky Top Navbar */}
      <Navbar />

      {/* Dynamic Dedicated Page View */}
      <main className="flex-grow">
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
