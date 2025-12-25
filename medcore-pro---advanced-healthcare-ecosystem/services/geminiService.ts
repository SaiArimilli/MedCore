// Client-side service that calls a serverless endpoint for AI responses.
// Falls back to a simple rule-based reply when the endpoint is unavailable.

const mockReply = (prompt: string) => {
	const p = prompt.toLowerCase();
	if (p.includes('appointment') || p.includes('book')) {
		return "You can book a specialist via our Booking page: go to /#/booking. Would you like help finding a doctor? \n\nDisclaimer: I am an AI assistant, not a doctor. In emergencies call local services immediately.";
	}
	if (p.includes('fever') || p.includes('temperature')) {
		return "A common recommendation is to rest, stay hydrated, and use paracetamol as per recommended dosage. If fever is >39°C or persists more than 48 hours, seek medical care. \n\nDisclaimer: I am an AI assistant, not a doctor.";
	}
	if (p.includes('hello') || p.includes('hi') || p.includes('hey')) {
		return "Hello! I'm MedCore's AI assistant — ask me about symptoms, booking, or medicines. \n\nDisclaimer: I am an AI assistant, not a doctor.";
	}
	return "Sorry, I don't have a precise answer for that. Please try rephrasing your question or ask about booking, symptoms, or medicines. \n\nDisclaimer: I am an AI assistant, not a doctor.";
};

export const getHealthcareResponse = async (prompt: string) => {
	try {
		const res = await fetch('/.netlify/functions/genai', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ prompt }),
		});

		if (!res.ok) {
			console.warn('GenAI function returned', res.status);
			return mockReply(prompt);
		}

		const data = await res.json();
		if (data && data.text) return data.text;
		return mockReply(prompt);
	} catch (err) {
		console.error('Error calling GenAI function:', err);
		return mockReply(prompt);
	}
};



