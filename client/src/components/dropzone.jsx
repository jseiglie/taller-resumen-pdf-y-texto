import { useDropzone } from "react-dropzone";
import { useState } from "react";

const Dropzone = ({ onExtractText }) => {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const onDrop = async (acceptedFiles) => {
    setLoading(true);
    const file = acceptedFiles[0];

    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.text) {
        onExtractText(data.text);
        setSelectedFile(file.name);
      } else {
        alert("Error al procesar el PDF.");
      }
    } catch (error) {
      console.error("Error al subir archivo:", error);
    }
    setLoading(false);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleDeleteClick = e => { 
    e.stopPropagation();
    setSelectedFile(null);
  }

  return (
    <div {...getRootProps()} className=" border-light border-2 p-5 pointer" style={{ border: "dashed" }}>
      <input {...getInputProps()} />
      {loading && selectedFile ? <p>Procesando PDF...</p> : selectedFile ? <p>{selectedFile} <span className="btn btn-sm btn-danger " onClick={handleDeleteClick}>X</span></p> : <p>Arrastra y suelta un PDF aquí o haz clic para subirlo.</p>}
    </div>
  );
};

export default Dropzone;
