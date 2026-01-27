export function generateRetentionEmailHtml(type: 'DAYS_2' | 'WEEKS_3', recipientName: string = "Cher membre") {
  let subject = ""
  let content = ""

  if (type === 'DAYS_2') {
    subject = "Bienvenue sur Onda Serena ! Avez-vous trouvé votre bonheur ?"
    content = `
            <p>Cela fait deux jours que vous avez rejoint notre communauté, et nous espérons que vous avez pu découvrir nos services.</p>
            <p>Notre conciergerie est là pour vous faciliter la vie et rendre votre expérience unique.</p>
            <p><strong>N'attendez plus pour réserver votre première prestation !</strong> Que ce soit pour un ménage, une gestion de clés ou un service sur-mesure, nous sommes à votre disposition.</p>
            <p>Si vous avez la moindre question, n'hésitez pas à répondre directement à cet email.</p>
        `
  } else if (type === 'WEEKS_3') {
    subject = "Tout va bien ?"
    content = `
            <p>Cela fait déjà quelques semaines que vous êtes inscrit sur Onda Serena.</p>
            <p>Nous avons remarqué que vous n'avez pas encore effectué de réservation. Peut-être n'avez-vous pas trouvé le service qui vous correspond ?</p>
            <p>Nous serions ravis d'échanger avec vous pour comprendre vos besoins spécifiques.</p>
            <p>Découvrez notre catalogue complet et laissez-vous tenter par une expérience sereine.</p>
        `
  }

  const html = generateNewsletterHtml(content, recipientName)
  return { subject, html }
}

/**
 * Generates the HTML for the newsletter.
 * This function is shared between the frontend (preview) and backend (sending).
 */
export function generateNewsletterHtml(content: string, recipientName: string = "Cher membre") {
  // Simple line break conversion for text area content
  // If content contains HTML tags, trust it (for advanced users), otherwise wrap lines
  // Also handling if content already has <p> tags (like from retention templates) to avoid double wrapping or breaks 
  const formattedContent = content.trim().startsWith("<") ? content : content.replace(/\n/g, '<br/>');

  return `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #FAFAF9; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #E7E5E4; border-radius: 8px; overflow: hidden;">
          
          <!-- Header -->
          <div style="background-color: #ffffff; padding: 30px 40px; text-align: center; border-bottom: 1px solid #FaFaFa;">
            <p style="font-family: serif; font-size: 24px; color: #1C1917; margin: 0; letter-spacing: 2px;">ONDA SERENA</p>
          </div>
  
          <!-- Content -->
          <div style="padding: 40px;">
            <h1 style="color: #E9B676; font-weight: 300; text-transform: uppercase; letter-spacing: 1px; font-size: 20px; margin-top: 0;">Bonjour ${recipientName},</h1>
            
            <div style="color: #44403C; font-size: 16px; line-height: 1.8; margin-top: 20px;">
              ${formattedContent}
            </div>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #f0f0f0; text-align: center;">
               <a href="https://ondaserena.com" style="display: inline-block; background-color: #E9B676; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-size: 14px; font-weight: bold;">Accéder à mon espace</a>
            </div>
          </div>
  
          <!-- Footer -->
          <div style="background-color: #1C1917; color: #A8A29E; padding: 30px 40px; font-size: 12px; text-align: center; line-height: 1.6;">
            <p style="margin: 0 0 10px;">L'équipe ONDA SERENA</p>
            <p>Vous recevez cet email car vous êtes membre de la conciergerie Onda Serena.</p>
            <p style="margin-top: 20px; color: #57534E;">© ${new Date().getFullYear()} Onda Serena. Tous droits réservés.</p>
          </div>
  
        </div>
      </div>
    `;
}
