# IaC

- powtarzalność infrastruktury
- kontrola wersji
- Terraform -> HashiCorp Configuration Language (HCL)
- CloudWatch -> IaC dla AWS

# Terraform

## Terraform - init

- Pobieranie dostawców (Providers)
- Utworzenie kataloku .terraform -> zarzadzenie stanem infrastruktury
- Ustawianie backendu -> stan infrastruktury może być przechowywany poza maszyną na której jest hostowana
- Inicjalizacja stanu (nowy plik lub dostęp do istniejącego)

## Terraform - stan

- aktualna konfiguracja, zasoby, zmienne
- Unikanie konfliktów i niespójności
- Optymalizacja operacji -> wykonywanie tylko tego co jest faktycznie potrzebne
- unika się modyfikacji pliku stanu ręcznie

## Terraform - plan

- analiza różnic między stanem a konfiguracją
- aby dodawać zmiany warto używać plan -> apply
- Analiza daje nam zmiany które zostaną wprowadzone

## Dlaczego planujemy zmiany

- pewność jakie zmiany zostaną zaaplikowane
- dokładność aplikowanych zmian
- kontrola aplikowanych zmian
- dokumentowanie zmian

## Terraform - apply

- wprowadzanie zmian
- najpierw pokazuje plan zmian, a potem wprowadza zmiany (po potwierdzeniu)
- Zaleca się oddzielne generowanie planu z użyciem `terraform plan`
- aktualizuje faktyczny plik stanu po zaaplikiwaniu zmian

## Terraform - destroy

- usuwanie zasobów z pliku konfiguracyjnego
- pyta o potwierdzenie
- terraform usuwa tylko i wyłącznie zmiany zaaplikowane przez plik stanu

## Niszczenie zasobów?

- zwalnianie niepotrzebnie zajętych zasobów
- czyszczsenie środowisk deweloperskich
- kontrola nad tym co jest usuwane
- możliwa automatyzacja (ale ostrożnie xd)
- dla środowisk produkcyjnych zawsze trzeba się upewnić

## Przechowywanie stanu

- lokalnie (plik terraform.tfstate)
- zdalnie (S3, Azure Blob Storage, Google Cloud Storage, HashiCorp Consul, HashiCorp Terraform Cloud)
- zalecane przechowywanie zdalne

## Zmiana plików stanu

- zapewnienie że jedna zmiana jest aplikowana jednocześnie (zablokowanie modfikacji kiedy inna osoba już rozpoczęła modyfikowanie) - blokowanie apply

## Zasoby

Każdy zasób ma unikalny identyfikator zasobów w dostawcy usług

## Atrybuty zasobów

Atrybuty takie jak adres IP

## Zależności między zasobami

# Zarządzanie stanem

## Elementy stanu

- zabezpieczenie (dostęp do pliku kluczami powinien być ograniczony)
- blokada stanu
- zarządzanie wersjami
- stan jako środowisko - produkcja/staging
