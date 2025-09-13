import { useState } from "react"
import axios from "../utils/axiosInstance"
import ResumeDropzone from "../components/ResumeDropzone"

function UploadResume() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [message, setMessage] = useState("")
  const [resumeUploaded, setResumeUploaded] = useState(false)
  const [recommendations, setRecommendations] = useState([])

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a resume to upload.")
      return
    }

    const formData = new FormData()
    formData.append("file", selectedFile)
    formData.append("userId", localStorage.getItem("userId"))
    formData.append("email", localStorage.getItem("email"))

    try {
      const response = await axios.post("/api/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })

      setMessage(response.data || "Resume uploaded successfully.")
      setResumeUploaded(true)
    } catch (error) {
      console.error("Upload Error:", error.response || error)
      if (error.response?.status === 403) {
        setMessage("User not authenticated. Please log in again.")
      } else {
        setMessage("Failed to upload resume.")
      }
    }
  }

  const handleRecommend = async () => {
    if (!selectedFile) {
      setMessage("Please select a resume first.")
      return
    }

    const formData = new FormData()
    formData.append("file", selectedFile)

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ML_URL}/ml/api/recommend`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      )

      setRecommendations(response.data.recommendations || [])
      setMessage("Jobs recommended successfully.")
    } catch (error) {
      console.error("Recommend Error:", error.response || error)
      setMessage("Failed to fetch recommendations.")
    }
  }

  return (
    <div className="min-h-screen px-4 py-12 flex flex-col items-center justify-start text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
        Upload Your Resume
      </h1>

      <ResumeDropzone
        onFileSelect={(file) => {
          setSelectedFile(file)
          setMessage("")
          setResumeUploaded(false)
          setRecommendations([])
        }}
      />

      {selectedFile && (
        <p className="text-gray-700 mb-4">{selectedFile.name}</p>
      )}

      {!resumeUploaded && selectedFile && (
        <button
          onClick={handleUpload}
          className="bg-primary hover:bg-accent text-white px-6 py-3 rounded-xl text-base md:text-lg transition shadow-md"
        >
          Upload Resume
        </button>
      )}

      {resumeUploaded && (
        <button
          onClick={handleRecommend}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-base md:text-lg mt-4 transition shadow-md"
        >
          Get Job Recommendations
        </button>
      )}

      {recommendations.length > 0 && (
        <div className="mt-10 w-full max-w-5xl overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-xl shadow-md bg-white">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Company</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Location</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recommendations.map((job, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-primary">
                    {job.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{job.company}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{job.location}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
                    <div className="line-clamp-3">{job.description}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {message && (
        <p className="text-sm text-gray-600 mt-4 whitespace-pre-wrap">{message}</p>
      )}
    </div>
  )
}

export default UploadResume