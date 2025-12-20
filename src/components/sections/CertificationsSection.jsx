import React, { useState, useEffect, useRef } from 'react';
import { Award, ExternalLink } from 'lucide-react';

export default function CertificationsSection({ setSelectedCert }) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('AWS Academy');
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const certifications = [
    { 
      name: "AWS Academy Cloud Foundations", 
      issuer: "AWS Academy", 
      image: `${import.meta.env.BASE_URL}assets/IDIAN - AWS Academy Cloud Foundations Badge.png`,
      color: "from-emerald-600 to-teal-700"
    },
    { 
      name: "AWS Cloud Architecting", 
      issuer: "AWS Academy", 
      image: `${import.meta.env.BASE_URL}assets/IDIAN - AWS Cloud Architecting Badge.png`,
      color: "from-emerald-600 to-teal-700"
    },
    { 
      name: "AWS Academy Cloud Operations", 
      issuer: "AWS Academy", 
      image: `${import.meta.env.BASE_URL}assets/IDIAN - AWS Cloud Operations Badge.png`,
      color: "from-emerald-600 to-teal-700"
    },
    { 
      name: "AWS Cloud Developing", 
      issuer: "AWS Academy", 
      image: `${import.meta.env.BASE_URL}assets/IDIAN - AWS Cloud Developing Badge.png`,
      color: "from-emerald-600 to-teal-700"
    },
    { 
      name: "Academic Research Foundations: Quantitative", 
      issuer: "LinkedIn Learning", 
      image: `${import.meta.env.BASE_URL}assets/academic-research-quantitative.png`,
      color: "from-emerald-700 to-green-800"
    },
    { 
      name: "Learning SQL Programming", 
      issuer: "LinkedIn Learning", 
      image: `${import.meta.env.BASE_URL}assets/learning-sql-programming.png`,
      color: "from-emerald-700 to-green-800"
    },
    { 
      name: "Business Analysis Foundations: Business Process Modeling", 
      issuer: "LinkedIn Learning", 
      image: `${import.meta.env.BASE_URL}assets/business-analysis.png`,
      color: "from-emerald-700 to-green-800"
    },
    { 
      name: "Introduction to Transactional SQL", 
      issuer: "LinkedIn Learning", 
      image: `${import.meta.env.BASE_URL}assets/introduction-to-transactSQL.png`,
      color: "from-emerald-700 to-green-800"
    },
    { 
      name: "Requirements Elicitation and Analysis", 
      issuer: "LinkedIn Learning", 
      image: `${import.meta.env.BASE_URL}assets/requirements-elicitation-and-requirements.png`,
      color: "from-emerald-700 to-green-800"
    },
    { 
      name: "Cisco Introduction to Cybersecurity", 
      issuer: "Cisco", 
      image: `${import.meta.env.BASE_URL}assets/Cisco.png`,
      color: "from-teal-700 to-emerald-800"
    },
    { 
      name: "Learning PHP", 
      issuer: "SoloLearn", 
      image: `${import.meta.env.BASE_URL}assets/PHP.jpg`,
      color: "from-green-700 to-emerald-800"
    },
    { 
      name: "Learning HTML", 
      issuer: "SoloLearn", 
      image: `${import.meta.env.BASE_URL}assets/HTML.jpg`,
      color: "from-green-700 to-emerald-800"
    }
  ];

  const groupedCerts = certifications.reduce((acc, cert) => {
    if (!acc[cert.issuer]) {
      acc[cert.issuer] = [];
    }
    acc[cert.issuer].push(cert);
    return acc;
  }, {});

  const providers = [
    { name: "AWS Academy", color: "from-emerald-600 to-teal-700" },
    { name: "LinkedIn Learning", color: "from-emerald-700 to-green-800" },
    { name: "Cisco", color: "from-teal-700 to-emerald-800" },
    { name: "SoloLearn", color: "from-green-700 to-emerald-800" }
  ];

  const activeCerts = groupedCerts[activeTab] || [];

  return (
    <section 
      id="certifications" 
      ref={sectionRef}
      className="min-h-screen flex items-center py-12 px-4 md:px-8 bg-gradient-to-b from-emerald-50/30 to-teal-50/50"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className={`mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1 w-12 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-full" />
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Credentials</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Certifications & Training</h2>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 bg-white rounded-xl p-2 shadow-sm border border-emerald-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {providers.map((provider) => {
              const count = groupedCerts[provider.name]?.length || 0;
              const isActive = activeTab === provider.name;
              
              return (
                <button
                  key={provider.name}
                  onClick={() => setActiveTab(provider.name)}
                  className={`px-3 py-2.5 rounded-lg font-semibold transition-all ${
                    isActive 
                      ? `bg-gradient-to-r ${provider.color} text-white shadow-md` 
                      : 'text-gray-600 hover:bg-emerald-50/50'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-sm">{provider.name.split(' ')[0]}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {count}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Certificates Grid - Compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {activeCerts.map((cert, index) => (
            <button
              key={index}
              onClick={() => setSelectedCert(cert)}
              className="group bg-white p-4 rounded-lg border border-emerald-100 hover:border-emerald-300 hover:shadow-md transition-all text-left"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${cert.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-1 group-hover:text-emerald-800 transition-colors line-clamp-2">
                    {cert.name}
                  </h4>
                  <div className="flex items-center justify-center gap-1 text-xs text-emerald-700 font-medium">
                    <span>View</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Summary Stats - Compact */}
        <div className="grid grid-cols-4 gap-3">
          {providers.map(provider => (
            <div key={provider.name} className="text-center p-3 bg-white rounded-lg border border-emerald-100 shadow-sm">
              <div className={`text-2xl font-bold bg-gradient-to-r ${provider.color} bg-clip-text text-transparent`}>
                {groupedCerts[provider.name]?.length || 0}
              </div>
              <div className="text-xs text-gray-600 mt-1">{provider.name.split(' ')[0]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}