import { useState } from "react"
import axios from "../utils/axiosInstance"
import ResumeDropzone from "../components/ResumeDropzone"

function UploadResume() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [message, setMessage] = useState("")

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
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      setMessage(response.data || "Resume uploaded successfully.")
    } catch (error) {
      console.error("Upload Error:", error.response || error)
      if (error.response?.status === 403) {
        setMessage("User not authenticated. Please log in again.")
      } else {
        setMessage("Failed to upload resume.")
      }
    }
  }

  return (
    <div className="min-h-screen px-4 py-12 flex flex-col items-center justify-start text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
        Upload Your Resume
      </h1>

      <ResumeDropzone onFileSelect={(file) => {
        setSelectedFile(file)
        setMessage("")
      }} />

      {selectedFile && (
        <p className="text-gray-700 mb-4">{selectedFile.name}</p>
      )}

      <button
        onClick={handleUpload}
        className="bg-primary hover:bg-accent text-white px-6 py-3 rounded-xl text-base md:text-lg transition shadow-md"
      >
        Upload Resume
      </button>

      {message && (
        <p className="text-sm text-gray-600 mt-4">{message}</p>
      )}
    </div>
  )
}

export default UploadResume
