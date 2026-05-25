// Update time in header
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('time').textContent = `${hours}:${minutes}`;
}

// Update time every minute
setInterval(updateTime, 60000);
updateTime();

// Add click handlers to icon containers
document.querySelectorAll('.icon-container').forEach(container => {
    container.addEventListener('click', function() {
        const page = this.dataset.page;
        handleNavigation(page);
    });

    // Add double-click animation
    container.addEventListener('dblclick', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
});

// Navigation handler (placeholder for future pages)
function handleNavigation(page) {
    console.log(`Navigating to ${page}`);
    // Future implementation: redirect to different pages or load content
}

// Add ripple effect on click
document.querySelectorAll('.icon-container').forEach(container => {
    container.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .icon-container {
        position: relative;
        overflow: visible;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Alt+Number to quickly access pages
    if (e.altKey) {
        const iconContainers = document.querySelectorAll('.icon-container');
        const key = parseInt(e.key);
        if (key > 0 && key <= iconContainers.length) {
            iconContainers[key - 1].click();
        }
    }
});

// Add subtle mouse tracking for background effect (optional)
document.addEventListener('mousemove', function(e) {
    const background = document.querySelector('.desktop-background');
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    // Optional: uncomment to add mouse tracking effect
    // background.style.backgroundPosition = `${x}% ${y}%`;
});
