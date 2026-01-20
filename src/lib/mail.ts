import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT) || 587,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

export async function sendWelcomeEmail(email: string, firstName: string) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"ONDA SERENA" <concierge@ondaserena.com>',
      to: email,
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
    console.log("Welcome email sent:", info.messageId)
    return { success: true }
  } catch (error) {
    console.error("Error sending welcome email:", error)
    return { success: false, error }
  }
}
