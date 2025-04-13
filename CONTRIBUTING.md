# Contribuire a xScrabbler

Grazie per il tuo interesse a contribuire a xScrabbler! Questo documento fornisce linee guida e informazioni su come puoi partecipare al progetto.

## 📋 Indice

- [Codice di condotta](#codice-di-condotta)
- [Come posso contribuire?](#come-posso-contribuire)
  - [Segnalare bug](#segnalare-bug)
  - [Suggerire miglioramenti](#suggerire-miglioramenti)
  - [Contribuire al codice](#contribuire-al-codice)
- [Workflow di sviluppo](#workflow-di-sviluppo)
- [Style guide](#style-guide)
- [Commit message](#commit-message)
- [Pull request](#pull-request)

## Codice di condotta

Il nostro progetto adotta un codice di condotta che ci aspettiamo venga rispettato da tutti i partecipanti. Per favore, leggi il [Codice di Condotta](CODE_OF_CONDUCT.md) per comprendere quali comportamenti saranno e non saranno tollerati.

## Come posso contribuire?

### Segnalare bug

I bug vengono tracciati come [issues di GitHub](https://github.com/exSnake/xscrabble-scorer/issues).

Quando crei una segnalazione di bug, per favore includi quanti più dettagli possibili:

- **Titolo chiaro e descrittivo**
- **Passi dettagliati per riprodurre il problema**
- **Comportamento atteso e comportamento osservato**
- **Screenshot** se applicabile
- **Ambiente** (browser, sistema operativo, dispositivo)

### Suggerire miglioramenti

I suggerimenti di miglioramento sono tracciati anch'essi come issues di GitHub. Quando suggerisci un miglioramento, per favore:

- **Usa un titolo chiaro e descrittivo**
- **Fornisci una descrizione dettagliata del miglioramento suggerito**
- **Spiega perché questo miglioramento sarebbe utile per la maggior parte degli utenti**
- **Includi mockup o esempi** se possibile

### Contribuire al codice

Se desideri contribuire direttamente al codice:

1. Fork del repository
2. Crea un nuovo branch per le tue modifiche
3. Implementa le tue modifiche
4. Assicurati che il codice passi i test e il linting
5. Invia una pull request

## Workflow di sviluppo

1. Fork del repository su GitHub
2. Clona il tuo fork localmente
   ```bash
   git clone https://github.com/TUO-USERNAME/xscrabble-scorer.git
   cd xscrabble-scorer
   ```
3. Crea un branch per il tuo lavoro
   ```bash
   git checkout -b feature/nome-della-feature
   ```
4. Sviluppa la tua feature o il tuo fix
5. Esegui i test e il linting
   ```bash
   npm run lint
   ```
6. Committa le tue modifiche (vedi sotto per le convenzioni sui commit)
   ```bash
   git commit -m "feat: aggiungi nuova funzionalità X"
   ```
7. Push al tuo fork
   ```bash
   git push origin feature/nome-della-feature
   ```
8. Crea una Pull Request su GitHub

## Style guide

### JavaScript / Vue

- Segui la configurazione ESLint del progetto
- Usa la Composition API di Vue 3
- Mantieni i componenti piccoli e specifici
- Utilizza le funzioni helper esistenti quando possibile

### CSS

- Utilizza Tailwind CSS per lo styling
- Segui il design esistente per consistenza
- Mantieni il supporto per il tema chiaro e scuro

## Commit message

Seguiamo la [Conventional Commits specification](https://www.conventionalcommits.org/) per i messaggi di commit:

```
<tipo>[scope opzionale]: <descrizione>

[corpo opzionale]

[footer opzionale]
```

Tipi comuni:
- **feat**: Una nuova funzionalità
- **fix**: Una correzione di bug
- **docs**: Modifiche alla documentazione
- **style**: Modifiche che non influenzano il significato del codice (spazi, formattazione, ecc.)
- **refactor**: Modifiche al codice che non correggono bug né aggiungono funzionalità
- **perf**: Modifiche che migliorano le prestazioni
- **test**: Aggiunta o correzione di test

Esempio:
```
feat(scorer): aggiungi supporto per i bonus di parole multiple
```

## Pull request

- Crea una pull request dal tuo branch feature al branch main del repository originale
- Descrivi chiaramente le modifiche che hai apportato
- Collega eventuali issue rilevanti usando la sintassi "Closes #123" o "Fixes #123"
- Assicurati che la PR passi tutti i controlli automatici
- Attendi una revisione da parte dei maintainer

Grazie per contribuire a xScrabbler! 