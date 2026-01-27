import { Resend } from 'resend'

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "ONDA SERENA <ne-pas-repondre@onda-serena.com>"

export async function sendWelcomeEmail(email: string, firstName: string) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("RESEND_API_KEY is missing. Skipping email.")
    return { success: false, error: "Missing API Key" }
  }

  const resend = new Resend(apiKey)

  try {
    const { data, error } = await resend.emails.send({
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


    if (error) {
      console.error("Error sending welcome email (Resend):", error)
      return { success: false, error }
    }

    console.log("Welcome email sent:", data?.id)
    return { success: true, data }
  } catch (error) {
    console.error("Error sending welcome email (Exception):", error)
    return { success: false, error }
  }
}


export async function sendLeadMagnetEmail(email: string, firstName: string, lastName: string) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("RESEND_API_KEY is missing. Skipping email.")
    return { success: false, error: "Missing API Key" }
  }

  const resend = new Resend(apiKey)

  try {
    // Note: We're assuming the PDF file is in the public directory
    // In a Vercel environment, we might need to adjust how we read this file
    // For now, we'll try to use a direct URL if the domain is known, or read from filesystem
    // Reading from filesystem is generally more reliable for build-time assets if configured correctly

    // For this implementation, we will use a buffer from the file system
    // The user needs to place 'guide-onda-serena.pdf' in the public folder

    // To safe-guard against missing file in dev, we'll check if it exists
    // but in this function we assume it will be there.
    // If you host the file on a CDN, you could replace 'content' with 'path: "https://..."'

    let attachments = []
    try {
      const fs = await import('fs')
      const path = await import('path')
      const filePath = path.join(process.cwd(), 'public', 'guide-onda-serena.pdf')

      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath)
        console.log(`PDF Guide found at: ${filePath}, Size: ${stats.size} bytes`)

        // Check if file is too large (e.g. > 4MB for safety, though Resend supports more)
        if (stats.size > 0 && stats.size < 10 * 1024 * 1024) {
          const fileBuffer = fs.readFileSync(filePath)
          attachments.push({
            filename: 'Guide-Onda-Serena.pdf',
            content: fileBuffer,
          })
        } else {
          console.warn(`PDF Guide is too large or empty: ${stats.size} bytes`)
        }
      } else {
        console.warn("PDF Guide not found at:", filePath)
      }
    } catch (e) {
      console.error("Error reading PDF file:", e)
    }

    // Try sending without attachment first if previous attempt failed with 413
    // But here user got 413, so likely attachment IS the issue.

    // For debugging, let's try sending NO attachment if the file is huge
    // But since I added the size check above, let's try sending again.

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: "Votre Guide Essentiel ONDA SERENA",
      html: `
        <div style="font-family: sans-serif; color: #1a1a1a; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #E9B676; font-weight: 300; text-transform: uppercase; letter-spacing: 2px;">Bonjour ${firstName},</h1>
          <p>Merci de votre intérêt pour ONDA SERENA.</p>
          <p>Comme promis, vous trouverez ci-joint votre <strong>Guide Essentiel</strong> pour optimiser vos revenus locatifs.</p>
          <p>Dans ce guide, vous découvrirez :</p>
          <ul>
            <li>Les secrets d'une annonce attractive</li>
            <li>Comment maximiser votre taux d'occupation</li>
            <li>L'importance de l'expérience voyageur</li>
          </ul>
          <p>Si vous avez des questions ou souhaitez discuter de la gestion de votre bien, n'hésitez pas à nous répondre directement à cet email.</p>
          <p>Bonne lecture !</p>
          <p style="font-weight: bold;">L'équipe ONDA SERENA</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #888;">Ceci est un message automatique.</p>
        </div>
      `,
      attachments: attachments
    })

    if (error) {
      console.error("Error sending lead magnet email (Resend):", error)
      return { success: false, error }
    }

    console.log("Lead magnet email sent:", data?.id)
    return { success: true, data }
  } catch (error) {
    console.error("Error sending lead magnet email (Exception):", error)
    return { success: false, error }
  }
}
