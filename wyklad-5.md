# Terraform

- Główny katalog zawiera root - .tf

# AWS

- AMI - obraz maszyny wirtualnej (id)
- typ instancji: np. t2.ec2
- różne regiony mogą mieć różne id dla tych samych AMI

## Resource

- zasoby do zarządzania (stworzenia/usunięci)
- maszyna wirtualna/sieć/kontener/karta sieciowa

## Moduły

- moduły można wydzielić do osobnych i reużywalnych plików
- jeden moduł - jedno działanie
- Każdy moduł ma plik main.tf, output.tf, i variables.tf
- rejestr modułów terraform

## Dobre praktyki

- dokumentacja
- każdy moduł powinien odpowiadać za jedną część infrastruktury
- np. moduł dla sieci i osobno moduł dla ec2
- wersjonowanie modułów

## Zmienne i wyjścia

### Zmienne

- przechowują wartości w konfiguracji
- string/number/bool/list/map/object
- domyślna wartość jest używana kiedy z zewnątrz nie jest podawana wartość
- typ/opis/domyślna_wartość/walidacja
- można dodać plik terraform tfvars do zmiennych środowiskowych

### Zmienne lokalne

- zmienne lokalne dostępne są tylko w ramach wybranego pliku lub modułu
- locals {
  common_tags = {
  Name = "my-instance"
  Environment = "dev"
  }
  }
- brak interakcji z użytkownikiem i walidacji
- brak wartości domyślnych

### Wyjścia

- zwracanie informacji o zasobach stworzynych przez terraform
- output {
  value = aws_instance.my_instance.public_ip
  }

#### Elementy output'u

- nazwa wartości wyściowej - instance_ip
- wartość - aws_instance.my_instance.public_ip
- flaga wrażliwości - true/false (sensitive = true)
- jeżeli output jest true to informacje o danej operacji nie pojawią się w konsoli
- opis - "Public IP address of the instance"

### Dobre praktyki

- znaczące nazwy zmiennych i wyjść
- oragnizacja zmienne i wyjść w plikach variables.tf i outputs.tf
- modularyzacja
- zachowywać ostrożność z danymi
- **linode** - alternatywa dla AWS
- znak tyldy (~) przy wersji modułu oznacza, że terraform pobierze najnowszą wersję, która jest kompatybilna z wersją modułu

## NAT Gateway dla VPC, żeby instancje w prywatnej podsieci mogły korzystać z internetu

# Bloki

## Resource

- atrybuty
- nazwa po typie zasobu

## Provider

- dostawca zasobów
- np. AWS

## Data

- pobieranie danych dotyczących zasobów
- np.
  data "aws_ami" "ubuntu" {
  most_recent = true
  owners = ["amazon"]
  }
