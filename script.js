// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Add a spaceship (using a simple cube for now)
const geometry = new THREE.BoxGeometry(1, 0.5, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const spaceship = new THREE.Mesh(geometry, material);
scene.add(spaceship);

// Position the camera behind the spaceship
camera.position.set(0, 2, 5);
camera.lookAt(spaceship.position);

// Add a skybox (space background)
const skyboxGeometry = new THREE.SphereGeometry(500, 32, 32);
const skyboxMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('https://i.imgur.com/xyz.jpg'), // Replace with a space texture
    side: THREE.BackSide
});
const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
scene.add(skybox);

// Add lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 10, 10);
scene.add(light);

// Keyboard controls
const keys = {};
document.addEventListener('keydown', (event) => keys[event.code] = true);
document.addEventListener('keyup', (event) => keys[event.code] = false);

// Movement variables
const speed = 0.1;
const rotationSpeed = 0.05;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Move spaceship based on keyboard input
    if (keys['ArrowUp']) spaceship.position.z -= speed;
    if (keys['ArrowDown']) spaceship.position.z += speed;
    if (keys['ArrowLeft']) spaceship.rotation.y += rotationSpeed;
    if (keys['ArrowRight']) spaceship.rotation.y -= rotationSpeed;

    // Update camera position to follow the spaceship
    camera.position.copy(spaceship.position).add(new THREE.Vector3(0, 2, 5));
    camera.lookAt(spaceship.position);

    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
