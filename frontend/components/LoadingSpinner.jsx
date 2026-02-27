'use client';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-neon-blue/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-neon-blue animate-spin"></div>
      </div>
    </div>
  );
}