import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "ONDA SERENA <ne-pas-repondre@onda-serena.com>"

export async function sendWelcomeEmail(email: string, firstName: string) {
  try {
    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: "Bienvenue chez ONDA SERENA",
      html: `
        <div style="font-family: sans-serif; color: #1a1a1a; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #E9B676; font-weight: 300; text-transform: uppercase; letter-spacing: 2px;">Bienvenue ${firstName}</h1>
          <p>Nous sommes ravis de vous compter parmi nos membres.</p>
          <p>Votre compte a été créé avec succès. Vous pouvez dès à présent accéder à votre espace personnel pour :</p>
          <ul>
            <li>Réserver vos services de conciergerie</li>
            <li>Suivre vos demandes en temps réel</li>
            <li>Gérer vos préférences</li>
          </ul>
          <p>À très bientôt,</p>
          <p style="font-weight: bold;">L'équipe ONDA SERENA</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #888;">Ceci est un message automatique, merci de ne pas y répondre.</p>
        </div>
      `,
    })

    console.log("Welcome email sent:", data.id)
    return { success: true, data }
  } catch (error) {
    console.error("Error sending welcome email:", error)
    return { success: false, error }
  }
}
