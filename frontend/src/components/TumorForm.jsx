// src/components/TumorForm.jsx
import { useState } from "react";
import axios from "axios";

export default function TumorForm() {
  const [form, setForm] = useState({
    Mean: "",
    Variance: "",
    "Standard Deviation": "",
    Entropy: "",
    Skewness: "",
    Kurtosis: ""
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/predict", form);
      setResult(res.data);
    } catch (err) {
      alert("Error en la predicción");
    }
  };

  const fields = [
    { name: "Mean", label: "Mean / Media" },
    { name: "Variance", label: "Variance / Varianza" },
    { name: "Standard Deviation", label: "Standard Deviation / Desviación Estándar" },
    { name: "Entropy", label: "Entropy / Entropía" },
    { name: "Skewness", label: "Skewness / Asimetría" },
    { name: "Kurtosis", label: "Kurtosis / Curtosis" },
  ];

  const fieldDescriptions = {
    Mean: ["Intensidad media de la imagen", "0 – 255"],
    Variance: ["Dispersión de la intensidad", "0 – 10000"],
    "Standard Deviation": ["Raíz de la varianza", "0 – 100"],
    Entropy: ["Complejidad del patrón", "0 – 8"],
    Skewness: ["Asimetría de distribución de píxeles", "-5 – 5"],
    Kurtosis: ["Forma de la curva de intensidad", "-10 – 20"],
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 p-6 bg-white rounded shadow max-w-6xl mx-auto">
      {/* Formulario */}
      <div>
        <h2 className="text-xl font-bold mb-4">Clasificador de Tumores Cerebrales</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(({ name, label }) => (
            <div key={name}>
              <label className="block font-semibold mb-1">{label}</label>
              <input
                type="number"
                step="any"
                name={name}
                onChange={handleChange}
                required
                placeholder={`Ingresa ${label.toLowerCase()}`}
                className="w-full border rounded p-2"
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 w-full"
          >
            Predecir
          </button>
        </form>

        {result && (
          <div className="mt-6 bg-gray-100 p-4 rounded">
            <p><strong>Resultado:</strong> {result.label}</p>
            <p><strong>Clase:</strong> {result.prediction}</p>
          </div>
        )}
      </div>

      {/* Tabla de rangos */}
      <div>
        <h3 className="text-lg font-bold mb-4">Rangos Típicos por Característica</h3>
        <table className="w-full text-sm border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">Característica (EN / ES)</th>
              <th className="p-2 border">Descripción</th>
              <th className="p-2 border">Rango Estimado</th>
            </tr>
          </thead>
          <tbody>
            {fields.map(({ name, label }) => (
              <tr key={name}>
                <td className="border px-2 py-1">{label}</td>
                <td className="border px-2 py-1">{fieldDescriptions[name][0]}</td>
                <td className="border px-2 py-1">{fieldDescriptions[name][1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
