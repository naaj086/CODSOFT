// Add event listeners for hover effect on the body
// When the mouse enters the body, a hover effect is added to the background
document.body.addEventListener('mouseenter', () => {
    document.body.classList.add('hover-effect'); // Add hover-effect class to change background
  });
  
  // When the mouse leaves the body, the hover effect is removed
  document.body.addEventListener('mouseleave', () => {
    document.body.classList.remove('hover-effect'); // Remove hover-effect class
  });
  
  // Add event listeners for the Hero section specifically
  // When the mouse enters the hero section, a hover effect is added
  const heroSection = document.querySelector('.hero');
  heroSection.addEventListener('mouseenter', () => {
    heroSection.classList.add('hover-effect'); // Add hover-effect to the hero section
  });
  
  // When the mouse leaves the hero section, the hover effect is removed
  heroSection.addEventListener('mouseleave', () => {
    heroSection.classList.remove('hover-effect'); // Remove hover-effect from the hero section
  });
  
  // Smooth scrolling for navigation links
  // This adds smooth scrolling behavior when clicking on navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default anchor click behavior
      document.querySelector(this.getAttribute('href')).scrollIntoView({
 behavior: 'smooth' // Scroll smoothly to the target section
      });
    });
  });
  
  // Reveal animation for project cards
  // Intersection Observer is used to reveal project cards when they come into view
  const observerOptions = {
    threshold: 0.1 // Trigger when 10% of the element is visible
  };
  
  // Create an observer instance to monitor visibility of elements
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { // If the element is visible
 entry.target.style.opacity = 1; // Make the card fully visible
 entry.target.style.transform = 'translateY(0)'; // Move the card to its original position
      }
    });
  }, observerOptions);
  
  // Select all project cards and set their initial styles
  document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = 0; // Initially make the card invisible
    card.style.transform = 'translateY(20px)'; // Move it slightly downward
    card.style.transition = 'all 0.6s ease-out'; // Add a smooth transition effect
    observer.observe(card); // Start observing the card for visibility
  });
  
  // Animate hero section characters
  // This function animates the text by splitting it into individual characters
  function animateText(elementId, text) {
    const container = document.getElementById(elementId); // Get the container for the text
    container.innerHTML = ''; // Clear the existing content
    text.split('').forEach((char, index) => { // Split the text into characters
      const span = document.createElement('span'); // Create a span for each character
      span.textContent = char; // Set the character as the span's content
      span.style.animationDelay = `${index * 0.1}s`; // Delay each character's animation
      container.appendChild(span); // Add the span to the container
    });
  }
  
  // Define the hero titles and their corresponding texts
  const titles = [
    { id: 'hero-title-1', text: "HeLLo," }, // First title
    { id: 'hero-title-2', text: "I'm Nawaj" }, // Second title
    { id: 'hero-title-3', text: "Building Digital Experiences" } // Third title
  ];
  
  // Start the hero animation
  function startHeroAnimation() {
    titles.forEach(({ id, text }) => animateText(id, text)); // Animate each title
  }
  
  // Initial animation when the page loads
  startHeroAnimation();
  
  // Repeat the animation every 5 seconds
  setInterval(() => {
    startHeroAnimation();
  }, 5000);
  