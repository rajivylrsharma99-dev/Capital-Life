export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, subject, message, type } = req.body;
  const apiKey = process.env.RESEND_API_KEY;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Capital Life Support <onboarding@resend.dev>',
        to: ['rajivylrsharma89@gmail.com'],
        subject: `New ${type === 'callback' ? 'Callback' : 'Support'}: ${subject || (type === 'callback' ? 'Callback Request' : 'General Inquiry')}`,
        html: `
          <h3>New Support Inquiry Received</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Type:</strong> ${type || 'support'}</p>
          <p><strong>Subject:</strong> ${subject || (type === 'callback' ? 'Callback Request' : 'General Inquiry')}</p>
          <p><strong>Message:</strong></p>
          <p>${message || (type === 'callback' ? `Callback requested on phone: ${phone}` : 'No message provided.')}</p>
        `
      })
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ message: 'Inquiry sent successfully', data });
    } else {
      console.error('Resend API error:', data);
      return res.status(response.status).json({ error: data.message || 'Failed to send inquiry' });
    }
  } catch (err) {
    console.error('Error sending email:', err);
    return res.status(500).json({ error: 'Failed to send inquiry' });
  }
}
