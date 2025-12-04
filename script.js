document.addEventListener('DOMContentLoaded', () => {

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Adjust scroll position to account for fixed header
                // Note: Header offset calculation (100) is based on your CSS which accounts for 40px scrolling bar + ~60px header
                const headerOffset = 100; 
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission
    // UPDATED: Now only tracks 'leadFormHero'
    const forms = [
        { id: 'leadFormHero', messageId: 'formMessageHero' } 
        // Removed: { id: 'leadForm', messageId: 'formMessage' }
    ];

    // PLACEHOLDER: User needs to replace this with their deployed Web App URL
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwqkGF-dt4y9_lOxWQNE6TTE0HwQBLA1ZQfG3DKZ_nxAOrqx6tBCWLUGE0h-Qx_q3Nyrw/exec';

    forms.forEach(formInfo => {
        const form = document.getElementById(formInfo.id);
        const formMessage = document.getElementById(formInfo.messageId);

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                // Basic Validation
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());

                if (!data.name || !data.email || !data.phone) {
                    showMessage('Please fill in all required fields.', 'error', formMessage);
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
                        console.log(`Mock submission from ${formInfo.id}:`, data);
                        showMessage('Thank you! We’ll be in touch soon. (Mock Submission)', 'success', formMessage);
                        form.reset();
                    } else {
                        // Real submission
                        const response = await fetch(SCRIPT_URL, {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });

                        const result = await response.json();

                        if (result.result === 'success') {
                            showMessage('Thank you! We’ll be in touch soon.', 'success', formMessage);
                            form.reset();
                        } else {
                            throw new Error(result.error || 'Submission failed');
                        }
                    }
                } catch (error) {
                    console.error('Error:', error);
                    showMessage('Something went wrong. Please try again later.', 'error', formMessage);
                } finally {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                }
            });
        }
    });

    function showMessage(text, type, element) {
        element.innerText = text;
        element.className = `form-message ${type}`;

        // Clear success message after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                element.innerText = '';
                element.className = 'form-message';
            }, 5000);
        }
    }
});document.addEventListener('DOMContentLoaded', () => {

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Adjust scroll position to account for fixed header
                // Note: Header offset calculation (100) is based on your CSS which accounts for 40px scrolling bar + ~60px header
                const headerOffset = 100; 
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission
    // UPDATED: Now only tracks 'leadFormHero'
    const forms = [
        { id: 'leadFormHero', messageId: 'formMessageHero' } 
        // Removed: { id: 'leadForm', messageId: 'formMessage' }
    ];

    // PLACEHOLDER: User needs to replace this with their deployed Web App URL
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwqkGF-dt4y9_lOxWQNE6TTE0HwQBLA1ZQfG3DKZ_nxAOrqx6tBCWLUGE0h-Qx_q3Nyrw/exec';

    forms.forEach(formInfo => {
        const form = document.getElementById(formInfo.id);
        const formMessage = document.getElementById(formInfo.messageId);

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                // Basic Validation
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());

                if (!data.name || !data.email || !data.phone) {
                    showMessage('Please fill in all required fields.', 'error', formMessage);
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
                        console.log(`Mock submission from ${formInfo.id}:`, data);
                        showMessage('Thank you! We’ll be in touch soon. (Mock Submission)', 'success', formMessage);
                        form.reset();
                    } else {
                        // Real submission
                        const response = await fetch(SCRIPT_URL, {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });

                        const result = await response.json();

                        if (result.result === 'success') {
                            showMessage('Thank you! We’ll be in touch soon.', 'success', formMessage);
                            form.reset();
                        } else {
                            throw new Error(result.error || 'Submission failed');
                        }
                    }
                } catch (error) {
                    console.error('Error:', error);
                    showMessage('Something went wrong. Please try again later.', 'error', formMessage);
                } finally {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                }
            });
        }
    });

    function showMessage(text, type, element) {
        element.innerText = text;
        element.className = `form-message ${type}`;

        // Clear success message after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                element.innerText = '';
                element.className = 'form-message';
            }, 5000);
        }
    }
});
