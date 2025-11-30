import Link from "next/link"
import { Footer } from "@/components/marketing/footer"

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-light text-[#1a1a1a] mb-2">
                Politique de Confidentialité
              </h1>
              <p className="text-[#A8A8A8] font-body">
                Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
              </p>
            </div>

            <div className="space-y-6 text-[#1a1a1a]/80 font-body leading-relaxed">
              <section>
                <h2 className="mb-4 text-2xl font-light text-[#1a1a1a]">
                  1. Introduction
                </h2>
                <p>
                  ONDA SERENA s&apos;engage à protéger la confidentialité et la sécurité des données 
                  personnelles de ses utilisateurs. Cette politique de confidentialité explique 
                  comment nous collectons, utilisons, stockons et protégeons vos données personnelles 
                  conformément au Règlement Général sur la Protection des Données (RGPD).
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-light text-[#1a1a1a]">
                  2. Données collectées
                </h2>
                <p className="mb-4">Nous collectons les données suivantes :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Nom et prénom</li>
                  <li>Adresse email</li>
                  <li>Numéro de téléphone</li>
                  <li>Adresse postale</li>
                  <li>Localisation du bien</li>
                  <li>Données de navigation (cookies)</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-light text-[#1a1a1a]">
                  3. Utilisation des données
                </h2>
                <p className="mb-4">Vos données sont utilisées pour :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Fournir nos services de conciergerie</li>
                  <li>Vous contacter concernant nos services</li>
                  <li>Vous envoyer le guide gratuit demandé</li>
                  <li>Améliorer notre site web et nos services</li>
                  <li>Respecter nos obligations légales</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-light text-[#1a1a1a]">
                  4. Base légale du traitement
                </h2>
                <p>
                  Le traitement de vos données personnelles est basé sur votre consentement explicite 
                  que vous pouvez retirer à tout moment en nous contactant à contact@ondaserena.com.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-light text-[#1a1a1a]">
                  5. Conservation des données
                </h2>
                <p>
                  Nous conservons vos données personnelles uniquement pendant la durée nécessaire aux 
                  finalités pour lesquelles elles ont été collectées, ou conformément aux obligations 
                  légales applicables.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-light text-[#1a1a1a]">
                  6. Vos droits
                </h2>
                <p className="mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Droit d&apos;accès à vos données personnelles</li>
                  <li>Droit de rectification de vos données</li>
                  <li>Droit à l&apos;effacement de vos données</li>
                  <li>Droit à la limitation du traitement</li>
                  <li>Droit à la portabilité des données</li>
                  <li>Droit d&apos;opposition au traitement</li>
                  <li>Droit de retirer votre consentement</li>
                </ul>
                <p className="mt-4">
                  Pour exercer ces droits, contactez-nous à : contact@ondaserena.com
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-light text-[#1a1a1a]">
                  7. Partage des données
                </h2>
                <p>
                  Nous ne vendons, ne louons ni ne partageons vos données personnelles avec des tiers, 
                  sauf dans les cas suivants :
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Avec votre consentement explicite</li>
                  <li>Pour respecter une obligation légale</li>
                  <li>Avec nos prestataires de services (hébergement, email) sous contrat strict</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-light text-[#1a1a1a]">
                  8. Sécurité
                </h2>
                <p>
                  Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour 
                  protéger vos données personnelles contre tout accès non autorisé, perte, destruction 
                  ou altération.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-light text-[#1a1a1a]">
                  9. Cookies
                </h2>
                <p>
                  Notre site utilise des cookies pour améliorer votre expérience. Vous pouvez gérer 
                  vos préférences de cookies dans les paramètres de votre navigateur.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-light text-[#1a1a1a]">
                  10. Contact
                </h2>
                <p>
                  Pour toute question concernant cette politique de confidentialité, contactez-nous à : 
                  contact@ondaserena.com
                </p>
              </section>
            </div>

            <div className="mt-12 border-t border-[#A8A8A8]/20 pt-8">
              <Link
                href="/"
                className="inline-flex items-center text-sm text-[#A6CFE3] hover:text-[#E9B676] hover:underline font-body"
              >
                ← Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

