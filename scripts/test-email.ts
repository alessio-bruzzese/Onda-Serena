import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function main() {
    console.log("Testing email configuration...");
    console.log("EMAIL_SERVER:", process.env.EMAIL_SERVER);
    console.log("EMAIL_FROM:", process.env.EMAIL_FROM);

    if (!process.env.EMAIL_SERVER) {
        console.error("❌ EMAIL_SERVER is missing in .env");
        return;
    }

    try {
        const transporter = nodemailer.createTransport(process.env.EMAIL_SERVER);

        console.log("Verifying connection...");
        await transporter.verify();
        console.log("✅ Connection successful!");

        console.log("Sending test email...");
        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: "alessiobrubru@gmail.com", // Send to self
            subject: "Test Email from ONDA SERENA",
            text: "If you receive this, the email configuration is working correctly.",
        });

        console.log("✅ Email sent:", info.messageId);
    } catch (error) {
        console.error("❌ Error:", error);
    }
}

main();
