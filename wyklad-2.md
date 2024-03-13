# Wprowadzenie

## Docker

Platforma do konteneryzacji

### Innowacyjność

- Przenośność
- Szybkość i elastyczność
- izolacja aplikacji

### Korzyści

- zwiększona efektywność dewelopmentu i wdrożeń

### Kontener

- Proces na maszynie hosta odizolowana od procesów na maszynie hosta

- namespaces, cgroup

- nie zwiera jądra systemu
- szybsze od maszyn wirtualnych

### Obraz

- izolowany system plików

### Dockerfile

- FROM
- COPY/ADD
- WORKDIR
- CMD
- EXPOSE
- ENV

### Zarządzanie kontenerami

- orkierstracja: automatuczne rozmieszczanie, skalowanie i zarządzanie stanem konteneróœ
- monitorowanie i logowanie
- sieciowanie

### Narzędzia do orkiestracji

- Docker swarm
- Kubernetes
- OpenShift
- Amazon ECS/AKS/GKE

### Cykl życia kontenerów

- created
- running
- paused
- deleted
- stopped

### Polecenia

- docker build (zbudowanie obrazu)
- docker create (tworzenie kontenera)
- docker start (uruchomienie kontenera)
- docker run (create i start)
- docker pause (tymczasowe **zatrzymanie** wszystkich procesów wewnątrz kontenera) - kontener pozostaje uruchomione w tle
- docker stop (zatrzymuje kontener - kończy proces, zwalnia zasoby). Bezpieczny sposób na zamykanie krytycznych aplikacji.
- docker rm (flaga --volumes równiez usuwa woluminy)
- docker kill (natychmiastowe zatrzymanie działającego kontenera)

### Wolumeny

- persystencja danych

### Dockerhub

### Docker compose

### Optymalizacja obrazów

- Lekkie obrazy bazowe
- Oficjalne obrazy
- minimalna liczba warstw (używanie jak najmniejszej liczby poleceń, dzięki &&)
- multi-stage build
- poufne dane do zmiennych środowiskowych
