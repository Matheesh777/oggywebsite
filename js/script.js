const cars = [
  {
    name: "Ferrari SF90",
    manufacturer: "Ferrari",
    year: "2019",
    engine: "Plug-in Hybrid V8",
    image: "images/car1.jpg",
    description: "Ferrari's SF90 blends electric response with V8 power, creating a precise, futuristic supercar with racing DNA."
  },
  {
    name: "Lamborghini Aventador",
    manufacturer: "Lamborghini",
    year: "2011",
    engine: "Naturally Aspirated V12",
    image: "images/car2.jpg",
    description: "A dramatic Italian flagship known for scissor doors, thunderous V12 performance, and unmistakable road presence."
  },
  {
    name: "Bugatti Chiron",
    manufacturer: "Bugatti",
    year: "2016",
    engine: "Quad-Turbo W16",
    image: "images/car3.jpg",
    description: "The Chiron is an engineering landmark, combining extreme speed, luxury craftsmanship, and astonishing stability."
  },
  {
    name: "Porsche 911 Turbo",
    manufacturer: "Porsche",
    year: "1975",
    engine: "Twin-Turbo Flat-6",
    image: "images/car4.jpg",
    description: "A benchmark sports car that pairs everyday usability with relentless traction, precision, and timeless silhouette."
  },
  {
    name: "McLaren P1",
    manufacturer: "McLaren",
    year: "2013",
    engine: "Hybrid Twin-Turbo V8",
    image: "images/car5.jpg",
    description: "The P1 uses hybrid assistance and aerodynamic mastery to deliver a track-focused hypercar experience."
  },
  {
    name: "BMW M5",
    manufacturer: "BMW",
    year: "1985",
    engine: "Twin-Turbo V8",
    image: "images/car6.jpg",
    description: "A luxury sedan with serious performance credibility, the M5 turns executive comfort into a high-speed weapon."
  },
  {
    name: "Mercedes AMG GT",
    manufacturer: "Mercedes-AMG",
    year: "2014",
    engine: "Biturbo V8",
    image: "images/car7.jpg",
    description: "Long hood proportions, refined cabin quality, and AMG power make the GT a modern grand touring statement."
  },
  {
    name: "Audi R8",
    manufacturer: "Audi",
    year: "2006",
    engine: "Naturally Aspirated V10",
    image: "images/car8.jpg",
    description: "The R8 brings exotic performance together with quattro confidence and Audi's clean, technical design language."
  },
  {
    name: "Nissan GT-R",
    manufacturer: "Nissan",
    year: "2007",
    engine: "Twin-Turbo V6",
    image: "images/car9.jpg",
    description: "Nicknamed Godzilla, the GT-R built its reputation on huge grip, launch control, and supercar-rivaling speed."
  },
  {
    name: "Toyota Supra",
    manufacturer: "Toyota",
    year: "1978",
    engine: "Turbocharged Inline-6",
    image: "images/car10.jpg",
    description: "A Japanese performance icon celebrated for tuning culture, balanced handling, and the legendary inline-six formula."
  },
  {
    name: "Chevrolet Corvette",
    manufacturer: "Chevrolet",
    year: "1953",
    engine: "V8",
    image: "images/car11.jpg",
    description: "America's sports car evolved from classic roadster to mid-engine performance machine while keeping bold character."
  },
  {
    name: "Ford Mustang GT",
    manufacturer: "Ford",
    year: "1965",
    engine: "Naturally Aspirated V8",
    image: "images/car12.jpg",
    description: "The Mustang GT is a muscle car icon, combining accessible performance, heritage styling, and V8 soundtrack."
  },
  {
    name: "Dodge Challenger Hellcat",
    manufacturer: "Dodge",
    year: "2015",
    engine: "Supercharged V8",
    image: "images/car13.jpg",
    description: "A modern muscle car built around outrageous horsepower, retro attitude, and straight-line acceleration."
  },
  {
    name: "Aston Martin DB11",
    manufacturer: "Aston Martin",
    year: "2016",
    engine: "Twin-Turbo V12",
    image: "images/car14.jpg",
    description: "The DB11 is an elegant grand tourer with sculpted British design, refined luxury, and effortless performance."
  },
  {
    name: "Rolls-Royce Phantom",
    manufacturer: "Rolls-Royce",
    year: "1925",
    engine: "Twin-Turbo V12",
    image: "images/car15.jpg",
    description: "A symbol of ultimate luxury, the Phantom prioritizes silence, craftsmanship, and a commanding passenger experience."
  }
];

