---
title: "Digitaliser le commerce informel en Afrique : ce qui rate"
description: "WhatsApp comme infrastructure commerciale, crédit informel, échec du modèle Jumia — ce que j'ai observé sur le terrain en Afrique de l'Ouest avant de concevoir une alternative."
pubDate: 2023-04-15
lang: "fr"
translationKey: "2023-04-15"
---

En août 2021, je lis un reportage sur Twiga, une startup kényane fondée en 2014 qui achète directement les productions agricoles auprès des petits fermiers du Kenya et les distribue aux vendeurs de rue de Nairobi via une application mobile.

Je relis l'article deux fois. Pas pour les bananes. Pour la logique.

Ce que Twiga avait compris — et que beaucoup de projets d'e-commerce en Afrique ratent encore — c'est que le problème n'est pas le consommateur final. C'est la chaîne de distribution entre le producteur et le petit commerce de proximité. Résoudre ce maillon, c'est déverrouiller un marché entier.

Avant d'aller plus loin, voici ce que j'observais sur le terrain depuis plusieurs mois.

---

## Ce que personne ne voit depuis un bureau à Paris ou San Francisco

J'avais passé plusieurs mois à observer les dynamiques commerciales en Afrique de l'Ouest, notamment en Côte d'Ivoire et dans les marchés environnants.

Deux constats revenaient systématiquement.

**Le commerce se fait sur WhatsApp.** Des groupes de dizaines, parfois de centaines de commerçants, échangent des photos de marchandises, négocient des prix, organisent des achats collectifs — tout ça dans des fils de discussion non structurés. Sans traçabilité. Sans confirmation de commande. Sans accès au crédit. C'est du commerce vivant, efficace dans sa forme sociale, mais dépourvu d'infrastructure.

**Le crédit est le vrai blocage.** Un petit commerçant qui veut acheter un lot en gros pour obtenir un meilleur prix n'a pas accès au crédit bancaire. Les banques traditionnelles ne prêtent pas aux acteurs de l'économie informelle, qui représente pourtant l'essentiel des transactions de détail. Résultat : ces commerçants achètent en petites quantités, à des prix moins favorables, avec des marges comprimées.

Ces deux observations définissaient un problème réel, massif, et structurellement non adressé par les acteurs existants.

---

## Ce que Twiga a confirmé, et ce que les données ont chiffré

Le reportage sur Twiga a mis des mots sur quelque chose que j'avais intuité sans encore le formaliser : **en Afrique subsaharienne, les vendeurs informels représentent environ 90 % des transactions de détail**. Ils ne peuvent pas s'approvisionner directement auprès des fabricants ou producteurs. Les lots sont trop importants, les délais de paiement incompatibles avec leur trésorerie. Ils font donc appel à des intermédiaires qui achètent sur les marchés de gros.

Ce n'est pas une inefficacité marginale. C'est structurel.

Une étude des universités du Michigan et de Chicago sur les marchés kényans du maïs montrait que les intermédiaires ne répercutent que 22 % des baisses de coût sur les prix finaux. Le reste est absorbé dans la chaîne. Une autre étude du MIT comparait les coûts de distribution en Éthiopie et au Nigeria à ceux des États-Unis : **quatre à cinq fois plus élevés**, après contrôle de la qualité des routes.

Ces chiffres documentaient exactement ce que j'observais en pratique : une inefficacité structurelle de la distribution qui pénalise les producteurs, les petits commerçants, et in fine les consommateurs. Et qui crée une opportunité pour quiconque peut construire une infrastructure de distribution plus efficace.

Twiga l'avait fait pour les produits frais au Kenya. La question devenait : comment adapter ce modèle à l'Afrique de l'Ouest, avec un périmètre plus large et une dimension financière intégrée ?

---

## Pourquoi le modèle Jumia n'était pas la réponse

La tentation évidente, quand on veut digitaliser le commerce en Afrique, c'est de penser marketplace B2C. Un catalogue. Des vendeurs. Des acheteurs. Une appli. Le modèle Amazon transposé.

Jumia l'a essayé avant tout le monde, avec les ressources et la visibilité qu'on lui connaît. Le résultat a été décevant.

La raison est simple : **le consommateur africain moyen n'achète pas comme un consommateur nord-américain ou européen**. Il n'achète pas un litre d'huile — il achète à la cuillère. Il n'a pas de carte bancaire. Il n'a pas d'adresse postale au sens où les systèmes logistiques occidentaux l'entendent. Et il n'a pas besoin d'une appli pour accéder à des produits : sa rue en est pleine, portés par des vendeurs qui connaissent son quartier, ses habitudes, et lui font crédit depuis des années.

Ce consommateur-là, le modèle B2C ne peut pas l'atteindre directement au même coût qu'en Europe. Mais **le petit commerçant qui lui vend chaque jour, lui, peut être atteint, équipé, financé, et connecté à une chaîne d'approvisionnement plus efficace**.

C'est la distinction fondamentale que la plupart des projets d'e-commerce africains n'ont pas faite assez tôt.

---

## Ce que ça révèle sur l'opportunité réelle

Les modèles B2B digitaux qui fonctionnent en Afrique ne suppriment pas la distribution informelle. Ils lui donnent une infrastructure qu'elle n'a pas encore.

Twiga n'a pas remplacé les marchands de Nairobi. Il leur a donné un outil d'approvisionnement plus efficace, un accès à des volumes qu'ils ne pouvaient pas mobiliser seuls, et une fiabilité de livraison qu'ils ne trouvaient pas sur les marchés de gros.

Le [social commerce en Afrique](/blog/social-commerce-afrique) repose sur ce même principe : les comportements d'achat collectif existent déjà, spontanément, sur WhatsApp et dans les tontines. L'enjeu n'est pas de les créer — c'est de leur donner une infrastructure.

| Ce qui existe déjà | Ce qui manque |
|---|---|
| Groupes d'achat WhatsApp actifs | Confirmation de commande, traçabilité |
| Achat en volume informel | Accès au crédit adossé à la transaction |
| Épargne communautaire (tontines) | Programme de fidélité avec historique de transactions |
| Réseau de confiance entre commerçants | Plateforme qui formalise ce réseau |
| Demande de livraison fiable | Infrastructure logistique de dernier kilomètre |

C'est ce diagnostic qui a structuré ce que nous avons conçu ensuite, en cofondant JIPS : une plateforme de [marketplace B2B pour l'Afrique de l'Ouest](/blog/jips-modele-social-commerce-b2b-afrique) avec trois composantes interdépendantes — achat groupé, microcrédit intégré, programme de fidélité avec cashback.

Comment ça fonctionne concrètement, et pourquoi la séquence de déploiement est aussi importante que le modèle lui-même, c'est ce que j'explique dans la suite.

Si vous travaillez sur un projet de distribution digitale ou de transformation retail en Afrique, [prenons contact](/contact) — c'est rarement un problème de technologie.

---

*Sources : reportage sur Twiga (août 2021) ; The Economist / Le Nouvel Économiste, "Le e-commerce de détail à l'africaine" (juin 2022). Études : Bergquist & Dinerstein (Michigan/Chicago, 2020) ; Atkin & Donaldson (MIT).*
