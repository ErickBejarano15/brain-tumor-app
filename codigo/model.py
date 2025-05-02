# NOMBRE: Erick Alejandro Bejarano Mosquera
# Proyecto 4 - Perceptrón Simple para Clasificación de Tumores Cerebrales (Dataset Kaggle)

# =======================
# 📌 IMPORTACIÓN DE LIBRERÍAS
# =======================
import pandas as pd
import numpy as np
from sklearn.linear_model import Perceptron
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix, accuracy_score
import matplotlib.pyplot as plt
import seaborn as sns

# =======================
# 📁 CARGA Y VERIFICACIÓN DE DATOS
# =======================
df = pd.read_csv("Brain Tumor.csv")
df.head(10).to_html("preview.html")  # crea tabla HTML

# Verificar distribución de clases
print("======= Distribución de clases =======")
print(df["Class"].value_counts())  # 0 = sin tumor, 1 = con tumor

features_6 = ['Mean', 'Variance', 'Standard Deviation', 'Entropy', 'Skewness', 'Kurtosis']


# ===============================
# 🔍 Análisis descriptivo por clase
# ===============================
print("\n=== Estadísticas de muestras sin tumor (Class = 0) ===")
print(df[df["Class"] == 0][features_6].describe())

print("\n=== Estadísticas de muestras con tumor (Class = 1) ===")
print(df[df["Class"] == 1][features_6].describe())
 
# =======================
# 🔹 MODELO 1: CON 3 CARACTERÍSTICAS
# =======================
features_3 = ['Mean', 'Variance', 'Standard Deviation']
X_3 = df[features_3]
y = df['Class']

# División estratificada
X_train_3, X_test_3, y_train_3, y_test_3 = train_test_split(
    X_3, y, test_size=0.2, random_state=42, stratify=y)

# Entrenamiento
model_3 = Perceptron(max_iter=1000, eta0=0.1, random_state=42)
model_3.fit(X_train_3, y_train_3)

# Evaluación
y_pred_3 = model_3.predict(X_test_3)
acc_3 = accuracy_score(y_test_3, y_pred_3)
cm_3 = confusion_matrix(y_test_3, y_pred_3)

# Resultados del modelo 3
print("\n=== Modelo con 3 características ===")
print("Características:", features_3)
print("Pesos (coef_):", model_3.coef_)
print("Intercepción (bias):", model_3.intercept_)
print(f"Accuracy: {acc_3:.2f}")

# =======================
# 🔹 MODELO 2: CON 6 CARACTERÍSTICAS
# =======================
features_6 = ['Mean', 'Variance', 'Standard Deviation', 'Entropy', 'Skewness', 'Kurtosis']
X_6 = df[features_6]

# División estratificada
X_train_6, X_test_6, y_train_6, y_test_6 = train_test_split(
    X_6, y, test_size=0.2, random_state=42, stratify=y)

# Entrenamiento
model_6 = Perceptron(max_iter=1000, eta0=0.1, random_state=42)
model_6.fit(X_train_6, y_train_6)

# Evaluación
y_pred_6 = model_6.predict(X_test_6)
acc_6 = accuracy_score(y_test_6, y_pred_6)
cm_6 = confusion_matrix(y_test_6, y_pred_6)

# Resultados del modelo 6
print("\n=== Modelo con 6 características ===")
print("Características:", features_6)
print("Pesos (coef_):", model_6.coef_)
print("Intercepción (bias):", model_6.intercept_)
print(f"Accuracy: {acc_6:.2f}")

# =======================
# 📊 VISUALIZACIÓN Y GUARDADO DE MATRICES DE CONFUSIÓN
# =======================
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
sns.heatmap(cm_3, annot=True, fmt='d', cmap='Blues')
plt.title('Matriz de Confusión - 3 características')
plt.xlabel('Predicho')
plt.ylabel('Real')

plt.subplot(1, 2, 2)
sns.heatmap(cm_6, annot=True, fmt='d', cmap='Greens')
plt.title('Matriz de Confusión - 6 características')
plt.xlabel('Predicho')
plt.ylabel('Real')

plt.tight_layout()
plt.savefig("matrices_confusion_nuevo_dataset.png", dpi=300)
plt.show()
