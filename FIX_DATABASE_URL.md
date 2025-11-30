# 🔧 Correction de la DATABASE_URL

## ⚠️ Problème actuel

Votre `DATABASE_URL` utilise le pooler Supabase qui ne fonctionne pas :
```
postgresql://postgres.jxvijzecywvtiiclquwg:Ttna2.84AbVy2@aws-1-eu-west-1.pooler.supabase.com:5432/postgres
```

## ✅ Solution : Utiliser la connexion directe

### 1. Obtenir la bonne URL dans Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Sélectionnez votre projet (`jxvijzecywvtiiclquwg`)
3. Allez dans **Settings** → **Database**
4. Onglet **"Connection string"**
5. Sélectionnez **"Direct connection"** (pas "Connection pooling")
6. Copiez l'URL qui ressemble à :
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.jxvijzecywvtiiclquwg.supabase.co:5432/postgres
   ```

### 2. Mettre à jour votre `.env`

Remplacez votre `DATABASE_URL` actuelle par :

```env
DATABASE_URL="postgresql://postgres:[VOTRE_MOT_DE_PASSE]@db.jxvijzecywvtiiclquwg.supabase.co:5432/postgres"
```

**Important :** 
- Remplacez `[VOTRE_MOT_DE_PASSE]` par votre mot de passe de base de données
- Le mot de passe se trouve dans Settings → Database → "Database password"
- Si vous ne le connaissez pas, cliquez sur "Reset database password"

### 3. Vérifier la connexion

```bash
npm run test:connection
```

### 4. Si ça fonctionne, redémarrer le serveur

```bash
# Arrêter le serveur (Ctrl+C)
# Puis redémarrer
npm run dev
```

## 🔍 Différence entre pooler et connexion directe

- **Pooler** : `aws-1-eu-west-1.pooler.supabase.com:5432` (ne fonctionne pas toujours)
- **Directe** : `db.jxvijzecywvtiiclquwg.supabase.co:5432` (plus fiable pour Prisma)

Pour Prisma, la connexion directe est généralement plus fiable.

---

**✅ Une fois la DATABASE_URL corrigée, la page admin fonctionnera !**

