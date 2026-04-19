import { motion } from 'motion/react';
import { Play, Users, Clock, Star, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function VideoShowcaseSection() {
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);

  const videos = [
    {
      title: 'From Zero to Software Engineer',
      thumbnail: 'https://images.unsplash.com/photo-1758874385197-07d99c183a6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwb25saW5lfGVufDF8fHx8MTc2NTYxNjE5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      duration: '12:34',
      views: '45K',
      rating: 4.9,
      category: 'Success Story',
    },
    {
      title: 'Inside Our Virtual Labs',
      thumbnail: 'https://images.unsplash.com/photo-1598981457915-aea220950616?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMHN0dWRlbnRzJTIwc3R1ZHlpbmd8ZW58MXx8fHwxNzY1Njg3NjU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      duration: '8:15',
      views: '32K',
      rating: 4.8,
      category: 'Platform Tour',
    },
    {
      title: 'Live Project Walkthrough',
      thumbnail: 'https://images.unsplash.com/photo-1653564142033-ab3532091515?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjU2ODc2NTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      duration: '15:22',
      views: '28K',
      rating: 5.0,
      category: 'Tutorial',
    },
    {
      title: 'Meet Our Mentors',
      thumbnail: 'https://images.unsplash.com/photo-1728933102332-a4f1a281a621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtd29yayUyMGNvbGxhYm9yYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2NTY4NzY1OHww&ixlib=rb-4.1.0&q=80&w=1080',
      duration: '10:45',
      views: '38K',
      rating: 4.9,
      category: 'Mentorship',
    },
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-red-600/10 border border-red-500/30 text-red-400 rounded-full text-sm mb-4 flex items-center gap-2">
            <Play className="w-4 h-4" />
            Watch & Learn
          </div>
          <h2 className="text-4xl sm:text-5xl text-heading mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            See EduPulseX in Action
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Discover how our platform transforms students into industry-ready professionals.
            Watch real success stories and platform walkthroughs.
          </p>
        </motion.div>

        {/* Videos grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, type: "spring" }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredVideo(index)}
              onMouseLeave={() => setHoveredVideo(null)}
              className="group relative"
            >
              <div className="bg-card-bg backdrop-blur-sm border border-card-border rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all">
                {/* Thumbnail */}
                <div className="relative h-64 overflow-hidden">
                  <motion.div
                    animate={{
                      scale: hoveredVideo === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <ImageWithFallback
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Play button */}
                  <motion.div
                    animate={{
                      scale: hoveredVideo === index ? 1.2 : 1,
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50 group-hover:bg-cyan-500 transition-all">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  </motion.div>

                  {/* Duration badge */}
                  <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-lg text-xs text-white flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {video.duration}
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600/90 backdrop-blur-sm rounded-full text-xs text-white">
                    {video.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl text-heading mb-3 group-hover:text-blue-400 transition-colors">
                    {video.title}
                  </h3>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-text-muted">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {video.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400" fill="currentColor" />
                        {video.rating}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all flex items-center gap-2 mx-auto group">
            <Play className="w-5 h-5" />
            Watch All Videos
            <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
