# Block data

- pobieranie informacji o instniających zasobach, które nie są zarządzenie przez terraform,
  przykład to aws_ami
- warto używać do automatyzacji aktualizacji
- bloki te nie są nisczone przez terraform destroy

# Terraform inport - dodawanie zasobów do zarządzanych przez terraforma

# Trraform workspace

- Izolowanie stanu infrastruktury w ramach tego samego projektu
- terraform workspace new
- terraform workspace switch
  Możemy mieć różne pliki stanów. Z jednego projektu można zarządzać produkcją/stagingem itd.

# Terraform backend

Backend przechowuje stan infrastruktury, możliwy jest backend lokaly i zdalny (lepszy dla produkcji)
Zdalnie backend można przechowywać na:

- S3
- Azure Blob
- Google cloud storage
- Consul

Istotne cechy

- przechoywanie stanu zdalnie
- blokowanie stanu
- lepsze bezpieczeństwo z kontrola backendu

Instancja posiadająca bucket może być również stworzona w ramach tego samego projektu terraforma

# Testowanie

Terratest - biblioteka do testowania terraforma, wdrażania i zarządzania
Kitchen-Terraform - wtyczka do test-kitchen, która służy testowania IaaC
Inspect-terraform - inSpect narzędzie do testowania i audytów kodu terraform

## Testy jednostkowe

- testowanie modułów

## Testy integracyjne

- testowanie jak moduły współpracują ze sobą

## Testy akceptacyjne

- sprawdzanie czy cały projekt jest gotowy do produkcji

## Dobre praktyki

- wersjonowanie kodu
- modularnosć
- parametryzacja za pomocą zmiennych
- zarządzanie środowiskami (workspace)
- ostrożność w zmianie stanu
- izolacja stanu dla różnych części infrastryktury lub środowisk
- testowanie
- dokumentacja modulów
- integracja z CI/CD
- używanie ról i polityk do zapewnienia bezpieczeństwa
- logi stanów
-
