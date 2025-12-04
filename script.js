document.addEventListener('DOMContentLoaded', () => {

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission
    const form = document.getElementById('leadForm');
    const formMessage = document.getElementById('formMessage');

    // PLACEHOLDER: User needs to replace this with their deployed Web App URL
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwqkGF-dt4y9_lOxWQNE6TTE0HwQBLA1ZQfG3DKZ_nxAOrqx6tBCWLUGE0h-Qx_q3Nyrw/exec';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Basic Validation
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if (!data.name || !data.email || !data.phone) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }

        // UI Feedback - Loading
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        try {
            if (SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
                // Simulation mode if URL is not set
                await new Promise(resolve => setTimeout(resolve, 1500));
                console.log('Mock submission:', data);
                showMessage('Thank you! We’ll be in touch soon. (Mock Submission)', 'success');
                form.reset();
            } else {
                // Real submission
                const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    // mode: 'no-cors' // Important for Google Apps Script simple triggers if not using strict CORS headers
                    // However, our GAS code handles OPTIONS, so we might try normal CORS first.
                    // Often 'no-cors' is safest for simple forms to GAS.
                });

                // With 'no-cors', we can't read the response status/body.
                // We assume success if no network error occurred.
                // If we want to read response, we need the GAS to return proper CORS headers (which we added).

                const result = await response.json();

                if (result.result === 'success') {
                    showMessage('Thank you! We’ll be in touch soon.', 'success');
                    form.reset();
                } else {
                    throw new Error(result.error || 'Submission failed');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Something went wrong. Please try again later.', 'error');
        } finally {
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        }
    });

    function showMessage(text, type) {
        formMessage.innerText = text;
        formMessage.className = `form-message ${type}`;

        // Clear success message after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formMessage.innerText = '';
                formMessage.className = 'form-message';
            }, 5000);
        }
    }
});