const carGrid = document.querySelector("#carGrid");
const emptyState = document.querySelector("#emptyState");
const searchInput = document.querySelector("#searchInput");

// Builds premium responsive Bootstrap cards from the encyclopedia data.
function createCarCard(car, index) {
  return `
    <article class="col-12 col-md-6 col-xl-4 reveal fade-up" style="transition-delay: ${Math.min(index * 40, 240)}ms">
      <div class="car-card">
        <div class="car-image">
          <img src="${car.image}" alt="${car.name}" loading="lazy">
        </div>
        <div class="car-body">
          <h3>${car.name}</h3>
          <div class="meta-grid">
            <div><span>Manufacturer</span><strong>${car.manufacturer}</strong></div>
            <div><span>Year</span><strong>${car.year}</strong></div>
            <div class="grid-column-full"><span>Engine Type</span><strong>${car.engine}</strong></div>
          </div>
          <p class="car-description">${car.description}</p>
          <button class="btn btn-outline-primary ripple learn-more" type="button" data-car-index="${cars.indexOf(car)}" aria-label="Learn more about ${car.name}">Learn More</button>
        </div>
      </div>
    </article>
  `;
}

function renderCars(list) {
  carGrid.innerHTML = list.map(createCarCard).join("");
  emptyState.classList.toggle("d-none", list.length > 0);
  observeReveals();
}

function filterCars() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = cars.filter((car) => car.name.toLowerCase().includes(query));
  renderCars(filtered);
}

// Reusable scroll reveal observer for initial markup and dynamically rendered cards.
function observeReveals() {
  document.querySelectorAll(".reveal:not(.observed)").forEach((element) => {
    element.classList.add("observed");
    revealObserver.observe(element);
  });
}

// Smooth counter animation for the statistics section.
function animateCounter(counter) {
  const target = Number(counter.dataset.target);
  const duration = 1500;
  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = Math.floor(eased * target).toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll(".counter").forEach((counter) => counterObserver.observe(counter));

document.addEventListener("click", (event) => {
  const button = event.target.closest(".ripple");

  if (!button) return;

  const rect = button.getBoundingClientRect();
  const ripple = document.createElement("span");
  ripple.className = "ripple-circle";
  ripple.style.left = `${event.clientX - rect.left}px`;
  ripple.style.top = `${event.clientY - rect.top}px`;
  button.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
});

// Populate and open the Bootstrap modal when a car card CTA is selected.
document.addEventListener("click", (event) => {
  const button = event.target.closest(".learn-more");

  if (!button) return;

  const car = cars[Number(button.dataset.carIndex)];
  const modalElement = document.querySelector("#carModal");
  document.querySelector("#carModalTitle").textContent = car.name;
  document.querySelector("#carModalImage").src = car.image;
  document.querySelector("#carModalImage").alt = car.name;
  document.querySelector("#carModalManufacturer").textContent = car.manufacturer;
  document.querySelector("#carModalYear").textContent = car.year;
  document.querySelector("#carModalEngine").textContent = car.engine;
  document.querySelector("#carModalDescription").textContent = car.description;
  bootstrap.Modal.getOrCreateInstance(modalElement).show();
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    const navbar = document.querySelector(".navbar-collapse.show");
    if (navbar) {
      bootstrap.Collapse.getOrCreateInstance(navbar).hide();
    }
  });
});

// Frontend validation with clear feedback and no page refresh.
document.querySelector("#contactForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const name = form.querySelector("#name").value.trim();
  const email = form.querySelector("#email").value.trim();
  const message = form.querySelector("#message").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const status = document.querySelector("#formStatus");

  form.classList.add("was-validated");
  status.className = "form-status";

  if (!name || !emailPattern.test(email) || message.length < 10) {
    status.textContent = "Please fix the highlighted fields.";
    status.classList.add("error");
    return;
  }

  status.textContent = "Thank you. Your message has been validated successfully.";
  status.classList.add("success");
  form.reset();
  form.classList.remove("was-validated");
});

document.querySelector("#backToTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("header[id], section[id]");
  const links = document.querySelectorAll(".navbar .nav-link");
  let activeId = "home";

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) {
      activeId = section.id;
    }
  });

  links.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
  });
});

searchInput.addEventListener("input", filterCars);
document.querySelector("#year").textContent = new Date().getFullYear();
renderCars(cars);
observeReveals();
