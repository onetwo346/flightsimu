// Touch event handlers
let touchX = 0, touchY = 0;

function handleTouchStart(event) {
    touchX = event.touches[0].clientX;
    touchY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    const deltaX = event.touches[0].clientX - touchX;
    const deltaY = event.touches[0].clientY - touchY;

    // Rotate the plane based on touch movement
    plane.rotation.y += deltaX * 0.01;
    plane.rotation.x += deltaY * 0.01;

    touchX = event.touches[0].clientX;
    touchY = event.touches[0].clientY;
}

// Add event listeners
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);
