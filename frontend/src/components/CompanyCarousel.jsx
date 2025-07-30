import { useEffect, useState } from "react";
import { Briefcase, Brain, Building2, BadgeCheck } from "lucide-react";

function CompanyCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const companies = [
    {
      name: "TechSpark Inc.",
      tagline: "Innovating Hiring",
      color: "bg-[#e0f2fe]",
      icon: <Briefcase className="text-primary" size={40} />
    },
    {
      name: "AlphaSoft",
      tagline: "Where Skills Meet Success",
      color: "bg-[#e0f7f0]",
      icon: <Brain className="text-primary" size={40} />
    },
    {
      name: "NexaCorp",
      tagline: "Hiring for Tomorrow",
      color: "bg-[#fef3c7]",
      icon: <Building2 className="text-primary" size={40} />
    },
    {
      name: "ByteLink",
      tagline: "Tech Careers Simplified",
      color: "bg-[#f3e8ff]",
      icon: <BadgeCheck className="text-primary" size={40} />
    },
    {
      name: "CodeVision",
      tagline: "Driven by Developers",
      color: "bg-[#ffe4e6]",
      icon: <Briefcase className="text-primary" size={40} />
    },
    {
      name: "JobTrackers",
      tagline: "Precision in Placement",
      color: "bg-[#ecfccb]",
      icon: <Brain className="text-primary" size={40} />
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % companies.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const company = companies[currentIndex];

  return (
    <div className="bg-white py-16 px-4 md:px-20">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6">
        Trusted by Leading Companies
      </h2>
      <p className="text-center text-gray-600 text-sm md:text-base mb-10 max-w-2xl mx-auto">
        Companies that recognize and value JobGuess’s AI-powered resume interpretation and certification mapping.
      </p>

      <div className="flex items-center justify-center">
        <div
          className={`w-full max-w-4xl h-[200px] ${company.color} rounded-2xl shadow-xl transition-all duration-500 ease-in-out flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 px-6 sm:px-10 py-6`}
        >
          <div className="bg-white p-4 rounded-full shadow-md">
            {company.icon}
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
              {company.name}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mt-1">
              {company.tagline}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyCarousel;
