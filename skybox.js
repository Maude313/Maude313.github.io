
document.addEventListener('DOMContentLoaded', function () {
  // Create a scene
  const scene = new THREE.Scene();
  // Create a camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 0.001; // Adjust the camera position as needed
  // Create a renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  sceneContainer = document.getElementById('scene_container').appendChild(renderer.domElement);
  // sceneContainer.style.display = 'block'; // Show the content
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
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

  // Handle window resize
  window.addEventListener('resize', () => {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  // Update camera aspect ratio and renderer size
  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
  });

  //Rotate the sphere slightly continuously
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
  
  // Animation loop orbit controls
  function animate() {
    requestAnimationFrame(animate);
    // Update animations, positions, or other logic here
    // console.log(controls.object.rotation);
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
      }
  });

  const contentContainer = document.getElementById('changing_content');

  const startContent = `
    <h1 class="header-text">You must first fail to reach your ultimate goal</h1>
    <a id="toggle_full_screen" class="toggle_full_screen">Full screen on/off</a>
    <a class="link" id="link1">About this website</a>
    <a class="link" id="link2">Travel to Gallery</a>
  `;
  const galleryContent = `
    <h1 class="header-text">Gallery</h1>
    <a id="toggle_full_screen" class="toggle_full_screen">Full screen on/off</a>
    <a class="link" id="link1">About this website</a>
  `;
  const aboutContent = `
    <a id="toggle_full_screen" class="toggle_full_screen">Full screen on/off</a>
    <h2 id="aboutthiswebsite">This page is created by using an AI skybox tool by Blockade Labs,<br>
        Three.js, a 3D JavaScript library and my imagination.<br>The font is from fontlibrary.org.<br>
        You can look around by left clicking and dragging with the mouse.</h2>
    <a class="link" id="link3">Back to start</a>
    <a class="link" id="link2">Travel to Gallery</a>
  `;

  contentContainer.innerHTML = startContent;
  
  //Click events for buttons/links
  contentContainer.addEventListener('click', (event) => {
    // Check if the clicked element has a specific ID
    const targetId = event.target.id;

    switch (targetId) {
      case 'link1':
        contentContainer.innerHTML = aboutContent;
        break;
      case 'link2':
        contentContainer.innerHTML = galleryContent;
        break;
      case 'link3':
      contentContainer.innerHTML = startContent;
      break;
      default:
        contentContainer.innerHTML = `
        <p class="content">Something went wrong. Please try again.</p>
        `
        break;
    }
    // Get a reference to the full-screen button with its new ID (reference is lost after uploading new content)
    const fullScreenButtonNew = document.getElementById('toggle_full_screen');
    // Add or update the click event listener for the new full-screen button
    fullScreenButtonNew.addEventListener('click', toggleFullScreen);
  });

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      // If not in fullscreen mode, enter fullscreen
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    } else {
      // If in fullscreen mode, exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

  let fullscreenBtn = document.getElementById("toggle_full_screen");

  fullscreenBtn.addEventListener("click", function() {
    toggleFullScreen();
  });

  function warp() {
    //warp animation etc...
  }
});