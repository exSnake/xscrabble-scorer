# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

xScrabbler is a Vue 3 frontend-only Scrabble score tracking application with timer functionality and multi-language support. It supports 10 language variants (italiano, english, nederlands, french, espanol, deutsch, eesti, portugues, sahibba, and Words with Friends edition), each with different letter point values.

## Development Commands

```bash
# Install dependencies
npm install

# Development server (runs on port 3000)
npm run dev

# Development server with network access
npm run dev:host

# Production build
npm run build

# Preview production build
npm run preview

# Lint and fix code
npm run lint
```

## Architecture

### State Management (Pinia)

The application uses a single Pinia store (`src/stores/GameStore.js`) that manages all game state:

- **Persistent state** (stored in localStorage via `useStorage`):
  - `bonus`: Bonus points for using all 7 tiles (default: 50)
  - `maxWordLength`: Maximum word length setting (default: 10)
  - `language`: Current language variant (default: "it")
  - `players`: Array of player objects with id, name, active status, and words
  - `seconds`: Timer duration in seconds (default: 90)

- **Non-persistent state**:
  - `settings`: Letter point values loaded from `src/settings.json`
  - `timer`: Timer object from vue-timer-hook

### Key Store Patterns

1. The store uses Vue 3 Composition API with `setup()` syntax
2. All state is initialized in `onMounted` (including settings import and timer setup)
3. The store exports both state and actions in a single return object
4. Use `storeToRefs()` when destructuring reactive state in components

### Data Models

**Player object structure:**
```javascript
{
  id: number,
  name: string,
  active: boolean,
  words: [
    { id: number, text: string, points: number }
  ]
}
```

**Settings structure (`src/settings.json`):**
- `bingo`: Bonus points value
- `languages`: Map of language codes to display names
- `letters`: Nested object with letter point values per language

### Routing

Three main routes defined in `src/router/index.js`:
- `/` - HomeView (eagerly loaded)
- `/scorer` - ScorerView (lazy loaded)
- `/settings` - SettingsView (lazy loaded)

The router uses `createWebHistory` and sets `linkActiveClass: "active"` for navigation highlighting.

### Component Structure

**Views** (`src/views/`):
- Handle routing and compose multiple components
- Import and orchestrate store actions
- Use `storeToRefs` for reactive state access

**Components** (`src/components/`):
- `PlayerDetails.vue` - Displays player information and word list
- `ScorerAddWord.vue` - Word input form with point calculation
- `TimerTool.vue` - Timer display and controls

**Key patterns:**
- Components emit events for actions (e.g., `@add`, `@delete`, `@activate`)
- Parent components handle store mutations
- Use Transition component for entrance/exit animations

### Styling

- **Tailwind CSS** with custom configuration
- **Dark mode** via class strategy (managed by `useDark` from @vueuse/core)
- **Flowbite** for UI component styles
- Custom font size scale including extra-small sizes (4xs-2xs)

Path alias `@` resolves to `src/` directory (configured in vite.config.js).

## Important Implementation Notes

### Timer Behavior
- Timer pauses after each word is added (calls `pauseTimer()` in `addWord()`)
- `pauseTimer()` toggles between pause/resume states
- `restartTimer()` creates a new timer expiration time and automatically pauses

### Player Management
- Maximum 4 players allowed (enforced by `canAddPlayer` computed property)
- Only one player can be active at a time
- Adding a word automatically advances to next player (circular rotation)
- Deleting the active player or last remaining player sets `activePlayer` to null and pauses timer

### Letter Points
- Accessed via `getCharacterPoints(char)` which looks up from settings
- Returns 0 for characters not found in the current language
- Blank spaces have point value 0 in all languages
- Some languages (Spanish) include multi-character tiles (LL, RR)

### Local Storage
- All game settings and player data persist via `useStorage` from @vueuse/core
- Storage keys: "bonus", "maxWordLength", "language", "players", "seconds"
- Player data uses `{ deep: true }` option for nested reactivity

## Technology Stack

- **Vue 3.2.45** with Composition API
- **Pinia 2.0.28** for state management
- **Vue Router 4.1.6** for routing
- **Vite 4.0.0** as build tool
- **Tailwind CSS 3.2.4** + Flowbite for styling
- **@vueuse/core** for composables (useDark, useStorage)
- **vue-timer-hook** for countdown functionality
- **vue3-toastify** for notifications (3-second auto-close)
- **FontAwesome** + **oh-vue-icons** for iconography
