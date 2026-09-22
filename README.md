# CLEANET 45 — site vitrine

Site statique (HTML/CSS/JS, sans build), inspiré de la structure de `mgnclean44-ovh` mais avec une identité visuelle propre (navy/bleu électrique + accent ambre, Manrope/Inter) pour ne pas ressembler aux autres sites clients (ckleanauto45, h2oufpropre45, mgnclean44).

## Contenu réel utilisé (à vérifier / compléter)

- **Source tarifs** : flyer client fourni par Reda (photo envoyée dans la conversation) — utilisé uniquement comme *source des chiffres* (30€/jour, 50€/week-end, produit inclus, caution 150€), jamais réaffiché en tant qu'image sur le site.
- **Source photos** : page Facebook publique [facebook.com/Cleanet45](https://www.facebook.com/Cleanet45/) (795 abonnés au 2026-09-22, Orléans, 07 83 39 28 18, Cleanet45@gmail.com, prix `€€`) — 9 photos réelles du client téléchargées dans `assets/img/gallery/` (redimensionnées ≤1920px) et utilisées en fond de hero + galerie "Réalisations" : `car-exterior-1.jpg` (Range Rover Sport), `cuir-interieur-1.jpg` / `cuir-interieur-2.jpg` (sièges cuir), `camion-cabine-1.jpg` / `camion-cabine-2.jpg` (cabines poids lourd), `canape-1.jpg` / `canape-2.jpg` / `canape-3.jpg` (canapés, dont post "avant/après" du 14/09 et un canapé à Olivet du 24/08), `interieur-tableau-bord.jpg` (tableau de bord/console). Toujours aucune photo dédiée moquette, phares ou diagnostic électronique dans les ~65 photos parcourues sur la page (feed + album "Téléchargements mobiles").
- Les 6 prestations (auto, canapé, moquette, bungalow/local pro, phares, diagnostic électronique) n'ont **pas de tarif public** → tout est affiché "Sur devis". Ne pas inventer de prix sans confirmation du client.
- Seule la location de la shampouineuse Kärcher SE 4001 a des tarifs fixes connus (30€/jour, 50€/week-end, produit inclus, caution 150€) — chiffres repris du flyer, mais plus aucune image du flyer sur le site.
- Aucun avis client chiffré n'est affiché (la page Facebook indique "pas encore évalué (3 avis)") — la section Avis renvoie vers Facebook plutôt que d'inventer des témoignages.
- Aucune adresse physique / SIRET connus → non affichés. À demander au client si à publier.
- Le numéro WhatsApp utilisé (`https://wa.me/33783392818`) part du principe que le 07 83 39 28 18 est joignable sur WhatsApp — **à vérifier** avant mise en ligne.

## À compléter avant mise en ligne

- [ ] Confirmer avec le client l'usage de ses photos Facebook sur le site (probable mais à valider explicitement) — moquette, phares et diagnostic électronique n'ont toujours aucune photo (rien trouvé sur Facebook), à demander directement au client
- [ ] Confirmer/ajouter un vrai logo vectoriel du client (actuellement un wordmark SVG recréé, pas le logo Facebook original)
- [ ] Clé Web3Forms (`assets/contact.js`, `WEB3FORMS_ACCESS_KEY`) pour activer l'envoi de formulaire directement depuis le site
- [ ] Vérifier le lien WhatsApp (`assets/contact.js`, `WA_NUMBER`)
- [ ] Adresse postale / SIRET si le client souhaite les afficher
- [ ] Nom de domaine réel (actuellement placeholder `cleanet45.fr` dans `robots.txt` / `sitemap.xml` / JSON-LD)
- [ ] Avis Google/Facebook une fois disponibles

## Prévisualisation locale

Config partagée dans `C:\Users\Reda\Code\.claude\launch.json`, entrée `cleanet45-static` (port 4730), pointant vers ce dossier en chemin absolu.
