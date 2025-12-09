document.addEventListener('DOMContentLoaded', () => {

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Adjust scroll position to account for fixed header
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

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
            }
        });
    });

    // WhatsApp Form Submission
    const forms = [
        { id: 'leadFormHero', messageId: 'formMessageHero' },
        { id: 'leadForm', messageId: 'formMessage' }
    ];

    forms.forEach(formInfo => {
        const form = document.getElementById(formInfo.id);
        const formMessage = document.getElementById(formInfo.messageId);

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());

                // Basic Validation
                if (!data.name || !data.email || !data.phone) {
                    showMessage('Please fill in all required fields.', 'error', formMessage);
                    return;
                }

                // Construct WhatsApp Message
                const phoneNumber = '353899777898'; // TaxBridge Phone
                const service = data.service ? data.service : 'Not Specified';
                const text = `*New Consultation Request*\n\n` +
                    `*Name:* ${data.name}\n` +
                    `*Email:* ${data.email}\n` +
                    `*Phone:* ${data.phone}\n` +
                    `*Service:* ${service}\n` +
                    `*Message:* ${data.message || 'N/A'}`;

                const encodedText = encodeURIComponent(text);
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

                // Open WhatsApp
                window.open(whatsappUrl, '_blank');

                // Show success message
                showMessage('Redirecting to WhatsApp...', 'success', formMessage);
                form.reset();
            });
        }
    });

    function showMessage(text, type, element) {
        if (!element) return;
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
