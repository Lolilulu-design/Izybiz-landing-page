---
title: "Due diligence technique fintech: ce que le code révèle"
description: "Évaluer une technologie fintech avant acquisition, c'est savoir lire ce que le code dit. Retour d'expérience sur une TDD néobanking en Afrique de l'Ouest."
pubDate: 2021-07-10
lang: "fr"
translationKey: "2021-07-10"
---

La démo fonctionne. L'interface est propre. Les fondateurs savent présenter leur tableau de bord en deux minutes chrono. Le backend tourne. Les transactions passent.

Et pourtant, la technologie n'est pas prête à déployer commercialement.

C'est la situation pour laquelle existe la due diligence technique. Pas pour confirmer que quelque chose marche en démo, mais pour répondre à une question différente: est-ce que cette technologie peut fonctionner **à l'échelle, dans un contexte réglementé, avec une base d'utilisateurs réels, dans un environnement infrastructure contraint?**

Cette question se pose particulièrement dans le secteur fintech en Afrique subsaharienne, où plusieurs opérateurs régionaux envisagent d'acquérir ou d'intégrer des plateformes néobanking existantes plutôt que de construire from scratch. J'ai conduit ce type d'évaluation sur une plateforme néobanking d'un éditeur européen pour le compte d'un acquéreur régional potentiel. Voici ce que la TDD a révélé, et ce que ça enseigne sur la méthode.

---

## Ce que "50% complet" veut vraiment dire

Toute évaluation de maturité produit commence par une analyse composant par composant. Sur la plateforme évaluée, les taux de complétion par module étaient les suivants: backend à environ 74%, application iOS à 48%, application Android à 39%, système POS à 68%, back-office à 42%.

En lecture rapide, ça ressemble à une plateforme à mi-chemin. En lecture opérationnelle, c'est une plateforme dont les composants les plus critiques côté utilisateur sont les moins avancés.

L'application mobile est le point de contact principal avec les clients finaux dans un marché où plus de 80% des transactions financières passent par mobile. Une application Android à 39% de complétion n'est pas une application qu'on peut déployer dans six mois. C'est une application dont moins de la moitié du périmètre fonctionnel est implémenté.

