document.addEventListener('DOMContentLoaded', () => {
    const fishButton = document.getElementById('fish-button');
    const noFishButton = document.getElementById('no-fish-button');
    const currentImageFilenameInput = document.getElementById('current-image-filename');

    async function sendAnnotation(filename, annotation) {
        try {
            const response = await fetch('/annotate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ filename, annotation }),
            });
            const data = await response.json();
            console.log('Annotation sent:', data);
            // Here you would typically load the next image or show a message
            // For now, we just log to console.
            if (data.status === 'success') {
                // Reload the page to get the next image (or "No more images" message)
                // This is a simple way to advance; more sophisticated methods exist.
                window.location.reload();
            }
        } catch (error) {
            console.error('Error sending annotation:', error);
        }
    }

    if (fishButton) {
        fishButton.addEventListener('click', () => {
            const filename = currentImageFilenameInput.value;
            if (filename) {
                sendAnnotation(filename, 'fish');
            } else {
                console.warn('No image filename found for annotation.');
            }
        });
    }

    if (noFishButton) {
        noFishButton.addEventListener('click', () => {
            const filename = currentImageFilenameInput.value;
            if (filename) {
                sendAnnotation(filename, 'no fish');
            } else {
                console.warn('No image filename found for annotation.');
            }
        });
    }
});
