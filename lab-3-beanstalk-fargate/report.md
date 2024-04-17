# Adam Lamers

## Beanstalk - wdrażanie aplikacji webowych

Zautomatyzowany sposób obłsugi tworzenia instancji ec2 do tworzenia aplikacji webowych.
Konfiguracje można zapisuać w S3 i wersjonować.

Pozwala również na load balancing i auto scaling dla aplikacji.

## Fargate - wdrażanie kontenerów

Podobnie jak Beanstalk, ale dla kontenerów.

### ECS

Kontenery są uruchamiane na instancjach EC2 w ramach klastra ECS.
Aplikacje podzielone są na taski, które są uruchamiane na kontenerach.
Kontenery są definiowane w odpowiedniku notacji z docker-compose.yml.

Dla każdego kontenera możemy przypisywać zasoby, takie jak CPU i RAM.

## S3

### Buckets

S3 pozwala na przechowywanie plików w chmurze. Pliki są przechowywane w tzw. `buckecie`.
Bucket musi mieć unikalną nazwę. Możemy definiować polityki dostępu do bucketów.

## Terraform
