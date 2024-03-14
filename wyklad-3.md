# Infrastructure as a Service IaaS:

- oferuje zasoby obliczeniowe w chmurze
  Przykłady to Amazon EC2, GCE

# Platform as a Service PaaS:

- Przykład to AWS Elastic, Azure, Google App Engine

# Software as a Service (SaaS):

- Spotify,DropBox, YouTube

# Region

Struktura AWS

- Regiony: podział na strefy dostępności,
  przeglądając zasoby widać tylko te z uruchomionego regionu.
  Regiony są podzielone na availability zone, które powinny działać niezależnie

# Strefy dostępności

- dobrze przechowywać dane w różnych strefach dostępności
- zoptymalizowane pod względem ruchu z jednej do drugiej strefu

# S3 a bazy danych

- Przechowywanie danych w bucketach
- bucket może mieć do 5TB danych
- przechowywanie plików, interfejs REST i SOAP

# EBS - woluminy dołączane do intstancji

- szybsze dostępy
- większy koszt przechowywania plików

# S3 Glacier

- tania pamięc masowa do archiwizacji danych
- S3 flexible retrieval - dostęp od kilku minut do kilku godzin (oszczęgność)

# Amozon RDB - Amazon Relational Database

- tworzenie, zarządzanie, skalowanie bazami relacyjnymmi z chmurze
- droższa niż własne hostowanie bazy na serwerze
- zaleta to automatycznie tworzenie backupów

# DynamoDB

- nierelacyjna bazy danych
- przechowywanie danych w postaci klucz wartość
- wbudowane zabezpiecznia, kopie zapasowe
