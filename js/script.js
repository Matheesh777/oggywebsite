// Shared interactive behavior for OGGY Ecommerce

const initSmoothScrolling = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#') && targetId.length > 1) {
        event.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
};

const initProductFilters = () => {
  const searchInput = document.getElementById('product-search');
  const filterButtons = document.querySelectorAll('[data-filter]');
  const productCards = document.querySelectorAll('#products-list article');
  if (!searchInput || filterButtons.length === 0 || productCards.length === 0) return;

  const filterProducts = () => {
    const query = searchInput.value.trim().toLowerCase();
    const activeButton = document.querySelector('[data-filter].active');
    const activeCategory = activeButton ? activeButton.dataset.filter : 'all';

    productCards.forEach((card) => {
      const category = card.dataset.category.toLowerCase();
      const title = card.querySelector('h5').textContent.toLowerCase();
      const description = card.querySelector('p').textContent.toLowerCase();
      const matchesCategory = activeCategory === 'all' || category === activeCategory;
      const matchesQuery = title.includes(query) || description.includes(query);
      card.style.display = matchesCategory && matchesQuery ? 'block' : 'none';
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      filterProducts();
    });
  });

  searchInput.addEventListener('input', filterProducts);
};

const initCartControls = () => {
  const cartItems = document.querySelectorAll('.cart-item');
  const totalElement = document.getElementById('cart-total');

  if (cartItems.length === 0 || !totalElement) return;

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      const price = Number(item.dataset.price || 0);
      const quantity = Number(item.querySelector('.quantity-input').value || 0);
      const subtotal = price * quantity;
      item.querySelector('.cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
      total += subtotal;
    });
    totalElement.textContent = `$${total.toFixed(2)}`;
  };

  cartItems.forEach((item) => {
    const decrement = item.querySelector('.decrement');
    const increment = item.querySelector('.increment');
    const quantityInput = item.querySelector('.quantity-input');

    const updateQuantity = (newQuantity) => {
      const quantity = Math.max(1, newQuantity);
      quantityInput.value = quantity;
      calculateTotal();
    };

    decrement?.addEventListener('click', () => {
      updateQuantity(Number(quantityInput.value) - 1);
    });

    increment?.addEventListener('click', () => {
      updateQuantity(Number(quantityInput.value) + 1);
    });
  });

  calculateTotal();
};

const initContactForm = () => {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thank you! Your message has been received. We will reply within 24 hours.');
    contactForm.reset();
  });
};

window.addEventListener('DOMContentLoaded', () => {
  initSmoothScrolling();
  initProductFilters();
  initCartControls();
  initContactForm();
});
