# Zadania

Aplikacja to prosty panel do zarządzania użytkownikami (Angular 20, RxJS). Zamiast backendu
używa serwisu `UserApiService`, który symuluje API z opóźnieniami i błędami.

Na rozmowie masz ok. 30 minut na 3 zadania. Wszystkie robisz na tej samej gałęzi.

## Uruchomienie

```bash
npm install
npm start
```

Aplikacja będzie dostępna pod adresem http://localhost:4200.

## Zadanie 1: Code review

Zrób code review komponentu `UserStatsComponent` (widoczny na Dashboardzie) tak, jak w PR.

## Zadanie 2: Wyszukiwarka

Użytkownicy zgłaszają, że wyszukiwarka na liście userów działa niepoprawnie. Zdiagnozuj i napraw.

## Zadanie 3: Edycja usera

Zaimplementuj edycję usera: name, email, role, status, z walidacją i obsługą zapisu.
Widok edycji jest dostępny ze szczegółów usera (przycisk „Edit”).

Bonus:
- email musi być unikalny,
- ostrzeżenie przy opuszczaniu strony z niezapisanymi zmianami.
