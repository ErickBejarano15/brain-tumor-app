import React from "react";

const rangos = [
  {
    nombre: "Mean / Media",
    sinTumor: "5.9 – 13.6",
    conTumor: "4.0 – 12.4",
    descripcion: "Intensidad media de la imagen"
  },
  {
    nombre: "Variance / Varianza",
    sinTumor: "316 – 766",
    conTumor: "442 – 1216",
    descripcion: "Dispersión de la intensidad"
  },
  {
    nombre: "Standard Deviation / Desv. Estándar",
    sinTumor: "17.7 – 27.6",
    conTumor: "21.0 – 34.8",
    descripcion: "Dispersión típica respecto a la media"
  },
  {
    nombre: "Entropy / Entropía",
    sinTumor: "0.08 – 0.14",
    conTumor: "0.002 – 0.015",
    descripcion: "Complejidad del patrón de la imagen"
  },
  {
    nombre: "Skewness / Asimetría",
    sinTumor: "2.3 – 3.6",
    conTumor: "3.3 – 6.0",
    descripcion: "Grado de asimetría en la distribución"
  },
  {
    nombre: "Kurtosis / Curtosis",
    sinTumor: "6.0 – 13.6",
    conTumor: "11.9 – 38.1",
    descripcion: "Picos extremos en la distribución"
  }
];

export default function AyudaCaracteristicas() {
  return (
    <div className="overflow-x-auto bg-white p-4 shadow rounded">
      <h3 className="text-lg font-bold mb-4">Rangos Típicos por Característica</h3>
      <table className="min-w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Característica</th>
            <th className="p-2 border">Descripción</th>
            <th className="p-2 border">Clase 0 (sin tumor)</th>
            <th className="p-2 border">Clase 1 (con tumor)</th>
          </tr>
        </thead>
        <tbody>
          {rangos.map((campo) => (
            <tr key={campo.nombre}>
              <td className="border px-2 py-1 font-semibold">{campo.nombre}</td>
              <td className="border px-2 py-1">{campo.descripcion}</td>
              <td className="border px-2 py-1">{campo.sinTumor}</td>
              <td className="border px-2 py-1">{campo.conTumor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
