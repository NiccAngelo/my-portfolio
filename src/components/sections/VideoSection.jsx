import React from 'react';
import { Video, ArrowRight } from 'lucide-react';

export default function VideoSection({ selectedVideo, setSelectedVideo }) {
  const projects = [
    {
      title: "BarangayCare - Health Center Management System",
      description: "Full-stack mobile and web application for managing community health data with household profiling, medical checkups, and pregnancy monitoring.",
      tech: ["PHP", "MySQL", "Flutter", "Git"],
      videoUrl: "https://youtube.com/embed/mZ7kHz-79DE"
    },
    {
      title: "Broadcast Management System",
      description: "Full-stack notification platform with REST API, JWT authentication, and Firebase Cloud Messaging for real-time push notifications.",
      tech: ["Rails 7", "React 18", "Flutter", "PostgreSQL", "Docker", "Firebase"],
      videoUrl: "https://www.youtube.com/embed/DG1TxNzgjVU"
    }
  ];

  return (
    <section id="videos" className="min-h-screen py-20 px-6 bg-gradient-to-br from-white/50 to-[#f5f6f4]/50 relative flex items-center">
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3d5a45]/10 to-transparent rounded-full mb-4">
            <Video size={16} className="text-[#5a7a63]" />
            <span className="text-xs uppercase tracking-wider text-[#6b8370] font-medium">Demo Videos</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#2d4739] to-[#5a7a63] bg-clip-text text-transparent">
            Video Walkthroughs
          </h2>
        </div>
        
        {selectedVideo ? (
          <div className="space-y-8">
            <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-[#a8b5a0]/20">
              <h3 className="text-2xl font-bold text-[#2d4739] mb-6">{selectedVideo.title}</h3>
              <div className="aspect-video w-full mb-6 rounded-2xl overflow-hidden shadow-xl">
                <iframe
                  className="w-full h-full"
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-[#6b8370] mb-6 text-lg leading-relaxed">{selectedVideo.description}</p>
              <div className="flex flex-wrap gap-2">
                {selectedVideo.tech.map((tech, i) => (
                  <span key={i} className="text-xs px-4 py-2 bg-white/80 text-[#3d5a45] rounded-full border border-[#d4dcd0] font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-[#2d4739] mb-6">Other Projects</h4>
              <div className="grid md:grid-cols-2 gap-6">
                {projects.filter(p => p.title !== selectedVideo.title).map((project, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVideo(project)}
                    className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl border border-[#a8b5a0]/20 hover:border-[#5a7a63]/40 hover:shadow-xl hover:scale-105 transition-all text-left group"
                  >
                    <h5 className="text-lg font-bold text-[#2d4739] mb-2 group-hover:text-[#3d5a45] transition-colors">
                      {project.title}
                    </h5>
                    <p className="text-sm text-[#6b8370] flex items-center gap-2">
                      Click to view walkthrough 
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-[#3d5a45] to-[#5a7a63] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Video size={40} className="text-white" />
            </div>
            <p className="text-[#6b8370] text-lg mb-8">
              Select a project to view the video demonstration
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {projects.map((project, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedVideo(project);
                    document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl border border-[#a8b5a0]/20 hover:border-[#5a7a63]/40 hover:shadow-xl hover:scale-105 transition-all text-left group"
                >
                  <h5 className="text-lg font-bold text-[#2d4739] mb-2 group-hover:text-[#3d5a45] transition-colors">
                    {project.title}
                  </h5>
                  <p className="text-sm text-[#6b8370] flex items-center gap-2">
                    View walkthrough
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}