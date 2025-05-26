class Slides {
    constructor() {
        this.slides = document.querySelectorAll('.serviceCard');
        this.currentSlide = 0;
        this.slideInterval = 5000;
        this.autoplayInterval = null;

        this.init();
    }

    init() {
        this.slides[this.currentSlide].classList.add('active');
        this.addEventListeners();
        this.startAutoplay();
    }

    addEventListeners() {
        document.querySelector('.arrow.left').addEventListener('click', () => {
            this.moveSlide('prev');
        });

        document.querySelector('.arrow.right').addEventListener('click', () => {
            this.moveSlide('next');
        });
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.moveSlide('next');
        }, this.slideInterval);
    }

    stopAutoplay() {
        clearInterval(this.autoplayInterval);
    }

    moveSlide(direction) {
        this.stopAutoplay();
        this.slides[this.currentSlide].classList.remove('active');
        if (direction === 'next') {
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        } else if (direction === 'prev') {
            this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        }
        this.slides[this.currentSlide].classList.add('active');
        this.startAutoplay();
    }
}

const slides = new Slides();

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.elements.name.value.trim();
    const email = contactForm.elements.email.value.trim();
    const message = contactForm.elements.message.value.trim();

    if (name && email && message) {
        fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                message,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                contactForm.reset();
                alert('Message sent successfully!');
            })
            .catch((error) => {
                console.error(error);
                alert('Error sending message!');
            });
    } else {
        alert('Please fill out all fields!');
    }
});

const newsletterForm = document.querySelector('.newsletter-signup form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.elements[0].value.trim();

    if (email) {
        fetch('/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                newsletterForm.reset();
                alert('Subscribed successfully!');
            })
            .catch((error) => {
                console.error(error);
                alert('Error subscribing!');
            });
    } else {
        alert('Please enter a valid email!');
    }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
        });
    });
});