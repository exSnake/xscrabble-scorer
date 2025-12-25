import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { compileTemplate } from "../utils/emailTemplate.js";

export default async function handler(req, res) {
  // Verifica che la richiesta sia POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metodo non consentito" });
  }

  try {
    const { name, email, message } = req.body;

    // Validazione
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Tutti i campi sono obbligatori" });
    }

    // Compila il template HTML con i dati dell'utente
    const emailHtml = compileTemplate(name, email, message);

    // Configurazione del client SES
    const sesClient = new SESClient({
      region: process.env.AWS_REGION || "eu-west-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    // Preparare il contenuto dell'email
    const emailParams = {
      Source: process.env.EMAIL_FROM || "noreply@danielegiaquinto.com",
      Destination: {
        ToAddresses: [process.env.EMAIL_TO || "info@danielegiaquinto.com"],
      },
      Message: {
        Subject: {
          Data: `Nuovo messaggio dal sito web da ${name}`,
          Charset: "UTF-8",
        },
        Body: {
          Text: {
            Data: `Nome: ${name}\nEmail: ${email}\n\nMessaggio:\n${message}`,
            Charset: "UTF-8",
          },
          Html: {
            Data: emailHtml,
            Charset: "UTF-8",
          },
        },
      },
    };

    // Invia l'email
    const command = new SendEmailCommand(emailParams);
    await sesClient.send(command);

    // Restituisci una risposta di successo
    return res.status(200).json({ success: true, version: "1.0.0" });
  } catch (error) {
    console.error("Errore nell'invio dell'email:", error);
    return res
      .status(500)
      .json({ error: "Errore nell'invio dell'email", details: error.message });
  }
}
