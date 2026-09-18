import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sliders, 
  FileText, 
  Users, 
  Inbox, 
  Check, 
  Sparkles, 
  Eye, 
  ArrowRight,
  ShieldCheck,
  ToggleRight,
  ToggleLeft
} from 'lucide-react';
import { Link } from '../context/RouterContext';

export default function AdminPreviewSection() {
  const [activeTab, setActiveTab] = useState('cms');
  
  // Interactive mock states
  const [heroHeading, setHeroHeading] = useState('Transforming Your Business With Modern Technology');
  const [promoBanner, setPromoBanner] = useState(true);
  const [chatWidget, setChatWidget] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [leadStatus, setLeadStatus] = useState({
    'lead-1': 'New Lead',
    'lead-2': 'Contacted'
  });

  const updateLeadStatus = (id, newStatus) => {
    setLeadStatus(prev => ({ ...prev, [id]: newStatus }));
  };

  return (
    <section id="admin-control" className="pt-12 sm:pt-16 pb-16 sm:pb-20 px-gutter bg-surface-bright relative z-20 border-t border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-container-max mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-main tracking-tight">
            Tailored Admin Dashboards
          </h2>
          <p className="font-body text-base sm:text-lg text-text-muted mt-3">
            Every build includes a custom-engineered Admin Console. Test the interactive preview below to see how direct management works.
          </p>
        </motion.div>

        {/* Interactive Admin Console Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-surface border border-slate-300 rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto"
        >
          {/* Top Bar - Mac/SaaS Style */}
          <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <span className="text-sm font-mono font-bold text-amber-400 uppercase tracking-wider ml-1">
                Client Admin Console
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono">Live Interactive Demo</span>
            </div>
          </div>

          {/* Navigation Tabs with Animated Indicator */}
          <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 flex overflow-x-auto gap-2 py-2.5">
            {[
              { id: 'cms', label: 'Content CMS', icon: FileText },
              { id: 'toggles', label: 'Feature Switches', icon: Sliders },
              { id: 'leads', label: 'Leads & Inquiries', icon: Inbox },
              { id: 'roles', label: 'Team Roles', icon: Users }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap cursor-pointer z-10 ${
                    isActive ? 'text-text-main' : 'text-text-muted hover:text-text-main'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600' : ''}`} />
                  <span>{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="adminActiveTab"
                      className="absolute inset-0 bg-white rounded-lg shadow-sm border border-slate-200 -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content Body */}
          <div className="p-6 sm:p-8 min-h-[320px] bg-white">
            <AnimatePresence mode="wait">
              {/* 1. CMS Tab */}
              {activeTab === 'cms' && (
                <motion.div
                  key="cms"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-sm font-bold text-text-main uppercase tracking-wider">
                      Live Text Editor
                    </span>
                    <span className="text-sm text-amber-800 bg-amber-50 px-3 py-1 rounded-md font-bold">
                      Instant Live Sync
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-text-main mb-2">
                        Headline Copy
                      </label>
                      <input
                        type="text"
                        value={heroHeading}
                        onChange={(e) => setHeroHeading(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-base font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => setHeroHeading('Enterprise Software Solutions for Modern Scale')}
                          className="text-sm px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md font-semibold text-text-main transition-colors cursor-pointer"
                        >
                          Example: Enterprise SaaS
                        </button>
                        <button
                          onClick={() => setHeroHeading('High-Performance Digital Commerce Platform')}
                          className="text-sm px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md font-semibold text-text-main transition-colors cursor-pointer"
                        >
                          Example: E-Commerce
                        </button>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                      <div className="text-sm font-mono uppercase text-text-muted font-bold mb-2 flex items-center gap-1.5">
                        <Eye className="w-4 h-4 text-amber-600" />
                        Live Customer View:
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
                        <h5 className="font-headline font-extrabold text-base text-text-main leading-snug">
                          {heroHeading}
                        </h5>
                        <p className="text-sm text-text-muted mt-1.5">Updates instantly across all devices.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 2. Feature Switches Tab */}
              {activeTab === 'toggles' && (
                <motion.div
                  key="toggles"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-sm font-bold text-text-main uppercase tracking-wider">
                      Click to Toggle Features On/Off
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-text-main">Promo Banner</span>
                        <button onClick={() => setPromoBanner(!promoBanner)} className="cursor-pointer">
                          {promoBanner ? (
                            <ToggleRight className="w-8 h-8 text-emerald-600" />
                          ) : (
                            <ToggleLeft className="w-8 h-8 text-slate-400" />
                          )}
                        </button>
                      </div>
                      <span className={`text-sm font-bold mt-4 ${promoBanner ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {promoBanner ? 'Active on Site' : 'Disabled'}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-text-main">WhatsApp Chat</span>
                        <button onClick={() => setChatWidget(!chatWidget)} className="cursor-pointer">
                          {chatWidget ? (
                            <ToggleRight className="w-8 h-8 text-emerald-600" />
                          ) : (
                            <ToggleLeft className="w-8 h-8 text-slate-400" />
                          )}
                        </button>
                      </div>
                      <span className={`text-sm font-bold mt-4 ${chatWidget ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {chatWidget ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-text-main">Maintenance Alert</span>
                        <button onClick={() => setMaintenanceMode(!maintenanceMode)} className="cursor-pointer">
                          {maintenanceMode ? (
                            <ToggleRight className="w-8 h-8 text-amber-600" />
                          ) : (
                            <ToggleLeft className="w-8 h-8 text-slate-400" />
                          )}
                        </button>
                      </div>
                      <span className={`text-sm font-bold mt-4 ${maintenanceMode ? 'text-amber-600' : 'text-slate-400'}`}>
                        {maintenanceMode ? 'Active Notice' : 'Off'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 3. Leads Tab */}
              {activeTab === 'leads' && (
                <motion.div
                  key="leads"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-sm font-bold text-text-main uppercase tracking-wider">
                      Real-Time Inquiries
                    </span>
                    <span className="text-sm bg-slate-900 text-white font-bold px-3.5 py-1.5 rounded cursor-pointer">
                      Export CSV
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-base text-text-main">David Miller</p>
                        <p className="text-sm text-text-muted">Custom Web App + Admin Suite</p>
                      </div>
                      <button
                        onClick={() => updateLeadStatus('lead-1', leadStatus['lead-1'] === 'New Lead' ? 'Contacted' : 'New Lead')}
                        className={`text-sm px-3.5 py-1.5 rounded-md font-bold cursor-pointer transition-colors ${
                          leadStatus['lead-1'] === 'New Lead' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {leadStatus['lead-1']}
                      </button>
                    </div>

                    <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-base text-text-main">Rachel Adams</p>
                        <p className="text-sm text-text-muted">E-Commerce & Inventory Portal</p>
                      </div>
                      <button
                        onClick={() => updateLeadStatus('lead-2', leadStatus['lead-2'] === 'Contacted' ? 'Proposal Sent' : 'Contacted')}
                        className="text-sm px-3.5 py-1.5 rounded-md font-bold bg-blue-100 text-blue-800 cursor-pointer"
                      >
                        {leadStatus['lead-2']}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 4. Roles Tab */}
              {activeTab === 'roles' && (
                <motion.div
                  key="roles"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-sm font-bold text-text-main uppercase tracking-wider">
                      Role-Based Access Control (RBAC)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                      <div className="flex items-center gap-2 font-bold text-text-main mb-1.5">
                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                        Super Admin
                      </div>
                      <p className="text-text-muted text-sm leading-relaxed">Full control over billing, users & configs.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                      <div className="flex items-center gap-2 font-bold text-text-main mb-1.5">
                        <FileText className="w-5 h-5 text-blue-600" />
                        Content Editor
                      </div>
                      <p className="text-text-muted text-sm leading-relaxed">Edit copy, blogs, and media assets.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                      <div className="flex items-center gap-2 font-bold text-text-main mb-1.5">
                        <Inbox className="w-5 h-5 text-amber-600" />
                        Sales & Support
                      </div>
                      <p className="text-text-muted text-sm leading-relaxed">Manage customer inquiries and quotes.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Callout in Mockup */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-2 text-text-muted font-medium">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Custom-tailored to your exact business workflow upon delivery.</span>
              </div>
              <Link
                to="/contact"
                className="bg-accent-warm text-text-main font-bold text-sm px-5 py-2.5 rounded-DEFAULT hover:bg-amber-400 transition-all flex items-center gap-1.5 cursor-pointer card-hover-lift"
              >
                Request Custom Admin Build
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
