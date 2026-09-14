import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageSquare, ShieldCheck } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import { COMPANY_INFO } from '../constants/content';

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20 bg-background text-text-main min-h-screen">
      {/* Page Header Banner */}
      <section className="py-16 md:py-24 px-gutter bg-surface border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-container-max mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-extrabold text-text-main tracking-tight leading-tight mb-5">
              Let's Discuss Your Custom Build
            </h1>
            <p className="font-body text-base sm:text-lg text-text-muted leading-relaxed mb-4">
              Have a project in mind or need tailored software consultation? Reach out today for a discovery session and project estimate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Interactive Consultation Form Section */}
      <div className="py-6">
        <ContactForm />
      </div>

      {/* Additional Details: Contact Info & Expectations */}
      <section className="pb-16 px-gutter max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Direct Contact Details Card */}
          <div className="bg-surface border border-slate-200 rounded-2xl p-8 shadow-xs card-hover-lift">
            <h2 className="font-headline text-xl font-bold text-text-main mb-6 flex items-center gap-2">
              <Phone className="w-5 h-5 text-amber-600" />
              Direct Contacts
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-amber-600 flex-shrink-0 shadow-xs">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm text-text-muted uppercase tracking-wider font-bold block mb-1">Email</span>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="font-body text-base text-text-main font-bold hover:text-amber-600 transition-colors">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-amber-600 flex-shrink-0 shadow-xs">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm text-text-muted uppercase tracking-wider font-bold block mb-1">Phone</span>
                  <a href={`tel:${COMPANY_INFO.phone}`} className="font-body text-base text-text-main font-bold hover:text-amber-600 transition-colors">
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-amber-600 flex-shrink-0 shadow-xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm text-text-muted uppercase tracking-wider font-bold block mb-1">Location</span>
                  <span className="font-body text-base text-text-main font-semibold block">
                    {COMPANY_INFO.address}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-amber-600 flex-shrink-0 shadow-xs">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm text-text-muted uppercase tracking-wider font-bold block mb-1">Hours</span>
                  <span className="font-body text-base text-text-main font-semibold block">
                    Mon - Fri: 9:00 AM - 6:00 PM IST
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Consultation Process Expectations Card */}
          <div className="bg-surface border border-slate-200 rounded-2xl p-8 shadow-xs card-hover-lift">
            <h3 className="font-headline text-xl font-bold text-text-main mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              What Happens Next?
            </h3>
            <ol className="space-y-4 text-base text-text-muted">
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-900 font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                <span>We review your project requirements and technical scope within 24 hours.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-900 font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                <span>We schedule a 30-minute discovery video call with our software architect.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-900 font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                <span>You receive a detailed technical proposal with fixed scope, timeline, and deliverables.</span>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
