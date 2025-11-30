# 🗄️ Initialisation de la Base de Données

Maintenant que vous êtes connecté à Supabase, voici comment créer les tables et le compte admin.

## 📋 Étapes en 2 commandes

### Étape 1 : Créer les tables dans la base de données

Cette commande va créer toutes les tables nécessaires (users, services, bookings, etc.) :

```bash
npm run prisma:migrate
```

**Ce que fait cette commande :**
- ✅ Crée les tables dans votre base Supabase
- ✅ Crée les enums (UserRole, BookingStatus)
- ✅ Crée les index et relations
- ✅ Génère un fichier de migration

**Note :** Si c'est la première fois, Prisma vous demandera un nom pour la migration. Vous pouvez utiliser : `init`

### Étape 2 : Créer le compte admin et les services

Cette commande va créer :
- ✅ Le compte admin avec les identifiants
- ✅ Les 5 services par défaut (Gestion basique, standard, premium, etc.)

```bash
npm run db:seed
```

## 🔑 Identifiants Admin

Après avoir exécuté `npm run db:seed`, vous recevrez :

```
============================================================
🔐 IDENTIFIANTS ADMIN ONDA SERENA
============================================================
📧 Email: admin@ondaserena.com
🔑 Mot de passe: OndaSerena2025!
🌐 URL: http://localhost:3000/admin
============================================================
```

## ✅ Vérification

Une fois les deux commandes exécutées, vous pouvez :

1. **Vous connecter** : http://localhost:3000/sign-in
   - Email : `admin@ondaserena.com`
   - Mot de passe : `OndaSerena2025!`

2. **Accéder au dashboard admin** : http://localhost:3000/admin

3. **Voir les services créés** dans le dashboard admin

## 📊 Données créées

### Services créés automatiquement :

1. **Gestion basique** - 18€
   - Check-in/out, ménage professionnel, linge soigné, maintenance

2. **Gestion standard** - 20€
   - Formule basique + optimisation tarifaire, gestion des réservations, reporting

3. **Gestion premium/luxe** - 25€
   - Formule standard + service décoration, aménagement du bien, conciergerie voyageurs

4. **Forfait décoration** - 1500€
   - Transformation de votre bien pour augmenter sa valeur locative

5. **Aménagement du bien** - 2500€
   - Accompagnement complet pour maximiser le potentiel locatif

### Compte Admin créé :

- **Email** : `admin@ondaserena.com`
- **Mot de passe** : `OndaSerena2025!`
- **Rôle** : ADMIN
- **Profil** : Configuré avec les préférences par défaut

## 🔄 Si vous devez réinitialiser

Si vous voulez tout réinitialiser :

```bash
# Supprimer toutes les données (ATTENTION : supprime tout !)
npx prisma migrate reset

# Puis réinitialiser
npm run prisma:migrate
npm run db:seed
```

## ⚠️ En cas d'erreur

### Erreur "relation does not exist"
→ Exécutez d'abord : `npm run prisma:migrate`

### Erreur "enum does not exist"
→ Les enums doivent être créés avec les migrations. Réexécutez : `npm run prisma:migrate`

### Erreur de connexion
→ Vérifiez que votre projet Supabase est actif et que la DATABASE_URL est correcte

---

**✅ Une fois ces deux commandes exécutées, votre base de données sera prête !**

