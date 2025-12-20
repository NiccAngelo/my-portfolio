import React from 'react';
import { Code, Github, ExternalLink, Video, ArrowRight } from 'lucide-react';

const ProjectCard = ({ project, onVideoClick }) => {
  return (
    <div className="group bg-white/60 backdrop-blur-lg rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border border-[#a8b5a0]/20 hover:shadow-2xl hover:scale-[1.02] hover:border-[#5a7a63]/40 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#3d5a45] to-[#5a7a63] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <Code size={20} className="md:w-6 md:h-6 text-white" />
        </div>
        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 md:w-10 md:h-10 bg-[#e8ede6] rounded-lg flex items-center justify-center hover:bg-[#3d5a45] hover:scale-110 transition-all group/btn"
          >
            <Github size={16} className="md:w-[18px] md:h-[18px] text-[#3d5a45] group-hover/btn:text-white transition-colors" />
          </a>
        </div>
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-[#2d4739] mb-3 group-hover:text-[#3d5a45] transition-colors">
        {project.title}
      </h3>

      <p className="text-[#6b8370] text-sm mb-6 leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((tech, i) => (
          <span
            key={i}
            className="text-xs px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-[#e8ede6] to-white text-[#3d5a45] rounded-full font-medium border border-[#a8b5a0]/20 hover:shadow-md transition-shadow"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.title === "QuickCart- Full Stack E-commerce Platform" ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-[#3d5a45] to-[#5a7a63] text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all font-medium group/btn text-sm md:text-base w-full md:w-auto justify-center"
        >
          <ExternalLink size={16} className="md:w-[18px] md:h-[18px]" />
          <span>Visit Live Site</span>
          <ArrowRight size={16} className="md:w-[18px] md:h-[18px] group-hover/btn:translate-x-1 transition-transform" />
        </a>
      ) : project.videoUrl ? (
        <button
          onClick={() => onVideoClick(project)}
          className="flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-[#3d5a45] to-[#5a7a63] text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all font-medium group/btn text-sm md:text-base w-full md:w-auto justify-center"
        >
          <Video size={16} className="md:w-[18px] md:h-[18px]" />
          <span>Watch Walkthrough</span>
          <ArrowRight size={16} className="md:w-[18px] md:h-[18px] group-hover/btn:translate-x-1 transition-transform" />
        </button>
      ) : null}
    </div>
  );
};

export default ProjectCard;