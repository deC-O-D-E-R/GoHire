import { useState } from "react"
import axios from "../utils/axiosInstance"
import ResumeDropzone from "../components/ResumeDropzone"

function UploadResume() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [message, setMessage] = useState("")
  const [resumeUploaded, setResumeUploaded] = useState(false)
  const [parsedText, setParsedText] = useState("")

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

  const handleParse = async () => {
    if (!selectedFile) {
      setMessage("Please select a resume first.")
      return
    }

    const formData = new FormData()
    formData.append("file", selectedFile)

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/ml/api/parse-resume",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      )

      setParsedText(response.data.parsed_text)
      setMessage("Resume parsed successfully.")
    } catch (error) {
      console.error("Parse Error:", error.response || error)
      setMessage("Failed to parse resume.")
    }
  }

  const handleCopy = () => {
    if (parsedText) {
      navigator.clipboard.writeText(parsedText)
      setMessage("Parsed text copied to clipboard!")
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
        setResumeUploaded(false)
        setParsedText("")
      }} />

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
          onClick={handleParse}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-base md:text-lg mt-4 transition shadow-md"
        >
          Parse Resume
        </button>
      )}

      {parsedText && (
        <div className="relative w-full max-w-2xl bg-gray-100 text-left p-4 rounded-xl shadow-md mt-8">
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 text-xs bg-primary hover:bg-accent text-white px-3 py-1 rounded transition"
          >
            Copy
          </button>
          <pre className="whitespace-pre-wrap text-gray-800">{parsedText}</pre>
        </div>
      )}

      {message && (
        <p className="text-sm text-gray-600 mt-4 whitespace-pre-wrap">{message}</p>
      )}
    </div>
  )
}

export default UploadResume
