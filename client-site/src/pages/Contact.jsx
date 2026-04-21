import { useState } from 'react';

// Starting values for all form fields
const initialFormData = {
    name: '',
    email: '',
    message: ''
};

export default function Contact() {
    // State for form data object and submitted status
    const [formData, setFormData] = useState(initialFormData);
    const [submitted, setSubmitted] = useState(false);

      // Reusable change handler — uses input's name to update the correct field
    function handleChange(e) {
        setFormData((currentData) => ({
        ...currentData,
        [e.target.name]: e.target.value,
        }));
    }

    // Submit handler — prevents default and updates submitted state
    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
    }

    // Form is valid only when all 3 conditions are met
    const isValid =
        formData.name.trim() !== '' &&
        formData.email.includes('@') &&
        formData.message.length >= 10;

  return (
    <section>
        <div className = "header-card">
            <h1>Contact Us</h1>
        </div>
        <div className="card" id="contact-form">
            <h1> Get in Touch</h1>
            <hr></hr>
            <p> Have a question, custom order request, or just want to say hello? We'd love to hear from you!</p>
            <form action="mailto:charm_tails@yahoo.com" onSubmit={handleSubmit}>
                <label for="name">Name</label>
                <input type="text" id="name" placeholder="Full Name" name="name" required onChange={handleChange}></input>
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Your Email" required onChange={handleChange}></input>
                <label for="message">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Your Message" required onChange={handleChange}></textarea>
                <button type="submit" className="button" disabled={!isValid}> Submit Message </button>
                {!isValid && (
                <p className="error-message">
                    Please fill out all fields. Email must include @, and message must be at least 10 characters.
                </p>
                )}

                {submitted && isValid && (
                <p className="success-message">
                    Thank you, {formData.name}! Your message has been received.
                </p>
                )}
            </form>
        </div>
    </section>
  );
}