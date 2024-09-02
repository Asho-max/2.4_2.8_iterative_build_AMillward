
function openLink(url) {
  window.open(url, '_blank');
}

document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.carousel-container');
    const items = Array.from(container.children);
    const itemWidth = items[0].offsetWidth + 74; // 74px is the combined left and right margins
    const itemCount = items.length;
    
    // Clone items for infinite scroll effect
    for (let i = 0; i < itemCount; i++) {
        const clone = items[i].cloneNode(true);
        container.appendChild(clone);
    }
    
    // Set the width of the container to accommodate both original and cloned items
    container.style.width = `${itemWidth * itemCount * 2}px`;

    let scrollPosition = 0;
	let scrollSpeed = 0;
	const scrollSpeedMultiplier = 0.015; // Adjust this for more control over the speed


    function animateCarousel() {
		// Calculate the scroll speed based on the vertical scroll position
		const scrollY = window.scrollY;
		const scrollSpeed = Math.abs((scrollY - 700) * scrollSpeedMultiplier) + 0.5;

		scrollPosition += scrollSpeed;

		// Loop the carousel by resetting the position
		if (scrollPosition >= itemWidth * itemCount) {
			scrollPosition = 0;
		}

		// Update the position of the carousel
		container.style.transform = `translateX(-${scrollPosition}px)`;

		// Request the next animation frame
		animationFrameId = requestAnimationFrame(animateCarousel);
	}

    animateCarousel();
	let mouse = "up";
	let control = 0;
	
	// This code detects if the mouse if held down on the carousel, and pauses the animation if it is
	container.addEventListener('mousedown', function() {
		mouse = "down";
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    });

    container.addEventListener('mouseup', function() {
		control = 0;
		mouse = "up";
        animateCarousel();
    });
	
	container.addEventListener('mouseleave', function() {
		if (mouse == "down" && control == 0) {
			control = 1;
			animateCarousel();
		}
	});

    // This does the same as before but specifically for mobile devices with touch screens
    container.addEventListener('touchstart', function() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    });

    container.addEventListener('touchend', function() {
        if (!animationFrameId) {
            animateCarousel();
        }
    });
});










