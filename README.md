# Site internet de la Ville de Lavaur

Refonte du site internet de la Ville de Lavaur : Next.js (App Router) + TypeScript + Tailwind CSS, deployable nativement sur Vercel.

> Ce projet a d'abord ete construit comme un theme WordPress sur-mesure (recommandation initiale du cahier des charges), puis reconstruit entierement en Next.js pour pouvoir etre heberge sur Vercel, qui n'execute pas PHP et ne fournit pas de base MySQL.

## Ce qui est livre dans cette version

- **Toutes les pages de l'arborescence du cahier des charges** : Accueil, La Ville, Vie municipale, Actualites, Agenda, Demarches, Vivre a Lavaur, Tourisme, Services municipaux, Contact, Mentions legales, Politique de confidentialite, Plan du site, Accessibilite.
- **Actualites** : liste avec recherche + filtre par categorie (Ville/Culture/Travaux/Jeunesse/Sport/Associations/Economie/Education), page detail, partage reseaux sociaux, articles lies.
- **Agenda** : vue liste + vue calendrier mensuelle (bascule cote client), filtres par categorie, page detail avec inscription et carte du lieu.
- **Demarches** : liste groupee par categorie, page detail avec lien vers une demarche en ligne.
- **Formulaire de contact** et **newsletter a double opt-in** fonctionnels via des Server Actions (voir limitations ci-dessous).
- **Bandeau cookies RGPD** (localStorage, evenement `lavaur:consent` a ecouter pour ne charger Analytics/Matomo qu'apres consentement).
- **SEO** : `sitemap.xml` et `robots.txt` generes par Next.js, metadonnees par page, Open Graph, Schema.org `GovernmentOrganization`, fil d'Ariane.
- **Accessibilite** : skip link, navigation clavier, landmarks semantiques, contrastes verifies sur la palette.

Verifie avec `next build` (44 pages generees, 0 erreur) et `next dev` (toutes les routes testees en HTTP, logs serveur sans erreur).

## Limitations connues / ce qui reste a faire

- **Pas de CMS / back-office.** Le contenu (actualites, agenda, demarches, textes des pages) vit dans `lib/content/*.ts` et dans le JSX des pages - le modifier necessite un developpeur et un deploiement. WordPress offrait un back-office aux agents de la mairie ; ce n'est plus le cas ici. Si l'autonomie editoriale des services municipaux est requise, il faut brancher un CMS headless (Sanity, Payload, Contentful... disponibles via le Vercel Marketplace) sur les pages qui font aujourd'hui `import { ... } from "@/lib/content/..."`.
- **Emails non envoyes reellement.** Le formulaire de contact et la newsletter fonctionnent (validation, generation du lien de confirmation) mais n'envoient rien tant que `RESEND_API_KEY` n'est pas configure (voir `lib/mail.ts`) - ils journalisent simplement l'email cote serveur.
- **Newsletter sans persistance.** La confirmation double opt-in est verifiee par un token HMAC signe (sans base de donnees, `lib/newsletter-token.ts`), volontairement pour rester compatible serverless sans provisionner de service payant. Il n'y a donc pas de liste d'abonnes stockee cote serveur - a brancher sur un service d'emailing (Brevo, Mailjet...) ou une base de donnees du Vercel Marketplace si une vraie liste de diffusion est necessaire.
- **Cle API Google Maps absente** : la carte utilise l'iframe `output=embed` sans cle. A remplacer par l'API JS pour les couches services/parkings/monuments.
- **Contenu editorial** : toutes les actualites/evenements/demarches et les textes de page sont des exemples clairement marques "Contenu a completer par la mairie".
- Analytics/Matomo, audit RGAA complet, annuaire, galeries medias, notifications push : non commences.

## Demarrage local

```bash
npm install
npm run dev     # http://localhost:3000
```

```bash
npm run build   # verifie le build de production
npm run start   # sert le build de production
```

## Variables d'environnement

Aucune n'est requise pour faire tourner le site en local (les formulaires fonctionnent en mode "log console" sans elles). A configurer en production (dans Vercel : Project Settings > Environment Variables) :

| Variable | Usage |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL publique du site (sitemap, liens de confirmation email, Open Graph) |
| `RESEND_API_KEY` | Active l'envoi reel des emails (contact + confirmation newsletter) via l'API Resend |
| `MAIL_FROM` | Adresse d'expedition des emails (defaut : `Ville de Lavaur <onboarding@resend.dev>`) |
| `CONTACT_EMAIL` | Adresse qui recoit les messages du formulaire de contact |
| `NEWSLETTER_SECRET` | Secret HMAC pour signer les liens de confirmation newsletter (obligatoire en production) |

## Deploiement sur Vercel

```bash
npm i -g vercel   # si pas deja installe
vercel login
vercel link       # relie ce dossier au projet Vercel
vercel --prod     # deploiement production
```

Ou directement depuis l'interface Vercel en important le depot GitHub `YoloxOff/MairieLavaur` (Framework Preset : Next.js, detecte automatiquement).

## Structure

```
app/
  layout.tsx                 layout racine (header, footer, bandeau cookies, metadata)
  page.tsx                    Accueil
  la-ville/, vie-municipale/, vivre-a-lavaur/, tourisme/,
  services-municipaux/, contact/, mentions-legales/,
  politique-de-confidentialite/, plan-du-site/, accessibilite/   pages statiques
  actualites/page.tsx          liste + recherche + filtres
  actualites/[slug]/page.tsx    detail
  agenda/page.tsx               liste + vue calendrier
  agenda/[slug]/page.tsx         detail
  demarches/page.tsx            liste groupee par categorie
  demarches/[slug]/page.tsx      detail
  actions.ts                    Server Actions (contact, newsletter)
  api/newsletter/confirm/route.ts   confirmation double opt-in (verification HMAC)
  sitemap.ts, robots.ts, not-found.tsx
components/                  Header, Footer, CookieBanner, ContactForm, NewsletterForm,
                              AgendaViews, Breadcrumb, Map, Reveal, SectionBlock, ShareLinks
lib/
  nav.ts                       structure de navigation du site
  content/actualites.ts, evenements.ts, demarches.ts   donnees d'exemple
  newsletter-token.ts           token HMAC pour le double opt-in
  mail.ts                       envoi email (Resend, avec repli console.log)
```
