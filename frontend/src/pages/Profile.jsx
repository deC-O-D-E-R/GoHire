import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { format } from "date-fns";


function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get("/api/profile/me")
      .then(res => setProfile(res.data))
      .catch(console.error);
  }, []);

  if (!profile) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white p-8 rounded-xl shadow-lg mb-10">
        <h2 className="text-3xl font-semibold text-primary mb-4">My Profile</h2>
        <p className="text-lg">
          <span className="font-medium">Name:</span> {profile.name}
        </p>
        <p className="text-lg">
          <span className="font-medium">Email:</span> {profile.email}
        </p>
        <p className="text-lg">
          <span className="font-medium">Member Since:</span> {format(new Date(profile.activeSince), 'dd MMM yyyy')}
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold text-primary mb-4">My Uploaded Resumes</h3>

        {profile.resumes.length === 0 && (
          <p className="text-gray-600">No resumes uploaded yet.</p>
        )}

        <ul className="space-y-4">
          {profile.resumes.map(resume => (
            <li key={resume.id} className="border p-4 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium">{resume.fileName}</p>
                <p className="text-sm text-gray-500">Uploaded: {format(new Date(resume.uploadedAt), 'dd MMM yyyy, hh:mm a')}</p>
              </div>
              <a
                href={`/api/resume/download/${resume.id}`}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
