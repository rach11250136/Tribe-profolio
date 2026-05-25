// Update time in taskbar
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        clockElement.textContent = `${hours}:${minutes}`;
    }
}

// Update clock every minute
setInterval(updateClock, 60000);
updateClock();

// Window dragging functionality
let activeWindow = null;
let offset = { x: 0, y: 0 };

function dragWindow(e, header) {
    activeWindow = header.closest('.y2k-window');
    if (!activeWindow) return;
    
    // Bring to front
    document.querySelectorAll('.y2k-window').forEach(w => w.style.zIndex = 8);
    activeWindow.style.zIndex = 50;
    
    const rect = activeWindow.getBoundingClientRect();
    offset.x = e.clientX - rect.left;
    offset.y = e.clientY - rect.top;
    
    document.addEventListener('mousemove', moveWindow);
    document.addEventListener('mouseup', stopDrag);
    e.preventDefault();
}

function moveWindow(e) {
    if (!activeWindow) return;
    activeWindow.style.left = (e.clientX - offset.x) + 'px';
    activeWindow.style.top = (e.clientY - offset.y) + 'px';
}

function stopDrag() {
    document.removeEventListener('mousemove', moveWindow);
    document.removeEventListener('mouseup', stopDrag);
    activeWindow = null;
}

// Add click handler to bring windows to front
document.querySelectorAll('.y2k-window').forEach(win => {
    win.addEventListener('click', function() {
        document.querySelectorAll('.y2k-window').forEach(w => w.style.zIndex = 8);
        this.style.zIndex = 50;
    });
});

// Sidebar navigation
document.querySelectorAll('.sidebar-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        const page = this.dataset.page;
        console.log(`Navigating to ${page}`);
        // Add your navigation logic here
    });
});

// Minimize/Maximize buttons
document.querySelectorAll('.win-btn').forEach((btn, index) => {
    btn.addEventListener('click', function(e) {
        const window = this.closest('.y2k-window');
        e.stopPropagation();
        
        if (index === 0) {
            // Minimize button
            window.style.opacity = '0.5';
            window.style.pointerEvents = 'none';
        } else if (index === 1) {
            // Maximize button
            window.style.width = '90%';
            window.style.height = '90%';
            window.style.left = '5%';
            window.style.top = '5%';
        } else if (index === 2) {
            // Close button
            window.style.display = 'none';
        }
    });
});

// Chat functionality
const chatInput = document.querySelector('.chat-input');
if (chatInput) {
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim()) {
            const chatMessages = document.querySelector('.chat-messages');
            const messageDiv = document.createElement('div');
            messageDiv.className = 'chat-message';
            messageDiv.innerHTML = `<span class="message-author">[You]</span> <span class="message-text">${this.value}</span>`;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            this.value = '';
        }
    });
}

// Y2K sticker animation enhancement
document.querySelectorAll('.sticker').forEach(sticker => {
    sticker.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'float 3s ease-in-out infinite';
        }, 100);
    });
});

// Taskbar start menu (placeholder)
document.querySelector('.taskbar-start').addEventListener('click', function() {
    alert('Start Menu - Coming Soon! 🌸');
});
