import React from 'react';
import Hero from '../components/Hero';
import AdminPreviewSection from '../components/AdminPreviewSection';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <Hero />

      {/* Main Selling Point: Interactive Admin Control Preview */}
      <AdminPreviewSection />

      {/* Unified Services & Why Us Section */}
      <Services />

      {/* Portfolio Highlight */}
      <Portfolio />

      {/* Standards & Commitments */}
      <Testimonials />

      {/* Contact Section */}
      <ContactForm isHomePage={true} />
    </div>
  );
}
