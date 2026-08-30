/* =========================================================
   RAJU'S LIFE BD — EASY CONTENT SETTINGS
   =========================================================
   1) Put your logo in: logo.jpg
   2) Put your profile photo in: profile.jpg
   3) Put your travel photo in: travel.jpg
   4) Add/change videos, Shorts and photos below.
   5) Replace the # social links with your real links.
   ========================================================= */

const SITE = {
  social: {
    youtube: "https://youtube.com/@rajuslifebd?si=omO8AhqttJhqOEtn",     // Example: https://www.youtube.com/@rajuslifeBD
    facebook: "https://www.facebook.com/share/19VodfR8ep/?mibextid=wwXIfr",
    instagram: "#",
    tiktok: "https://www.tiktok.com/@rajus.life.bd?_r=1&_t=ZS-99J5ZMoQPWJ",
    twitter: "#"
  },

  videos: [
    { title: "My Latest Video", date: "LATEST", image: "video1.jpg", link: "https://youtube.com/@rajuslifebd?si=omO8AhqttJhqOEtn" },
    { title: "Funny Everyday Moments", date: "WATCH NOW", image: "video2.jpg", link: "https://youtube.com/@rajuslifebd?si=omO8AhqttJhqOEtn" },
    { title: "A New Story Begins", date: "WATCH NOW", image: "video3.jpg", link: "https://youtube.com/@rajuslifebd?si=omO8AhqttJhqOEtn" },
    { title: "Travel & Lifestyle", date: "WATCH NOW", image: "video4.jpg", link: "https://youtube.com/@rajuslifebd?si=omO8AhqttJhqOEtn" }
  ],

  shorts: [
    { title: "Funny Short #01", image: "shorts1.jpg", link: "https://youtube.com/@rajuslifebd?si=omO8AhqttJhqOEtn" },
    { title: "Funny Short #02", image: "shorts2.jpg", link: "https://youtube.com/@rajuslifebd?si=omO8AhqttJhqOEtn" },
    { title: "Daily Life #03", image: "shorts3.jpg", link: "https://youtube.com/@rajuslifebd?si=omO8AhqttJhqOEtn" },
    { title: "New Short #04", image: "shorts4.jpg", link: "https://youtube.com/@rajuslifebd?si=omO8AhqttJhqOEtn" }
  ],

  photos: [
    { image: "photo1.jpg", alt: "Raju Life BD photo 1" },
    { image: "photo2.jpg", alt: "Raju Life BD photo 2" },
    { image: "photo3.jpg", alt: "Raju Life BD photo 3" },
    { image: "photo4.jpg", alt: "Raju Life BD photo 4" }
  ]
};

function placeholderImage(label) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600">
    <rect width="100%" height="100%" fill="#111"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      fill="#555" font-family="Arial" font-size="28">${label}</text>
  </svg>`;
  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

function safeImage(img, label) {
  return img || placeholderImage(label);
}

function setupSocialLinks() {
  document.querySelectorAll("[data-social]").forEach(el => {
    const key = el.dataset.social;
    el.href = SITE.social[key] || "#";
    if (el.href.endsWith("#")) {
      el.addEventListener("click", e => {
        e.preventDefault();
        alert("Social link is not added yet. Open script.js and replace the # with your real link.");
      });
    }
  });
}

function renderVideos() {
  const grid = document.getElementById("videoGrid");
  grid.innerHTML = SITE.videos.slice(0, 4).map(v => `
    <a class="video-card" href="${v.link}" target="_blank">
      <div class="thumb">
        <img src="${safeImage(v.image, "VIDEO THUMBNAIL")}" alt="${v.title}"
          onerror="this.src=placeholderImage('VIDEO THUMBNAIL')">
        <div class="play">▶</div>
      </div>
      <div class="video-info">
        <h3>${v.title}</h3>
        <p>${v.date} →</p>
      </div>
    </a>
  `).join("");
}

function renderShorts() {
  const grid = document.getElementById("shortsGrid");
  grid.innerHTML = SITE.shorts.slice(0, 4).map(s => `
    <a class="short-card" href="${s.link}" target="_blank">
      <img src="${safeImage(s.image, "SHORT THUMBNAIL")}" alt="${s.title}"
        onerror="this.src=placeholderImage('SHORT THUMBNAIL')">
      <div class="short-play">▶</div>
      <div class="short-title">${s.title}</div>
    </a>
  `).join("");
}

function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  grid.innerHTML = SITE.photos.slice(0, 4).map(p => `
    <div class="gallery-item">
      <img src="${safeImage(p.image, "PHOTO")}" alt="${p.alt}"
        onerror="this.src=placeholderImage('PHOTO')">
    </div>
  `).join("");
}

function setupMenu() {
  const btn = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  btn.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
}

function revealOnScroll() {
  const items = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(item => observer.observe(item));
}

setupSocialLinks();
renderVideos();
renderShorts();
renderGallery();
setupMenu();
revealOnScroll();


/* Smooth anchor scrolling with a fixed-header offset */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function(e) {
    const id = this.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const headerOffset = 92;
    const y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  });
});
