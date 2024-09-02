
function openLink(url) {
  window.open(url, '_blank');
}

document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.carousel-container');
    const items = Array.from(container.children);
    const itemWidth = items[0].offsetWidth + 74; // 74px is the combined left and right margins
    const itemCount = items.length;
    
    // clone items for infinite scroll effect
    for (let i = 0; i < itemCount; i++) {
        const clone = items[i].cloneNode(true);
        container.appendChild(clone);
    }
    
    // Here I set the width container to accommodate both original and cloned items
    container.style.width = `${itemWidth * itemCount * 2}px`;

    let scrollPosition = 0;
	let scrollSpeed = 0;
	const scrollSpeedMultiplier = 0.015; // This is what I use to control the speed of the animation


    function animateCarousel() {
		// calculate the scroll speed based on the vertical scroll position
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


document.addEventListener('DOMContentLoaded', () => {
   document.querySelectorAll('.carousel').forEach(carousel => {
        const images = carousel.getAttribute('data-images').split(', ');
		// This line pulls the data attribute from the carousels across each page so that their images can each be different
		
        let currentIndex = 0;
        const imageElement = carousel.querySelector('.carousel-placeholder');

        function updateImage(index) {
            if (index < 0) {
                index = images.length - 1;
            } else if (index >= images.length) {
                index = 0;
            }
            imageElement.src = images[index];
            currentIndex = index;
        }

        carousel.querySelector('.carousel-button.prev').addEventListener('click', () => {
            updateImage(currentIndex - 1);
        });

        carousel.querySelector('.carousel-button.next').addEventListener('click', () => {
            updateImage(currentIndex + 1);
        });

        updateImage(0);
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const backToTop = document.getElementById("back-to-top");
    const main = document.querySelector('main');

    // this will detect when the user scrolls and run a function after
    window.addEventListener("scroll", function() {
        if (window.scrollY > 500) {
            backToTop.style.display = "flex";
        } else {
            backToTop.style.display = "none";
        }
    });
});

function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

const btnBanner1 = document.querySelector('.btn-banner-1');
const btnBanner2 = document.querySelector('.btn-banner-2');
const btnArrow1 = document.querySelector('#btn-arrow-one');
const btnArrow2 = document.querySelector('#btn-arrow-two');
const btnHeader = document.querySelector('.btn-header');
const btnContainer = document.querySelector('.btn-container');
const gridContainer = document.querySelector('.grid-container');
const ov1 = document.querySelector('#ov-1');
const ov2 = document.querySelector('#ov-2');
const wc4 = document.querySelector('#main-4-wc');
const wc5 = document.querySelector('#main-5-wc');
const wc2 = document.querySelector('#main-2-wc');
const wc4_text = document.querySelector('#accordionText');

let isExpanded = false; // track whether or not the text is expanded or not

function changeGridLayout() {
  const mainContent = document.querySelector('.main-content');

  if (isExpanded) {
    // collapse text and site
    gridContainer.style.gridTemplateRows = '125px 775px 2500px 400px';
	
	btnHeader.textContent = "Read More?";
    mainContent.style.height = 'auto';
    btnContainer.style.bottom = '150px';
	btnArrow1.style.transform = 'rotate(0deg)';
	btnArrow2.style.transform = 'rotate(0deg)';
	ov1.style.display = "block";
	ov2.style.display = "block";
	wc4.style.height = "77.5vh";
	wc4_text.style.display = "none";
	wc2.style.display = "none";
	wc5.style.display = "none";
    isExpanded = false;
  } else {
    // expand text and site
    gridContainer.style.gridTemplateRows = '125px 775px 3800px 400px';
	
	btnHeader.textContent = "Read Less?";
    mainContent.style.height = '3200px';
    btnContainer.style.bottom = '-1150px';
	btnArrow1.style.transform = 'rotate(180deg)';
	btnArrow2.style.transform = 'rotate(180deg)';
	ov1.style.display = "none";
	ov2.style.display = "none";
	wc4.style.height = "105vh";
	wc4_text.style.display = "block";
	wc2.style.display = "block";
	wc5.style.display = "block";
    isExpanded = true;
  }
}


// event listeners for buttons
btnBanner1.addEventListener('click', changeGridLayout);
btnBanner2.addEventListener('click', changeGridLayout);
btnHeader.addEventListener('click', changeGridLayout);













