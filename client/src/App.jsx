import { useState } from "react";
import Dropzone from "./components/dropzone.jsx";
const App = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);




  const summarizeText = async () => {
    if (!text.trim()) {
      alert("Ingresa un texto o sube un PDF.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (data.summary) {
        setSummary(data.summary);
      } else {
        alert("Error al obtener resumen.");
      }
    } catch (error) {
      console.error("Error al resumir texto:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container text-center d-flex flex-column " >
      <h2>Resumidor de Texto y PDFs</h2>
      <Dropzone onExtractText={setText} />

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        style={{ width: "100%", marginTop: 10 }}
        placeholder="O introduce el texto manualmente..."
      />

      <button onClick={summarizeText} disabled={loading} style={{ marginTop: 10 }}>
        {loading ? "Resumiendo..." : "Obtener Resumen"}
      </button>
{!loading && summary && (
        <div style={{ marginTop: 20, padding: 10, border: "1px solid #ddd" }}>
          <h3>Resumen:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default App;
