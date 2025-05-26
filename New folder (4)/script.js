// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {

  // ===== Navigation: Highlight Active Link =====
  const navLinks = document.querySelectorAll('nav a');
  const currentPath = window.location.pathname.split("/").pop();

  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // ===== Events Page: Filter Events by Category =====
  const filterSelect = document.getElementById('eventFilter');
  const eventCards = document.querySelectorAll('.card-container .card');

  if (filterSelect && eventCards.length > 0) {
    filterSelect.addEventListener('change', () => {
      const selectedCategory = filterSelect.value;

      eventCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (selectedCategory === "all" || category === selectedCategory) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  // ===== Gallery Page: Lightbox Modal =====
  const galleryImages = document.querySelectorAll('.gallery-grid img');
  let lightboxModal = null;

  if (galleryImages.length > 0) {
    // Create lightbox modal element
    lightboxModal = document.createElement('div');
    lightboxModal.id = 'lightboxModal';
    lightboxModal.style.position = 'fixed';
    lightboxModal.style.top = 0;
    lightboxModal.style.left = 0;
    lightboxModal.style.width = '100vw';
    lightboxModal.style.height = '100vh';
    lightboxModal.style.backgroundColor = 'rgba(0,0,0,0.8)';
    lightboxModal.style.display = 'flex';
    lightboxModal.style.justifyContent = 'center';
    lightboxModal.style.alignItems = 'center';
    lightboxModal.style.cursor = 'pointer';
    lightboxModal.style.zIndex = 1000;
    lightboxModal.style.visibility = 'hidden';
    lightboxModal.style.opacity = 0;
    lightboxModal.style.transition = 'opacity 0.3s ease';

    // Image element inside modal
    const modalImg = document.createElement('img');
    modalImg.style.maxWidth = '90%';
    modalImg.style.maxHeight = '90%';
    modalImg.style.borderRadius = '8px';
    modalImg.style.boxShadow = '0 0 20px rgba(255,255,255,0.8)';

    lightboxModal.appendChild(modalImg);
    document.body.appendChild(lightboxModal);

    galleryImages.forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => {
        modalImg.src = img.src;
        lightboxModal.style.visibility = 'visible';
        lightboxModal.style.opacity = 1;
      });
    });

    lightboxModal.addEventListener('click', () => {
      lightboxModal.style.opacity = 0;
      setTimeout(() => {
        lightboxModal.style.visibility = 'hidden';
        modalImg.src = '';
      }, 300);
    });
  }

  // ===== Feedback Form: Basic Validation =====
  const feedbackForm = document.querySelector('form');

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      const name = feedbackForm.querySelector('#name');
      const email = feedbackForm.querySelector('#email');
      const message = feedbackForm.querySelector('#message');

      if (!name.value.trim()) {
        alert('Please enter your name.');
        name.focus();
        e.preventDefault();
        return;
      }

      if (!email.value.trim() || !validateEmail(email.value.trim())) {
        alert('Please enter a valid email address.');
        email.focus();
        e.preventDefault();
        return;
      }

      if (!message.value.trim()) {
        alert('Please share your experience.');
        message.focus();
        e.preventDefault();
        return;
      }

      // Optionally: You can add form submission logic here (e.g., AJAX)
      alert('Thank you for your feedback!');
      feedbackForm.reset();
      e.preventDefault(); // Remove this line if form is connected to a backend
    });
  }

  // Email validation helper
  function validateEmail(email) {
    // Simple regex for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }
});
