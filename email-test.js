import { Resend } from 'resend';

const resend = new Resend('your-api-key-here'); // Replace with real key

async function main() {
  try {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'bilza2024@gmail.com',
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });

    console.log('Email sent:', response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

main();
