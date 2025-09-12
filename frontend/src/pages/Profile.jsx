import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { format } from "date-fns";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [parsedText, setParsedText] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("/api/profile/me")
      .then(res => setProfile(res.data))
      .catch(console.error);
  }, []);

  const handleDownload = async (resume) => {
    try {
      const response = await axios.get(`/api/resume/download/${resume.resumeId}`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const blob = new Blob([response.data], { type: response.data.type });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = resume.fileName;
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error.response || error);
      setMessage("Failed to download resume.");
    }
  };

  const handleParse = async (resume) => {
    try {
      const fileResponse = await axios.get(`/api/resume/download/${resume.resumeId}`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const fileBlob = new Blob([fileResponse.data], { type: fileResponse.data.type });
      const file = new File([fileBlob], resume.fileName, { type: fileResponse.data.type });

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${process.env.REACT_APP_ML_URL}/ml/api/parse-resume`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setParsedText(response.data.parsed_text);
      setShowPopup(true);
    } catch (error) {
      console.error("Parse Error:", error.response || error);
      setMessage("Failed to parse resume.");
    }
  };

  if (!profile) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white p-8 rounded-xl shadow-lg mb-10">
        <h2 className="text-3xl font-semibold text-primary mb-4">My Profile</h2>
        <p className="text-lg"><span className="font-medium">Name:</span> {profile.name}</p>
        <p className="text-lg"><span className="font-medium">Email:</span> {profile.email}</p>
        <p className="text-lg"><span className="font-medium">Member Since:</span> {format(new Date(profile.activeSince), 'dd MMM yyyy')}</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold text-primary mb-4">My Uploaded Resumes</h3>

        {profile.resumes.length === 0 && (
          <p className="text-gray-600">No resumes uploaded yet.</p>
        )}

        <ul className="space-y-4">
          {profile.resumes.map(resume => (
            <li key={resume.id} className="border p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <p className="font-medium">{resume.fileName}</p>
                <p className="text-sm text-gray-500">Uploaded: {format(new Date(resume.uploadedAt), 'dd MMM yyyy, hh:mm a')}</p>
              </div>
              <div className="flex gap-3 mt-3 md:mt-0">
                <button
                  onClick={() => handleDownload(resume)}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition"
                >
                  Download
                </button>

                <button
                  onClick={() => handleParse(resume)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Parse
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
            <h2 className="text-xl font-semibold text-primary mb-4">Parsed Resume Text</h2>
            <pre className="whitespace-pre-wrap text-gray-800 max-h-[400px] overflow-y-auto">{parsedText}</pre>
          </div>
        </div>
      )}

      {message && (
        <p className="text-sm text-gray-600 mt-4 text-center">{message}</p>
      )}
    </div>
  );
}

export default Profile;
