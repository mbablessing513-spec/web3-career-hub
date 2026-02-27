'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { certificatesAPI } from '@/lib/api';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function Certificates() {
  const { user } = useAuthStore();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    loadCertificates();
  }, [user]);

  const loadCertificates = async () => {
    try {
      const response = await certificatesAPI.getCertificates(user.id);
      setCertificates(response.data.certificates);
    } catch (error) {
      console.error('Failed to load certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-screen bg-dark-950">
        <Sidebar />
        <div className="ml-64 flex-1">
          <Header />
          <div className="p-8">
            <p className="text-gray-400">Please connect your wallet to view certificates</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-dark-950">
      <Sidebar />
      <div className="ml-64 flex-1">
        <Header />
        
        <main className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Your Certificates</h1>
            <p className="text-gray-400">Showcase your Web3 expertise with NFT certificates</p>
          </div>

          {/* Certificates Grid */}
          {loading ? (
            <p className="text-gray-400">Loading certificates...</p>
          ) : certificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <div key={cert.id} className="glass p-6 hover:bg-white/15 transition-all duration-300">
                  <div className="text-6xl mb-4">🏆</div>
                  <h3 className="text-xl font-bold mb-2">Certificate of Completion</h3>
                  <p className="text-sm text-gray-400 mb-4">{cert.trackId}</p>
                  
                  <div className="space-y-2 mb-6 text-sm">
                    <p>
                      <span className="text-gray-400">Issued: </span>
                      <span>{new Date(cert.issuedAt).toLocaleDateString()}</span>
                    </p>
                    {cert.nftTokenId && (
                      <p>
                        <span className="text-gray-400">NFT Token: </span>
                        <span className="text-neon-blue">{cert.nftTokenId}</span>
                      </p>
                    )}
                  </div>

                  <button className="btn-neon w-full text-sm">
                    View Certificate
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass p-12 text-center">
              <div className="text-6xl mb-4">📜</div>
              <h2 className="text-2xl font-bold mb-2">No Certificates Yet</h2>
              <p className="text-gray-400 mb-6">Complete learning tracks to earn certificates and NFT badges</p>
              <button className="btn-neon">Start Learning</button>
            </div>
          )}

          {/* How it Works */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-8">How Certificates Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass p-6">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="font-bold mb-2">Complete Track</h3>
                <p className="text-sm text-gray-400">Finish all lessons and pass the final quiz with 70%+ score</p>
              </div>
              <div className="glass p-6">
                <div className="text-4xl mb-4">🎖️</div>
                <h3 className="font-bold mb-2">Receive Certificate</h3>
                <p className="text-sm text-gray-400">Get instant digital certificate with verified completion</p>
              </div>
              <div className="glass p-6">
                <div className="text-4xl mb-4">🌐</div>
                <h3 className="font-bold mb-2">Mint NFT</h3>
                <p className="text-sm text-gray-400">Optionally mint as NFT on blockchain for permanent proof</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}