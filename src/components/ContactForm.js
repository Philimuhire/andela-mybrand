import React, { useState } from 'react';

function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form submitted!');

        try {
            const response = await fetch('http://localhost:5000/contact/saveContactQuery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                })
            });

            if (response.ok) {
                alert('Your query has been submitted successfully!');
            } else {
                const data = await response.json();
                throw new Error(data.message || 'Failed to submit query');
            }
        } catch (error) {
            console.error('Error submitting query:', error);
            alert('Failed to submit query. Please try again later.');
        }
    };

    return (
        <div className="contact-form">
            <form id="contact-form" onSubmit={handleSubmit}>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" />
                <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" />
                <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your Message"></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ContactForm;
