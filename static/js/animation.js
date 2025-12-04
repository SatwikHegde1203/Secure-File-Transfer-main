// 3D Progress Animation
function startProcessingAnimation(form) {
    const overlay = document.getElementById('processing-overlay');
    const progressText = document.getElementById('progress-text');
    const animationCanvas = document.getElementById('animation-canvas');

    overlay.style.display = 'flex';

    // Three.js setup for the circular progress
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(300, 300);
    animationCanvas.innerHTML = '';
    animationCanvas.appendChild(renderer.domElement);

    // Create a torus (ring)
    const geometry = new THREE.TorusGeometry(10, 1, 16, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0x00f2ff, wireframe: true });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    camera.position.z = 20;

    let percentage = 0;
    const interval = setInterval(() => {
        percentage += 1;
        progressText.innerText = percentage + '%';

        torus.rotation.x += 0.1;
        torus.rotation.y += 0.1;

        renderer.render(scene, camera);

        if (percentage >= 100) {
            clearInterval(interval);
            form.submit(); // Submit the form after animation
        }
    }, 30); // 3 seconds total approx
}

// Attach listener to all forms with class 'process-form'
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.process-form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            startProcessingAnimation(form);
        });
    });
});
