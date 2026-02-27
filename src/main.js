import './style.css'

// ===== Mobile Menu Toggle =====
const mobileToggle = document.getElementById('mobile-toggle')
const mobileMenu = document.getElementById('mobile-menu')
const mobileClose = document.getElementById('mobile-close')
const mobileLinks = document.querySelectorAll('.mobile-link')

function openMenu() {
  mobileMenu.classList.add('open')
  document.body.style.overflow = 'hidden'
}

function closeMenu() {
  mobileMenu.classList.remove('open')
  document.body.style.overflow = ''
}

mobileToggle?.addEventListener('click', openMenu)
mobileClose?.addEventListener('click', closeMenu)
mobileLinks.forEach(link => link.addEventListener('click', closeMenu))

// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar')
let lastScroll = 0

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY

  // Add shadow on scroll
  if (currentScroll > 20) {
    navbar.classList.add('shadow-md')
  } else {
    navbar.classList.remove('shadow-md')
  }

  lastScroll = currentScroll
})

// ===== Intersection Observer for reveal animations =====
const revealElements = document.querySelectorAll('.reveal')

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger the animation slightly for each element
      setTimeout(() => {
        entry.target.classList.add('visible')
      }, index * 100)
      revealObserver.unobserve(entry.target)
    }
  })
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
})

revealElements.forEach(el => revealObserver.observe(el))

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))
    if (target) {
      const offset = 80 // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  })
})

// ===== Parallax-like subtle effect on hero image =====
const heroImage = document.querySelector('#hero img')
if (heroImage) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY
    if (scrolled < window.innerHeight) {
      heroImage.style.transform = `scale(${1 + scrolled * 0.0002}) translateY(${scrolled * 0.05}px)`
    }
  })
}

// ===== Event countdown (for the upcoming event) =====
function updateCountdown() {
  const eventDate = new Date('2026-03-01T12:00:00+05:30')
  const now = new Date()
  const diff = eventDate - now

  if (diff <= 0) return

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  // Find or create countdown element
  let countdown = document.getElementById('event-countdown')
  if (!countdown) {
    const upcomingSection = document.getElementById('upcoming')
    if (upcomingSection) {
      const badge = document.createElement('span')
      badge.id = 'event-countdown'
      badge.className = 'inline-flex items-center gap-1 bg-honey/20 text-honey px-3 py-1 rounded-full text-xs font-semibold'
      badge.textContent = `⏳ ${days} days away`
      const badgeContainer = upcomingSection.querySelector('.flex.items-center.gap-3')
      if (badgeContainer) {
        badgeContainer.insertBefore(badge, badgeContainer.firstChild)
      }
    }
  } else {
    countdown.textContent = `⏳ ${days} days away`
  }
}

updateCountdown()

// ===== Gallery items stagger animation =====
const galleryItems = document.querySelectorAll('.gallery-item')
const galleryObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0)'
      }, i * 120)
      galleryObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.1 })

galleryItems.forEach(item => {
  item.style.opacity = '0'
  item.style.transform = 'translateY(20px)'
  item.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
  galleryObserver.observe(item)
})
