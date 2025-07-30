import { useDropzone } from "react-dropzone"

function ResumeDropzone({ onFileSelect }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "text/plain": [".txt"]
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0])
      }
    }
  })

  return (
    <div
      {...getRootProps()}
      className={`w-full max-w-xl border-2 border-dashed rounded-xl p-6 mb-6 cursor-pointer transition ${
        isDragActive ? "border-primary bg-blue-50" : "border-gray-300 bg-white"
      }`}
    >
      <input {...getInputProps()} />
      <p className="text-gray-600 text-center">
        {isDragActive
          ? "Drop your resume here..."
          : "Drag & drop resume (.pdf, .doc, .png, .jpg, .txt) or click to select"}
      </p>
    </div>
  )
}

export default ResumeDropzone
