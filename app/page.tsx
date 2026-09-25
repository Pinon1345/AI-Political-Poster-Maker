'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Megaphone,
  ShieldCheck,
  ArrowRight,
  BarChart3,
  Users,
  Cpu
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Jan', campaigns: 400, reach: 2400 },
  { name: 'Feb', campaigns: 700, reach: 3800 },
  { name: 'Mar', campaigns: 1200, reach: 5900 },
  { name: 'Apr', campaigns: 1900, reach: 8400 },
  { name: 'May', campaigns: 2800, reach: 12100 },
  { name: 'Jun', campaigns: 4200, reach: 18500 },
];

const aiModels = [
  { name: 'Vance-Engine v4', role: 'Campaign Generation', color: 'from-indigo-500 to-violet-600' },
  { name: 'LexiSynth Vision', role: 'Poster Artwork', color: 'from-blue-500 to-cyan-500' },
  { name: 'OmniVoter Neural', role: 'Audience Sentiment', color: 'from-purple-500 to-pink-500' },
  { name: 'Veritas NLP', role: 'Speech Synthesis', color: 'from-emerald-500 to-teal-600' },
  { name: 'Aegis Guardian', role: 'Compliance Shield', color: 'from-amber-500 to-orange-600' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white selection:bg-indigo-500 selection:text-white overflow-hidden transition-colors duration-300">

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs sm:text-sm font-semibold mb-6"
        >
          <Sparkles className="w-4 h-4 animate-spin" /> Next-Gen AI Political Intelligence Suite
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight max-w-4xl leading-tight"
        >
          Empowering Modern Campaigns with <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 dark:from-indigo-400 dark:via-violet-400 dark:to-pink-400 bg-clip-text text-transparent">Synthetic Intelligence</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl"
        >
          Synthesize high-impact manifesto text, generate professional campaign graphics, and monitor voter engagement analytics instantly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/generate"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 font-bold text-base text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 group"
          >
            Launch Studio <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 font-bold text-base transition-all flex items-center justify-center"
          >
            Access Dashboard
          </Link>
        </motion.div>
      </section>

      {/* Marquee AI Models Section */}
      <div className="py-10 border-y border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Powered by Advanced Specialized Neural Models</p>
        </div>
        <div className="flex w-full overflow-x-auto no-scrollbar gap-6 px-4 py-2 justify-center flex-wrap">
          {aiModels.map((model, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl"
            >
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${model.color} animate-pulse`} />
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{model.name}</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{model.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Analytics & Stats Section with Recharts */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-6 space-y-6">
            <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              Realtime Telemetry
            </span>
            <h2 className="text-3xl sm:text-4xl font-black">Data-Driven Political Strategy At Scale</h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
              Track campaign deployment velocity and electorate impression metrics across multiple demographics using our fully integrated visual reporting suite.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                <BarChart3 className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mb-2" />
                <h3 className="text-2xl font-black">99.8%</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Synthesis Precision</p>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                <Users className="w-6 h-6 text-violet-600 dark:text-violet-400 mb-2" />
                <h3 className="text-2xl font-black">1.2M+</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Voter Impressions</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-sm text-zinc-700 dark:text-zinc-300">Campaign Reach & Growth Velocity</h3>
              <span className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold px-2.5 py-1 rounded-full border border-emerald-500/20">+42.4% this month</span>
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#71717a" textAnchor="end" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#71717a" tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', color: '#fff' }} />
                  <Area type="monotone" dataKey="reach" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorReach)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/20 border-t border-zinc-200 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black tracking-tight">Built for Modern Campaign Managers</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-sm sm:text-base">Everything you need to run professional, highly coordinated political communications.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/50 transition-all group shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <Megaphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Asset Generation</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">Synthesize targeted manifestos, slogans, and structured policy briefs within seconds.</p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-violet-500/50 transition-all group shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">High-Res Poster Studio</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">Customize visual campaign layouts and export publication-ready PNG assets instantly.</p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-pink-500/50 transition-all group shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-600 dark:text-pink-400 mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Archive Vault</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">Keep full local histories of all generated manifestos and strategies securely stored.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-20 text-center relative overflow-hidden border-t border-zinc-200 dark:border-zinc-900">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-6">Ready to Transform Your Campaign?</h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base mb-8 max-w-xl mx-auto">Join political innovators utilizing AI workflow automation today.</p>
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition shadow-xl"
          >
            Get Started Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}