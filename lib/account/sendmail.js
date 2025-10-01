import { Resend } from "resend";
import { render } from "@react-email/render";
import { GenericEmail } from "@/components/GenericEmail";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({to, subject, text}) {
  const html = render(<GenericEmail subject={subject} text={text} />)
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",  // ou noreply@tondomaine.com après vérification
      to,
      subject,
      html,
    });

    console.log("Email sent:", data);
    return data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Cannot send email");
  }
}
