document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // Scroll To Top Button
  // =========================
  let lastScroll = 0;

  window.addEventListener("scroll", function () {
    const current = window.scrollY;
    const scrollBtn = document.querySelector(".scrolltotop");

    // Show when scrolling UP & passed 500px
    if (current < lastScroll && current > 500) {
      if (scrollBtn) scrollBtn.style.display = "block";
    } 
    // Hide when scrolling DOWN or above threshold
    else {
      if (scrollBtn) scrollBtn.style.display = "none";
    }

    lastScroll = current;
  });

  // Scroll to top on click
  const scrollBtn = document.querySelector(".scrolltotop");
  if (scrollBtn) {
    scrollBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }


  // =========================
  // Header Sticky + Show/Hide
  // =========================
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    let scrollTop = window.scrollY;
    const header = document.querySelector(".header-nav");

    if (!header) return;

    // Sticky toggle
    if (scrollTop > 0) {
      header.classList.add("menu-sticky");
    } else {
      header.classList.remove("menu-sticky");
    }

    // Hide on scroll down, show on scroll up
    if (scrollTop > lastScrollTop && scrollTop > 20) {
      // scrolling DOWN
      header.classList.add("header-hide");
      header.classList.remove("header-show");
    } else {
      // scrolling UP
      header.classList.add("header-show");
      header.classList.remove("header-hide");
    }

    lastScrollTop = scrollTop;
  });



// language dropdown toggler 

const btn = document.getElementById("langBtn");
const menu = document.getElementById("langMenu");
const items = document.querySelectorAll(".lang-item");
const selected = document.getElementById("selectedLang");

// Toggle dropdown
btn.addEventListener("click", () => {
  menu.classList.toggle("opacity-0");
  menu.classList.toggle("invisible");
});

// Handle item click
items.forEach(item => {
  item.addEventListener("click", () => {

    // Remove active from all
    items.forEach(i => i.classList.remove("bg-primary/14"));

    // Add active to clicked
    item.classList.add("bg-primary/14");

    // Update button label
    selected.textContent = item.dataset.lang;

    // Close dropdown
    menu.classList.add("opacity-0", "invisible");
  });
});

// Close when clicking outside
document.addEventListener("click", (e) => {
  if (!btn.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.add("opacity-0", "invisible");
  }
});
// language dropdown toggler 


function cloneRow(trackEl) {
  const kids = Array.from(trackEl.children);
  kids.forEach(c => trackEl.appendChild(c.cloneNode(true)));
}
cloneRow(document.getElementById('row1'));
cloneRow(document.getElementById('row2'));

function makeDraggable(track) {
  let isDragging = false, startX = 0, scrollLeft = 0, velX = 0, lastX = 0, animId = null;
  let animOffset = 0;
  const isLeft = track.classList.contains('track-left');

  function getComputedOffset() {
    const matrix = new DOMMatrix(getComputedStyle(track).transform);
    return matrix.m41;
  }

  track.addEventListener('mousedown', e => {
    isDragging = true;
    track.classList.add('dragging');
    animOffset = getComputedOffset();
    track.style.transform = `translateX(${animOffset}px)`;
    track.style.animationPlayState = 'paused';
    startX = e.clientX;
    scrollLeft = animOffset;
    velX = 0; lastX = e.clientX;
    if (animId) cancelAnimationFrame(animId);
  });

  track.addEventListener('touchstart', e => {
    isDragging = true;
    track.classList.add('dragging');
    animOffset = getComputedOffset();
    track.style.transform = `translateX(${animOffset}px)`;
    track.style.animationPlayState = 'paused';
    startX = e.touches[0].clientX;
    scrollLeft = animOffset;
    velX = 0; lastX = e.touches[0].clientX;
    if (animId) cancelAnimationFrame(animId);
  }, {passive:true});

  function onMove(clientX) {
    if (!isDragging) return;
    velX = clientX - lastX;
    lastX = clientX;
    const dx = clientX - startX;
    let newX = scrollLeft + dx;
    const half = track.scrollWidth / 2;
    if (newX > 0) newX -= half;
    if (newX < -half) newX += half;
    track.style.transform = `translateX(${newX}px)`;
  }

  track.addEventListener('mousemove', e => onMove(e.clientX));
  track.addEventListener('touchmove', e => onMove(e.touches[0].clientX), {passive:true});

  function onEnd() {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('dragging');
    let currentX = parseFloat(track.style.transform.replace('translateX(','').replace('px)','')) || 0;
    const half = track.scrollWidth / 2;
    const speed = isLeft ? -0.4 : 0.4;

    function momentum() {
      velX *= 0.94;
      currentX += velX + speed;
      if (currentX > 0) currentX -= half;
      if (currentX < -half) currentX += half;
      track.style.transform = `translateX(${currentX}px)`;
      if (Math.abs(velX) > 0.15) {
        animId = requestAnimationFrame(momentum);
      } else {
        track.style.transform = '';
        track.style.animationPlayState = '';
        track.classList.remove('paused');
      }
    }
    animId = requestAnimationFrame(momentum);
  }

  document.addEventListener('mouseup', onEnd);
  document.addEventListener('touchend', onEnd);
}

makeDraggable(document.getElementById('row1'));
makeDraggable(document.getElementById('row2'));











});






