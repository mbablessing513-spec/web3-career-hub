'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import WalletConnect from '@/components/WalletConnect';

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Animated background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl animate-float" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl" />
            </div>

            {/* Main heading */}
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Master Web3 Skills, <br />
              <span className="text-gradient">Land High-Income Jobs</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands learning blockchain development, smart contracts, and Web3 from beginner to expert.
              Gain certified credentials and connect with top Web3 companies.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/learn" className="btn-neon">
                Start Learning
              </Link>
              <Link href="/jobs" className="btn-glass">
                Browse Jobs
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-16">
              <div className="glass p-6">
                <div className="text-3xl font-bold text-neon-blue">5</div>
                <p className="text-sm text-gray-400">Learning Tracks</p>
              </div>
              <div className="glass p-6">
                <div className="text-3xl font-bold text-neon-purple">50+</div>
                <p className="text-sm text-gray-400">Expert Lessons</p>
              </div>
              <div className="glass p-6">
                <div className="text-3xl font-bold text-neon-pink">100+</div>
                <p className="text-sm text-gray-400">Job Opportunities</p>
              </div>
              <div className="glass p-6">
                <div className="text-3xl font-bold text-neon-green">1K+</div>
                <p className="text-sm text-gray-400">Active Users</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-dark-950 to-dark-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Why Choose Web3 Career Hub?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass p-8">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-xl font-bold mb-2">Structured Learning</h3>
                <p className="text-gray-400">Progress from beginner to advanced with curated paths and hands-on projects.</p>
              </div>
              <div className="glass p-8">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-bold mb-2">Real Job Board</h3>
                <p className="text-gray-400">Access exclusive remote Web3 job listings from top companies and DAOs.</p>
              </div>
              <div className="glass p-8">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-bold mb-2">Earn Certificates</h3>
                <p className="text-gray-400">Earn NFT certificates and badges to showcase your Web3 expertise.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto glass p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Web3 Journey?</h2>
            <p className="text-gray-300 mb-8">Connect your wallet and unlock access to all learning materials and job opportunities.</p>
            <WalletConnect />
          </div>
        </section>
      </main>
    </div>
  );
}