# Site internet de la Ville de Lavaur

Theme WordPress sur-mesure pour la refonte du site de la Ville de Lavaur, developpe selon le cahier des charges (moderne, responsive, accessible RGAA, oriente services aux citoyens).

Stack : WordPress (PHP 8.1+) / Tailwind CSS / Alpine.js, sans dependance a un page builder ou a un plugin de formulaires tiers.

## Ce qui est livre dans cette premiere version

- **Theme complet** dans `wp-content/themes/lavaur/` : header/footer accessibles (skip link, nav clavier, menu mobile), page d'accueil (hero, actualites, agenda, acces rapides, chiffres cles, carte, newsletter).
- **3 types de contenu personnalises** : `actualite` (avec categories Ville/Culture/Travaux/Jeunesse/Sport/Associations/Economie/Education), `evenement` (agenda avec date/lieu/inscription, vue liste + vue calendrier mensuelle, filtres), `demarche` (avec formulaire PDF telechargeable et lien vers une demarche en ligne).
- **9 pages de rubrique** generees automatiquement a l'activation du theme (La Ville, Vie municipale, Vivre a Lavaur, Tourisme, Services municipaux, Contact, Mentions legales, Politique de confidentialite, Plan du site, Accessibilite), chacune avec les sous-sections ancrees du cahier des charges et un contenu editorial **placeholder a remplacer**.
- **Newsletter avec double opt-in** reel (inscription -> email de confirmation -> validation), sans plugin, stockage dans une CPT dediee.
- **Formulaire de contact** fonctionnel (envoi par `wp_mail`, a brancher sur un SMTP en production).
- **Bandeau cookies RGPD** (Alpine.js, choix stocke en localStorage, evenement `lavaur:consent` a ecouter pour ne charger Analytics/Matomo qu'apres consentement).
- **SEO de base** sans plugin : title/meta description, Open Graph, canonical, Schema.org `GovernmentOrganization`, fil d'Ariane, sitemap XML natif WordPress.
- **Recherche globale**, pagination, partage reseaux sociaux sur les actualites/evenements.

## Ce qui reste a faire (hors perimetre de ce premier scaffold)

Le cahier des charges est large (RGAA complet, RGPD complet, notifications push, annuaire, galeries medias, Matomo/GA4, CI/CD, hebergement, formation...). Cette version pose l'architecture et les briques principales ; restent notamment :

- Contenu editorial reel (textes, photos) a la place des placeholders "Contenu a completer par la mairie".
- Cle API Google Maps (le composant carte utilise l'iframe `output=embed` sans cle, a remplacer par l'API JS pour les couches services/parkings/monuments).
- Integration SMTP, Google Analytics 4 / Matomo (a activer uniquement apres consentement cookies), Search Console.
- Audit RGAA complet (contrastes, sous-titrage video, lecteurs d'ecran) une fois le contenu reel en place.
- Durcissement securite production (2FA admin, WAF, sauvegardes, mises a jour auto) - depend de l'hebergeur choisi.
- CI/CD (GitHub Actions) et hebergement (le cahier des charges recommande PHP 8+/MariaDB sur Linux).
- Annuaire, galeries photo/video, notifications push : non demarres.

## Pourquoi une architecture "theme sur-mesure" plutot que "site WordPress complet"

WordPress core (le CMS lui-meme) n'est pas quelque chose qu'on "construit" - c'est un logiciel qu'on installe. Ce depot contient le developpement sur-mesure demande par le cahier des charges (section 7) : un theme complet qui vient se brancher sur une installation WordPress standard, plus tout l'outillage front (Tailwind/Alpine).

## Verification effectuee

Aucun serveur PHP/MySQL/Docker n'etait disponible sur cette machine (pas de PHP, pas de Docker, pas de WSL). Le site a ete verifie avec **WordPress Playground** (WordPress + PHP tournant en WebAssembly via Node, sans installation de PHP/MySQL) : accueil et les 9 pages de rubrique, les 3 archives de types de contenu, et une page de politique legale ont toutes repondu HTTP 200 sans erreur PHP. `wp-admin` et le sitemap ont rencontre une erreur intermittente propre a Playground sur Windows (un bug de concurrence sur le fichier `.maintenance` dans wp-includes/load.php - code coeur de WordPress, pas du theme), sans lien avec le theme. A verifier a nouveau sur un environnement d'hebergement reel.

## Demarrage local

Prerequis : Node.js (deja disponible). Aucun PHP/MySQL/Docker requis pour previsualiser grace a WordPress Playground.

```bash
npm install
npm run build       # compile Tailwind CSS -> assets/dist/style.css
npm run playground  # lance WordPress + le theme sur http://127.0.0.1:9400 (aucune installation PHP requise)
```

Pendant le developpement, `npm run dev` recompile le CSS a chaque modification.

## Mise en production

1. Sur un hebergement WordPress classique (PHP 8.1+, MySQL/MariaDB, cf. section 13 du cahier des charges), copier `wp-content/themes/lavaur/` dans le `wp-content/themes/` du site.
2. Lancer `npm run build` avant deploiement pour generer `assets/dist/style.css`.
3. Activer le theme "Lavaur" - les pages de rubrique et les termes de taxonomie sont crees automatiquement.
4. Configurer un plugin SMTP pour que `wp_mail()` (contact + newsletter) parte reellement.
5. Renseigner l'adresse de la mairie, les reseaux sociaux et les chiffres cles (actuellement des exemples) dans `footer.php` / `front-page.php` ou migrer ces blocs vers des options de personnisation du theme.

## Structure

```
wp-content/themes/lavaur/
  functions.php          bootstrap, require les fichiers inc/
  inc/
    setup.php             theme supports, menus, tailles d'image
    enqueue.php            chargement CSS/JS
    nav.php                structure de navigation (arborescence du site)
    pages.php               creation automatique des pages de rubrique
    cpt-actualites.php      CPT actualite + taxonomie
    cpt-evenements.php      CPT evenement + taxonomie + champs date/lieu
    cpt-demarches.php       CPT demarche + taxonomie + formulaire PDF
    newsletter.php          double opt-in
    contact.php             traitement du formulaire de contact
    seo.php                  meta description, Open Graph, Schema.org
    rgpd.php                  bandeau cookies
    template-tags.php         fil d'Ariane, partage social, helpers
  template-parts/            newsletter-form, cookie-banner, map
  front-page.php, page-*.php, archive-*.php, single-*.php
  assets/
    src/input.css            source Tailwind
    dist/style.css            CSS compile (genere, ignore par git)
    js/main.js                JS vanilla (reveal au scroll)
playground/blueprint.json     config WordPress Playground pour le dev local
```
