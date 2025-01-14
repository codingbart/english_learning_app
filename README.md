# Aplikacje mobilne projekt

## Założenia realizowane w aplikacji

### Ekrany

**Rejestracja i logowanie**

- email
- hasło
- imię
- zdjęcie profilowe

**Ekran główny**

- imię użytkownika
- ostatnie zdobyte osiągnięcie
- ostatnie 5 nauczonych słów
- procent ukończonych fiszek

**Fiszki**

- słowo
- tłumaczenie
- odwróć stronę
- dodaj fiszkę
- oznacz jako umiem / nie umiem

**Słownik**

- słowo
- tłumaczenie
- szukaj słowa

**Quiz**

- słowo do przetłumaczenia
- 4 opcje odpowiedzi
- wynik quizu i poprawne odpowiedzi

**Czasowniki nieregularne**

- lista czasowników
- czasownik w formie podstawowej
- czas przeszły
- tłumaczenie

**Ustawienia**

- dark mode
- zmiana imienia
- zmiana profilowego
- zresetowanie osiągnięć i statystyk

**Osiągnięcia i statystyki**

- liczba rozwiązanych quizów
- średni wynik z quizów
- liczba nauczonych fiszek
- procent ukończonych fiszek
- osiągnięcia

### Funkcjonalności

- rejestracja i logowanie
- dodawanie zdjęcia profilowego z aparatu
- edycja imienia i zdjęcia profilowego
- zmiana na dark mode
- quizy - dodawanie wyników do osiągnięć
- dodawanie i wyświetlanie fiszek
- akcelerometr do odwracania fiszek potrząsaniem
- wyświetlanie słownika
- wyświetlanie czasowników nieregularnych
- wyświetlanie statystyk nauki



# To start project in IntelliJ IDEA

### If you use Android Studio

In file:
```
english_learning_app/src/api/config.js
```

Change:
```
baseURL:"http://localhost:3001"
```

To:
```
baseURL:"http://10.0.2.2:3001"
```

## To run project:

Open IntelliJ IDEA terminal:
```
npx json-server --watch db.json -p 3001
```

Open new tab in IntelliJ IDEA terminal:
```
npx expo start
```

### To check JSON Server status

Open the web browser and go to:
```
http://localhost:3001
```
This link will work even if you are using IP address for Android Studio in ```config.js```

## To log in to the app

In file:
```
english_learning_app/db.json
```

Search for:
```
  "users": [
    {
      "email": "sample_user_email",
      "password": "sample_user_password"
    }
  ]
```

Use ```"email"``` and ```"password"``` from this file to log in
