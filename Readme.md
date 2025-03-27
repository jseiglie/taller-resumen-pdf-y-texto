# 📄 Taller Resumen pdf y texto con React y Flask

Este es un proyecto web que permite a los usuarios cargar archivos PDF o introducir texto manualmente para obtener un resumen generado mediante la API de OpenAI.

## 🚀 Características

- 📂 **Carga de archivos PDF** mediante arrastrar y soltar.
- ✍️ **Entrada de texto manual** para resumir cualquier contenido.
- 🤖 **Generación de resúmenes** usando la API de OpenAI.
- 🌐 **Frontend con React** y **Backend con Flask**.

---

## 📦 Instalación y Configuración

### 🔧 1. Clonar el repositorio

```sh
 git clone https://github.com/tu-usuario/resumidor-pdf-texto.git
 cd resumidor-pdf-texto
```

### 🖥️ 2. Configurar el Backend (Flask)

1. Crear un entorno virtual con (opcional pero recomendado):

```sh
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
```

Si usas pipenv:

```sh
pipenv shell
```

2. Instalar las dependencias:

```sh
pip install flask flask-cors openai PyMuPDF
```

Si usas pipenv: 

```sh
pipenv install flask flask-cors openai PyMuPDF
```

3. Configurar la API Key de OpenAI en `app.py`:

```python
client = openai.OpenAI(api_key="TU_OPENAI_API_KEY")
```

4. Ejecutar el servidor Flask:

```sh
python app.py
```

El backend se ejecutará en `http://127.0.0.1:5000`.

---

### ⚛️ 3. Configurar el Frontend (React)

1. Ir a la carpeta `client/`:

```sh
cd client
```

2. Instalar las dependencias:

```sh
npm install
```

3. Ejecutar el frontend:

```sh
npm start
```

El frontend se ejecutará en `http://localhost:3000`.

---

## 🛠️ Uso

1. **Subir un PDF**: Arrastra y suelta un archivo PDF para extraer su contenido.
2. **Introducir texto manualmente**: Escribe cualquier texto en el área de entrada.
3. **Obtener resumen**: Presiona el botón "Obtener Resumen" y espera la respuesta de la IA.

---

## 📌 Tecnologías Utilizadas

- **Frontend**: React, React Dropzone
- **Backend**: Flask, Flask-CORS, PyMuPDF
- **IA**: OpenAI GPT-4

---

## 🤝 Contribución

1. Haz un fork del repositorio.
2. Crea una rama con tu mejora (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza un commit (`git commit -m 'Añadir nueva funcionalidad'`).
4. Haz un push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Crea un Pull Request.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

💡 **¿Dudas o sugerencias?** ¡Siéntete libre de contribuir o abrir un issue! 🚀

