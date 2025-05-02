import React from "react";
import EntrenamientoPreviewModelo from "./components/EntrenamientoPreviewModelo";
import TumorForm from "./components/TumorForm";
import AyudaCaracteristicas from "./components/AyudaCaracteristicas";

export default function App() {
  return (
    <div className="space-y-12 p-6 bg-gray-100 min-h-screen">
      {/* Sección de entrenamiento + imagen de dataset y matrices */}
      <EntrenamientoPreviewModelo />

      {/* Sección interactiva: formulario y ayuda de características */}
      <div className="grid md:grid-cols-2 gap-8">
        <TumorForm />
        <AyudaCaracteristicas />
      </div>
    </div>
  );
}
