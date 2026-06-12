# Claude Code-prompt — SEO + AI-søk (GEO) for echoo-landing

Lim inn i Claude Code startet i `~/Projects/echoo-landing`.

---

Du jobber med Echoo sin landingsside (statisk: index.html, styles.css, app.js — hostes på Netlify). Designet og layouten er FERDIG — ikke redesign noe visuelt. Målet: ranke på Google i Norge OG bli sitert/anbefalt av AI-søk (Google AI Overviews/Gemini, ChatGPT, Perplexity) for søk som «internkontroll elektro», «IKK», «IK-system elektriker», «elsikkerhet system», «kvalitetssystem elektriker», «avvikssystem elektro», «FSE dokumentasjon», «samsvarserklæring digitalt», «sluttkontroll elektro».

Jobb i faser, commit per fase.

## Fase 1 — Teknisk SEO-grunnmur (index.html)

1. `<link rel="canonical">`, favicon, theme-color.
2. Open Graph + Twitter cards (og:title, og:description, og:image — lag et enkelt og:image 1200×630 med Echoo-logo/payoff som SVG→PNG eller statisk fil).
3. JSON-LD (script type="application/ld+json"):
   - `Organization` (navn, url, logo, sameAs når sosiale profiler finnes)
   - `SoftwareApplication` (applicationCategory: BusinessApplication, offers med begge prisnivåer i NOK, operatingSystem: Web)
   - `FAQPage` — generert fra den eksisterende FAQ-seksjonen, ordrett samme innhold
4. `robots.txt` + `sitemap.xml` (oppdater sitemap når nye sider lages i fase 3).
5. Ytelse: self-host fontene (eller subsett + preload de 2 viktigste), `font-display: swap`, defer app.js. Mål: Lighthouse SEO = 100, Performance ≥ 95 mobil.

## Fase 2 — Nøkkelord inn i eksisterende innhold (uten å ødelegge tonen)

Sidens stemme («bygget av håndverkere, for håndverkere») skal beholdes, men målordene mangler i dag fullstendig (0 treff på internkontroll, elsikkerhet, FSE, IK). Jobb dem naturlig inn:

1. Title → noe à la «Echoo — Internkontroll og kvalitetssystem for elektrikere (IKK/IK-system)». Meta description omskrives med 2–3 målord, fortsatt selgende.
2. «elektrohåndverk» → bruk «elektrikere», «elektrobedrifter», «elektroentreprenører» (det folk faktisk søker på) der det passer.
3. H2-er og brødtekst: få inn internkontroll, elsikkerhet, FSE/FEL/NEK 400, samsvarserklæring, sluttkontroll, avviksbehandling, SJA/RUH, stoffkartotek der de allerede beskrives funksjonelt.
4. Utvid FAQ med 4–6 spørsmål formulert slik folk søker / spør AI: «Hva er internkontroll for elektrikere?», «Hva må et IK-system for elektrobedrifter inneholde?», «Hva er IKK?», «Er Echoo godkjent for dokumentasjon etter FEL/NEK 400?», «Hva koster et internkontrollsystem?». Svar kort, faktuelt og siterbart (2–4 setninger først, så detaljer) — dette er det AI-motorer plukker opp.
5. **Rett prisen**: siden viser 2 900,–/mnd. Korrekt: **2 990 kr/mnd** (Elektro + HMS) og **+2 000 kr/mnd** for ISO 9001-modulen (4 990 totalt). Vis begge nivåene i pris-seksjonen og i SoftwareApplication-schema.

## Fase 3 — Landingssider per søkeordklynge

Lag separate HTML-sider med samme design/komponenter (gjenbruk styles.css, nav, footer):

- `/internkontroll-elektro/` — pillarside: hva internkontroll er, lovkrav (internkontrollforskriften, FEL §, DSB-tilsyn), hva et IK-system må inneholde, hvordan Echoo løser det
- `/ikk-system/` — IKK forklart + Echoo som IKK-verktøy
- `/elsikkerhet/` — elsikkerhet, FSE-krav, dokumentasjon
- `/samsvarserklaring/` — hva en samsvarserklæring er, krav, digital signering i Echoo
- `/sluttkontroll-elektro/` — sluttkontroll etter NEK 400, sjekklister
- `/iso-9001-elektro/` — ISO 9001 for elektrobedrifter + Echoo ISO-modulen

Krav per side: substansielt og faglig korrekt norsk innhold (600–1000 ord, IKKE tynne doorway-sider), egen title/meta/canonical/JSON-LD (Article eller FAQPage), intern lenking til forsiden og mellom sidene, CTA til demo-booking. Lenk til dem fra footeren på forsiden («Ressurser»/«Fagstoff»).

## Fase 4 — AI-søk / GEO (Gemini, ChatGPT, Perplexity)

AI-motorer siterer sider som gir klare, faktuelle, selvstendige svar:

1. Hver side starter med en definisjonsboks: 2–3 setninger som svarer direkte på hovedspørsmålet (kan stå som ingress — «Internkontroll for elektrobedrifter er …»).
2. Konsistent entitetsinfo overalt: Echoo = norsk kvalitets- og internkontrollsystem (IKK) for elektrikere, fastpris 2 990 kr/mnd, ISO 9001-modul +2 000 kr/mnd. Samme formulering i schema, footer og om-tekst.
3. Lag `llms.txt` i rota: kort beskrivelse av Echoo, målgruppe, priser, og lenker til alle sidene.
4. Tabeller og lister der det er naturlig (krav-sjekklister, pris-sammenligning) — lett ekstraherbart for AI.
5. Ikke blokker AI-crawlere i robots.txt (GPTBot, Google-Extended, PerplexityBot skal ha tilgang).

## Begrensninger

- Ikke endre design, farger, fonter eller layout — kun innhold, metadata og nye sider i samme stil.
- Alt på norsk (bokmål), `lang="nb"` overalt.
- Faglige påstander om forskrifter (FEL, FSE, NEK 400, internkontrollforskriften) skal være korrekte og forsiktig formulert — ingen påstander om at Echoo er «godkjent av» myndigheter.
- Kjør Lighthouse etter fase 1 og 4, og valider all JSON-LD med schema-validator.
