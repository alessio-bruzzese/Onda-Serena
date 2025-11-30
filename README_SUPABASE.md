# 🚀 Configuration Supabase - Guide Rapide

## ✅ Modifications effectuées

Tout a été restauré pour fonctionner avec **PostgreSQL/Supabase** :

- ✅ Schéma Prisma avec enums et Decimal
- ✅ Code adapté pour les types natifs PostgreSQL
- ✅ Fichier SQLite supprimé
- ✅ Seed mis à jour avec les services ONDA SERENA

## 🔧 Configuration en 3 étapes

### 1. Configurer `.env`

Créez/modifiez le fichier `.env` à la racine :

```env
DATABASE_URL="postgresql://postgres:[VOTRE_MOT_DE_PASSE]@db.[PROJECT_ID].supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="[GÉNÉREZ_UNE_CLÉ_ALÉATOIRE]"
```

**Pour obtenir votre DATABASE_URL :**
1. Allez sur [supabase.com](https://supabase.com)
2. Settings → Database
3. Copiez la Connection string (URI)
4. Remplacez `[YOUR-PASSWORD]` par votre mot de passe

**Pour générer NEXTAUTH_SECRET :**
```bash
openssl rand -base64 32
```

### 2. Tester la connexion

```bash
npm run test:connection
```

### 3. Initialiser la base de données

```bash
# Créer les tables
npm run prisma:migrate

# Créer le compte admin et les services
npm run db:seed
```

## 🔑 Identifiants Admin

Après le seed, vous pourrez vous connecter avec :

- **Email :** `admin@ondaserena.com`
- **Mot de passe :** `OndaSerena2025!`

## 📋 Commandes utiles

```bash
# Tester la connexion
npm run test:connection

# Générer le client Prisma
npm run prisma:generate

# Appliquer les migrations
npm run prisma:migrate

# Créer le compte admin
npm run db:seed

# Démarrer le serveur
npm run dev
```

## ⚠️ Dépannage

**Erreur "Can't reach database server" :**
- Vérifiez votre `DATABASE_URL` dans `.env`
- Vérifiez que votre projet Supabase est actif
- Vérifiez votre mot de passe

**Erreur "relation does not exist" :**
```bash
npm run prisma:migrate
```

**Erreur de type Prisma :**
```bash
npm run prisma:generate
```

---

📖 Pour plus de détails, consultez `SUPABASE_SETUP.md`

