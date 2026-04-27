import { motion } from 'motion/react';
import { useState } from 'react';
import { BookOpen, Calendar, User, Clock, ChevronRight, Sparkles, TrendingUp, Cpu, Brain, Rocket } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 1,
    title: 'The Future of AI in Engineering Education',
    excerpt: 'How artificial intelligence is reshaping how engineering students learn, practice, and innovate in the 21st century.',
    author: 'Dr. Aruna Reddy',
    date: 'April 25, 2025',
    readTime: '8 min read',
    category: 'AI & Education',
    icon: Brain,
    color: 'from-blue-600 to-cyan-500',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800'
  },
  {
    id: 2,
    title: 'Mastering Full-Stack Development in 2025',
    excerpt: 'A comprehensive guide for CSE students to navigate the evolving landscape of web technologies and frameworks.',
    author: 'Rahul Sharma',
    date: 'April 20, 2025',
    readTime: '12 min read',
    category: 'Development',
    icon: Cpu,
    color: 'from-purple-600 to-indigo-500',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800'
  },
  {
    id: 3,
    title: 'Sustainable Engineering: Building for Tomorrow',
    excerpt: 'Exploring the role of Civil and Mechanical engineers in creating eco-friendly infrastructure and energy systems.',
    author: 'Prof. S. Murali',
    date: 'April 15, 2025',
    readTime: '10 min read',
    category: 'Sustainability',
    icon: Rocket,
    color: 'from-emerald-600 to-teal-500',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800'
  },
  {
    id: 4,
    title: 'The Rise of Smart Grids and EV Technology',
    excerpt: 'Why EEE students should focus on electric vehicle infrastructure and intelligent power distribution systems.',
    author: 'Priya Verma',
    date: 'April 10, 2025',
    readTime: '7 min read',
    category: 'Electrical',
    icon: TrendingUp,
    color: 'from-amber-600 to-orange-500',
    image: 'https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?w=800'
  },
  {
    id: 5,
    title: 'Breaking into VLSI Design: A Career Roadmap',
    excerpt: 'Detailed insights for ECE students wanting to excel in the semiconductor industry and chip design.',
    author: 'Anil Kumar',
    date: 'April 5, 2025',
    readTime: '15 min read',
    category: 'Electronics',
    icon: Sparkles,
    color: 'from-rose-600 to-pink-500',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800'
  },
  {
    id: 6,
    title: 'Robotics and Industry 4.0: The New Frontier',
    excerpt: 'How automation and smart manufacturing are transforming traditional mechanical engineering roles.',
    author: 'Vikram Singh',
    date: 'March 28, 2025',
    readTime: '9 min read',
    category: 'Robotics',
    icon: Rocket,
    color: 'from-cyan-600 to-blue-500',
    image: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=800'
  },
  {
    id: 7,
    title: 'Data Science for Non-IT Engineers',
    excerpt: 'How students from all branches can leverage data analytics to improve their core engineering projects.',
    author: 'Sneha Reddy',
    date: 'March 20, 2025',
    readTime: '11 min read',
    category: 'Data Science',
    icon: Brain,
    color: 'from-indigo-600 to-blue-500',
    image: 'https://images.unsplash.com/photo-1551288049-bbda38a5f9a2?w=800'
  },
  {
    id: 8,
    title: 'Navigating Your First Internship',
    excerpt: 'Practical tips for engineering students to land and succeed in their first professional industry role.',
    author: 'Kiran Deep',
    date: 'March 15, 2025',
    readTime: '6 min read',
    category: 'Career Advice',
    icon: BookOpen,
    color: 'from-teal-600 to-emerald-500',
    image: 'https://images.unsplash.com/photo-1521737706076-34a9ff3f3f5f?w=800'
  }
];

