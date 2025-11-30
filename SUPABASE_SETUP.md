# 🔧 Configuration Supabase - ONDA SERENA

## ✅ Modifications effectuées

1. **Schéma Prisma restauré** pour PostgreSQL avec :
   - ✅ Enums natifs (`UserRole`, `BookingStatus`)
   - ✅ Type `Decimal` pour les prix
   - ✅ Arrays natifs PostgreSQL pour `favoriteServices` et `tags`
   - ✅ Fichier SQLite supprimé

2. **Code restauré** pour utiliser les types natifs PostgreSQL :
   - ✅ Suppression de `JSON.stringify/parse` dans les actions
   - ✅ Suppression de `parseJsonArray` dans les composants
   - ✅ Types corrigés dans les composants admin

3. **Seed mis à jour** avec les services ONDA SERENA

## 🔑 Configuration requise

### 1. Créer/Modifier le fichier `.env`

Créez un fichier `.env` à la racine du projet avec :

```env
# Base de données Supabase PostgreSQL
DATABASE_URL="postgresql://postgres:[VOTRE_MOT_DE_PASSE]@db.[VOTRE_PROJECT_ID].supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="[GÉNÉREZ_UNE_CLÉ_SECRÈTE_ALÉATOIRE]"

# Optionnel : Admin credentials pour le seed
SEED_ADMIN_EMAIL="admin@ondaserena.com"
SEED_ADMIN_PASSWORD="OndaSerena2025!"
```

### 2. Obtenir votre DATABASE_URL depuis Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Connectez-vous à votre projet
3. Allez dans **Settings** → **Database**
4. Copiez la **Connection string** (URI)
5. Remplacez `[YOUR-PASSWORD]` par votre mot de passe de base de données

**Format attendu :**
```
postgresql://postgres:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres?pgbouncer=true&connection_limit=1
```

### 3. Générer NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

Ou utilisez un générateur en ligne : https://generate-secret.vercel.app/32

## 🚀 Étapes suivantes

### 1. Appliquer les migrations Prisma

```bash
npm run prisma:migrate
```

Cela va créer les tables dans votre base Supabase.

### 2. Créer le compte admin

```bash
npm run db:seed
```

Cela va :
- Créer les services par défaut
- Créer le compte admin avec les identifiants :
  - **Email :** `admin@ondaserena.com`
  - **Mot de passe :** `OndaSerena2025!`

### 3. Vérifier la connexion

Démarrez le serveur de développement :

```bash
npm run dev
```

Puis testez :
- Connexion : http://localhost:3000/sign-in
- Dashboard admin : http://localhost:3000/admin

## 📋 Structure de la base de données

### Tables créées

- `users` - Utilisateurs (ADMIN ou CLIENT)
- `client_profiles` - Profils clients avec préférences
- `services` - Services proposés (prix en Decimal)
- `bookings` - Réservations avec statut (PENDING, CONFIRMED, CANCELLED)

### Enums PostgreSQL

- `UserRole` : `ADMIN` | `CLIENT`
- `BookingStatus` : `PENDING` | `CONFIRMED` | `CANCELLED`

## ⚠️ Dépannage

### Erreur : "Can't reach database server"

1. Vérifiez que votre `DATABASE_URL` est correcte
2. Vérifiez que votre projet Supabase est actif
3. Vérifiez votre mot de passe dans la connection string
4. Assurez-vous que le pooler de connexion est activé dans Supabase

### Erreur : "relation does not exist"

Exécutez les migrations :
```bash
npm run prisma:migrate
```

### Erreur de type Prisma

Générez le client Prisma :
```bash
npm run prisma:generate
```

## 📝 Notes

- Les arrays PostgreSQL (`favoriteServices`, `tags`) sont maintenant natifs, pas besoin de JSON.stringify/parse
- Les prix utilisent le type `Decimal` pour la précision
- Les enums sont gérés nativement par PostgreSQL

---

**✅ Une fois la configuration terminée, vous pourrez vous connecter avec le compte admin !**

