from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import fitz  # PyMuPDF para extraer texto de PDFs
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)  # Habilita CORS para permitir peticiones desde el frontend

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

def extract_text_from_pdf(pdf_path):
    text = ""
    with fitz.open(pdf_path) as pdf:
        for page in pdf:
            text += page.get_text("text") + "\n"
    return text.strip()

def summarize_text(text):
    client = openai.OpenAI(api_key="tu-api-key")

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Resume el siguiente texto."},
            {"role": "user", "content": text},
        ],
        temperature=0.7,
        max_tokens=200,
    )

    return response.choices[0].message.content.strip()


@app.route("/summarize", methods=["POST"])
def summarize():
    try:
        data = request.json
        text = data.get("text", "")

        if not text.strip():
            return jsonify({"error": "No se recibió texto"}), 400

        summary = summarize_text(text)

        return jsonify({"summary": summary})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/upload", methods=["POST"])
def upload_pdf():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No se envió ningún archivo"}), 400

        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "Nombre de archivo vacío"}), 400

        if file and file.filename.endswith(".pdf"):
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            file.save(filepath)

            extracted_text = extract_text_from_pdf(filepath)
            return jsonify({"text": extracted_text})

        return jsonify({"error": "Formato de archivo no válido"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
