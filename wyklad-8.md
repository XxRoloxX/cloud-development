# Monitoring

## CloudTrail

- narzędzie do monitorowania i audytów AWS
- logowanie wszystkich akcji w AWS

## CloudWatch

- co się dzieje z aplikacjami i infrastrukturą AWS
- pozwala na używanie metryk i logów

## AWS Config

- W przeciwieństwie do poprzedników pozwala na bieżącą analizę konfiguracji
- Można tworzyć reguły, które sprawdzają zgodność z zasadami

## AWS Cognito

- zarządzanie tożsamością
- uwierzytelnianie przy użyciu różnych dostawców
- wspiera wieloskładnikową autoryzację
- łatwo skalowalny
- zgodny z regulacjami związanymi z ochroną danych

### User pools

- zarządzanie użytkownikami
- uwierzytlenianie i autoryzacja

# SRP - Secure Remote Password

- protokół uwierzytelniania
- osiąga bez przesyłania hasła, używają pochodnej hasła
- pozwala na wymaganie wieloskładnikowej autoryzacji
- personalizacja strony logowania
- "trzeba będzie zapłacić"
- służy do potwierdzenia tożsamości użytkownika

### Identity pools

- komplementarne do user pools
- pozwalają na udzielanie dostepów do zasobów konta AWS przez użytkowników
- dostawcy toźsamości to może być Cognito, Google, Facebook, Amazon, OpenID
- stosowane do przyznawania dostępu do zasobów AWS i urządzeń mobilnych / IoT
- "darmowe"
- na podstawie tożsamości użytkownika przyznaje dostęp do zasobów

Zamiast przynawać uprawnienia użytkownikom, przypisuje się je do ról, które są przypisane do użytkowników
