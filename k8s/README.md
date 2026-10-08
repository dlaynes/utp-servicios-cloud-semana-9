# Despliegue en Kubernetes (opcional)

1. Construye las imagenes

```bash
docker build -t frontend-universidad:1.0.0 -f frontend/Dockerfile .
docker build -t api-universidad:1.0.0 -f api/Dockerfile .
```

2. Aplica los manifiestos

```bash
kubectl apply -f k8s/configmap-datos.yaml
kubectl apply -f k8s/deployment-frontend.yaml
kubectl apply -f k8s/deployment-api.yaml
kubectl apply -f k8s/deployment-datos.yaml
kubectl apply -f k8s/service-frontend.yaml
kubectl apply -f k8s/service-api.yaml
kubectl apply -f k8s/service-datos.yaml
```

3. Verifica pods y servicios

```bash
kubectl get pods
kubectl get svc
```

4. Accede al frontend

```bash
kubectl port-forward svc/frontend 30080:80
```

5. Escala o elimina pods para ver la recuperacion

```bash
kubectl scale deployment api-universidad --replicas=4
kubectl delete pod <nombre_de_un_pod>
```
