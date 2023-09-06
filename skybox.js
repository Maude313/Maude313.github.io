// Create a scene
const scene = new THREE.Scene();
// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 0.1; // Adjust the camera position as needed
// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
// Load skybox textures
const textureLoader = new THREE.TextureLoader();
const skyTexture = textureLoader.load('sky.jpg'); // Replace 'sky.jpg' with your sky texture's filename or URL
// Create a sphere geometry
const sphereGeometry = new THREE.SphereGeometry(5, 32, 32); // Adjust the sphere size and detail as needed
// Create a material with the sky texture
const sphereMaterial = new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.BackSide });
// Create the sky sphere
const skySphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(skySphere);
// Animation loop
    renderer.render(scene, camera);
    
// animate();
window.addEventListener("keydown", function (event) {  
    if (event.key !== undefined) {
      // Handle the event with KeyboardEvent.key
      if (event.key === "w") {
        camera.position.x += .05;
      } else if (event.key === "s") {
        camera.position.x -= .05;
      }
    }
});