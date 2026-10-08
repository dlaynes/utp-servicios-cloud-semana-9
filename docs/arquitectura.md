# Arquitectura del proyecto

```text
Usuario -> Frontend -> API -> Datos
```

## Componentes

- **Frontend:** interfaz sencilla en el navegador.
- **API:** servicio HTTP que consulta los datos.
- **Datos:** carpeta con archivos JSON.
- **Orquestación:** Docker Compose y Kubernetes opcionalmente de forma local.
- **Entorno:** recursos locales, sin costo de nube pública.

## Cambio a nube pública o privada

- **Nube pública:** el proveedor gestiona la infraestructura, el escalamiento y el monitoreo.
- **Nube privada:** la universidad mantiene el control directo, seguridad y acceso a datos.
- **Criterio:** en ambos casos, la orquestación pasa a gestionar los mismos servicios frontend, API y datos.
- **Requisito académico:** proyecto ficticio y solo con fines de evidencia académica.

El diagrama está disponible en `docs/diagrama-arquitectura.svg`.
