document.addEventListener('DOMContentLoaded', function(){
    const heroSection =  document.querySelector('.hero');
    console.log(heroSection);
    if(heroSection){
        const heroHeading = heroSection.querySelector('h2');
        const heroParagraph = heroSection.querySelector('p');

        if (heroHeading) {
            heroHeading.style.opacity = '0';
            heroHeading.style.transform = 'translateY(20px)';
            heroHeading.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        }

        if (heroParagraph) {
            heroParagraph.style.opacity = '0';
            heroParagraph.style.transform = 'translateY(20px)';

            heroParagraph.style.transition = 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s';
        }

        setTimeout(() => {
            if (heroHeading) {
                heroHeading.style.opacity = '1';
                heroHeading.style.transform = 'translateY(0)';
            }

            if (heroParagraph) {
                heroParagraph.style.opacity = '1';
                heroParagraph.style.transform = 'translateY(0)';
            }
        }, 100);
    }


    // Navigation links
    const navLinks = document.querySelectorAll('.navBar nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });


    // Learn More button in hero section
    const learnMoreButton = document.querySelector('.heroText .learnMore');
    if (learnMoreButton) {
        learnMoreButton.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }


    // Subscribe button in header
    const headerSubscribeButton = document.querySelector('.subscribe button');
    if (headerSubscribeButton) {
        headerSubscribeButton.addEventListener('click', function(e) {
            e.preventDefault();
            const newsletterSection = document.querySelector('#subscribeToMyNewsletter');
            if (newsletterSection) {
                newsletterSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }


    // Newsletter subscription form
    const newsletterForm = document.querySelector('.newsletter-signup form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            console.log('Newsletter subscription:', email);
            alert('Thank you for subscribing!');
            emailInput.value = '';
        });

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('input[name="name"]').value.trim();
            const email = contactForm.querySelector('input[name="email"]').value.trim();
            const message = contactForm.querySelector('textarea[name="message"]').value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            console.log('Contact form submitted:', { name, email, message });
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    //footer
    const currentYearSpan = document.getElementById('current-year');
    if(currentYearSpan) {
        currentYearSpan.textContent = String(new Date().getFullYear());
    }

});


// class Slides {
//     constructor() {
//         this.slides = document.querySelectorAll('.serviceCard');
//         this.currentSlide = 0;
//         this.slideInterval = 5000;
//         this.autoplayInterval = null;
//
//         this.init();
//     }
//
//     init() {
//         this.slides[this.currentSlide].classList.add('active');
//         this.addEventListeners();
//         this.startAutoplay();
//     }
//
//     addEventListeners() {
//         document.querySelector('.arrow.left').addEventListener('click', () => {
//             this.moveSlide('prev');
//         });
//
//         document.querySelector('.arrow.right').addEventListener('click', () => {
//             this.moveSlide('next');
//         });
//     }
//
//     startAutoplay() {
//         this.autoplayInterval = setInterval(() => {
//             this.moveSlide('next');
//         }, this.slideInterval);
//     }
//
//     stopAutoplay() {
//         clearInterval(this.autoplayInterval);
//     }
//
//     moveSlide(direction) {
//         this.stopAutoplay();
//         this.slides[this.currentSlide].classList.remove('active');
//         if (direction === 'next') {
//             this.currentSlide = (this.currentSlide + 1) % this.slides.length;
//         } else if (direction === 'prev') {
//             this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
//         }
//         this.slides[this.currentSlide].classList.add('active');
//         this.startAutoplay();
//     }
// }
//
// const slides = new Slides();
//
// const contactForm = document.getElementById('contact-form');
//
// contactForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const name = contactForm.elements.name.value.trim();
//     const email = contactForm.elements.email.value.trim();
//     const message = contactForm.elements.message.value.trim();
//
//     if (name && email && message) {
//         fetch('/contact', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 name,
//                 email,
//                 message,
//             }),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log(data);
//                 contactForm.reset();
//                 alert('Message sent successfully!');
//             })
//             .catch((error) => {
//                 console.error(error);
//                 alert('Error sending message!');
//             });
//     } else {
//         alert('Please fill out all fields!');
//     }
// });
//
// const newsletterForm = document.querySelector('.newsletter-signup form');
//
// newsletterForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const email = newsletterForm.elements[0].value.trim();
//
//     if (email) {
//         fetch('/subscribe', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 email,
//             }),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log(data);
//                 newsletterForm.reset();
//                 alert('Subscribed successfully!');
//             })
//             .catch((error) => {
//                 console.error(error);
//                 alert('Error subscribing!');
//             });
//     } else {
//         alert('Please enter a valid email!');
//     }
// });
//
// document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         document.querySelector(this.getAttribute('href')).scrollIntoView({
//             behavior: 'smooth',
//         });
//     });
// });