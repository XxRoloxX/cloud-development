# Przekazywanie danych

## AWS SNS - system powiadomień

- subskrybenci - np. email, sms, http

### Rodzaje wiadomości SNS

- wiadomość na użytkownika
- wiadomość dla aplikacji

## Architektura serverless

- uruchamianie aplikacji bez zarządzania infrastrukturą

- płacimy tylko za czas obliczeniowy (nie za serwer)
- wysoka dostępność
- wykonane rozwiązanie może być tańsze jeżeli poprawnie zaprojektowane

## Function as a Service (FaaS)

- lambdy w AWS
- PaaS wymaga pewnej wiedzy o konfiguracji (w przeciwieństwie do FaaS)
- PaaS będzie lepsze pod względem ciągłego dużego obciążenia

# Load balancing

## Elastic load balancing (CLB)

- rozdzielanie ruchu na wiele instancji (np EC2)
- skalowanie horyzontalne
- pozwala na równomierne rozłożenie ruchu

### Application Load Balancer

- Równoważenie ruchu odbywa się na podstawie URL

### Network Load Balancer

- Działa na warstwie transportowej
- wydajniejszy niż Application Load Balancer
- obsługuje protokoły TCP, UDP, TLS
- zoptymiliazowany pod kątem niestabilego ruchu

### Classic Load Balancer

- Może działać zarówno na poziomie wartstwy transportowej jak i aplikacji
- rozwiązanie oryginalne od AWS
