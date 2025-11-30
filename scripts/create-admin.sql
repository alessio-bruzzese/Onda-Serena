-- ======================================================================
-- SCRIPT SQL POUR CRÉER LE COMPTE ADMIN ONDA SERENA
-- ======================================================================
-- 
-- Identifiants:
-- Email: admin@ondaserena.com
-- Mot de passe: OndaSerena2025!
--
-- Instructions:
-- 1. Connectez-vous à votre base de données (Supabase, PostgreSQL, etc.)
-- 2. Exécutez ce script SQL
-- 3. Connectez-vous sur http://localhost:3000/sign-in
-- 4. Accédez au dashboard: http://localhost:3000/admin
--
-- ======================================================================

-- 1. Créer l'utilisateur admin
INSERT INTO users (id, email, "passwordHash", "firstName", "lastName", role, "createdAt", "updatedAt")
VALUES (
  'clx1764431256860bvzipkxy0',
  'admin@ondaserena.com',
  '$2a$12$BMEX/Z2M14TD0ylCObN0kOChOJZMQc/zSzlnAsPHNm0pjzVWUMb7.',
  'ONDA',
  'SERENA Admin',
  'ADMIN',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE SET
  "passwordHash" = EXCLUDED."passwordHash",
  "firstName" = EXCLUDED."firstName",
  "lastName" = EXCLUDED."lastName",
  role = EXCLUDED.role,
  "updatedAt" = NOW();

-- 2. Créer le profil admin (si l'utilisateur vient d'être créé)
INSERT INTO client_profiles (id, "userId", preferences, "lifestyleNotes", "favoriteServices", tags, "createdAt", "updatedAt")
SELECT 
  'clx1764431256860t1d7yis7b',
  id,
  'Gestion des réservations et clients ONDA SERENA',
  'Basé sur la Côte Bleue, disponible 24/7.',
  ARRAY['Gestion locative', 'Conciergerie'],
  ARRAY['ADMIN', 'COTE_BLEUE'],
  NOW(),
  NOW()
FROM users
WHERE email = 'admin@ondaserena.com'
  AND NOT EXISTS (
    SELECT 1 FROM client_profiles WHERE "userId" = users.id
  )
ON CONFLICT ("userId") DO UPDATE SET
  preferences = EXCLUDED.preferences,
  "lifestyleNotes" = EXCLUDED."lifestyleNotes",
  "favoriteServices" = EXCLUDED."favoriteServices",
  tags = EXCLUDED.tags,
  "updatedAt" = NOW();

-- ======================================================================
-- VÉRIFICATION
-- ======================================================================
-- Pour vérifier que le compte a été créé, exécutez:
-- SELECT email, role, "firstName", "lastName" FROM users WHERE role = 'ADMIN';
-- ======================================================================

