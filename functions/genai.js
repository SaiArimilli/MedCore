// Simple Netlify function to provide AI-like replies for the chatbot.
// This avoids bundling server-side SDKs into the client; you can replace
// the logic below with a call to a real AI service (Gemini) in production.

exports.handler = async function(event, context) {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const prompt = (body.prompt || '').toString();

    // Very small rule-based responder for demo purposes
    const p = prompt.toLowerCase();
    let reply = '';

    if (!p || p.trim().length === 0) {
      reply = "Hi — what can I help you with today? Ask about symptoms, booking, or medicines.";
    } else if (p.includes('appointment') || p.includes('book')) {
      reply = "You can book a specialist via our Booking page at /#/booking. Would you like help finding a doctor?\n\nDisclaimer: I am an AI assistant, not a doctor.";
    } else if (p.includes('fever') || p.includes('temperature')) {
      reply = "Common advice: rest, hydrate, and consider paracetamol as per label. If fever >39°C or lasting >48 hours, seek medical care immediately.\n\nDisclaimer: I am an AI assistant, not a doctor.";
    } else if (p.includes('medicine') || p.includes('dosage') || p.includes('side effect')) {
      reply = "For medicine details, check the product page or consult a pharmacist. I can help locate medicines in the Pharmacy section.\n\nDisclaimer: I am an AI assistant, not a doctor.";
    } else if (p.includes('hello') || p.includes('hi') || p.includes('hey')) {
      reply = "Hello! I'm MedCore's HealthBot. How can I assist you today?\n\nDisclaimer: I am an AI assistant, not a doctor.";
    } else {
      reply = "Sorry, I don't have a precise answer to that right now. Try asking about booking, symptoms, or medicines.\n\nDisclaimer: I am an AI assistant, not a doctor.";
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: reply })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error' })
    };
  }
};
