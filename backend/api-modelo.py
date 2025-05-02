# NOMBRE: Erick Alejandro Bejarano Mosquera
# API para Clasificación de Tumores Cerebrales con Perceptrón Simple

from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
from sklearn.linear_model import Perceptron
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib
import os

app = Flask(__name__)
CORS(app)  # Habilitar CORS para cualquier origen

# ===============================
# VARIABLES DEL MODELO
# ===============================
features_6 = ['Mean', 'Variance', 'Standard Deviation', 'Entropy', 'Skewness', 'Kurtosis']
MODEL_FILE = "modelo_perceptron.pkl"
DATA_FILE = "Brain Tumor.csv"

# ===============================
# ENTRENAR Y GUARDAR MODELO (si no existe)
# ===============================
if not os.path.exists(MODEL_FILE):
    print("⚙️ Entrenando modelo Perceptrón...")
    df = pd.read_csv(DATA_FILE)
    X = df[features_6]
    y = df["Class"]

    model = Perceptron(max_iter=1000, eta0=0.1, random_state=42)
    model.fit(X, y)

    joblib.dump(model, MODEL_FILE)
    print("✅ Modelo entrenado y guardado en 'modelo_perceptron.pkl'.")

# ===============================
# ENDPOINT: PREDICCIÓN
# ===============================
@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        print("📩 JSON recibido:", data)

        # Validar que estén todas las características
        for field in features_6:
            if field not in data:
                return jsonify({
                    "success": False,
                    "error": f"Falta la característica '{field}' en el JSON."
                }), 400

        input_values = [float(data[field]) for field in features_6]
        input_array = np.array(input_values).reshape(1, -1)

        model = joblib.load(MODEL_FILE)
        prediction = model.predict(input_array)[0]

        return jsonify({
            "success": True,
            "input": data,
            "prediction": int(prediction),
            "label": "Tumor cerebral detectado" if prediction == 1 else "No se detecta tumor"
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"success": False, "error": str(e)}), 500

# ===============================
# INICIO DEL SERVIDOR
# ===============================
if __name__ == "__main__":
    app.run(debug=True, port=5000)
