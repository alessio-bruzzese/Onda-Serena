import { Resend } from 'resend'
import dotenv from "dotenv"
import path from "path"

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), ".env") })

const resend = new Resend(process.env.RESEND_API_KEY)
const recipient = process.env.TEST_EMAIL_RECIPIENT || "alessiobrubru@gmail.com"
const sender = process.env.RESEND_FROM_EMAIL || "ne-pas-repondre@onda-serena.com"

console.log("Testing Resend with:")
console.log("API Key:", process.env.RESEND_API_KEY ? "Defined (starts with " + process.env.RESEND_API_KEY.substring(0, 5) + "...)" : "Undefined")
console.log("From:", sender)
console.log("To:", recipient)

async function main() {
    if (!process.env.RESEND_API_KEY) {
        console.error("❌ ERROR: RESEND_API_KEY is missing in .env")
        return
    }

    try {
        console.log("Sending test email...")
        const data = await resend.emails.send({
            from: sender,
            to: [recipient],
            subject: "Test Configuration Resend - ONDA SERENA",
            html: `
        <div style="font-family: sans-serif;">
          <h1>Test Réussi (Resend)</h1>
          <p>Si vous recevez ce message, la configuration Resend fonctionne correctement.</p>
          <p>Envoyé le : ${new Date().toLocaleString()}</p>
        </div>
      `,
        })

        if (data.error) {
            console.error("❌ Resend API Error:", data.error)
        } else {
            console.log("✅ Message sent successfully!")
            console.log("ID:", data.data?.id)
        }

    } catch (error) {
        console.error("❌ Unexpected Error:", error)
    }
}

main()
