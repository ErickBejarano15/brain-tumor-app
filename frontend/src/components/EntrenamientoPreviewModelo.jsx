import React from "react";
import matrizImg from "../assets/matrices_confusion_nuevo_dataset.png";
import datasetImg from "../assets/preview.png"; // Imagen de tabla simulada

export default function EntrenamientoPreviewModelo() {
  return (
    <div className="bg-white shadow rounded p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Entrenamiento del Modelo</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Vista previa del dataset</h3>
        <p className="mb-2 text-sm text-gray-600">
          El conjunto de datos usado contiene 3762 registros y 14 características estadísticas por imagen
          de resonancia magnética cerebral. Aquí puedes ver una muestra representativa de los datos procesados:
        </p>
        <img
          src={datasetImg}
          alt="Vista previa del dataset"
          className="w-full max-h-64 object-contain border rounded"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Matriz de Confusión y Accuracy</h3>
        <p className="mb-2 text-sm text-gray-600">
          A continuación se muestra la imagen generada por el modelo Perceptrón Simple, comparando
          el rendimiento del modelo con 3 y 6 características. El modelo con 6 características logró
          un accuracy del 85%.
        </p>
        <img
          src={matrizImg}
          alt="Matrices de Confusión"
          className="w-full max-h-96 object-contain border rounded"
        />
      </div>
    </div>
  );
}
