import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, User, MessageSquare, Briefcase, Clock } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project_type: 'Custom Web App + Admin Suite',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');

  const projectTypes = [
    'Custom Web App + Admin Suite',
    'Bespoke Admin Portal / Internal Tool',
    'E-Commerce & Inventory Management',
    'API & Cloud Backend Architecture',
    'Platform Modernization & Redesign'
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details about your project requirements';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      // Insert into Supabase table "contact_submissions"
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            full_name: formData.name.trim(),
            email: formData.email.trim(),
            service_type: formData.project_type,
            message: formData.message.trim(),
            created_at: new Date().toISOString()
          }
        ]);

      if (error) {
        throw error;
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        project_type: 'Custom Web App + Admin Suite',
        message: ''
      });
    } catch (err) {
      console.error('Supabase contact submission error:', err);
      setSubmitStatus('error');
      setErrorMessage(
        err.message || 'Unable to submit your message right now. Please try again or email contact@nirmaansoftworks.com.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-16 px-gutter bg-background relative z-10">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact & Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-outline-variant w-fit shadow-sm">
              <Mail className="w-4 h-4 text-accent-warm" />
              <span className="font-label-md text-sm font-bold text-text-main uppercase tracking-wider">
                Direct Contact
              </span>
            </div>

            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-main tracking-tight leading-[1.15]">
              Let’s Build Your Solution.
            </h2>

            <p className="font-body text-base text-text-muted leading-relaxed">
              Tell us about your project, workflow requirements, and the admin tools your team needs. We’ll respond with a transparent timeline and scope estimate.
            </p>

            <div className="space-y-4 pt-4 border-t border-surface-container-high">
              <div className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-outline-variant">
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-text-main">
                  <Mail className="w-5 h-5 text-accent-warm" />
                </div>
                <div>
                  <p className="font-label text-sm text-text-muted uppercase">Direct Email</p>
                  <a href="mailto:contact@nirmaansoftworks.com" className="font-headline font-bold text-text-main hover:text-amber-600 transition-colors">
                    contact@nirmaansoftworks.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-outline-variant">
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-text-main">
                  <Clock className="w-5 h-5 text-accent-warm" />
                </div>
                <div>
                  <p className="font-label text-sm text-text-muted uppercase">Response Window</p>
                  <p className="font-headline font-bold text-text-main text-base">
                    Within 24 Business Hours
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7 bg-surface p-8 sm:p-10 rounded-2xl border border-outline-variant shadow-xl relative"
          >
            <h3 className="font-headline text-2xl font-bold text-text-main mb-2">
              Request a Project Proposal
            </h3>
            <p className="font-body text-sm text-text-muted mb-8">
              Fill in your details below and we will get back to you with a preliminary technical estimate.
            </p>

            {/* Success Toast */}
            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-6 p-4 bg-emerald-50 border border-emerald-300 rounded-xl flex items-start gap-3 text-emerald-900"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-base">Message Sent Successfully!</p>
                    <p className="text-sm mt-0.5">
                      Thank you for contacting us. Our engineering team will review your requirements and reach out promptly.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Banner */}
            <AnimatePresence>
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-300 rounded-xl flex items-start gap-3 text-red-900"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-base">Submission Notice</p>
                    <p className="text-sm mt-0.5">{errorMessage}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block font-label-md text-sm font-bold text-text-main uppercase mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className={`w-full pl-10 pr-4 py-3 bg-background border rounded-DEFAULT text-sm sm:text-base font-medium text-text-main focus:outline-none transition-colors ${
                        errors.name
                          ? 'border-red-500 focus:border-red-600'
                          : 'border-outline-variant focus:border-text-main'
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-sm text-red-500 mt-1 font-medium">{errors.name}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block font-label-md text-sm font-bold text-text-main uppercase mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className={`w-full pl-10 pr-4 py-3 bg-background border rounded-DEFAULT text-sm sm:text-base font-medium text-text-main focus:outline-none transition-colors ${
                        errors.email
                          ? 'border-red-500 focus:border-red-600'
                          : 'border-outline-variant focus:border-text-main'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-sm text-red-500 mt-1 font-medium">{errors.email}</p>}
                </div>
              </div>

              {/* Project Type Selector */}
              <div>
                <label htmlFor="project_type" className="block font-label-md text-sm font-bold text-text-main uppercase mb-2">
                  Project Category
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5 pointer-events-none" />
                  <select
                    id="project_type"
                    name="project_type"
                    value={formData.project_type}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-outline-variant rounded-DEFAULT text-sm sm:text-base font-medium text-text-main focus:border-text-main focus:outline-none appearance-none cursor-pointer"
                  >
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message Details */}
              <div>
                <label htmlFor="message" className="block font-label-md text-sm font-bold text-text-main uppercase mb-2">
                  Project Requirements & Scope <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your requirements, features needed, desired timeline, and admin preferences..."
                  className={`w-full p-4 bg-background border rounded-DEFAULT text-sm sm:text-base font-medium text-text-main focus:outline-none transition-colors ${
                    errors.message
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-outline-variant focus:border-text-main'
                  }`}
                />
                {errors.message && <p className="text-sm text-red-500 mt-1 font-medium">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent-warm text-text-main font-label-md text-base font-bold py-3.5 px-6 rounded-DEFAULT hover:shadow-xl hover:shadow-accent-warm/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Project Inquiry</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
