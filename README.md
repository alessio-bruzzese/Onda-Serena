# ONDA SERENA - Conciergerie Côte Bleue

Application web de conciergerie pour la gestion locative sur la Côte Bleue.

## 🚀 Démarrage rapide

### 1. Configuration de l'environnement

Créez un fichier `.env` à la racine du projet :

```env
# Base de données Supabase PostgreSQL
DATABASE_URL="postgresql://postgres:[VOTRE_MOT_DE_PASSE]@db.[PROJECT_ID].supabase.co:5432/postgres"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="[GÉNÉREZ_UNE_CLÉ_ALÉATOIRE]"

# Optionnel : Supabase JS (si vous voulez utiliser le client Supabase)
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT_ID].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[VOTRE_ANON_KEY]"
```

**Pour obtenir votre DATABASE_URL :**
1. Allez sur [supabase.com](https://supabase.com)
2. Settings → Database
3. Onglet "Connection string" → "URI"
4. Copiez l'URL et remplacez `[YOUR-PASSWORD]` par votre mot de passe

### 2. Installation des dépendances

```bash
npm install
```

### 3. Configuration de la base de données

```bash
# Générer le client Prisma
npm run prisma:generate

# Créer les tables (migrations)
npm run prisma:migrate

# Créer le compte admin et les services
npm run db:seed
```

### 4. Démarrer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🔑 Identifiants Admin

Après avoir exécuté `npm run db:seed` :

- **Email :** `admin@ondaserena.com`
- **Mot de passe :** `OndaSerena2025!`
- **Dashboard :** http://localhost:3000/admin

## 📋 Commandes disponibles

```bash
# Développement
npm run dev              # Démarrer le serveur de développement
npm run build            # Construire pour la production
npm run start            # Démarrer le serveur de production

# Base de données
npm run prisma:generate  # Générer le client Prisma
npm run prisma:migrate   # Appliquer les migrations
npm run prisma:push      # Push direct du schéma (dev uniquement)
npm run db:seed          # Créer le compte admin et les services

# Utilitaires
npm run test:connection  # Tester la connexion à la base de données
npm run diagnose         # Diagnostic de connexion (teste plusieurs configs)
npm run create:admin     # Créer uniquement le compte admin
npm run lint             # Vérifier le code avec ESLint
```

## 🧪 Tester la connexion

Si vous avez des problèmes de connexion :

```bash
# Test simple
npm run test:connection

# Diagnostic complet (teste plusieurs configurations)
npm run diagnose
```

## 📖 Documentation

- `SUPABASE_SETUP.md` - Guide détaillé de configuration Supabase
- `README_SUPABASE.md` - Guide rapide Supabase
- `ADMIN_CREDENTIALS.md` - Informations sur le compte admin

## 🛠️ Technologies utilisées

- **Next.js 16** - Framework React
- **Prisma** - ORM pour PostgreSQL
- **NextAuth** - Authentification
- **Tailwind CSS** - Styling
- **TypeScript** - Typage statique
- **Supabase** - Base de données PostgreSQL

## 📝 Structure du projet

```
├── prisma/
│   ├── schema.prisma    # Schéma de la base de données
│   └── seed.ts          # Données initiales
├── src/
│   ├── app/             # Pages et routes Next.js
│   ├── components/      # Composants React
│   └── lib/             # Utilitaires et configuration
└── scripts/             # Scripts utilitaires
```

## ⚠️ Dépannage

### Erreur "Can't reach database server"

1. Vérifiez que votre projet Supabase est **actif** (pas en pause)
2. Vérifiez votre `DATABASE_URL` dans `.env`
3. Vérifiez votre mot de passe de base de données
4. Exécutez `npm run diagnose` pour un diagnostic complet

### Erreur "relation does not exist"

Exécutez les migrations :
```bash
npm run prisma:migrate
```

### Erreur de type Prisma

Générez le client Prisma :
```bash
npm run prisma:generate
```

---

**Développé pour ONDA SERENA - Conciergerie Côte Bleue**
