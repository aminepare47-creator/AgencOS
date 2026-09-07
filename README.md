# AgenceOS — Agence de Digitalisation au Burkina Faso

Plateforme web officielle d'AgenceOS : site vitrine, tableau de bord Direction et espace Collaborateur.

## 🎯 Mission

Accompagner la transformation numérique des entreprises du Burkina Faso et de la zone UEMOA — de la création de l'entreprise jusqu'au déploiement complet de sa présence numérique.

## 🏗️ Les 4 Pôles de Service

| Pôle | Description |
|---|---|
| **Fondation & Déploiement** | Mise en place complète de la présence numérique d'une entreprise qui démarre |
| **Accompagnement & Boutique Digitale** | Suivi continu + solutions e-commerce pour les entreprises déjà présentes |
| **Développement Web & Mobile** | Solutions logicielles sur mesure, applications mobiles, plateformes métier |
| **Identité Digitale & Réseaux Sociaux** | Charte graphique, community management, production vidéo |

## 👥 Utilisateurs

- **Visiteur** — Consulte les services, dépose un projet, postule pour rejoindre l'équipe
- **Candidat** — Parcours en 4 étapes avec test technique privé par métier
- **Collaborateur** — Espace individuel authentifié (tâches, historique, carte de membre)
- **Directeur** — Tableau de bord centralisé (candidatures, collaborateurs, devis, paramètres)

## 🛠️ Stack Technique

| Technologie | Usage |
|---|---|
| React 19 + TypeScript | Frontend |
| Vite 6 | Build & dev server |
| Tailwind CSS 4 | Styling |
| Lucide React | Icônes |
| Supabase *(prévu)* | Auth, DB, Storage |
| Vercel *(prévu)* | Déploiement |

## 🚀 Installation

```bash
# Cloner le dépôt
git clone https://github.com/aminepare47-creator/AgencOS.git
cd AgenceOS

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

Le site est accessible sur `http://localhost:3000`.

## 🔐 Accès Directeur

L'accès à l'espace Direction est **masqué** dans l'interface publique. Il s'active par :
- URL : `#directeur` ou `?admin=true`
- Raccourci clavier : `Alt + Shift + D`

La clé d'accès se configure via la variable d'environnement `VITE_DIRECTEUR_ACCESS_KEY`.

## 📁 Structure du Projet

```
src/
├── components/
│   ├── candidate/       # Parcours candidat (4 étapes + test)
│   ├── collaborateur/   # Espace collaborateur (login, tâches, profil)
│   ├── common/          # Composants partagés (sceau, badges)
│   ├── director/        # Tableau de bord Direction
│   ├── public/          # Pages publiques (Hero, Services, Réalisations...)
│   ├── Footer.tsx
│   └── Header.tsx
├── context/             # AppContext (state global)
├── data/                # Données statiques (pôles, réalisations)
├── fonts.css            # Polices auto-hébergées
├── types.ts             # Types TypeScript
├── App.tsx              # Routeur principal
└── main.tsx             # Point d'entrée
```

## ⚙️ Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement (port 3000) |
| `npm run build` | Build production |
| `npm run preview` | Prévisualiser le build |
| `npm run lint` | Vérification TypeScript |

## 🔒 Sécurité

- Aucun secret dans le code (clés via variables d'environnement)
- Accès admin non listé dans la navigation publique
- Mots de passe collaborateurs stockés de manière sécurisée (migration Supabase prévue)

## 📝 Licence

Projet privé — Tous droits réservés © AgenceOS Burkina Faso

---

**Contact** : +226 55 30 08 68 · contact@agenceos.bf
