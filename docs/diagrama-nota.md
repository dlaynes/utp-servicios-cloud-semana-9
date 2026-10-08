# Diagrama y notas sobre la solución

## Relación lógica

```text
Usuario -> Frontend -> API -> Datos
```

## Entorno local

- Frontend: nginx en el puerto 3000 del host.
- API: Flask/gunicorn en el puerto 8000.
- Datos: carpeta JSON accesible desde el contenedor de datos.
- Orquestación: Docker Compose y opcionalmente Kubernetes local.

## Cambio en nube pública

- El frontend y la API pueden desplegarse como pods/servicios gestionados.
- Los datos pueden migrar hacia almacenamiento gestionado.
- El escalamiento y monitoreo quedan parcialmente en manos del proveedor.

## Cambio en nube privada

- Se mantiene el control directo sobre infraestructura y acceso.
- El despliegue se hace en un cluster propio.
- La gestión, seguridad y monitoreo son responsabilidad interna.

El diagrama está disponible en `docs/diagrama.png`.
