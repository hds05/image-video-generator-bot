'use client';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ThreeBackground = dynamic(() => import('./components/ThreeBackground.js'), {
  ssr: false,
});

const mediaItems = [
  { type: 'image', src: '/ai-agent-preview.png', alt: 'AI Preview' },
  { type: 'video', src: '/riding motorcycle.mp4', alt: 'Video 1' },
  { type: 'image', src: '/man-in-bar.avif', alt: 'Design Preview' },
  { type: 'video', src: '/riding bike.mp4', alt: 'Video 2' },
  { type: 'image', src: '/sport-motorcycle.jpg', alt: 'Design Preview' },
  { type: 'image', src: '/train.gif', alt: 'Design Preview' },
  { type: 'image', src: '/cars.gif', alt: 'Design Preview' },
];

export default function Home() {
  // const [mounted, setMounted] = useState(false);
  // useEffect(() => setMounted(true), []);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
    }, 5000); // change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const currentItem = mediaItems[currentIndex];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-slate-900 to-purple-950 text-white overflow-hidden">

      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-32 text-center">
        <div className="inline-block rounded-xl bg-white/80 backdrop-blur-md px-6 py-4 shadow-lg">
          <h1 className="text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl sm:py-9">
            Imagine. Speak. Create.
          </h1>
        </div>

        {<ThreeBackground />}
        <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-xl leading-relaxed">
          Turn your voice into visuals. From futuristic dreams to fantastical worlds — just say it and see it.
        </p>
      </main>

      <section className="relative z-10 mt-16 w-full max-w-4xl px-4 mx-auto">
      <div className="bg-white/10 border border-white/20 backdrop-blur-md p-4 sm:p-6 rounded-3xl shadow-2xl transition-all duration-700">
        {currentItem.type === 'image' ? (
          <Image
            src={currentItem.src}
            alt={currentItem.alt}
            width={1000}
            height={600}
            className="rounded-2xl w-full object-cover shadow-lg"
          />
        ) : (
          <video
            src={currentItem.src}
            autoPlay
            muted
            loop
            playsInline
            className="rounded-2xl w-full object-cover shadow-lg"
          />
        )}
      </div>
    </section>
    <elevenlabs-convai agent-id="agent_8401k0t87ff2ffcaqk0pvzwbkwtd"></elevenlabs-convai><script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>

      <footer className="relative z-10 mt-24 mb-10 text-sm text-gray-400 text-center">
        © {new Date().getFullYear()} ImageAI Studio — Built with creativity ✨
      </footer>
    </div>
  );
}
