
document.addEventListener('DOMContentLoaded', function () {
  // Create a scene
  const scene = new THREE.Scene();
  // Create a camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 0.001; // Adjust the camera position as needed
  // Create a renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('scene-container').appendChild(renderer.domElement);
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;
  // Load skybox textures
  const textureLoader = new THREE.TextureLoader();
  const skyTexture = textureLoader.load('sky4.jpg'); // jpg image for the background, the skybox image
  // Create a sphere geometry
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32); // Adjust the sphere size and detail as needed
  // Create a material with the sky texture
  const sphereMaterial = new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.BackSide });
  // Create the sky sphere
  const skySphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(skySphere);
  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

//Rotate the sphere
  let rotationDirection = 1; // Initial rotation direction (1 for clockwise, -1 for counterclockwise)
  let changeDirectionIntervalX = 9000; // Interval to change direction (in milliseconds)
  let lastDirectionChange = performance.now();

  function hoveringanimation() {
    requestAnimationFrame(hoveringanimation);
    
    if (performance.now() - lastDirectionChange > changeDirectionIntervalX) {
      // Reverse the rotation direction
      rotationDirection *= -1;
      lastDirectionChange = performance.now();
    }
    
    let xOrY = Math.random();
    // Rotate the sky sphere based on the current rotation axis and direction
    if (xOrY < 0.7) {
      skySphere.rotation.x += 0.00009 * rotationDirection;
      }
      else {
          skySphere.rotation.y += 0.00009 * rotationDirection;
      }

      renderer.render(scene, camera);
  }

  hoveringanimation();
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    // Update animations, positions, or other logic here

    renderer.render(scene, camera);
  };
      
  animate();

  window.addEventListener("keydown", function (event) {  
      if (event.key !== undefined) {
        // Handle the event with KeyboardEvent.key
        if (event.key === "w") {
          camera.rotation.y += .05;
        } else if (event.key === "s") {
          camera.rotation.y -= .05;
        }
        console.log(controls.object.rotation);
      }
  });

  // Get references to HTML elements
  const aboutThisWebsite = document.getElementById('content');

  // Add an event listener to the button
  aboutThisWebsite.addEventListener('click', () => {
      // Change the content of the target element
      aboutThisWebsite.innerHTML = 'New content has been loaded!';
});
  // Arrow buttons
  // const cameraPos1 = camera.rotation(0, -60, 0);
  // const cameraPos2 = camera.rotation(0, -30, 0);
  // const cameraPos3 = camera.rotation(0, -20, 0);
  // const cameraPos4 = camera.rotation(0, 1.55, 0);

  // const rotateLeftButton = document.getElementById('rotate-left');
  // const rotateRightButton = document.getElementById('rotate-right');

  // rotateLeftButton.addEventListener('click', rotateCameraLeft);
  // rotateRightButton.addEventListener('click', rotateCameraRight);

  // const rotationAmount = 10; // Adjust the rotation as needed

  // function rotateCameraLeft() {
  //   camera.rotation.y += rotationAmount;
  //   animate();
  //   console.log(controls.object.rotation);
  // }

  // function rotateCameraRight() {
  //   camera.rotation.y -= rotationAmount;
  //   animate();
  //   console.log(controls.object.rotation);
  // }
});