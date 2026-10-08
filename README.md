# Universidad Cloud - Semana 9

Aplicación académica con tres componentes:

- **frontend** = interfaz de usuario
- **api** = servicio HTTP
- **datos** = carpeta persistente con archivos JSON

## Comandos rápidos

```bash
docker compose up -d --build
docker compose ps
```

## Verificación

- Frontend: http://localhost:3001
- API: http://localhost:8000
- Datos: http://localhost:8001/estudiantes.json
- Estado API: http://localhost:8000/api/estado

## Detener

```bash
docker compose down
```
