// This file contains the JavaScript logic for handling the contact form submission. 
// It validates the form inputs and may send the data to a server or display a success message.

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (validateForm(name, email, message)) {
            // Here you can add code to send the data to a server
            // For now, we'll just display a success message
            successMessage.textContent = 'Thank you for your message!';
            successMessage.style.display = 'block';
            contactForm.reset();
        } else {
            successMessage.textContent = 'Please fill in all fields correctly.';
            successMessage.style.display = 'block';
        }
    });

    function validateForm(name, email, message) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return name.trim() !== '' && emailPattern.test(email) && message.trim() !== '';
    }
});