export function BlogsPage() {
  const [selectedPost, setSelectedPost] = useState<typeof BLOG_POSTS[0] | null>(null);

  if (selectedPost) {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="min-h-screen bg-page-bg py-20"
      >
        <div className="max-w-4xl mx-auto px-4">
          <button 
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-blue-400 font-bold mb-8 hover:gap-3 transition-all"
          >
            <ChevronRight className="w-5 h-5 rotate-180" /> Back to Blogs
          </button>
          
          <img 
            src={selectedPost.image} 
            alt={selectedPost.title} 
            className="w-full h-[400px] object-cover rounded-3xl mb-10 shadow-2xl"
          />
          
          <div className="flex items-center gap-4 text-text-muted mb-6">
            <span className="px-3 py-1 bg-blue-600/10 text-blue-400 rounded-full text-xs font-bold">{selectedPost.category}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {selectedPost.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {selectedPost.readTime}</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-black text-heading mb-8 leading-tight">
            {selectedPost.title}
          </h1>
          
          <div className="flex items-center gap-3 mb-10 pb-10 border-b border-surface-border">
            <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold">
              {selectedPost.author[0]}
            </div>
            <div>
              <div className="text-heading font-bold">{selectedPost.author}</div>
              <div className="text-sm text-text-muted">Expert Contributor at Tectonix</div>
            </div>
          </div>
          
          <div className="prose prose-invert max-w-none text-lg text-text-secondary leading-relaxed space-y-6">
            <p className="font-bold text-heading text-xl">
              {selectedPost.excerpt}
            </p>
            <p>
              In the rapidly evolving landscape of modern engineering, the integration of advanced technologies like Artificial Intelligence and smart systems is no longer a luxury but a necessity. Students today face a unique challenge: mastering their core engineering principles while simultaneously becoming proficient in the digital tools that define industry 4.0.
            </p>
            <p>
              This is where Tectonix comes in. By providing personalized learning roadmaps and AI-powered guidance, we bridge the gap between academic theory and industrial practice. Our mission is to empower the next generation of engineers to not just keep up, but to lead the way in innovation.
            </p>
            <div className="bg-surface border-l-4 border-blue-500 p-8 rounded-r-2xl my-10">
              <p className="italic text-heading text-xl">
                "The best way to predict the future of engineering is to build it ourselves, one project at a time."
              </p>
            </div>
            <p>
              Whether you are a Computer Science student exploring the depths of Neural Networks or a Civil Engineer designing earthquake-resistant smart structures, the principles of creative problem solving remain the same. It starts with a spark of curiosity and ends with a solution that changes lives.
            </p>
            <p>
              We invite you to explore our resources, join our community, and start building your future today. The road to becoming a world-class engineer is long, but with the right tools and guidance, every step is an opportunity for greatness.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-page-bg py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/30 text-blue-400 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            Tectonix Blog
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-heading mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Creative Learning <span className="text-white">&</span> Innovation
          </h1>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Explore the latest trends in engineering, AI, and technology. 
            Curated articles to keep you ahead in your academic and professional journey.
          </p>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          onClick={() => setSelectedPost(BLOG_POSTS[0])}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden mb-16 h-[500px] group cursor-pointer"
        >
          <img 
            src={BLOG_POSTS[0].image} 
            alt="Featured" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 sm:p-12 w-full max-w-4xl">
            <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
              Featured Post
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 leading-tight group-hover:text-blue-400 transition-colors">
              {BLOG_POSTS[0].title}
            </h2>
            <div className="flex items-center gap-6 text-white/70 text-sm">
              <span className="flex items-center gap-2"><User className="w-4 h-4" /> {BLOG_POSTS[0].author}</span>
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {BLOG_POSTS[0].date}</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {BLOG_POSTS[0].readTime}</span>
            </div>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.slice(1).map((post, idx) => (
            <motion.article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-card-bg border border-card-border rounded-3xl overflow-hidden flex flex-col hover:border-blue-500/50 transition-all shadow-2xl hover:shadow-blue-500/10 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute top-4 left-4 p-2 rounded-xl bg-gradient-to-br ${post.color} shadow-lg`}>
                  <post.icon className="w-5 h-5 text-white" />
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-bold text-white border border-white/20">
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-text-muted mb-4">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-heading mb-4 leading-snug hover:text-blue-400 transition-colors cursor-pointer line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-text-muted mb-6 line-clamp-3 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-6 border-t border-surface-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 text-xs font-bold">
                      {post.author[0]}
                    </div>
                    <span className="text-xs text-text-secondary font-medium">{post.author}</span>
                  </div>
                  <button className="flex items-center gap-1 text-blue-400 text-xs font-bold hover:gap-2 transition-all">
                    Read More <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>


        {/* Load More Button */}
        <div className="text-center mt-20">
          <button className="px-8 py-4 bg-surface border border-surface-border rounded-2xl text-heading font-bold hover:border-blue-500/50 transition-all flex items-center gap-3 mx-auto group">
            Discover More Articles
            <Rocket className="w-5 h-5 text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
