/**
 * Compila il template HTML per l'email di contatto
 * @param {string} name - Nome del mittente
 * @param {string} email - Email del mittente
 * @param {string} message - Messaggio
 * @returns {string} HTML compilato
 */
export function compileTemplate(name, email, message) {
  // Escape HTML per prevenire XSS
  const escapeHtml = (text) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  return `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuovo messaggio da xScrabbler</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; background-color: #f3f4f6;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #e11d48 0%, #db2777 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                xScrabbler
              </h1>
              <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">
                Nuovo messaggio dal sito web
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              
              <!-- Sender Info -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 24px; background-color: #f9fafb; border-radius: 8px; padding: 20px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 12px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; font-weight: 600;">
                      Mittente
                    </p>
                    <p style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #111827;">
                      ${safeName}
                    </p>
                    <a href="mailto:${safeEmail}" style="color: #e11d48; text-decoration: none; font-size: 14px;">
                      ${safeEmail}
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Message -->
              <div style="margin-bottom: 32px;">
                <p style="margin: 0 0 12px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; font-weight: 600;">
                  Messaggio
                </p>
                <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; line-height: 1.6; color: #374151;">
                  ${safeMessage}
                </div>
              </div>
              
              <!-- Reply Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                <tr>
                  <td style="text-align: center;">
                    <a href="mailto:${safeEmail}?subject=Re: Messaggio da xScrabbler" 
                       style="display: inline-block; background: linear-gradient(135deg, #e11d48 0%, #db2777 100%); color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                      Rispondi a ${safeName}
                    </a>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 24px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                Questo messaggio è stato inviato tramite il modulo di contatto di
                <a href="https://xscrabbler.com" style="color: #e11d48; text-decoration: none;">xScrabbler</a>
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
