// Three.js Background Animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Particles
const geometry = new THREE.BufferGeometry();
const particlesCount = 700;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 15;
}

geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const material = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x00f2ff,
    transparent: true,
    opacity: 0.8
});

const particlesMesh = new THREE.Points(geometry, material);
scene.add(particlesMesh);

// Lines connecting particles
const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x7000ff,
    transparent: true,
    opacity: 0.15
});

// We will create lines dynamically in animation loop or use a wireframe sphere for easier effect
const sphereGeometry = new THREE.IcosahedronGeometry(10, 1);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x7000ff,
    wireframe: true,
    transparent: true,
    opacity: 0.05
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);


camera.position.z = 5;

// Mouse interaction
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = mouseY * 0.5;
    particlesMesh.rotation.y += mouseX * 0.5;

    sphere.rotation.y = elapsedTime * 0.05;
    sphere.rotation.x = elapsedTime * 0.02;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