La leçon: les taux de complétion moyens cachent des asymétries critiques. Un backend solide et des interfaces incomplètes, c'est une situation techniquement cohérente mais commercialement bloquée. [Ce type d'analyse de maturité composant par composant est systématique dans nos missions de pilotage de la performance](https://izybiz.fr/pilotage-performance) avant toute décision d'acquisition ou d'intégration.

---

## Les intégrations manquantes: l'angle mort de toute évaluation

Le deuxième problème de la plateforme évaluée était encore plus structurant: trois intégrations critiques étaient absentes.

La première: l'intégration avec le système de règlement interbancaire local. Sans elle, la plateforme ne peut pas traiter de virements vers d'autres banques. Elle peut gérer des transactions dans un système fermé, pas dans l'écosystème financier réel.

La deuxième: l'intégration SWIFT pour les paiements internationaux. Contrainte stratégique directe pour tout déploiement destiné à des commerçants qui ont des fournisseurs hors du pays.

La troisième: l'intégration avec un processeur de cartes pour l'émission de cartes de débit. Pas de carte émise, pas d'accès aux terminaux de paiement des commerçants, pas d'interopérabilité avec les réseaux Visa/Mastercard locaux.

Ces trois intégrations ne sont pas des fonctionnalités souhaitables. Elles sont des prérequis légaux et opérationnels à toute activité de néobanque. Leur absence signifie que la plateforme démo est un système de paiement interne, pas une néobanque déployable.

**Ce qu'on mesure en TDD, ce ne sont pas les fonctionnalités livrées. C'est la distance entre l'état actuel et l'état commercialement déployable. Ces deux métriques peuvent être très différentes.**

> **Vous évaluez l'acquisition d'une technologie fintech ou à l'intégration d'un actif numérique dans votre offre?** Une due diligence technique rigoureuse prend 4 à 6 semaines et peut éviter des années de retard. [Discutons de votre situation](https://izybiz.fr/contact).

---

## Qualité du code: ce qu'on peut et ne peut pas corriger

La due diligence technique analyse aussi la qualité intrinsèque du code, indépendamment du périmètre fonctionnel. C'est une dimension souvent sous-estimée par les acquéreurs non techniques.

Sur la plateforme évaluée, la situation était contrastée. Le backend Java et les modules Android présentaient une architecture solide, des patterns cohérents, une couverture de tests satisfaisante. C'était du code écrit par des ingénieurs qui savaient ce qu'ils faisaient.

L'application iOS était moins cohérente. Architecture moins unifiée, coverage de tests inférieur, dette technique visible sur plusieurs modules. Pas du code à réécrire de zéro, mais du code qui demanderait un investissement de refactoring significatif avant de pouvoir évoluer à rythme soutenu.

Cette asymétrie est typique de projets où les équipes ne sont pas de taille égale par plateforme, ou où l'iOS a été développé plus tardivement avec une contrainte de délai. Le problème avec la dette technique iOS dans un contexte de lancement accéléré: chaque fonctionnalité ajoutée sur une base fragile augmente le risque de régression et ralentit le delivery.

La leçon: la qualité du code est une variable économique. Elle détermine le coût et la vitesse des développements futurs. Un code excellent à 50% de complétion vaut plus qu'un code médiocre à 80%.

---

## Le risque du vendor lock-in dans une infrastructure africaine

La plateforme utilisait une architecture fortement couplée à AWS, avec des services managés intégrés dans la logique applicative elle-même, pas uniquement dans l'infrastructure.

Dans un contexte de déploiement européen avec une infrastructure cloud stable, c'est un choix technique acceptable. Dans un contexte africain, où la connectivité peut être contrainte, où les coûts AWS en dollars pèsent différemment dans un modèle économique en monnaie locale, et où certains régulateurs imposent des contraintes de résidence des données, c'est un risque stratégique.

Un couplage fort à un cloud provider signifie qu'une migration vers une architecture hybride ou une infrastructure locale suppose une réécriture partielle, pas un simple changement de configuration. Le coût de ce risque n'est pas visible dans une démo. Il est visible dans les contrats AWS, les configurations de services, et les patterns d'appels dans le code.

La plateforme utilisait également une blockchain privée basée sur une technologie MultiChain pour son registre de transactions et d'actifs numériques. C'est une décision d'architecture défendable techniquement. Mais elle suppose que l'acquéreur comprend les implications de gouvernance: qui contrôle les nœuds? Quel est le plan de continuité si l'éditeur original disparaît? Comment ce registre s'interface avec les systèmes réglementaires locaux?

Ces questions se posent après la démo. Elles ne se posent pas pendant.

---

## Ce que la roadmap (ou son absence) dit sur la gouvernance produit

Sur la plateforme évaluée, une demande avait été faite en début de mission: la roadmap produit pour les 12 prochains mois. Elle n'a jamais été fournie.

Ce n'est pas anecdotique. Une plateforme sans roadmap est une plateforme sans pilotage. Ça peut signifier plusieurs choses: une équipe produit qui réagit aux demandes sans vision long terme, un jeu de cache-cache commercial de la part de l'éditeur, ou une organisation où technique et business ne parlent pas le même langage.

Dans les trois cas, c'est un signal de risque opérationnel pour l'acquéreur. Ce que vous achetez n'est pas seulement le code actuel: c'est la capacité de l'équipe à continuer à faire évoluer ce code selon un plan cohérent.

L'absence de roadmap dans un contexte de due diligence indique soit que la roadmap n'existe pas, soit que l'éditeur ne souhaite pas la partager. Dans les deux cas, l'acquéreur doit poser une hypothèse conservatrice sur le gap restant à combler.

---

## Ce que la due diligence technique révèle: build, buy, ou partner?

Toute due diligence technique doit déboucher sur une décision. Dans ce cas, trois options étaient sur la table.

**Acquérir et finir**: Continuer le développement avec les équipes en place, en ciblant un lancement commercial. L'estimation technique était de 12 mois supplémentaires et 6 développeurs additionnels pour combler le gap fonctionnel et combler les intégrations manquantes. Le coût total dépasse ce que le modèle de pricing original prévoyait.

**Construire from scratch**: Repartir sur une plateforme greenfield, potentiellement en utilisant des composants API banking disponibles sur le marché (certains acteurs comme [Mambu](https://www.mambu.com) ou des BaaS locaux). Délai de 18 à 24 mois minimum, mais avec un périmètre fonctionnel et une architecture adaptés dès le départ au marché cible.

**S'associer à un opérateur existant**: Dans certains marchés africains, le déploiement d'un wallet néobanking est plus rapide via un partenariat avec un opérateur mobile money existant qu'en construisant une infrastructure indépendante. C'est un arbitrage entre contrôle et rapidité. C'est le type de décision que nous accompagnons dans le cadre de nos [missions d'évaluation de plateformes fintech](https://izybiz.fr/management-de-transition).

| Option | Délai estimé | Contrôle | Coût de départ |
|--------|--------------|----------|----------------|
| Acquérir et finir | 12+ mois | Total | Élevé |
| Construire from scratch | 18-24 mois | Total | Très élevé |
| S'associer à un opérateur | 3-6 mois | Partiel | Modéré |

La TDD ne prescrit pas quelle option choisir. Elle donne les données pour que le décideur puisse choisir avec les yeux ouverts.

---

## Les 8 points de contrôle d'une TDD fintech sérieuse

Une due diligence technique fintech bien conduite couvre systématiquement huit dimensions. Les voici dans l'ordre d'impact sur la décision d'acquisition.

1. **Taux de complétion par composant** — pas un taux global, mais composant par composant (backend, mobile iOS, mobile Android, POS, back-office, API partenaires). L'asymétrie entre composants est souvent plus révélatrice que la moyenne.

2. **Intégrations réglementaires présentes et manquantes** — quelles connexions avec le système bancaire local, les réseaux de cartes, les systèmes interbancaires régionaux? C'est la liste des prérequis légaux à l'activité, pas des fonctionnalités optionnelles.

3. **Qualité et architecture du code** — revue code par module, couverture de tests, dette technique, cohérence des patterns. À faire par des ingénieurs, pas par des consultants généralistes.

4. **Dépendances et vendor lock-in** — cloud providers, librairies propriétaires, services tiers sans alternative, contraintes de licences. Un produit fortement couplé à AWS n'a pas la même valeur dans un marché avec une infrastructure cloud mature que dans un marché avec une connectivité contrainte.

5. **Sécurité et conformité RGPD/réglementaire locale** — gestion des données personnelles, chiffrement, audit logs, conformité aux exigences locales de résidence des données.

6. **Gouvernance produit** — roadmap disponible et réaliste, processus de release documenté, backlog priorisé, pratiques de gestion des incidents. L'absence de ces éléments prédit les problèmes futurs aussi sûrement que n'importe quel bug.

7. **Scalabilité de l'architecture** — le système peut-il gérer 10x la charge actuelle? Quelles sont les bottlenecks identifiés? Quels investissements infrastructure sont nécessaires pour passer à l'échelle?

8. **Équipe et rétention** — qui sont les contributeurs critiques du code? Quelle est leur situation contractuelle? Un logiciel dont les deux développeurs clés ne seront plus là 6 mois après l'acquisition est un logiciel à risque.

Cette liste de contrôle n'est pas exhaustive. Elle couvre les questions qui changent une décision d'acquisition. C'est le type de due diligence que nous structurons dans le cadre de nos [missions d'évaluation d'actifs technologiques](https://izybiz.fr/management-de-transition), en amont des décisions les plus structurantes.

---

## Ce que la TDD fintech révèle systématiquement

Trois constats reviennent de façon récurrente dans les due diligences techniques de plateformes fintech:

**Le gap complétion/déployabilité est toujours plus grand qu'annoncé.** Les fondateurs évaluent honnêtement leur taux de complétion par rapport à leur spec. Ils évaluent moins honnêtement la distance entre la spec et le déployable commercial, notamment sur les intégrations réglementaires et les contraintes d'infrastructure locale.

**Les équipes qui construisent pour un marché européen ne construisent pas pour l'Afrique.** Ce n'est pas un défaut, c'est une réalité. La contrainte d'infrastructure, la réglementation locale, les modèles économiques en monnaie locale, les distributions mobile first avec des profils d'utilisateurs différents, tout ça demande des ajustements que ni le code ni l'équipe n'ont anticipés.

**La gouvernance produit se lit dans la qualité de la documentation.** Absence de roadmap, documentation technique incomplète, tests de régression inexistants: ce sont des indicateurs de gouvernance produit, pas uniquement des lacunes techniques. Ils prédisent la capacité à livrer de façon fiable dans la durée.

La due diligence technique fintech n'est pas un exercice académique. C'est une décision d'investissement. Et comme toute décision d'investissement, elle vaut ce qu'elle mesure vraiment.

**Vous pilotez une acquisition technologique ou une évaluation de plateforme fintech? [Prenons contact](https://izybiz.fr/contact) pour structurer l'approche.**

---

*Cette analyse est basée sur l'expérience de conduite d'une due diligence technique complète sur une plateforme néobanking dans le cadre d'un processus d'acquisition pour un opérateur régional. Les données de complétion et estimations ont été rendues génériques. Sources de référence sectorielles: [GSMA Mobile Money Report](https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/gsma_resources/state-of-the-industry-report-on-mobile-money/), [World Bank Global Findex Database](https://www.worldbank.org/en/programs/globalfindex), [BCEAO](https://www.bceao.int).*
