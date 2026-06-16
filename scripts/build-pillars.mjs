#!/usr/bin/env node
/**
 * Build 6 pillar/landing pages from a shared template.
 *
 * Outputs:
 *   <repo>/<slug>/index.html  for each entry in PAGES.
 *
 * Each page reuses styles.css, app.js, fonts and og-image from the root.
 * Content lives in PAGES below — edit there, re-run to regenerate.
 *
 * Run:  node scripts/build-pillars.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://echoo.no';
const TODAY = '2026-06-12';

// All 6 pillar pages share these footer links (also used on forsiden)
const PILLARS = [
  { slug: 'internkontroll-elektro', short: 'Internkontroll for elektrobedrifter' },
  { slug: 'ikk-system',             short: 'IKK — internkontroll-kvalitet' },
  { slug: 'elsikkerhet',            short: 'Elsikkerhet og FSE' },
  { slug: 'samsvarserklaring',      short: 'Samsvarserklæring etter FEL §12' },
  { slug: 'sluttkontroll-elektro',  short: 'Sluttkontroll etter NEK 400' },
  { slug: 'iso-9001-elektro',       short: 'ISO 9001 for elektrobedrifter' },
];

// Page-specific content
const PAGES = {
  'internkontroll-elektro': {
    title: 'Internkontroll for elektrobedrifter — kort og presis guide | Echoo',
    metaDesc: 'Hva internkontroll for elektrobedrifter krever etter internkontrollforskriften, FEL, FSE og NEK 400. Hva et IK-system må inneholde — og hvordan Echoo løser det.',
    h1: 'Internkontroll for elektrobedrifter',
    eyebrow: 'Pillarguide · Internkontroll',
    definition: 'Internkontroll for elektrobedrifter er det systematiske arbeidet med å sikre at virksomheten oppfyller HMS-lovgivningen og elektrofagforskriftene — internkontrollforskriften av 1996, forskrift om elektriske lavspenningsanlegg (FEL), forskrift om sikkerhet ved arbeid i og drift av elektriske anlegg (FSE) og NEK 400.',
    description: 'Hva internkontroll for elektrobedrifter krever etter internkontrollforskriften, FEL, FSE og NEK 400, hva et IK-system må inneholde, og hvordan Echoo løser det.',
    body: `
<h2>Hva er internkontroll for elektrobedrifter?</h2>
<p>Internkontroll handler om at virksomheten selv har et system for å holde orden på lovkravene den er underlagt — ikke at noen utenfra kommer og kontrollerer. For en elektrobedrift omfatter dette to spor som ofte forveksles:</p>
<ul>
  <li><strong>HMS-internkontroll</strong> etter internkontrollforskriften av 1996. Gjelder alle virksomheter med ansatte: helse, miljø og sikkerhet, vernerunder, risikovurdering, avviksbehandling.</li>
  <li><strong>Elektrofaglig internkontroll</strong> etter FEL, FSE og NEK 400. Spesifikt for elektrobedrifter: dokumentert sluttkontroll, samsvarserklæring, instruksjon og opplæring i sikker drift av elektriske anlegg.</li>
</ul>
<p>I praksis krever begge sporene det samme grunnleggende: skriftlige rutiner, dokumenterte risikovurderinger, et system for å fange og lukke avvik, og evnen til å vise frem dokumentasjonen ved tilsyn — typisk fra Arbeidstilsynet på HMS-siden og fra DSB på det elektrofaglige.</p>

<h2>Lovgrunnlaget — hvilke forskrifter gjelder?</h2>
<p>De viktigste regelverkene for en norsk elektrobedrift er:</p>
<table>
  <thead><tr><th>Regelverk</th><th>Hva det dekker</th></tr></thead>
  <tbody>
    <tr><td><strong>Internkontrollforskriften</strong></td><td>Generelle krav til systematisk HMS-arbeid i alle virksomheter.</td></tr>
    <tr><td><strong>FEL</strong> (forskrift om elektriske lavspenningsanlegg)</td><td>Krav til utførelse, dokumentasjon og samsvarserklæring for lavspenningsanlegg.</td></tr>
    <tr><td><strong>FSE</strong> (forskrift om sikkerhet ved arbeid i og drift av elektriske anlegg)</td><td>Krav til sikker drift, instruksjon, opplæring og rapportering av uønskede hendelser (RUH).</td></tr>
    <tr><td><strong>NEK 400</strong></td><td>Norsk standard for utførelse av lavspenningsanlegg. Brukes som teknisk referansenivå i FEL.</td></tr>
    <tr><td><strong>Forskrift om elektroforetak</strong></td><td>Krav om kvalifisert faglig ansvarlig og om at virksomheten er registrert hos DSB.</td></tr>
  </tbody>
</table>

<h2>Hva må et IK-system for elektrobedrifter inneholde?</h2>
<p>Det er ingen myndighet som sertifiserer programvare for internkontroll, men kravene til hva systemet skal dekke er ganske entydige. En praktisk sjekkliste:</p>
<ul>
  <li><strong>Organisasjon og ansvar.</strong> Hvem er daglig leder, hvem er faglig ansvarlig, hvem har ansvar for HMS — beskrevet og oppdatert.</li>
  <li><strong>Risikovurdering.</strong> Både generelle arbeidsoppgaver og prosjektspesifikke vurderinger (SJA før risikofylt arbeid).</li>
  <li><strong>Rutiner og instrukser.</strong> Sikker drift av elektriske anlegg (FSE), bruk av personlig verneutstyr, rutiner for melding av avvik.</li>
  <li><strong>Avviksbehandling.</strong> System for å registrere, følge opp og lukke avvik — inkludert RUH etter FSE.</li>
  <li><strong>Kompetanse.</strong> Register over fagbrev, sertifikater, FSE-kurs og førstehjelpskurs. Påminnelser før noe går ut.</li>
  <li><strong>Stoffkartotek.</strong> Sikkerhetsdatablad for produktene som brukes på anlegg.</li>
  <li><strong>Sluttkontroll og samsvarserklæring.</strong> Sjekklister etter NEK 400, dokumentert måling, signert samsvarserklæring etter FEL §12.</li>
  <li><strong>Oppbevaring og sporbarhet.</strong> Dokumentasjon må kunne hentes frem på forespørsel fra tilsynsmyndighet og kunde.</li>
</ul>

<h2>Tilsyn fra DSB — hva sjekkes?</h2>
<p>DSB (Direktoratet for samfunnssikkerhet og beredskap) er tilsynsmyndighet for elektriske anlegg og elektrobedrifter. Ved et tilsyn er det typisk to ting myndigheten ser etter: at virksomheten <em>har</em> et internkontrollsystem som dekker kravene over, og at systemet <em>brukes</em> — at det finnes sluttkontroller, signerte samsvarserklæringer og dokumenterte avvik fra reelle prosjekter, ikke bare tomme maler i en perm.</p>

<h2>Slik løser Echoo internkontroll for elektrobedrifter</h2>
<p>Echoo samler alt det over i ett system, knyttet til prosjektkortet for hvert anlegg. Risikovurdering, sluttkontroll, samsvarserklæring, avvik, SJA/RUH, stoffkartotek og kompetanseregister henger sammen — ingen løse tråder mellom permer, regneark og e-post.</p>
<p>Pris: fastpris 2 990 kr/mnd per bedrift for Elektro + HMS, eller 4 990 kr/mnd hvis du i tillegg vil ha <a href="/iso-9001-elektro/">ISO 9001-modulen</a>. Ubegrenset antall brukere og prosjekter.</p>
<p><a href="/#demo">Book en demo</a> hvis du vil se hvordan det fungerer i praksis, eller les videre om <a href="/ikk-system/">IKK</a> og <a href="/elsikkerhet/">elsikkerhet etter FSE</a>.</p>
`,
    faq: [
      { q: 'Hvem fører tilsyn med internkontroll for elektrobedrifter?',
        a: 'Arbeidstilsynet har ansvar for HMS-delen etter internkontrollforskriften, mens DSB (Direktoratet for samfunnssikkerhet og beredskap) har ansvar for den elektrofaglige delen — utførelse etter FEL, drift og arbeid etter FSE. I tillegg fører forsikringsselskaper og oppdragsgivere i bygg- og anleggsbransjen ofte sine egne kontroller.' },
      { q: 'Hvor ofte må risikovurderingen oppdateres?',
        a: 'Internkontrollforskriften krever at risikovurderingen holdes oppdatert «når forholdene endrer seg». I praksis betyr det at den må revideres ved nye arbeidsoperasjoner, nye anleggstyper, organisasjonsendringer eller etter alvorlige hendelser — og minst gjennomgås årlig.' },
      { q: 'Kan en samling regneark og Word-dokumenter regnes som internkontrollsystem?',
        a: 'Formelt sett ja — regelverket stiller krav til innholdet, ikke til verktøyet. I praksis blir et regneark- og perm-basert system tungt å holde oppdatert, og særlig vanskelig å bruke i felt. De fleste bedrifter går over til et dedikert IK-system når antall ansatte og prosjekter vokser.' },
    ],
    related: ['ikk-system', 'elsikkerhet', 'samsvarserklaring'],
  },

  'ikk-system': {
    title: 'IKK-system for elektrobedrifter — hva det er, og hva det må dekke | Echoo',
    metaDesc: 'IKK står for «internkontroll-kvalitet» og er bransjebegrepet for elektrobedrifters kombinerte HMS- og elektrofaglige kvalitetssystem. Slik velger du et IKK-verktøy.',
    h1: 'IKK-system for elektrobedrifter',
    eyebrow: 'Pillarguide · IKK',
    definition: 'IKK står for «internkontroll-kvalitet» og brukes i elektrobransjen om systemer som dekker både HMS-internkontroll (etter internkontrollforskriften) og elektrofaglig kvalitetsstyring (etter FEL, FSE og NEK 400). Et IKK-verktøy samler typisk risikovurdering, sluttkontroll, samsvarserklæring, avvik, SJA/RUH, stoffkartotek og kompetansebevis i én løsning.',
    description: 'IKK forklart: hva forkortelsen betyr, forholdet til HMS-internkontroll, og hva et IKK-system må dekke for elektrobedrifter.',
    body: `
<h2>Hva betyr IKK?</h2>
<p>IKK er en bransjeforkortelse for <strong>internkontroll-kvalitet</strong>. Begrepet brukes mest i elektrobransjen og dekker både HMS-delen som alle norske virksomheter må ha etter internkontrollforskriften, og den elektrofaglige kvalitetsstyringen som spesielt elektrobedrifter må ha etter FEL, FSE og NEK 400. Et «IKK-system» eller «IK-system for elektrobedrifter» er altså den samlede dokumentasjonsløsningen som dekker begge.</p>

<h2>IKK vs. HMS-internkontroll — hva er forskjellen?</h2>
<p>Forskjellen er først og fremst hva som dekkes:</p>
<table>
  <thead><tr><th>Område</th><th>HMS-internkontroll</th><th>IKK / IK-system for elektro</th></tr></thead>
  <tbody>
    <tr><td>Lovgrunnlag</td><td>Internkontrollforskriften (1996)</td><td>+ FEL, FSE, NEK 400</td></tr>
    <tr><td>Hvem gjelder for</td><td>Alle virksomheter med ansatte</td><td>Elektroforetak registrert hos DSB</td></tr>
    <tr><td>Tilsynsmyndighet</td><td>Arbeidstilsynet</td><td>+ DSB</td></tr>
    <tr><td>Typisk innhold</td><td>Risikovurdering, vernerunder, avviksregistrering</td><td>+ sluttkontroll, samsvarserklæring, FSE-instruksjon, RUH</td></tr>
  </tbody>
</table>
<p>En elektrobedrift kan ikke nøye seg med kun HMS-internkontroll — det elektrofaglige må også dekkes. Et godt IKK-system håndterer begge sporene uten å duplisere data.</p>

<h2>Hva må et IKK-system dekke?</h2>
<p>Bransjestandarden — uavhengig av hvilken leverandør du velger — er at et IKK-verktøy skal kunne:</p>
<ul>
  <li>Føre <strong>risikovurdering</strong> på virksomhets- og prosjektnivå.</li>
  <li>Generere og signere <strong>sluttkontroll</strong> etter NEK 400, med bilder, måleverdier og kommentar.</li>
  <li>Lage <strong>samsvarserklæring</strong> som oppfyller kravene i FEL §12.</li>
  <li>Registrere og lukke <strong>avvik</strong> — inkludert rapporter om uønsket hendelse (RUH) etter FSE.</li>
  <li>Holde <strong>kompetanseregister</strong> med fagbrev, FSE-kurs og førstehjelp — med varsling før utløp.</li>
  <li>Samle <strong>stoffkartotek</strong> med sikkerhetsdatablad (SDS) koblet til prosjektet.</li>
  <li>Tilby <strong>arkiv og søk</strong> som lar deg finne dokumentasjon på et eldre anlegg uten å lete i mailtråder.</li>
</ul>

<h2>Hva koster et IKK-system?</h2>
<p>De fleste IKK-leverandørene i Norge prises per bruker — typisk i intervallet 200–600 kr per montør per måned. Det betyr at totalkostnaden vokser med antall ansatte, og at vekst straffes økonomisk akkurat når bedriften har mest å gjøre.</p>
<p>Echoo gjør det motsatt: <strong>fastpris 2 990 kr/mnd per bedrift</strong> for Elektro + HMS, eller 4 990 kr/mnd hvis du i tillegg vil ha <a href="/iso-9001-elektro/">ISO 9001-modulen</a>. Antall brukere og prosjekter er ubegrenset.</p>

<h2>Hvordan velge et IKK-verktøy</h2>
<p>Når du vurderer leverandører, sjekk særlig dette:</p>
<ol>
  <li><strong>Mobil-først.</strong> Dokumentasjon må kunne fylles ut der jobben skjer — ikke på kontoret to dager senere.</li>
  <li><strong>Dekker både HMS og det elektrofaglige</strong>, ikke bare det ene.</li>
  <li><strong>Maler oppdateres</strong> når forskrift eller NEK-standard endres.</li>
  <li><strong>Digital signering</strong> direkte i systemet, ikke som en separat utskrifts- og scanningsoperasjon.</li>
  <li><strong>Eksport og portabilitet</strong> — du eier dataene dine og kan ta dem med deg.</li>
</ol>

<h2>Echoo som IKK-verktøy</h2>
<p>Echoo er bygget av elektrikere i OPCOM AS for å løse nettopp dette: et samlet IKK-system for elektrobedrifter, der dokumentasjonen følger jobben i stedet for å være en ekstra oppgave på slutten av dagen. <a href="/#demo">Book demo</a>, les mer om <a href="/internkontroll-elektro/">internkontroll for elektrobedrifter</a>, eller se hvordan vi løser <a href="/samsvarserklaring/">digital samsvarserklæring</a>.</p>
`,
    faq: [
      { q: 'Er IKK det samme som HMS-internkontroll?',
        a: 'Nei. HMS-internkontrollen følger internkontrollforskriften og gjelder alle norske virksomheter med ansatte. IKK utvider dette med det elektrofaglige (FEL, FSE, NEK 400). En elektrobedrift trenger begge — derfor er det vanlig at det samme verktøyet dekker dem.' },
      { q: 'Må alle elektrobedrifter ha et IKK-system?',
        a: 'Alle elektroforetak som er registrert hos DSB må ha et internkontrollsystem som dekker både HMS og det elektrofaglige. Det er ikke et formelt krav at det heter «IKK», men innholdet — risikovurdering, sluttkontroll, samsvarserklæring, avvik, kompetanse og rutiner — må være på plass.' },
      { q: 'Kan vi bytte IKK-system underveis uten å miste dokumentasjon?',
        a: 'Ja, så lenge dataene dine er eksportbare. Sjekk at leverandøren tilbyr full PDF-/CSV-eksport av prosjektkort, sluttkontroller, samsvarserklæringer, avvik og kompetanseregister før dere binder dere. Et godt IKK-system skal aldri «låse» dataene inne.' },
    ],
    related: ['internkontroll-elektro', 'elsikkerhet', 'iso-9001-elektro'],
  },

  'elsikkerhet': {
    title: 'Elsikkerhet i elektrobedrifter — hva FEL og FSE krever | Echoo',
    metaDesc: 'Elsikkerhet for elektrobedrifter: hva FEL og FSE krever om instruksjon, opplæring, sikker drift og dokumentasjon — og hvordan kravene støttes av et IKK-system.',
    h1: 'Elsikkerhet — krav etter FEL og FSE',
    eyebrow: 'Pillarguide · Elsikkerhet',
    definition: 'Elsikkerhet er det systematiske arbeidet med å forebygge ulykker og skader knyttet til elektriske anlegg. For elektrobedrifter er rammene satt av forskrift om elektriske lavspenningsanlegg (FEL) og forskrift om sikkerhet ved arbeid i og drift av elektriske anlegg (FSE), med NEK 400 som teknisk referanse.',
    description: 'Krav til elsikkerhet i norske elektrobedrifter etter FEL og FSE: instruksjon, opplæring, sikker drift og dokumentasjon.',
    body: `
<h2>Hva omfatter elsikkerhet?</h2>
<p>I norsk regelverk er elsikkerhet et samlebegrep for både teknisk sikkerhet ved utførelse av anlegg (FEL/NEK 400) og personsikkerhet ved arbeid på og drift av anleggene (FSE). Som elektrobedrift må du forholde deg til begge — én forskrift dekker hvordan anlegget skal være, den andre hvordan menneskene skal jobbe på det.</p>

<h2>FEL — forskrift om elektriske lavspenningsanlegg</h2>
<p>FEL setter krav til at lavspenningsanlegg skal utføres, kontrolleres og dokumenteres slik at de ikke utgjør fare for liv, helse eller eiendom. De mest praktiske kravene i hverdagen:</p>
<ul>
  <li><strong>FEL §12</strong> — krav om <strong>samsvarserklæring</strong> for nye anlegg og endringer. Erklæringen skal vise at anlegget oppfyller forskriften.</li>
  <li>Dokumentert <strong>sluttkontroll</strong> før anlegget overleveres og settes under spenning.</li>
  <li>Bruk av <strong>NEK 400</strong> som det tekniske utførelsesnivået — siste utgave er NEK 400:2022.</li>
</ul>

<h2>FSE — forskrift om sikkerhet ved arbeid i og drift av elektriske anlegg</h2>
<p>FSE handler om personene som jobber på anleggene. Forskriften krever blant annet:</p>
<ul>
  <li><strong>Årlig opplæring/instruksjon</strong> i FSE for alle som arbeider på elektriske anlegg, inkludert førstehjelp ved strømulykker.</li>
  <li><strong>Kompetansekrav</strong> — alle skal være «sakkyndig» eller «instruert person» i forskriftens forstand.</li>
  <li>Krav til <strong>sikker drift</strong>: arbeidsmetoder, frakobling, jording, prosedyrer for arbeid under spenning.</li>
  <li><strong>Rapportering av uønskede hendelser (RUH)</strong> — strømgjennomgang, lysbue, nestenulykke — også når det «gikk bra».</li>
</ul>

<h2>Hva må dokumenteres?</h2>
<p>For elsikkerhetsarbeidet er det fire dokumentasjonsspor som typisk må være på plass og fremvises ved tilsyn:</p>
<table>
  <thead><tr><th>Område</th><th>Typisk dokumentasjon</th></tr></thead>
  <tbody>
    <tr><td>Opplæring</td><td>Signerte FSE-kursbevis, deltakerliste, dato for siste oppdatering.</td></tr>
    <tr><td>Kompetanse</td><td>Fagbrev, sertifikater, register over hvem som er kvalifisert for hva.</td></tr>
    <tr><td>Rutiner</td><td>Sikker jobbanalyse (SJA), instrukser for spesifikke arbeidsoperasjoner.</td></tr>
    <tr><td>Hendelser</td><td>RUH med årsaksanalyse og tiltak — også for nestenulykker.</td></tr>
  </tbody>
</table>

<h2>Førstehjelp ved strømulykker</h2>
<p>Førstehjelp er en eksplisitt del av FSE-opplæringen. Alle som arbeider på elektriske anlegg skal kunne håndtere strømgjennomgang og lysbueulykker, kjenne til frigjøring og hjerte-lunge-redning, og vite at <strong>alle strømgjennomganger skal undersøkes medisinsk</strong> — selv om personen virker uskadd. Etterundersøkelse er nødvendig fordi alvorlige hjerteproblemer kan oppstå opptil 24–48 timer etter ulykken.</p>
<p>Bedriften skal også ha en plan for varsling og oppfølging av strømulykker, og hendelsen skal registreres som RUH med årsaksanalyse uavhengig av om noen ble skadet.</p>

<h2>Vanlige feil ved tilsyn</h2>
<p>Erfaringsmessig er det de samme tingene som går igjen når DSB påpeker mangler hos elektrobedrifter:</p>
<ul>
  <li>FSE-opplæringen er <strong>ikke dokumentert</strong> årlig.</li>
  <li>Kompetanseregisteret er <strong>ikke oppdatert</strong> — sertifikater har gått ut uten at noen oppdaget det.</li>
  <li><strong>RUH er underrapportert</strong> fordi det føles tungvint å registrere.</li>
  <li>Sluttkontroll og samsvarserklæring er <strong>signert manuelt og lagt i en perm</strong> som ingen finner igjen.</li>
</ul>
<p>De fleste av disse handler ikke om dårlig fagkunnskap — de handler om at dokumentasjonsverktøyet er for tungvint til å brukes i felt.</p>

<h2>Slik støtter Echoo elsikkerhetsarbeidet</h2>
<p>Echoo samler FSE-relatert dokumentasjon i samme system som resten av kvalitetsarbeidet: <a href="/sluttkontroll-elektro/">sluttkontroll</a>, <a href="/samsvarserklaring/">samsvarserklæring</a>, kompetanseregister med utløpsvarsling, RUH-registrering fra mobil og digital signering av instrukser. Pris: <strong>fastpris 2 990 kr/mnd</strong> per bedrift, alle moduler inkludert. <a href="/#demo">Book demo</a> eller les om <a href="/internkontroll-elektro/">internkontroll for elektrobedrifter</a>.</p>
`,
    faq: [
      { q: 'Hvor ofte må FSE-opplæringen gjentas?',
        a: 'FSE krever at opplæring og instruksjon gis minst én gang i året til alle som arbeider på eller drifter elektriske anlegg, inkludert førstehjelp ved strømulykker. Hvem som har deltatt og når, skal kunne dokumenteres.' },
      { q: 'Hvem regnes som «sakkyndig» etter FSE?',
        a: 'Sakkyndig er en person som ved utdanning, opplæring, kunnskap og erfaring kan vurdere risiko og planlegge og utføre arbeid på elektriske anlegg sikkert. Andre kan opptre som «instruert person» under tilsyn av sakkyndig. Vurderingen gjøres av virksomheten selv basert på personens kvalifikasjoner.' },
      { q: 'Må alle nestenulykker rapporteres som RUH?',
        a: 'FSE krever at uønskede hendelser som har gitt eller kunne ha gitt skade på person, materiell eller miljø, skal registreres og følges opp. I praksis betyr det at både strømgjennomgang, lysbue og nestenulykker rapporteres som RUH — også når «det gikk bra».' },
    ],
    related: ['internkontroll-elektro', 'sluttkontroll-elektro', 'samsvarserklaring'],
  },

  'samsvarserklaring': {
    title: 'Samsvarserklæring etter FEL §12 — krav og digital signering | Echoo',
    metaDesc: 'Hva en samsvarserklæring er, kravene i FEL §12, hvem som signerer, hva den skal inneholde, og hvordan generere og signere den digitalt i Echoo.',
    h1: 'Samsvarserklæring etter FEL §12',
    eyebrow: 'Pillarguide · Samsvarserklæring',
    definition: 'En samsvarserklæring er en skriftlig erklæring fra elektroentreprenøren om at et nytt eller endret elektrisk anlegg er utført i samsvar med kravene i forskrift om elektriske lavspenningsanlegg (FEL) og relevant norm — typisk NEK 400. Kravet er hjemlet i FEL §12.',
    description: 'Samsvarserklæring etter FEL §12: hva den må inneholde, hvem som signerer, og hvordan den genereres og signeres digitalt.',
    body: `
<h2>Hva er en samsvarserklæring?</h2>
<p>En samsvarserklæring er <em>elektroentreprenørens egen erklæring</em> om at et lavspenningsanlegg er utført i samsvar med gjeldende forskrift (FEL) og normen som er lagt til grunn (i praksis NEK 400). Den er ikke en attest fra det offentlige — det er virksomheten som står ansvarlig for innholdet.</p>
<p>Erklæringen skal gis til den som har bestilt arbeidet (eier av anlegget), og kreves både for nye anlegg og ved endringer eller utvidelser av eksisterende anlegg.</p>

<h2>Hva sier FEL §12?</h2>
<p>FEL §12 («Erklæring om samsvar») krever at den som er ansvarlig for utførelsen av elektriske anlegg skal gi en skriftlig erklæring til eier eller bruker. Erklæringen skal vise hvilke krav anlegget er utført i samsvar med, og hvem som er ansvarlig for arbeidet.</p>
<p>Den skal også kunne fremvises ved tilsyn fra DSB — og oppbevares så lenge anlegget er i drift. Mange elektrobedrifter velger å arkivere både elektronisk og som signert PDF.</p>

<h2>Hva må samsvarserklæringen inneholde?</h2>
<p>Det er ingen offisiell mal for samsvarserklæringen, men i praksis må disse opplysningene være med:</p>
<table>
  <thead><tr><th>Felt</th><th>Innhold</th></tr></thead>
  <tbody>
    <tr><td>Anleggsinformasjon</td><td>Adresse, kunde, prosjekt-/anleggsnummer.</td></tr>
    <tr><td>Omfang</td><td>Hvilket arbeid som er utført — nytt anlegg, endring, utvidelse.</td></tr>
    <tr><td>Forskrifter og normer</td><td>FEL, NEK 400-utgave, andre relevante standarder.</td></tr>
    <tr><td>Virksomheten</td><td>Firmanavn, organisasjonsnummer, registreringsnummer i DSBs elvirksomhetsregister.</td></tr>
    <tr><td>Faglig ansvarlig</td><td>Navn og signatur på den som er ansvarlig for utførelsen.</td></tr>
    <tr><td>Dato</td><td>Når anlegget er ferdigstilt og erklæringen utstedt.</td></tr>
    <tr><td>Vedlegg</td><td>Henvisning til sluttkontroll, måleprotokoll, dokumentasjon på anlegget.</td></tr>
  </tbody>
</table>

<h2>Hvem kan signere?</h2>
<p>Samsvarserklæringen skal signeres av faglig ansvarlig (den kvalifiserte personen som er ansvarlig for utførelsen i virksomheten — typisk den som er registrert hos DSB som faglig ansvarlig elektroinstallatør). Selve håndverket kan være utført av andre kvalifiserte personer i bedriften, men ansvaret følger den faglig ansvarlige som signerer.</p>

<h2>Manuell vs. digital signering</h2>
<p>Det er ingen forskriftskrav om papir og fysisk underskrift — en digital signatur som identifiserer underskriveren er fullt akseptabel. Fordeler ved digital signering:</p>
<ul>
  <li>Erklæringen genereres <strong>automatisk fra prosjektdata</strong> — ingen manuell utfylling av samme felter to ganger.</li>
  <li>Signaturen er <strong>sporbar</strong> med tidsstempel og bruker-id.</li>
  <li>PDF-en kan <strong>arkiveres og søkes opp</strong> sammen med resten av prosjektdokumentasjonen.</li>
  <li>Du slipper å printe, signere, scanne og lagre dobbelt.</li>
</ul>

<h2>Hvor lenge må erklæringen oppbevares?</h2>
<p>Praktisk regel: så lenge anlegget er i drift. Mange bedrifter oppbevarer i tillegg en kopi sentralt i bedriften, ikke bare hos kunden, slik at den kan hentes frem ved fremtidige endringer, tilsyn eller forsikringssaker. Et IK-system gjør dette enkelt — alt ligger i prosjektarkivet.</p>

<h2>Samsvarserklæring i Echoo</h2>
<p>I Echoo genereres samsvarserklæringen automatisk fra prosjektkortet når <a href="/sluttkontroll-elektro/">sluttkontrollen</a> er ferdig. Faglig ansvarlig signerer digitalt rett fra mobil eller PC, PDF-en arkiveres på prosjektet og er søkbar etterpå. Dette er inkludert i fastprisen — <strong>2 990 kr/mnd</strong> for hele bedriften. <a href="/#demo">Book demo</a> for å se hvordan det fungerer, eller les om <a href="/internkontroll-elektro/">internkontroll for elektrobedrifter</a>.</p>
`,
    faq: [
      { q: 'Hvem skal ha en kopi av samsvarserklæringen?',
        a: 'Eier eller bruker av anlegget skal alltid ha en kopi. I tillegg bør elektroentreprenøren beholde en egen kopi i prosjektarkivet, slik at den kan hentes frem ved senere endringer, kundehenvendelser eller tilsyn fra DSB.' },
      { q: 'Kan samsvarserklæringen sendes på e-post?',
        a: 'Ja. Det er ingen krav til at erklæringen sendes på papir — en signert PDF som identifiserer underskriveren er fullt akseptabel. Det viktigste er at erklæringen kan hentes frem så lenge anlegget er i drift.' },
      { q: 'Hva skjer hvis samsvarserklæringen mangler?',
        a: 'Mangel på samsvarserklæring er et vanlig avvik ved DSB-tilsyn og kan i ytterste konsekvens føre til pålegg om utbedring eller stans i bruken av anlegget. Mange forsikringssaker stopper også opp uten gyldig samsvarserklæring. Anlegget skal som hovedregel ikke settes i drift før erklæringen er utstedt.' },
    ],
    related: ['sluttkontroll-elektro', 'internkontroll-elektro', 'elsikkerhet'],
  },

  'sluttkontroll-elektro': {
    title: 'Sluttkontroll av elektrisk anlegg etter NEK 400 | Echoo',
    metaDesc: 'Hva sluttkontroll av et lavspenningsanlegg etter NEK 400 må inneholde — visuell kontroll, prøving, måleverdier — og hvordan dokumentere det digitalt.',
    h1: 'Sluttkontroll av elektrisk anlegg etter NEK 400',
    eyebrow: 'Pillarguide · Sluttkontroll',
    definition: 'Sluttkontroll er den dokumenterte verifikasjonen av at et nytt eller endret lavspenningsanlegg oppfyller kravene i forskrift om elektriske lavspenningsanlegg (FEL) og NEK 400 — før anlegget settes under spenning og overleveres til eier.',
    description: 'Sluttkontroll av lavspenningsanlegg etter NEK 400: visuell kontroll, prøving, måleverdier og digital dokumentasjon.',
    body: `
<h2>Hva er sluttkontroll?</h2>
<p>Sluttkontroll er den siste fagkontrollen før et elektrisk anlegg overleveres til eier. Den er en forutsetning for at faglig ansvarlig kan utstede <a href="/samsvarserklaring/">samsvarserklæring</a> etter FEL §12 — du kan ikke erklære samsvar med forskrift uten å ha kontrollert at anlegget faktisk er bygget riktig.</p>
<p>Det er virksomheten som utfører anlegget som har ansvaret for å gjennomføre og dokumentere sluttkontrollen.</p>

<h2>Hva sier NEK 400 om sluttkontroll?</h2>
<p>NEK 400 del 6 («Verifikasjon») beskriver hvordan sluttkontrollen skal gjennomføres. Den deler kontrollen i to faser:</p>
<ul>
  <li><strong>Visuell kontroll</strong> — at anlegget er bygget i samsvar med dokumentasjon og norm: riktig kabeldimensjon, riktig overstrømsvern, korrekt jording, korrekt merking, korrekt vern mot mekanisk skade, brannskott i gjennomføringer, IP-grad i våtrom osv.</li>
  <li><strong>Prøving</strong> — fysisk måling av sentrale verdier: kontinuitet i beskyttelseslederen, isolasjonsresistans, polaritet, virkemåte til jordfeilbryter (RCD), berøringsspenning, kortslutningsstrøm.</li>
</ul>
<p>Måleverdiene skal dokumenteres og kunne sammenlignes med kravene i NEK 400.</p>

<h2>Typisk innhold i en sluttkontroll-rapport</h2>
<table>
  <thead><tr><th>Punkt</th><th>Hva som kontrolleres</th></tr></thead>
  <tbody>
    <tr><td>Anleggsinformasjon</td><td>Adresse, kunde, anleggsnummer, dato.</td></tr>
    <tr><td>Visuell kontroll</td><td>Kabel, vern, merking, jording, gjennomføringer, IP-grad.</td></tr>
    <tr><td>Kontinuitet</td><td>Beskyttelseslederen ende-til-ende.</td></tr>
    <tr><td>Isolasjonsresistans</td><td>Måleverdi per kurs/krets.</td></tr>
    <tr><td>RCD-funksjon</td><td>Utløsetid, utløsestrøm.</td></tr>
    <tr><td>Berøringsspenning</td><td>Beregnet eller målt.</td></tr>
    <tr><td>Kortslutningsstrøm</td><td>Ik2min eller tilsvarende.</td></tr>
    <tr><td>Avvik</td><td>Eventuelle merknader og tiltak.</td></tr>
    <tr><td>Signatur</td><td>Faglig ansvarlig + dato.</td></tr>
  </tbody>
</table>

<h2>Hvor lenge skal sluttkontrollen oppbevares?</h2>
<p>Sluttkontrollen er en del av prosjektets dokumentasjon og bør oppbevares så lenge anlegget er i drift. Den henger naturlig sammen med samsvarserklæringen, og er typisk det første dokumentet som etterspørres ved en forsikringssak eller et DSB-tilsyn.</p>

<h2>Hva gjøres ved feil under sluttkontrollen?</h2>
<p>Når sluttkontrollen avdekker feil, må de utbedres før samsvarserklæring kan utstedes — anlegget kan rett og slett ikke erklæres i samsvar med FEL hvis et målepunkt ikke oppfyller kravene. Vanlige avvik er for høy isolasjonsresistans-feil, manglende kontinuitet i beskyttelseslederen, feil utløsetid på jordfeilbryter eller manglende merking.</p>
<p>Hver retting bør dokumenteres i prosjektet med ny måleverdi, slik at det er sporbart hva som ble funnet og hva som ble gjort. Et IK-system som knytter avvik direkte til sluttkontrollen gjør at dokumentasjonen henger sammen — i stedet for at rettelsen blir glemt på en lapp i bilen.</p>

<h2>Vanlige feil</h2>
<p>Erfaringer fra felt:</p>
<ul>
  <li><strong>Måleverdier skrives på en seddel</strong> i felt og blir aldri ført inn i et system.</li>
  <li><strong>Sjekkpunkter krysses av i ettertid</strong> uten at de er reelt kontrollert.</li>
  <li><strong>Sluttkontroll skilles fra samsvarserklæring</strong> — to dokumenter som lever sine egne liv.</li>
  <li><strong>Bilder fra anlegget mangler</strong> — det er ikke et formelt krav, men det er gull verdt når noen lurer på noe to år senere.</li>
</ul>

<h2>Sluttkontroll i Echoo</h2>
<p>I Echoo gjøres sluttkontrollen direkte fra mobilen mens du står i anlegget. Sjekkpunktene følger NEK 400, måleverdier skrives inn med tastatur eller leses fra instrument der det er mulig, bilder fra anlegget legges ved hvert punkt. Når kontrollen er fullført, genereres <a href="/samsvarserklaring/">samsvarserklæringen</a> automatisk og kan signeres digitalt.</p>
<p>Alt inkludert i fastprisen <strong>2 990 kr/mnd</strong> per bedrift. <a href="/#demo">Book demo</a> eller les om <a href="/internkontroll-elektro/">internkontroll for elektrobedrifter</a>.</p>
`,
    faq: [
      { q: 'Kan sluttkontrollen gjøres av samme person som utførte arbeidet?',
        a: 'Det er ikke et eksplisitt krav om uavhengig kontrollør for vanlige lavspenningsanlegg, men personen som utfører sluttkontrollen må være kvalifisert. Mange bedrifter velger likevel at en annen montør eller faglig ansvarlig gjør sluttkontrollen — det gir et bedre fire-øyne-prinsipp og reduserer risiko for at feil overses.' },
      { q: 'Må alle målinger dokumenteres skriftlig?',
        a: 'Ja. NEK 400 krever at måleresultatene fra sluttkontrollen dokumenteres, slik at det kan vises at anlegget oppfyller kravene. Det holder ikke å «huske» at det ble målt — verdiene må skrives ned per kurs og oppbevares med prosjektdokumentasjonen.' },
      { q: 'Hva er forskjellen på sluttkontroll og periodisk kontroll?',
        a: 'Sluttkontroll gjøres én gang — før nytt eller endret anlegg settes i drift. Periodisk kontroll er en gjentakende kontroll av eksisterende anlegg, typisk hvert femte år for boliger og hyppigere for større næringsbygg. Begge er hjemlet i FEL, men har ulike formål og dokumentasjonskrav.' },
    ],
    related: ['samsvarserklaring', 'elsikkerhet', 'internkontroll-elektro'],
  },

  'iso-9001-elektro': {
    title: 'ISO 9001 for elektrobedrifter — fordeler, krav og pris | Echoo',
    metaDesc: 'ISO 9001 for elektrobedrifter: hva sertifiseringen krever, hva den faktisk gir, og hvordan ISO 9001 og IKK-systemet henger sammen — pluss Echoo ISO 9001-modulen.',
    h1: 'ISO 9001 for elektrobedrifter',
    eyebrow: 'Pillarguide · ISO 9001',
    definition: 'ISO 9001 er den internasjonale standarden for kvalitetsstyringssystemer. For en elektrobedrift handler den om å sette opp og dokumentere hvordan virksomheten leverer kvalitet konsekvent — fra tilbud og prosjektoppstart, gjennom utførelse og sluttkontroll, til oppfølging og kundetilfredshet.',
    description: 'ISO 9001 for elektrobedrifter: krav, fordeler, forholdet til IKK-systemet og hvordan modulen i Echoo løser det.',
    body: `
<h2>Hva er ISO 9001?</h2>
<p>ISO 9001 er en internasjonal standard som beskriver krav til et kvalitetsstyringssystem (QMS). Den er ikke et lovkrav i Norge, men en frivillig sertifisering som virksomheter velger for å vise kunder og samarbeidspartnere at de jobber strukturert med kvalitet.</p>
<p>Standarden bygger på syv kvalitetsstyringsprinsipper, blant annet kundefokus, lederskap, prosessbasert tilnærming og kontinuerlig forbedring.</p>

<h2>Hvorfor elektrobedrifter velger ISO 9001</h2>
<p>For en elektrobedrift er det typisk tre drivere bak en ISO 9001-sertifisering:</p>
<ul>
  <li><strong>Krav fra større kunder.</strong> Offentlige oppdragsgivere og store private byggherrer setter ofte ISO 9001 (og 14001) som kvalifiseringskrav i anbud.</li>
  <li><strong>Struktur internt.</strong> Standarden tvinger frem dokumenterte prosesser som ellers blir liggende i hodene på enkeltpersoner — verdifullt ved vekst og generasjonsskifter.</li>
  <li><strong>Synlighet utad.</strong> Et sertifikat er et enkelt signal til markedet om at virksomheten tar kvalitet på alvor.</li>
</ul>

<h2>Hva krever ISO 9001 i praksis?</h2>
<p>De viktigste områdene som må dokumenteres:</p>
<table>
  <thead><tr><th>Kapittel</th><th>Krav</th></tr></thead>
  <tbody>
    <tr><td>Kontekst</td><td>Forstå organisasjonens omgivelser og interessenter.</td></tr>
    <tr><td>Lederskap</td><td>Ledelsens engasjement, kvalitetspolitikk, ansvar og myndighet.</td></tr>
    <tr><td>Planlegging</td><td>Risiko- og mulighetsvurdering, kvalitetsmål.</td></tr>
    <tr><td>Støtte</td><td>Ressurser, kompetanse, bevissthet, kommunikasjon, dokumentert informasjon.</td></tr>
    <tr><td>Drift</td><td>Planlegging og styring av produksjon/tjeneste, kontroll med produkter og tjenester fra eksterne leverandører.</td></tr>
    <tr><td>Ytelsesevaluering</td><td>Overvåking, måling, intern revisjon, ledelsens gjennomgåelse.</td></tr>
    <tr><td>Forbedring</td><td>Avvik, korrektive tiltak, kontinuerlig forbedring.</td></tr>
  </tbody>
</table>

<h2>Forholdet til IKK / internkontroll</h2>
<p>Mange av kravene i ISO 9001 overlapper med det du allerede må ha for <a href="/internkontroll-elektro/">internkontroll</a> og <a href="/ikk-system/">IKK</a>: dokumenterte rutiner, kompetanseregister, avvikshåndtering, kontinuerlig forbedring. Forskjellen er nivået av strukturkrav og det at ISO krever ekstern revisjon for å bli sertifisert.</p>
<p>I praksis bygger mange elektrobedrifter ISO 9001 oppå sitt eksisterende IKK-system, ikke som et separat parallelt løp. Hvis verktøyene allerede dekker prosessdokumentasjonen, blir tilleggsarbeidet for å nå ISO-nivå overkommelig.</p>

<h2>Hva koster en ISO 9001-sertifisering?</h2>
<p>Den faktiske sertifiseringen utføres av et akkreditert sertifiseringsorgan. Kostnaden varierer med bedriftens størrelse, men består typisk av: forberedelse internt (eller med konsulent), sertifiseringsrevisjon år 1, og oppfølgingsrevisjoner år 2 og 3. Det viktigste dere som bedrift kan gjøre i forkant er å ha et system som dokumenterer prosessene — det er der mye av tidskostnaden ligger.</p>

<h2>Echoo ISO 9001-modulen</h2>
<p>Den vanlige Echoo-løsningen (Elektro + HMS, <strong>2 990 kr/mnd</strong>) dekker IKK-delen og HMS-internkontrollen. ISO 9001-modulen er et tillegg på <strong>+ 2 000 kr/mnd</strong> (totalt 4 990 kr/mnd) og legger til:</p>
<ul>
  <li>Maler og struktur for kvalitetshåndbok som dekker ISO-kapitlene.</li>
  <li>Ledelsens gjennomgåelse og kvalitetsmål-oppfølging.</li>
  <li>Intern revisjon med oppgavelister og bevisinnsamling.</li>
  <li>Leverandørvurdering og kontroll med eksterne ytelser.</li>
  <li>Rapportering tilrettelagt for ekstern sertifiseringsrevisor.</li>
</ul>
<p>OPCOM AS, som har bygget Echoo, er selv ISO 9001-sertifisert — modulen er bygget fra hvordan vi løser dette internt. <a href="/#demo">Book demo</a> for å se modulen, eller les om <a href="/ikk-system/">IKK-systemet</a> som ligger i bunn.</p>
`,
    faq: [
      { q: 'Er ISO 9001 lovpålagt for elektrobedrifter?',
        a: 'Nei. ISO 9001 er en frivillig sertifisering. Mange elektrobedrifter velger den likevel fordi større oppdragsgivere — særlig offentlige innkjøpere og store byggherrer — krever sertifisering for å kunne delta i anbud.' },
      { q: 'Hvor lang tid tar en ISO 9001-sertifisering?',
        a: 'Avhenger av hvor strukturert virksomheten allerede er. Bedrifter med et velfungerende IKK-system har typisk sertifikatet innen 6–12 måneder, mens bedrifter som starter fra bunnen ofte bruker 12–18 måneder. Selve sertifiseringsrevisjonen tar 1–3 dager, men forberedelsene er det som tar tid.' },
      { q: 'Kan vi være ISO 9001-sertifisert uten ekstern revisjon?',
        a: 'Nei — sertifisering forutsetter en revisjon fra et akkreditert sertifiseringsorgan. Bedriften kan godt jobbe «etter ISO 9001» internt uten å være sertifisert, men da kan man ikke markedsføre seg som ISO-sertifisert. Det er sertifikatet, ikke arbeidet, som er det formelle dokumentet.' },
    ],
    related: ['ikk-system', 'internkontroll-elektro', 'samsvarserklaring'],
  },
};

function html(strings, ...values) {
  return strings.reduce((out, s, i) => out + s + (values[i] ?? ''), '');
}

function navHtml() {
  return `<header class="nav" id="nav">
  <div class="wrap nav-inner">
    <a class="logo" href="/" aria-label="Echoo">
      <svg class="rings" width="46" height="22" viewBox="0 0 46 22" aria-hidden="true">
        <circle class="solid" cx="11" cy="11" r="9.2"/>
        <circle cx="23" cy="11" r="9.2"/>
        <circle cx="35" cy="11" r="9.2"/>
      </svg>
      <span class="word">ECHOO</span>
    </a>
    <nav class="nav-links">
      <a href="/#problem">Problem</a>
      <a href="/#hvordan">Slik fungerer det</a>
      <a href="/#funksjoner">Funksjoner</a>
      <a href="/#priser">Priser</a>
      <a href="/#faq">FAQ</a>
    </nav>
    <div class="nav-cta">
      <a href="https://app.echoo.no/login" data-app-path="/login" class="nav-login">Logg inn</a>
      <a href="https://app.echoo.no/signup?plan=base" data-app-path="/signup?plan=base" class="btn btn-primary btn-sm">Kom i gang</a>
      <button class="nav-burger" id="navBurger" aria-label="Meny" aria-expanded="false" aria-controls="navMobile"><span></span></button>
    </div>
  </div>
  <div class="nav-mobile" id="navMobile">
    <a class="m-link" href="/#problem">Problem</a>
    <a class="m-link" href="/#hvordan">Slik fungerer det</a>
    <a class="m-link" href="/#funksjoner">Funksjoner</a>
    <a class="m-link" href="/#priser">Priser</a>
    <a class="m-link" href="/#faq">FAQ</a>
    <div class="m-cta">
      <a href="https://app.echoo.no/login" data-app-path="/login" class="btn btn-ghost">Logg inn</a>
      <a href="https://app.echoo.no/signup?plan=base" data-app-path="/signup?plan=base" class="btn btn-primary">Kom i gang</a>
      <a href="/#demo" class="btn btn-ghost" style="background:transparent">Book demo</a>
    </div>
  </div>
</header>`;
}

function footerHtml(currentSlug) {
  const fagstoffLinks = PILLARS
    .filter(p => p.slug !== currentSlug)
    .map(p => `<a href="/${p.slug}/">${p.short}</a>`)
    .join('\n        ');
  return `<div class="hazard"></div>
<section class="cta-band">
  <div class="wrap">
    <h2>Klar for et system som faktisk hjelper produksjonen?</h2>
    <div class="cta-band-actions">
      <a href="https://app.echoo.no/signup?plan=base" data-app-path="/signup?plan=base" class="btn btn-dark">Kom i gang<span class="btn-arrow"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></span></a>
      <a href="/#demo" class="cta-band-link">eller book demo først</a>
    </div>
    <p class="cta-reassure"><b>14 dager gratis</b> · 0 kr i dag · kortet trekkes først etter dag 14 · <b>ingen bindingstid</b></p>
  </div>
</section>
<footer class="footer">
  <div class="wrap">
    <div class="footer-top">
      <div class="col brandcol">
        <a class="logo" href="/"><svg class="rings" width="46" height="22" viewBox="0 0 46 22" aria-hidden="true"><circle class="solid" cx="11" cy="11" r="9.2"/><circle cx="23" cy="11" r="9.2"/><circle cx="35" cy="11" r="9.2"/></svg><span class="word">ECHOO</span></a>
        <p>Internkontroll og kvalitetssystem (IKK) for elektrobedrifter. Bygget av elektrikere, for elektrikere — av OPCOM AS.</p>
      </div>
      <div class="col">
        <h5>Produkt</h5>
        <a href="/#funksjoner">Funksjoner</a>
        <a href="/#hvordan">Slik fungerer det</a>
        <a href="/#priser">Priser</a>
        <a href="/#faq">FAQ</a>
      </div>
      <div class="col col-fagstoff">
        <h5>Fagstoff</h5>
        ${fagstoffLinks}
      </div>
      <div class="col">
        <h5>Kontakt</h5>
        <a href="mailto:hei@echoo.no">hei@echoo.no</a>
        <a href="tel:+4790000000">+47 900 00 000</a>
        <p>OPCOM AS<br>Org.nr. 912 345 678</p>
      </div>
      <div class="col">
        <h5>Selskap</h5>
        <a href="/#grunnleggere">Om oss</a>
        <a href="/personvern/">Personvern</a>
        <a href="/vilkar/">Vilkår</a>
        <a href="https://app.echoo.no/login" data-app-path="/login">Logg inn</a>
        <a href="https://app.echoo.no/signup?plan=base" data-app-path="/signup?plan=base">Kom i gang</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Echoo · OPCOM AS · Org.nr. 912 345 678</span>
      <span>FEL · FSE · NEK 400 · Data lagret i Norge</span>
    </div>
  </div>
</footer>`;
}

function relatedHtml(slugs) {
  const cards = slugs.map(s => {
    const p = PAGES[s];
    return `      <a href="/${s}/">
        <div class="lbl">Beslektet tema</div>
        <div class="ttl">${p.h1}</div>
        <div class="desc">${p.definition.split('.')[0]}.</div>
      </a>`;
  }).join('\n');
  return `<section class="pad-y divider">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Mer fagstoff</span>
      <h2>Les videre</h2>
    </div>
    <div class="related reveal">
${cards}
    </div>
  </div>
</section>`;
}

function jsonLd(slug, page) {
  const url = `${SITE}/${slug}/`;
  const article = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: page.h1,
    description: page.description,
    inLanguage: 'nb',
    datePublished: TODAY,
    dateModified: TODAY,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Organization', name: 'Echoo', url: SITE + '/' },
    publisher: {
      '@type': 'Organization',
      name: 'OPCOM AS',
      logo: { '@type': 'ImageObject', url: SITE + '/og-image.png' },
    },
    image: SITE + '/og-image.png',
    about: page.h1,
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Echoo', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: page.h1, item: url },
    ],
  };
  const docs = [article, breadcrumb];
  if (page.faq && page.faq.length) {
    docs.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faq.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    });
  }
  return docs
    .map(o => `<script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n</script>`)
    .join('\n');
}

function faqHtml(faq) {
  if (!faq || !faq.length) return '';
  const items = faq.map((f, i) => `      <div class="faq-item">
        <button class="faq-q">${f.q}<span class="pm"></span></button>
        <div class="faq-a"><div class="inner">${f.a}</div></div>
      </div>`).join('\n');
  return `<section class="pad-y divider">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Ofte stilte spørsmål</span>
      <h2>Korte, faktuelle svar</h2>
    </div>
    <div class="faq-list reveal">
${items}
    </div>
  </div>
</section>`;
}

function buildPage(slug, page) {
  const url = `${SITE}/${slug}/`;
  return html`<!DOCTYPE html>
<html lang="nb">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${page.title}</title>
<meta name="description" content="${page.metaDesc}" />
<link rel="canonical" href="${url}" />
<meta name="theme-color" content="#c8c1b2" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />

<!-- Open Graph -->
<meta property="og:type" content="article" />
<meta property="og:site_name" content="Echoo" />
<meta property="og:locale" content="nb_NO" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${page.title}" />
<meta property="og:description" content="${page.metaDesc}" />
<meta property="og:image" content="${SITE}/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${page.title}" />
<meta name="twitter:description" content="${page.metaDesc}" />
<meta name="twitter:image" content="${SITE}/og-image.png" />

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Caveat:wght@600;700&display=swap" onload="this.onload=null;this.rel='stylesheet'" />
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Caveat:wght@600;700&display=swap" rel="stylesheet" media="print" onload="this.media='all'" />
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Caveat:wght@600;700&display=swap" /></noscript>
<link rel="stylesheet" href="/styles.css" />

${jsonLd(slug, page)}
</head>
<body>

${navHtml()}

<div id="top"></div>

<!-- Pillar hero -->
<section class="hero pillar">
  <div class="hero-grid"></div>
  <div class="wrap hero-inner">
    <div class="hero-copy">
      <span class="eyebrow">${page.eyebrow}</span>
      <h1>${page.h1}</h1>
      <div class="def-box reveal">
        <div class="def-label">Kort forklart</div>
        <p>${page.definition}</p>
      </div>
      <div class="hero-cta" style="margin-top:28px">
        <a href="https://app.echoo.no/signup?plan=base" data-app-path="/signup?plan=base" class="btn btn-primary">Kom i gang<span class="btn-arrow"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></span></a>
        <a href="/#demo" class="btn btn-ghost">Book demo</a>
      </div>
      <p class="cta-reassure"><b>14 dager gratis</b> · 0 kr i dag · kortet trekkes først etter prøveperioden · <b>ingen bindingstid</b></p>
    </div>
  </div>
</section>

<!-- Article body -->
<section class="pad-y">
  <div class="wrap">
    <article class="article-body reveal">
${page.body.trim()}
    </article>
  </div>
</section>

${faqHtml(page.faq)}

${relatedHtml(page.related)}

${footerHtml(slug)}

<script src="/app.js" defer></script>
</body>
</html>
`;
}

let count = 0;
for (const [slug, page] of Object.entries(PAGES)) {
  const dir = path.join(ROOT, slug);
  fs.mkdirSync(dir, { recursive: true });
  const out = path.join(dir, 'index.html');
  fs.writeFileSync(out, buildPage(slug, page), 'utf8');
  count++;
  const text = [page.definition, page.body, ...(page.faq || []).flatMap(f => [f.q, f.a])].join(' ');
  const words = text.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(`✓ ${slug}/index.html (${words} ord)`);
}
console.log(`\nBygget ${count} pillarsider.`);
