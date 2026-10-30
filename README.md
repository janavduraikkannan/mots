# Mots

**French sentence practice from French I through AP French Language, with Félicien the tutor cat.**

Part of **[Linguae](https://janavduraikkannan.github.io/linguae/)**, the home page for every language site, with one account for all of them.

Mots is the French sister site of [Verba](https://janavduraikkannan.github.io/verba/) (Latin) and [Palabras](https://janavduraikkannan.github.io/palabras/) (Spanish). It builds fresh French sentences from the topics you pick, then has you translate the whole sentence, English to French or French to English. It checks your answer, tells you exactly what went wrong, and lets you ask Félicien, an AI tutor, questions about the grammar along the way.

> **Privacy, in short:** Mots has no server of its own. Your practice runs in your browser, your AI key goes straight from your browser to the AI company you chose, and nothing is saved anywhere else unless you make an account. If you do, your account and anything you put on the leaderboard are stored with Google Firebase, are **not encrypted**, and **are not private**. Read the full [Privacy Statement](https://github.com/janavduraikkannan/Verba/blob/main/PRIVACY.md), shared by every Linguae site, before making an account.

## What it does

- **Topics by course.** Grammar topics grouped under French I, French II, French III, French IV and AP French Language:
  - French I: articles and gender, plurals (including journaux and gâteaux), adjective agreement and the adjectives that go before the noun, possessives, demonstratives, partitives, regular -er, -ir and -re verbs, être, avoir, aller and the futur proche, faire, spelling-change verbs, irregular verbs, verb + infinitive, negation (pas de), questions, il y a, à and de with places, and time expressions.
  - French II: the passé composé with avoir and with être (and agreement), irregular participles, the imparfait, passé composé vs. imparfait, venir de, reflexive verbs, object pronouns (le, lui, le lui), y and en, commands, comparisons, superlatives, adverbs in -ment and être en train de.
  - French III: futur simple, conditionnel, plus-que-parfait, other negatives (jamais, plus, rien, personne), relative pronouns (qui, que, où, dont) and the subjunctive (forms, il faut que, wishes, emotion, doubt).
  - French IV: si clauses, futur antérieur and conditionnel passé, the subjunctive after conjunctions and after a past main verb, the past subjunctive and the passive voice.
  - AP French Language: si clauses in the past, reported speech, a conjugation sprint and mixed review.
- **Build your own sentence type.** Pick a main structure (statement, negative, question, verb + infinitive, aller + infinitive, command, si clause) and what goes inside it (adjectives, possessives, partitives, object pronouns, places, avec, time expressions, a tense).
- **Focus.** Press Focus on any topic and every sentence will practice it, mixing in your other ticked topics.
- **Whole-sentence translation**, checked first by the site and then, if needed, by the AI, so other correct versions are accepted too. Every way of asking a question counts: est-ce que, inversion (Parles-tu …?) and intonation.
- **Identify the use.** See a highlighted word and name why it's used: the passé composé or the imparfait, avoir or être as the helping verb, what triggers the subjunctive, or what y and en replace. Typed for full XP, or multiple choice for half.
- **Extra credit** after a translation. Opening that use's chart voids it.
- **Fair accent checking.** A missing accent is pointed out but still counts as correct, unless it changes the word (ou / où, a / à, la / là, du / dû, parle / parlé). Missing elision (je aime) or contraction (à le) is wrong. Type accents with the buttons, or type `e/` for é, `e\` for è, `e^` for ê, `e"` for ë and `c\` for ç.
- **Félicien, the AI tutor cat.** Fēlix's French cousin, in a beret and a striped shirt, with a baguette. Before you answer, he judges whether a question gives away too much; after you answer, you can ask anything.
- **Charts for each sentence** (the tenses, articles and pronouns it uses) and a vocabulary list, shown by default and easy to hide.
- **Questions with inversion**, optional: tick it to see questions written with inversion instead of est-ce que. Both are always accepted.
- **XP, levels and streaks**, from Élève to Légende, and a Couronne for finishing AP French.

## Accounts are shared with Verba and Palabras

One account works on every site. Your **account key, username, password, profile and saved AI key** are shared. Your **XP, levels, streaks, topics and course are separate for each language**, and each site has its own leaderboard. French progress is saved in its own part of the same account document (`fr`), so saving on one site never erases the others.

The French leaderboard is the `boardfr` collection. Its security rules are in [`firestore.rules` in the linguae repository](https://github.com/janavduraikkannan/linguae/blob/main/firestore.rules); they have to be published to the shared Firebase project (verba-791ca) before the French leaderboard can save.

## How it works

Mots is a static website with no server and no build step, ready for GitHub Pages.

| Path | What it is |
| --- | --- |
| `index.html` | The whole app: the French sentence engine, answer checker, interface and account code |
| `js/usemode.js` | The identify-the-use tab, shared by every site: choosing which uses to drill (shaded when the class notes cover them), English or target-language sentences, AI grading for typed uses, and "Mark my answer as correct". New features go in their own files like this one and are linked from `index.html` |
| `css/usemode.css` | Styles for the identify-the-use tab |
| `js/moreuses.js` | This site's uses beyond the ones in the engine, so the identify-the-use tab covers every case or form use in the course |
| `engine.js` | The French sentence engine on its own (the same code is inlined in `index.html`), for testing in Node |
| `getkey.html` | Guide to getting a free Groq key |
| `keys.html` | Every AI provider that works, with free limits |
| `img/felicien/` | Félicien, in every mood (drawn by `tools/rig.py` in the Linguae repository) |
| `img/icons/` | Interface icons |
| `media/` | The key tutorial video, its captions and poster |
| `tools/make_mots.py` | The one-time conversion from Palabras' interface, kept for reference |
| `tools/test_engine.js` | Generates thousands of sentences and checks that every model answer and accepted alternative grades as correct |

To check the engine after changing it: `node tools/test_engine.js`. To rebuild `index.html` with a changed engine, replace the `<script id="engine">` block with the contents of `engine.js`.

## Contributing and issues

Suggestions, bug reports and pull requests are welcome, but none are guaranteed to be read, answered or accepted. See **[Contributing](CONTRIBUTING.md)**. **Never post an account key, a password or an AI key in an issue or pull request.**

## Credits

- Icons by Lorc and Delapouite from [game-icons.net](https://game-icons.net), [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) (see `img/icons/LICENSE-game-icons.txt`).
- Day and night switch after Adam Argyle, "Building a theme switch component" ([web.dev](https://web.dev/articles/building/a-theme-switch-component), Apache 2.0), with a sun from [Feather Icons](https://feathericons.com) (MIT) and easings from [Open Props](https://open-props.style) (MIT).
- Confetti by [canvas-confetti](https://github.com/catdad/canvas-confetti) (ISC).
- Profile pictures come from [Wikimedia Commons](https://commons.wikimedia.org); each picture's author and license are shown on the site.
- Fonts: Fraunces, Figtree and Gentium Book Plus, from [Google Fonts](https://fonts.google.com) (SIL Open Font License).
- Félicien was drawn for Linguae, from Verba's Fēlix.

## License

No license has been chosen yet, so all rights are reserved by the owner. The third-party pieces listed under Credits keep their own licenses.
