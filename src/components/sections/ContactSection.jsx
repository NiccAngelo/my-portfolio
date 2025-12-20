import React from 'react';
import { Mail, Linkedin, Github, ArrowRight } from 'lucide-react';

export default function ContactSection({ onOpenModal }) {
  return (
    <section id="contact" className="min-h-screen py-20 px-6 flex items-center relative">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3d5a45]/10 to-transparent rounded-full mb-4">
            <Mail size={16} className="text-[#5a7a63]" />
            <span className="text-xs uppercase tracking-wider text-[#6b8370] font-medium">Let's Connect</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#2d4739] to-[#5a7a63] bg-clip-text text-transparent mb-6">
            Get In Touch
          </h2>
          <p className="text-[#6b8370] mb-12 leading-relaxed max-w-2xl mx-auto text-lg">
            I'm currently looking for new opportunities in full-stack development. Whether you have 
            a question or just want to say hi, feel free to reach out!
          </p>
          
          <button
            onClick={onOpenModal}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#3d5a45] to-[#5a7a63] text-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all font-semibold text-lg"
          >
            <Mail size={24} />
            <span>Send Me a Message</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <a 
            href="mailto:nicangelo.idian@unc.edu.ph"
            className="bg-white/60 backdrop-blur-lg p-8 rounded-2xl border border-[#a8b5a0]/20 hover:border-[#5a7a63]/40 hover:shadow-xl hover:scale-105 transition-all group text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#3d5a45] to-[#5a7a63] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
              <Mail size={28} className="text-white" />
            </div>
            <p className="text-sm text-[#6b8370] mb-2">Email</p>
            <p className="text-[#2d4739] font-semibold">nicangelo.idian@unc.edu.ph</p>
          </a>

          <a 
            href="https://linkedin.com/in/nic-angelo-idian-49b0b329a/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/60 backdrop-blur-lg p-8 rounded-2xl border border-[#a8b5a0]/20 hover:border-[#5a7a63]/40 hover:shadow-xl hover:scale-105 transition-all group text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#3d5a45] to-[#5a7a63] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
              <Linkedin size={28} className="text-white" />
            </div>
            <p className="text-sm text-[#6b8370] mb-2">LinkedIn</p>
            <p className="text-[#2d4739] font-semibold">Nic Angelo Idian</p>
          </a>

          <a 
            href="https://github.com/NiccAngelo"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/60 backdrop-blur-lg p-8 rounded-2xl border border-[#a8b5a0]/20 hover:border-[#5a7a63]/40 hover:shadow-xl hover:scale-105 transition-all group text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#3d5a45] to-[#5a7a63] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
              <Github size={28} className="text-white" />
            </div>
            <p className="text-sm text-[#6b8370] mb-2">GitHub</p>
            <p className="text-[#2d4739] font-semibold">@NiccAngelo</p>
          </a>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-lg rounded-full border border-[#a8b5a0]/20 shadow-sm">
            <span className="text-sm text-[#6b8370]">
              <span className="font-semibold text-[#2d4739]">Location:</span> Naga, Bicol Region, Philippines
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}