/* ==========================================================================
   ELNET EVENTS AND TRAVEL - INTERACTIVE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initActiveNavLink();
  initTravelFilters();
  initPriceTierToggles();
  initAccordions();
  initContactForm();
  initSmoothScrolls();
  initBookingModal();
});

/**
 * Mobile Hamburguer Navigation Toggle
 */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
}

/**
 * Highlight current page in navigation
 */
function initActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (currentPath.endsWith(linkHref) || (currentPath === '/' && linkHref === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Travel Destination Category Filtering (travel.html)
 */
function initTravelFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const travelCards = document.querySelectorAll('.travel-card');
  const travelSections = document.querySelectorAll('.travel-section-wrapper');

  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const category = button.getAttribute('data-filter');

        // Toggle active button class
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        if (category === 'all') {
          // Show all section containers and all cards
          travelSections.forEach(section => section.style.display = 'block');
          travelCards.forEach(card => card.style.display = 'flex');
        } else {
          // Hide all sections, only show target category section
          travelSections.forEach(section => {
            const sectionCat = section.getAttribute('data-category');
            if (sectionCat === category) {
              section.style.display = 'block';
              // Show all cards in this section
              section.querySelectorAll('.travel-card').forEach(card => card.style.display = 'flex');
            } else {
              section.style.display = 'none';
            }
          });
        }
      });
    });
  }
}

/**
 * Price Tier Badge Interactive Toggles (travel.html)
 */
function initPriceTierToggles() {
  const badges = document.querySelectorAll('.price-badge');
  
  if (badges.length > 0) {
    badges.forEach(badge => {
      badge.addEventListener('click', () => {
        const parent = badge.closest('.price-tier-badges');
        if (parent) {
          parent.querySelectorAll('.price-badge').forEach(b => b.classList.remove('active-tier'));
        }
        badge.classList.add('active-tier');
        
        // Dynamic update mockup: Alert what price tier is selected
        const cardTitle = badge.closest('.travel-card').querySelector('h3').textContent;
        const tierName = badge.textContent.trim();
        
        // Find or create a sub-text in the card to show active details
        let inclusionText = badge.closest('.travel-card').querySelector('.travel-card-inclusions p');
        if (inclusionText) {
          if (tierName === 'Budget') {
            inclusionText.textContent = "Includes: Standard road transport, budget guest houses, breakfast, standard park entry guides.";
          } else if (tierName === 'Midrange') {
            inclusionText.textContent = "Includes: Scheduled flights/transport, 3-star lodging, full board meals, professional guides, full park entry fees.";
          } else if (tierName === 'Luxury') {
            inclusionText.textContent = "Includes: Private flights, premium 4x4 vehicles, 5-star eco-lodges/resorts, full gourmet board, private tribal guides, VIP service details.";
          }
        }
      });
    });
  }
}

/**
 * Accordion Expand/Collapse (addis-tours.html)
 */
function initAccordions() {
  const accordions = document.querySelectorAll('.accordion-header');

  if (accordions.length > 0) {
    accordions.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');

        // Close all items
        document.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('active'));

        // Toggle the clicked one
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }
}

/**
 * Contact and Proposal Form Handler with Validation
 */
function initContactForm() {
  const contactForm = document.getElementById('proposal-form');
  const formMsg = document.getElementById('form-message');

  if (contactForm && formMsg) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple validation
      const firstName = document.getElementById('first-name').value.trim();
      const lastName = document.getElementById('last-name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!firstName || !lastName || !email || !phone || !message) {
        formMsg.className = "form-message error";
        formMsg.textContent = "Please fill in all required fields.";
        return;
      }

      // Successful Mock Submission
      formMsg.className = "form-message success";
      formMsg.textContent = `Thank you, ${firstName}! Your proposal request has been successfully submitted. Our team will get back to you within 24 hours.`;
      
      // Reset Form
      contactForm.reset();
    });
  }
}

/**
 * Smooth scrolling to target elements or across pages to contact form
 */
function initSmoothScrolls() {
  // If we loaded contact.html with #contact-form hash, scroll smoothly to it
  if (window.location.hash === '#contact-form') {
    const target = document.getElementById('contact-form');
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }

  // Intercept all links targeting #contact-form and ensure proper behavior
  document.querySelectorAll('a[href*="#contact-form"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // If we are on the contact page already, perform standard smooth scroll
      if (window.location.pathname.includes('contact.html') || href.startsWith('#')) {
        e.preventDefault();
        const target = document.getElementById('contact-form');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      // If we are on another page, the standard anchor tag href="contact.html#contact-form" will execute
    });
  });
}


/**
 * Unified Interactive Booking Modal
 */
function initBookingModal() {
  const modal = document.getElementById('booking-modal');
  const modalForm = document.getElementById('modal-booking-form');
  const modalClose = document.getElementById('modal-close');
  const modalMessage = document.getElementById('modal-message');
  const serviceSelect = document.getElementById('modal-service-type');

  if (!modal) return;

  // Function to open modal and pre-fill details
  window.openBookingModal = function(subjectText, serviceType) {
    modal.classList.add('active');
    
    // Pre-fill subject select if it exists
    if (serviceSelect && serviceType) {
      serviceSelect.value = serviceType;
    }
    
    // Set placeholder or note in message
    const messageField = document.getElementById('modal-message-field');
    if (messageField && subjectText) {
      messageField.value = `I would like to request a proposal/booking for: ${subjectText}.`;
    }
  };

  // Close modal behavior
  const closeModal = () => {
    modal.classList.remove('active');
    if (modalForm) modalForm.reset();
    if (modalMessage) {
      modalMessage.style.display = 'none';
      modalMessage.className = 'modal-form-message';
    }
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Handle modal form submission
  if (modalForm && modalMessage) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('modal-name').value.trim();
      const email = document.getElementById('modal-email').value.trim();
      const phone = document.getElementById('modal-phone').value.trim();
      const message = document.getElementById('modal-message-field').value.trim();

      if (!name || !email || !phone || !message) {
        modalMessage.className = "modal-form-message error";
        modalMessage.textContent = "Please fill in all required fields.";
        return;
      }

      // Success mockup response
      modalMessage.className = "modal-form-message success";
      modalMessage.textContent = `Thank you, ${name}! Your inquiry has been sent successfully. Our team will get back to you within 24 hours.`;
      
      // Reset and close after a delay
      setTimeout(() => {
        closeModal();
      }, 2500);
    });
  }

  // Dynamically intercept booking clicks on travel and fleet pages
  document.querySelectorAll('a[href="contact.html#contact-form"], a[href*="contact.html#contact-form"]').forEach(btn => {
    // If the button is inside a travel card or fleet card, intercept it to open the modal
    const travelCard = btn.closest('.travel-card');
    const fleetCard = btn.closest('.fleet-card');

    if (travelCard) {
      const title = travelCard.querySelector('h3').textContent.trim();
      const duration = travelCard.querySelector('.travel-card-duration')?.textContent.trim() || '';
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.openBookingModal(`${title} (${duration})`, 'tours');
      });
    } else if (fleetCard) {
      const title = fleetCard.querySelector('h3').textContent.trim();
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.openBookingModal(`${title} Rental Fleet`, 'fleet');
      });
    }
  });
}
