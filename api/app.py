import json
import os
import threading

from flask import Flask, jsonify

app = Flask(__name__)

DATOS_PATH = os.environ.get("DATOS_PATH", os.path.join(os.path.dirname(__file__), "..", "datos"))

_cache = {}
_lock = threading.Lock()


def cargar_archivo(nombre):
    archivo = os.path.join(DATOS_PATH, nombre)
    ahora = os.path.getmtime(archivo)
    with _lock:
        if _cache.get(nombre, {}).get("mtime") != ahora:
            with open(archivo, encoding="utf-8") as origen:
                datos = json.load(origen)
            _cache[nombre] = {"mtime": ahora, "contenido": datos}
        return _cache[nombre]["contenido"]


@app.route("/api/estado", methods=["GET"])
def estado():
    return jsonify(
        {
            "estado": "Activo",
            "mensaje": "API universidad funcionando",
            "version": "1.0.0",
        }
    )


@app.route("/api/salud", methods=["GET"])
def salud():
    return jsonify({"estado": "OK"})


@app.route("/api/estudiantes", methods=["GET"])
def listar_estudiantes():
    return jsonify(cargar_archivo("estudiantes.json"))


@app.route("/api/estudiantes/<codigo>", methods=["GET"])
def detalle_estudiante(codigo):
    estudiantes = cargar_archivo("estudiantes.json")
    estudiante = next((est for est in estudiantes if est["codigo"] == codigo), None)
    if not estudiante:
        return jsonify({"error": "Estudiante no encontrado"}), 404
    return jsonify(estudiante)


@app.route("/api/cursos", methods=["GET"])
def listar_cursos():
    return jsonify(cargar_archivo("cursos.json"))


@app.route("/api/calificaciones", methods=["GET"])
def listar_calificaciones():
    return jsonify(cargar_archivo("calificaciones.json"))


@app.route("/api/estadisticas", methods=["GET"])
def estadisticas():
    estudiantes = cargar_archivo("estudiantes.json")
    cursos = cargar_archivo("cursos.json")
    calificaciones = cargar_archivo("calificaciones.json")
    notas = [registro["nota"] for registro in calificaciones]
    return jsonify(
        {
            "estudiantes": len(estudiantes),
            "cursos": len(cursos),
            "promedio": round(sum(notas) / max(len(notas), 1), 2),
        }
    )


if __name__ == "__main__":
    puerto = int(os.environ.get("API_PORT", 8000))
    app.run(host="0.0.0.0", port=puerto)
