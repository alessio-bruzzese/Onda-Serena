import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-light">Conditions Générales d&apos;Utilisation</h1>
            <p className="mt-2 text-white/60">Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>
          </div>

          <div className="space-y-6 text-white/80">
            <section>
              <h2 className="mb-4 text-2xl font-light">1. Acceptation des conditions</h2>
              <p className="leading-relaxed">
                En créant un compte sur notre plateforme, vous acceptez sans réserve les présentes conditions générales
                d&apos;utilisation. Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser nos services.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-light">2. Description du service</h2>
              <p className="leading-relaxed">
                Notre plateforme propose des services de conciergerie de luxe, incluant la réservation de services
                personnalisés, l'administration de votre profil client, et l&apos;accès à des expériences exclusives. Nous nous
                réservons le droit de modifier, suspendre ou interrompre tout ou partie du service à tout moment.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-light">3. Compte utilisateur</h2>
              <p className="leading-relaxed">
                Vous êtes responsable de maintenir la confidentialité de vos identifiants de connexion. Vous acceptez de
                nous notifier immédiatement de toute utilisation non autorisée de votre compte. Vous êtes seul responsable
                de toutes les activités qui se produisent sous votre compte.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-light">4. Réservations et paiements</h2>
              <p className="leading-relaxed">
                Les réservations de services sont soumises à disponibilité et à confirmation. Les prix indiqués sont en
                euros et peuvent être modifiés sans préavis. Le paiement peut être requis selon les modalités spécifiques
                de chaque service.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-light">5. Protection des données personnelles</h2>
              <p className="leading-relaxed">
                Nous nous engageons à protéger vos données personnelles conformément au Règlement Général sur la Protection
                des Données (RGPD). Vos données sont utilisées uniquement dans le cadre de la fourniture de nos services
                et ne sont jamais partagées avec des tiers sans votre consentement explicite.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-light">6. Propriété intellectuelle</h2>
              <p className="leading-relaxed">
                Tous les contenus présents sur la plateforme (textes, images, logos, etc.) sont la propriété exclusive de
                notre société ou de ses partenaires. Toute reproduction, même partielle, est strictement interdite sans
                autorisation préalable.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-light">7. Limitation de responsabilité</h2>
              <p className="leading-relaxed">
                Nous ne saurions être tenus responsables des dommages directs ou indirects résultant de l&apos;utilisation
                ou de l&apos;impossibilité d&apos;utiliser nos services. Nous agissons en tant qu&apos;intermédiaire entre
                vous et les prestataires de services.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-light">8. Modification des conditions</h2>
              <p className="leading-relaxed">
                Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entrent en vigueur
                dès leur publication. Il est de votre responsabilité de consulter régulièrement cette page.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-light">9. Droit applicable</h2>
              <p className="leading-relaxed">
                Les présentes conditions sont régies par le droit français. Tout litige relève de la compétence exclusive
                des tribunaux français.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-light">10. Contact</h2>
              <p className="leading-relaxed">
                Pour toute question concernant ces conditions, vous pouvez nous contacter à l&apos;adresse suivante :
                contact@maisonnova.com
              </p>
            </section>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <Link
              href="/sign-up"
              className="inline-flex items-center text-sm text-white/60 hover:text-white hover:underline"
            >
              ← Retour à l&apos;inscription
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

