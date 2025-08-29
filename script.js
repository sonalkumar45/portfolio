document.addEventListener('DOMContentLoaded', function() {

  // --- Initialize AOS (Animate on Scroll) ---
  AOS.init({
    duration: 1000, // animation duration in ms
    once: true,     // whether animation should happen only once
    offset: 100     // offset (in px) from the original trigger point
  });

  // --- Navbar Scroll Effect ---
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Mobile Menu Toggle ---
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
  // Close menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
  });

  // --- Typed.js for Hero Section ---
  const options = {
    strings: ['Aspiring Developer', 'Creative Thinker', 'Problem Solver', 'Data Science Enthusiast'],
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 1500,
    loop: true
  };
  const typed = new Typed('#typed-text', options);

  // --- Back to Top Button ---
  const backToTopButton = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  // --- Active Nav Link on Scroll ---
  const sections = document.querySelectorAll('section');
  const navLi = document.querySelectorAll('.nav-links li a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navLi.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href').substring(1) === current) {
        a.classList.add('active');
      }
    });
  });
  
  // --- EmailJS Contact Form ---
  const contactForm = document.getElementById('contact-form');
  const contactStatus = document.getElementById('contact-status');

  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const submitBtn = document.getElementById('contact-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // IMPORTANT: Replace with your EmailJS Service ID, Template ID, and Public Key
    const serviceID = 'YOUR_SERVICE_ID';
    const templateID = 'YOUR_TEMPLATE_ID';
    const publicKey = 'YOUR_PUBLIC_KEY';

    emailjs.init(publicKey);

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        contactStatus.textContent = 'Message sent successfully!';
        contactStatus.style.color = 'lightgreen';
        contactForm.reset();
        setTimeout(() => { contactStatus.textContent = ''; }, 5000);
      }, (err) => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        contactStatus.textContent = 'Failed to send message. Please try again.';
        contactStatus.style.color = 'red';
        console.log('EmailJS Error:', JSON.stringify(err));
      });
  });

});