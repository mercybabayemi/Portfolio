// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, serverTimestamp } from "firebase/database";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
console.log("Firebase initialized:", app);

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


    //Move slides
        const servicesContainer = document.querySelector('.servicesContainer');
        const arrowLeft = document.querySelector('.arrow_left');
        const arrowRight = document.querySelector('.arrow_right');
        const cards = document.querySelectorAll('.serviceCard');
        const cardWidth = cards[0].offsetWidth + 20;

        let currentPosition = 0;
        const maxPosition = (cards.length - 3) * cardWidth;

        arrowLeft.addEventListener('click', () => {
            currentPosition = Math.min(currentPosition + cardWidth, 0);
            servicesContainer.style.transform = `translateX(${currentPosition}px)`;
        });

        arrowRight.addEventListener('click', () => {
            currentPosition = Math.max(currentPosition - cardWidth, -maxPosition);
            servicesContainer.style.transform = `translateX(${currentPosition}px)`;
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            const newCardWidth = cards[0].offsetWidth + 20;
            currentPosition = currentPosition * (newCardWidth / cardWidth);
            servicesContainer.style.transform = `translateX(${currentPosition}px)`;
        });



    // Newsletter subscription form
    function saveEmailToFirebase(email) {
        const subscribersRef = ref(database, 'subscribers');
        push(subscribersRef, {
            email: email,
            timestamp: serverTimestamp()
        });
    }

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

            saveEmailToFirebase(email);

            console.log('Newsletter subscription:', email);
            alert('Thank you for subscribing!');
            emailInput.value = '';
        });

    }


    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

    function showFeedback(message, isError = false) {
        formFeedback.textContent = message;
        formFeedback.className = isError ? 'form-feedback error' : 'form-feedback success';
        formFeedback.style.display = 'block';

        setTimeout(() => {
            formFeedback.style.display = 'none';
        }, 5000);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('input[name="name"]').value.trim();
            const email = contactForm.querySelector('input[name="email"]').value.trim();
            const message = contactForm.querySelector('textarea[name="message"]').value.trim();

            if (!name || !email || !message) {
                showFeedback('Please fill in all fields', true);
                return;
            }

            if (!isValidEmail(email)) {
                showFeedback('Please enter a valid email address', true);
                return;
            }

            // Disable button during submission
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            fetch('https://formsubmit.co/ajax/mercyjanet013@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })
            })
                .then(response => response.json())
                .then(data => {
                    showFeedback('Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                })
                .catch(error => {
                    showFeedback('Failed to send message. Please try again later.', true);
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                });
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