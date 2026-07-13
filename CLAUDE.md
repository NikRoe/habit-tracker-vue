# Vue.js Lernprojekt: Habit Tracker (Frontend) – mit späterer NestJS-Anbindung

Ich möchte eine neue Frontend-Anwendung mit Vue.js (Composition API) und
TypeScript bauen – mit maximalem Lerneffekt für mich. Backend-seitig arbeite
ich später wieder mit NestJS, aktuell liegt der Fokus aber ausschließlich
auf dem Vue-Frontend.

## Dein Arbeitsmodus (strikt einhalten)

Für jeden Schritt gehst du so vor:

1. ERKLÄREN: Erkläre das Konzept hinter dem nächsten Schritt –
   was es ist, warum es existiert, wie es ins Gesamtbild passt
   (insbesondere: warum macht man es in Vue so und nicht anders)
2. DOCS: Verlinke die relevanten Abschnitte der offiziellen Dokumentation

Vue.js: https://vuejs.org/guide/introduction.html
Vue Router: https://router.vuejs.org/
Pinia: https://pinia.vuejs.org/
Vite: https://vite.dev/guide/
Vitest: https://vitest.dev/guide/
(später) NestJS: https://docs.nestjs.com

3. AUFGABE: Formuliere eine klare Aufgabe, was ich als nächstes
   selbst implementieren soll
4. WARTEN: Warte, bis ich meinen Code schicke
5. REVIEW: Überprüfe meinen Code auf:

Korrektheit (funktioniert es wie erwartet?)
Vue-Konventionen (Composition API idiomatisch? ref vs. reactive
sinnvoll eingesetzt? Composables sauber extrahiert?)
Potenzielle Bugs oder Edge Cases (z. B. Reactivity-Fallstricke,
unnötige Re-Renders, falsche Nutzung von watch/computed)
Was ich verbessern könnte – aber ohne es direkt zu korrigieren,
sondern als Hinweis, damit ich es selbst anpasse

Schreibe selbst KEINEN fertigen Implementierungscode,
außer ich bitte dich explizit darum.

## Lernfokus pro Bereich

- **Reactivity-System**: Ich will den Unterschied zwischen ref, reactive
  und computed wirklich verstehen – wann was, und warum
- **Component Communication**: Props/Emit für Eltern-Kind-Kommunikation,
  provide/inject für tiefer verschachtelte Fälle – ich will verstehen,
  wann welches Pattern sinnvoll ist statt alles über einen Store zu lösen
- **Pinia**: State, Getters, Actions – und wie sich das von einem simplen
  reactive-Objekt unterscheidet
- **Vue Router**: Nested Routes, Route Guards, Params vs. Query
- **Composables**: Wie man wiederverwendbare Logik extrahiert (eigenes
  useXyz()), Vergleich zu Custom Hooks aus deiner React-Erfahrung
- **TypeScript in Vue**: Typisierung von Props, Emits, Store-State

## Projektdetails

### Thema

Habit Tracker: Nutzer legen Habits an (z. B. "Laufen", "Lesen"), hakt sie
täglich ab, sieht Streaks und eine Wochenübersicht. Passt zu deinem
Interesse an Selbstoptimierung/Routinen und ist komplex genug für
State Management + Routing, aber klein genug, um fokussiert zu bleiben.

### Stack

Vue 3 + <script setup> (Composition API) + TypeScript
Vite als Build-Tool
Vue Router
Pinia für State Management
Tailwind CSS v4
Vitest + Vue Testing Library für Tests
Paketmanager: npm
Backend: aktuell gemockt (via MSW), später
echtes NestJS-Backend gegen den unten definierten API-Contract

### Datenmodell (Frontend-Perspektive)

Habit: id, name, frequency (daily | weekly | bi-weekly | monthly), target_count,
unit (z. B. "mal" | "seiten" | "kapitel" | "minuten"),
color (Enum aus fester Palette, z. B. "blue" | "green" | "red" | ...),
created_at
Entry (Check-in): id, habit_id, date, value (erreichte Menge, z. B.
Seitenzahl), completed (abgeleitet aus value >= target_count)

### Entscheidungen (mit Begründung)

- **Mocking: MSW statt json-server** – der Endpoint
  `GET /stats/streaks?habitId=` ist eine berechnete Ansicht (Streak-Logik
  über Entries), kein reines Datenservieren. Mit json-server bräuchte das
  eine Custom-Middleware; mit MSW ist es einfach eine TS-Funktion im
  Handler. Zusätzlich lassen sich MSW-Handler 1:1 in Vitest
  wiederverwenden (ein Mock-Setup für Browser + Tests statt zweitem
  Serverprozess).
- **Farbe als Enum/Palette statt Hex-String oder Tailwind-Klasse** – das
  Domain-Modell soll nicht von Styling-Details (Tailwind-Klassennamen)
  abhängen. Ein fester, semantischer Satz an Farbnamen wird an einer
  Stelle im Frontend auf konkrete Tailwind-Klassen gemappt.
