import { useNavigate } from "react-router-dom";
import { Brain, Briefcase, Building2, BadgeCheck } from "lucide-react";
import CompanyCarousel from "../components/CompanyCarousel";

function Home() {
  const navigate = useNavigate();

  const handleResumeClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/upload-resume");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="min-h-[80vh] md:min-h-screen flex flex-col items-center justify-center text-center px-4 pt-6 md:pt-10 -mt-4">
        <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4 md:mb-6">
          Find Your Dream Job with <span className="text-accent">JobGuess</span>
        </h1>
        <p className="text-gray-600 text-base md:text-xl max-w-md md:max-w-xl mb-6 md:mb-8">
          Upload your resume and let our AI match you with the best jobs tailored to your skills.
        </p>
        <button
          onClick={handleResumeClick}
          className="bg-primary hover:bg-accent text-white px-5 py-2.5 rounded-xl text-base md:text-lg transition-all shadow-lg"
        >
          Upload Resume & Get Recommendations
        </button>
      </div>

      <div className="bg-[#f9fafb] py-10 px-4 md:px-20">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-primary mb-8 md:mb-10">
          Why Choose JobGuess?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 text-center">
          <div className="bg-white rounded-xl p-5 md:p-6 shadow hover:shadow-lg transition">
            <BadgeCheck size={36} className="mx-auto text-primary mb-3" />
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">
              92% Match Accuracy
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              AI accurately matches your resume with top job listings.
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 md:p-6 shadow hover:shadow-lg transition">
            <Building2 size={36} className="mx-auto text-primary mb-3" />
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">
              50+ Partner Companies
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Affiliated with top hiring teams across the industry.
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 md:p-6 shadow hover:shadow-lg transition">
            <Briefcase size={36} className="mx-auto text-primary mb-3" />
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">
              Smart Recommendations
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Personalized job suggestions based on your skills.
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 md:p-6 shadow hover:shadow-lg transition">
            <Brain size={36} className="mx-auto text-primary mb-3" />
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">
              AI Resume Scanner
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Instant resume insights to improve your profile.
            </p>
          </div>
        </div>
      </div>

      <CompanyCarousel />
    </>
  );
}

export default Home;
