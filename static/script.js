document.addEventListener('DOMContentLoaded', () => {
    const fishButton = document.getElementById('fish-button');
    const noFishButton = document.getElementById('no-fish-button');
    const currentImageFilenameInput = document.getElementById('current-image-filename');
    const imageElement = document.getElementById('annotation-image'); // Get the image element

    async function sendAnnotation(filename, annotation) {
        if (!filename) {
            console.warn('No image filename found for annotation. Cannot send.');
            return;
        }
        try {
            const response = await fetch('/annotate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ filename, annotation }),
            });
            const data = await response.json();
            console.log('Annotation sent via swipe/button:', data);
            if (data.status === 'success') {
                window.location.reload();
            }
        } catch (error) {
            console.error('Error sending annotation:', error);
        }
    }

    // Button event listeners (modified to use the input's value directly)
    if (fishButton) {
        fishButton.addEventListener('click', () => {
            sendAnnotation(currentImageFilenameInput.value, 'fish');
        });
    }

    if (noFishButton) {
        noFishButton.addEventListener('click', () => {
            sendAnnotation(currentImageFilenameInput.value, 'no fish');
        });
    }

    // Hammer.js swipe integration
    if (imageElement) { // Check if the image element exists
        const hammertime = new Hammer(imageElement);
        
        // Enable horizontal swipe recognizer (Hammer.DIRECTION_HORIZONTAL is usually default for swipe)
        // For Hammer v2.x, DIRECTION_HORIZONTAL is (Hammer.DIRECTION_LEFT | Hammer.DIRECTION_RIGHT)
        // However, often the default swipe recognizer is already horizontal.
        // If issues arise, explicitly setting direction might be needed:
        // hammertime.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
        // or hammertime.get('swipe').set({ direction: Hammer.DIRECTION_LEFT | Hammer.DIRECTION_RIGHT });

        // Visual feedback for panning
        hammertime.on('panmove', (ev) => {
            if (imageElement.style.transition !== 'transform 0.1s ease-out') {
                 // Ensure transition is set, in case it was removed
                imageElement.style.transition = 'transform 0.1s ease-out';
            }
            const angle = ev.deltaX / 30; // Adjust divisor for sensitivity
            imageElement.style.transform = 'translateX(' + ev.deltaX + 'px) rotate(' + angle + 'deg)';
        });

        hammertime.on('panend pancancel', (ev) => {
            // Temporarily remove transition for immediate snap back, then re-add for future pans
            imageElement.style.transition = 'none'; 
            imageElement.style.transform = 'translateX(0px) rotate(0deg)';
            // Force reflow/repaint before re-adding transition
            void imageElement.offsetWidth; 
            imageElement.style.transition = 'transform 0.1s ease-out';
        });
        
        // Actual annotation on swipe
        hammertime.on('swipeleft', (ev) => {
            console.log('Swipe left detected, processing annotation.');
            // Visual snap back might be overridden by page reload, which is fine.
            imageElement.style.transform = 'translateX(-1000px) rotate(-30deg)'; // Exaggerate on swipe completion
            const filename = currentImageFilenameInput.value;
            sendAnnotation(filename, 'no fish');
        });

        hammertime.on('swiperight', (ev) => {
            console.log('Swipe right detected, processing annotation.');
            imageElement.style.transform = 'translateX(1000px) rotate(30deg)'; // Exaggerate on swipe completion
            const filename = currentImageFilenameInput.value;
            sendAnnotation(filename, 'fish');
        });
    } else {
        console.log("Annotation image element not found, swipe/pan gestures not initialized. (This is normal on 'all done' page)");
    }
});
