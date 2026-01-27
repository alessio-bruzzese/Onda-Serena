import Link from "next/link"
import { Footer } from "@/components/marketing/footer"

export default function MentionsLegalesPage() {
  return (
    <>
      <div className="min-h-screen">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-light text-[#1a1a1a] mb-2">
                Mentions Légales
              </h1>
              <p className="text-[#A8A8A8] font-body">
                Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
              </p>
            </div>

            <div className="space-y-6 text-[#1a1a1a]/80 font-body leading-relaxed">
              <section>
                <h2 className="mb-4 text-2xl font-light text-[#1a1a1a]">
                  1. Éditeur du site
                </h2>
                <p className="mb-2">
                  <strong className="text-[#1a1a1a]">Raison sociale :</strong> ONDA SERENA
                </p>
                <p className="mb-2">
                  <strong className="text-[#1a1a1a]">Forme juridique :</strong> [À compléter]
                </p>
                <p className="mb-2">
                  <strong className="text-[#1a1a1a]">Siège social :</strong> [Adresse à compléter]
                </p>
                <p className="mb-2">
                  <strong className="text-[#1a1a1a]">SIRET :</strong> [À compléter]
                </p>
                <p className="mb-2">
                  <strong className="text-[#1a1a1a]">TVA :</strong> [À compléter]
                </p>
                <p className="mb-2">
                  <strong className="text-[#1a1a1a]">Directeur de publication :</strong> [Nom à compléter]
                </p>
                <p>
                  <strong className="text-[#1a1a1a]">Contact :</strong> contact@ondaserena.com
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-light text-[#1a1a1a]">
                  2. Hébergeur
                </h2>
                <p className="mb-2">
                  <strong className="text-[#1a1a1a]">Hébergeur :</strong> [Nom de l&apos;hébergeur à compléter]
                </p>
                <p className="mb-2">
                  <strong className="text-[#1a1a1a]">Adresse :</strong> [Adresse à compléter]
                </p>
                <p>
                  <strong className="text-[#1a1a1a]">Site web :</strong> [URL à compléter]
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-light text-[#1a1a1a]">
                  3. Propriété intellectuelle
                </h2>
                <p className="mb-4">
                  L&apos;ensemble de ce site relève de la législation française et internationale sur le droit
                  d&apos;auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés,
                  y compris pour les documents téléchargeables et les représentations iconographiques et
                  photographiques.
                </p>
                <p>
                  La reproduction de tout ou partie de ce site sur un support électronique ou autre est
                  formellement interdite sauf autorisation expresse de l&apos;éditeur du site.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-light text-[#1a1a1a]">
                  4. Protection des données personnelles
                </h2>
                <p className="mb-4">
                  Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
                  Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification, de
                  suppression et d&apos;opposition aux données personnelles vous concernant.
                </p>
                <p className="mb-4">
                  Pour exercer ce droit, vous pouvez nous contacter à l&apos;adresse suivante :
                  contact@ondaserena.com
                </p>
                <p>
                  Pour plus d&apos;informations, consultez notre{" "}
                  <Link href="/politique-confidentialite" className="text-[#A6CFE3] hover:text-[#E9B676] underline">
                    Politique de Confidentialité
                  </Link>
                  .
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-light text-[#1a1a1a]">
                  5. Cookies
                </h2>
                <p>
                  Ce site utilise des cookies pour améliorer l&apos;expérience utilisateur. En continuant
                  à naviguer sur ce site, vous acceptez l&apos;utilisation de cookies. Pour plus
                  d&apos;informations, consultez notre politique de cookies.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-light text-[#1a1a1a]">
                  6. Responsabilité
                </h2>
                <p className="mb-4">
                  Les informations contenues sur ce site sont aussi précises que possible et le site
                  est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes,
                  des omissions ou des lacunes.
                </p>
                <p>
                  ONDA SERENA ne pourra être tenu responsable des dommages directs et indirects
                  causés au matériel de l&apos;utilisateur, lors de l&apos;accès au site, et résultant soit
                  de l&apos;utilisation d&apos;un matériel ne répondant pas aux spécifications, soit de
                  l&apos;apparition d&apos;un bug ou d&apos;une incompatibilité.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-light text-[#1a1a1a]">
                  7. Liens hypertextes
                </h2>
                <p>
                  Le site peut contenir des liens hypertextes vers d&apos;autres sites présents sur le
                  réseau Internet. Les liens vers ces autres ressources vous font quitter le site.
                  Il est possible de créer un lien vers la page de présentation de ce site sans
                  autorisation expresse de l&apos;éditeur.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-light text-[#1a1a1a]">
                  8. Droit applicable
                </h2>
                <p>
                  Les présentes mentions légales sont régies par le droit français. Tout litige
                  relève de la compétence exclusive des tribunaux français.
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

