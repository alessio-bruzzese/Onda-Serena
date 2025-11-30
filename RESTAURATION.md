# 🔄 Restauration de la Configuration

## ⚠️ Problème identifié

Le projet Supabase a changé (`jxvijzecywvtiiclquwg`). La connexion ne fonctionne plus.

## ✅ Solutions à essayer

### 1. Vérifier que le projet Supabase est actif

1. Allez sur [supabase.com](https://supabase.com)
2. Vérifiez le projet `jxvijzecywvtiiclquwg`
3. **Si le projet est en pause** → Cliquez sur "Restore" ou "Resume"
4. Attendez 1-2 minutes que le projet redémarre

### 2. Essayer avec le pooler (pgbouncer)

Modifiez votre `.env` pour utiliser le pooler :

```env
DATABASE_URL="postgresql://postgres.Ttna2.84AbVy2:[VOTRE_MOT_DE_PASSE]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
```

**Pour obtenir cette URL :**
1. Dans Supabase : Settings → Database
2. Onglet "Connection pooling"
3. Copiez la "Connection string" (URI)
4. Remplacez `[YOUR-PASSWORD]` par votre mot de passe

### 3. Essayer la connexion directe

Si le pooler ne fonctionne pas, utilisez la connexion directe :

```env
DATABASE_URL="postgresql://postgres:[VOTRE_MOT_DE_PASSE]@db.jxvijzecywvtiiclquwg.supabase.co:5432/postgres"
```

**Pour obtenir cette URL :**
1. Dans Supabase : Settings → Database
2. Onglet "Connection string"
3. Sélectionnez "Direct connection"
4. Copiez l'URL et remplacez `[YOUR-PASSWORD]`

### 4. Vérifier le mot de passe

1. Dans Supabase : Settings → Database
2. Vérifiez ou réinitialisez le "Database password"
3. Mettez à jour votre `.env` avec le nouveau mot de passe

### 5. Nettoyer le cache

```bash
# Nettoyer le cache Next.js
rm -rf .next

# Régénérer le client Prisma
npm run prisma:generate

# Tester la connexion
npm run test:connection
```

## 🔍 Diagnostic

Exécutez le diagnostic pour tester plusieurs configurations :

```bash
npm run diagnose
```

## 📝 Checklist

- [ ] Projet Supabase est actif (pas en pause)
- [ ] DATABASE_URL est correcte dans `.env`
- [ ] Mot de passe est correct
- [ ] Cache Next.js nettoyé (`.next` supprimé)
- [ ] Client Prisma régénéré

---

**💡 Astuce :** Si vous avez plusieurs projets Supabase, assurez-vous d'utiliser le bon Project ID dans votre DATABASE_URL.