- **target_count deckt auch Mengen ab** (nicht nur Wiederholungen), z. B.
  "30 Seiten lesen". Deshalb braucht `Habit` ein `unit`-Feld und `Entry`
  ein numerisches `value`-Feld statt nur `completed: boolean` –
  `completed` wird daraus abgeleitet.
- **frequency erweitert um `bi-weekly` und `monthly`** (über die
  ursprünglich geplanten `daily`/`weekly` hinaus) – bewusste Erweiterung.
  Wichtig für später: die Streak-Berechnung in der Statistik-View wird
  dadurch komplexer, da unterschiedliche Rhythmen unterschiedliche
  Regeln brauchen, wann ein Streak als gebrochen gilt.

### Views

Dashboard: heutige/diese-Woche-fällige Habits, schnelles Abhaken
Habit-Verwaltung: Liste, Anlegen, Bearbeiten, Löschen
Statistik: Streaks pro Habit, Wochenübersicht als einfaches Chart

### Angenommener API-Contract (für spätere NestJS-Anbindung)

GET /habits
POST /habits
PATCH /habits/:id
DELETE /habits/:id
GET /habits/:id/entries?from=&to=
POST /entries
GET /stats/streaks?habitId=

### Startreihenfolge

Beginne nur mit Schritt 1: Projekt-Setup (Vite + Vue 3 + TS + Vue Router, Pinia, Ordnerstruktur).
Erkläre das Konzept, verlinke die Docs, formuliere meine Aufgabe.
Warte dann auf meinen Code.

## Projektstand

### Abgeschlossen

1. Projekt-Setup: Vite + Vue 3 + TypeScript + Vue Router + Pinia
   (via `npm create vue@latest`), npm als Paketmanager
2. Tailwind CSS v4 Integration (`@tailwindcss/vite`)
3. Ordnerstruktur angelegt: `views/`, `components/`, `composables/`,
   `types/`, `stores/`
4. Basic Routing: drei named Routes (`dashboard`, `habits`, `stats`),
   `RouterView`/`RouterLink` in `App.vue`, mit Test (Router-Plugin im
   Test, `RouterLinkStub`) abgesichert
5. TypeScript-Typen für das Datenmodell (`Habit`, `Entry`) in
   `src/types/` definiert (camelCase, bewusst backend-agnostisch)
6. Pinia Stores für Habits und Entries (`src/stores/habits.ts`,
   `src/stores/entries.ts`) – Options-Store-Syntax, State jeweils als
   Objekt mit benannter Property (`{ habits: [...] }` /
   `{ entries: [...] }`, nicht als nacktes Array)
7. Mocking-Layer mit MSW (`src/mocks/handlers.ts`, `browser.ts`,
   `habits.ts`, `entries.ts`) – eigene In-Memory-"Datenbank" getrennt
   vom Pinia-Store, Handler für den kompletten API-Contract
   (`GET/POST/PATCH/DELETE /habits`, `GET /habits/:id/entries`,
   `POST /entries`, `GET /stats/streaks` als Platzhalter). Server
   generiert IDs selbst (`getNextId`, Max-ID + 1). Eigene Request-Payload-
   Typen `NewHabit`/`NewEntry` (`Omit<Habit/Entry, 'id'>`) in
   `src/types/`, da der Client die `id` nicht mitschicken soll
8. Habits-Store an MSW angebunden (`fetch` statt lokaler Mutation),
   Actions werfen bei `!response.ok`, Fehlerbehandlung liegt beim
   Aufrufer, nicht im Store
9. `useHabits`-Composable (`src/composables/useHabits.ts`) – nutzt
   `storeToRefs` für reaktiven Zugriff auf Store-State (nicht `let` +
   manuelle Neuzuweisung), lädt Habits per `fetchHabits()` in
   `onMounted`, verwaltet `isLoading`/`fetchError`. Bekanntes,
   akzeptiertes Risiko: mehrere gleichzeitige Consumer würden aktuell
   mehrfach fetchen (Fix bei Bedarf: Request-Deduplizierung im Store)

### Ausstehend (grobe Reihenfolge)

1. Dashboard-View: heutige/fällige Habits anzeigen, schnelles Abhaken
2. Habit-Verwaltung-View: Liste, Anlegen (Formular), Bearbeiten,
   Löschen – Component Communication (Props/Emit) zwischen
   Listen- und Formular-Komponenten
3. Statistik-View: Streaks pro Habit, Wochenübersicht als einfaches
   Chart (inkl. `useStreak`-Composable)
4. Vue Router vertiefen: Nested Routes (z. B. Habit-Detail als
   Kind-Route), Route Guards, Params vs. Query
5. provide/inject für tiefer verschachtelte Component-Kommunikation
   (konkretes Beispiel finden, das nicht einfach über den Store läuft)
6. Tests ergänzen: Komponenten-Tests (Vue Testing Library),
   Store-Tests, Composable-Tests
7. Später: echte NestJS-Anbindung anstelle von MSW (API-Client
   austauschen, Contract bleibt gleich)
