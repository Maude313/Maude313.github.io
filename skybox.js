import * as THREE from 'three';
import CameraControls from 'camera-controls';

// import MouseMeshInteraction from './three_mmi.js'

document.addEventListener('DOMContentLoaded', function () {
  
  CameraControls.install( { THREE: THREE } );
  
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 2000);
  camera.position.z = 0.001; // Adjust the camera position as needed
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const pixelRatio = window.devicePixelRatio || 1; // Use 1 as the default for standard displays
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);
  const cameraControls = new CameraControls(camera, renderer.domElement);
  const scene = new THREE.Scene();    // Create a scene
  const clock = new THREE.Clock();
  document.getElementById('scene_container').appendChild(renderer.domElement);
  cameraControls.enableZoom = false;
  const textureLoader = new THREE.TextureLoader();    // Load skybox textures
  let skyTexture = textureLoader.load('images/sky4.1.jpg'); // jpg image for the background, the skybox image
  // Create a sphere geometry
  const sphereGeometry = new THREE.SphereGeometry(2, 32, 32); // Adjust the sphere size and detail as needed
  const sphereMaterial = new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.BackSide });    // Create a material with the sky texture
  const skySphere = new THREE.Mesh(sphereGeometry, sphereMaterial);   // Create the sky sphere
  scene.add(skySphere);

  // Mouse interactions for three.js objects
  // const mmi = new MouseMeshInteraction(scene, camera);

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  const contentContainer = document.getElementById('changing-content');

  //Rotate the sphere slightly continuously
  let rotationDirection = 1; // Initial rotation direction (1 for clockwise, -1 for counterclockwise)
  let changeDirectionIntervalX = 9000; // Interval to change direction (in milliseconds)
  let lastDirectionChange = performance.now();

  let enableTransition = cameraControls.enableTransition = true;
  let warpEnded = true;
  let warpInProcess = false;;

  skyTexture.onload = function() {
    // Once the image is loaded, add the 'loaded' class to trigger the fade-in effect
    backgroundImage.classList.add('fade-in-content');
  };

  // Animation loop for camera controls and hovering effect
  function animateCamera() {
    
    // update the time
    const delta = clock.getDelta();
    const hasControlsUpdated = cameraControls.update(delta);
    
    requestAnimationFrame(animateCamera);

    if (hasControlsUpdated) {
      renderer.render(scene, camera);
    } else {    //Rotate the background sphere back and forth to create a "space craft hovering in the air" effect

      if (warpEnded) {

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
    }
  };

  animateCamera();

  // Handle window resize
  window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
  
    // Update camera aspect ratio and renderer size
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });

  // Debug event listeners
  window.addEventListener("keydown", function (event) {
    if (event.key !== undefined) {
      switch (event.key) {
        case "p":
          console.log("position");
          console.log(camera.position);
          break;
        case "r":
          console.log("rotation");
          console.log(camera.rotation);
          break;
        case "w":
          console.log("WARP ENDED " + warpEnded);
          break;
      }
    }
  });
 
  // InnerHTML content to upload without loading new page
  const startContent = `
  <h1 class="header-text" id="header-text">You must first fail to reach your ultimate goal</h1>
  <a id="toggle_full_screen" class="toggle_full_screen">Full screen on/off</a>
  <h2 id="aboutthiswebsite"><br><br></h2>
  <div class="navbar">
    <a class="currentpage" id="link3">Back to start</a>
    <a class="link" id="link5">Audio Visualizer</a>
    <a class="link" id="link2">Gallery</a>
    <a class="link" id="link1">About this website</a>
    <a class="link" id="link4">About the author</a>
  </div>
  `;
  const galleryContent = `
  <div id='fade-in-content'>
  <h1 class="header-text" id="header-text">Gallery</h1>
  </div>
  <a id="toggle_full_screen" class="toggle_full_screen">Full screen on/off</a>
  <div class="navbar">
    <a class="link" id="link3">Back to start</a>
    <a class="link" id="link5">Audio Visualizer</a>
    <a class="currentpage" id="link2">Gallery</a>
    <a class="link" id="link1">About this website</a>
    <a class="link" id="link4">About the author</a>
  </div>
  `;
  const aboutContent = `
  <a id="toggle_full_screen" class="toggle_full_screen">Full screen on/off</a>
  <h2 id="aboutthiswebsite">This page is created by using an AI skybox tool by Blockade Labs,<br>
      Three.js, a 3D JavaScript library and my imagination.<br>The font is from <a target="_blank" href="https://fontlibrary.org/">fontlibrary.org</a>.<br>
      The warp drive effect is copied and edited from <a target="_blank" href="https://codepen.io/NiklasKnaack/pen/OmwgKb">codepen.io/NiklasKnaack/pen/OmwgKb</a>.<br>
      You can look around by left clicking and dragging with the mouse.
  </h2>
  <p id="viewport"></p>
  <div class="navbar">
    <a class="link" id="link3">Back to start</a>
    <a class="link" id="link5">Audio Visualizer</a>
    <a class="link" id="link2">Gallery</a>
    <a class="currentpage" id="link1">About this website</a>
    <a class="link" id="link4">About the author</a>
  </div>
  `;
  // const portfolioContent = `
  // <h1 class="header-text" id="header-text">Portfolio</h1>
  // <a id="toggle_full_screen" class="toggle_full_screen">Full screen on/off</a>
  // <h2 id="aboutthiswebsite">There will be content later</h2>
  // <div class="navbar">
  //   <a class="link" id="link3">Back to start</a>
  //   <a class="link" id="link5">Audio Visualizer</a>
  //   <a class="link" id="link2">Gallery</a>
  //   <a class="link" id="link1">About this website</a>
  //   <a class="currentpage" id="link4">Portfolio</a>
  // </div>
  // `;
  const portfolioContent = `
  <h1 class="header-text" id="header-text">About the author</h1>
  <a id="toggle_full_screen" class="toggle_full_screen">Full screen on/off</a>
  <div class="placeholder">
    <!-- blurred background image 1 for blurred edge -->
    <img src="images/PgConnectsHelsinki2.jpg" alt="Maude313blur" class="author-image-blur"></img>
    <!-- blurred background image 2 for blurred edge -->
    <img src="images/PgConnectsHelsinki2.jpg" alt="Maude313blur" class="author-image-blur2"></img>
    <!-- same image, no blur -->
    <img src="images/PgConnectsHelsinki2.jpg" alt="Maude313" class="author-image"></img>
  </div>
  <h2 id="aboutthiswebsite"><br>Hi! My name is Maura Ruopsa. This web page is my portfolio. I will make updates soon! As you will notice, it's a work in progress still. I graduated as a software developer in December 2023. In my studies I specialized in game programming and did an internship at PHZ Game Studios from March to May 2023 and again during the fall semester, working on our student team's mobile game demo project. I'm still involved with the project. I'm a volunteer at IGDA Porvoo hub - been for over a year now. Check out IGDA Finland's hubs and their cool events: <a target="_blank" href="https://www.igda.fi/hubs">https://www.igda.fi/hubs</a><br><br>Later on I will let you know more about what I've done so far. See you around!<br><br>Last update January 10th 2024
  </h2>
  <div class="navbar">
    <a class="link" id="link3">Back to start</a>
    <a class="link" id="link5">Audio Visualizer</a>
    <a class="link" id="link2">Gallery</a>
    <a class="link" id="link1">About this website</a>
    <a class="currentpage" id="link4">About the author</a>
  </div>
  `;
  const audioVisualizerContent = `
  <h1 class="header-text" id="header-text">Audio Visualizer</h1>
  <a id="toggle_full_screen" class="toggle_full_screen">Full screen on/off</a>
  <div class="audiovisualizer-content">
    <div class="audiovisualizer-text">
      <h2 id="audiovisualizer-text">This music is available for commercial and non-commercial purposes. <a target=”_blank” href="https://freepd.com">freepd.com/</a></h2><br>
      <h2 id="audiovisualizer-title">Wisdom in the Sun - Written by Kevin MacLeod<br></h2>
    </div>
    <div class="audioButtons">
      <a id="playAudio" class="link">Play Audio</a>
      <a id="stopAudio" class="link">Pause Audio</a>
    </div>
    <div class="visualizer-container"></div>
  </div>
  <div class="navbar">
    <a class="link" id="link3">Back to start</a>
    <a class="currentpage" id="link5">Audio Visualizer</a>
    <a class="link" id="link2">Gallery</a>
    <a class="link" id="link1">About this website</a>
    <a class="link" id="link4">About the author</a>
  </div>
  `;
  const curriculumVitaeContent = `
  
  `;
  const puzzleContent = `
  
  `;

  // Audio visuals: License MIT, Author Special Agent Squeaky (specialagentsqueaky.com).
  // Modified by myself to fit my purposes.

  let audioIsPlaying = false;
  let audioVisualsOn = false;
  let playButtonSelected = false;
  let shouldCreateVisuals = true;
  let shouldCreateAudio = true;
  let visualizerContainer;
  const numberOfBars = 50;
  
  
  let audioSource = null;
  let analyzer = null;

  function audioVisuals() {
    // Initialize the audio context and analyzer
    const audioCtx = new AudioContext();
    // Get the audio tag
    const audio = document.querySelector("audio");
    if (!audioSource) {
      audioSource = audioCtx.createMediaElementSource(audio);
      analyzer = audioCtx.createAnalyser();
      audioSource.connect(analyzer);
      audioSource.connect(audioCtx.destination);
    }

    const frequencyData = new Uint8Array(analyzer.frequencyBinCount);

    if (shouldCreateAudio) {
      
      analyzer.getByteFrequencyData(frequencyData);
      // Print the analyzed frequencies
      console.log("Frequency data ", frequencyData);
      audioIsPlaying = true;
      shouldCreateAudio = false;

    }

    // // Get the visualizer container
    visualizerContainer = document.querySelector(".visualizer-container");
    visualizerContainer.setAttribute('id', "visualizer-container-id");

    if (audioVisualsOn && shouldCreateVisuals) {
      // Create a set of pre-defined bars
      for (let i = 0; i < numberOfBars; i++) {

        const bar = document.createElement("div");
        bar.setAttribute("id", "bar" +i);
        bar.setAttribute("class", "visualizer-container__bar");
        visualizerContainer.appendChild(bar);

      }
      shouldCreateVisuals = false;
    }

    function renderFrame() {
      
      if (audioVisualsOn || audioIsPlaying) {
        
        // Update frequency data array with the latest data
        analyzer.getByteFrequencyData(frequencyData);

        for (let i = 0; i < numberOfBars; i++) {
          // The frequency data array is 1024 digits in length, so it needs to be downsampled to 50
          const index = (i + 10) * 2;
          // fd is a frequency value between 0 and 255
          const fd = frequencyData[index];
          // Fetch the bar DIV element
          const bar = document.querySelector("#bar" + i);

          if (!bar) {
            continue;
          }

          const barHeight = Math.max(4, fd || 0); // Minimum height 4
          bar.style.height = barHeight + "px";
          if (!audioIsPlaying) {
            audioCtx.resume().then(() => {
              audio.play();
              audioIsPlaying = true;
            });
          }
        }
        window.requestAnimationFrame(renderFrame);
      }

      if (!playButtonSelected) {
        console.log("Audiovisual animation paused");
        audio.pause();
        audioIsPlaying = false;
        audioVisualsOn = false;

        if (playButtonSelected) {

          renderFrame();

        }
      }   
    }

    audio.addEventListener('ended', () => {

      console.log("Audio has finished playing");
      audioIsPlaying = false;
      audioVisualsOn = false;
      shouldCreateVisuals = false;
      playButtonSelected = false;
      return

    });

    renderFrame();

    audio.volume = 0.50;
    if (playButtonSelected) {
      audio.play();
    }
  }
  
  contentContainer.innerHTML = startContent;
  let currentContent;

  //Click events for buttons/links
  contentContainer.addEventListener('click', (event) => {
    // Check if the clicked element has a specific ID
    const targetId = event.target.id;

    switch (targetId) {
      case 'link1':
        event.preventDefault();
        audioVisualsOn = false;
        contentContainer.innerHTML = aboutContent;
        break;
      case 'link2':
        if (currentContent !== galleryContent) {
          warpInProcess = true;
          handleWarp();
        }
        else if (contentContainer.innerHTML === aboutContent || contentContainer.innerHTML === portfolioContent || contentContainer.innerHTML === audioVisualizerContent) {
          contentContainer.innerHTML = galleryContent;
        }
        audioVisualsOn = false;
        contentContainer.innerHTML = galleryContent;
        currentContent = galleryContent;       
        break;
      case 'link3':
        if (currentContent === galleryContent) {
          // Reload the page
          location.reload();
        }
        else {
          cameraControls.setLookAt( 0, 0, camera.position.z, 0, 0, 0, enableTransition )
          contentContainer.innerHTML = startContent;
        }
        audioVisualsOn = false;
        currentContent = startContent;
        break;
      case 'link4':
        audioVisualsOn = false;
        event.preventDefault();
        contentContainer.innerHTML = portfolioContent;
        break;
      case 'link5':
        event.preventDefault();
        contentContainer.innerHTML = audioVisualizerContent;
        audioVisualsOn = true;
        shouldCreateVisuals = true;
 
        audioVisuals();

        break;
      case 'playAudio':
        if (!audioIsPlaying) {
          playButtonSelected = true;
          audioVisualsOn = true;
          audioIsPlaying = true;
          audioVisuals();
        }
        break
      case 'stopAudio':
        playButtonSelected = false;
        audioIsPlaying = false;
        audioVisualsOn = false;
        break
      case 'toggle_full_screen':
        break;
      case 'aboutthiswebsite':
        break
      case 'header-text':
        break
      case 'bar':
        event.preventDefault();
        break
      case 'visualizer-container-id':
        event.preventDefault();
        break
      default:
        contentContainer.innerHTML = contentContainer.innerHTML;
        break
    }
    console.log("content " + contentContainer.innerHTML);

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // Mobile device
    } else {
      // Get a reference to the full-screen button with its new ID (reference is lost after uploading new content)
      const fullScreenButtonNew = document.getElementById('toggle_full_screen');
      if (fullScreenButtonNew) {
        // Add or update the click event listener for the new full-screen button
        fullScreenButtonNew.addEventListener('click', toggleFullScreen);
      }
    }    
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

  function handleWarp() {
    warpEnded = false;
    console.log("WARP ENDED: " + warpEnded);
    if (warpInProcess) {
      // Wrap the entire sequence of animations in a Promise
      const animationPromise = new Promise(async (resolve) => {
        // Perform the complex transition
        cameraControls.smoothTime = 0.4;
        await cameraControls.rotateTo(Math.PI / -2.7, Math.PI / 1.5, true);

        // Start the warp animation and zoom simultaneously
        const warpPromise = new Promise((warpResolve) => {
          warp(() => {
            warpResolve(); // Resolve the Promise when the warp animation ends
          });
        });
        
        const zoomPromise = new Promise((zoomResolve) => {
          cameraControls.smoothTime = 1;
          cameraControls.zoom(camera.zoom / 0.01, true, () => {
            zoomResolve(); // Resolve the Promise when the zoom animation ends
          });
        });
        
        // Wait for both warp and zoom animations to complete
        await Promise.all([warpPromise, zoomPromise]);
        
        resolve(); // Resolve the main animation Promise
        
      });
      
      // // After both complex transition and warp animation are complete, load the gallery content
      // animationPromise.then(() => {
      //   contentContainer.innerHTML = galleryContent;
      //   // skyTexture = textureLoader.load('images/sky5.1.jpg');
      // });
    }
  }
  
  function loadGalleryContent() {
    warpEnded = true;
    console.log("WARP ENDED: " + warpEnded);
    contentContainer.innerHTML = galleryContent;
    changeBackgroundImage('images/sky5.1.jpg');
    cameraControls.reset();

    // Add images
    const imageLoader = new THREE.TextureLoader();
    const imageUrls = ['images/sky3.jpg', 'images/sky5.jpg', 'images/sky6.jpg', 'images/sky2.jpg', 'images/sky4.jpg', 'images/sky7.jpg']; //When adding new images, add the filenames here
    const images = [];
    
    let index = 0;
    let image = null;
    
    imageUrls.forEach((url) => {      // Looping through the image urls and adding the loaded images to an array
      image = imageLoader.load(url);
      // image.name = `image_${index}`;
      console.log(image.name);
      images.push(image);
    });

    const imageGeometry = new THREE.PlaneGeometry(0.3, 0.2); // Image size
    const imageMeshes = [];
    let imageMesh;

    images.forEach((img) => {       // Looping through the images array and adding material and geometry to each image creating a mesh (plus adding a name for mouse mesh interaction, mmi)
      index++;
      let imageMaterial = new THREE.MeshBasicMaterial({ map: img });
      imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
      imageMesh.name = `imageMesh_${index}`;
      imageMeshes.push(imageMesh);
    });


    let imagePosition = new THREE.Vector3(-0.70, 0, -0.4);
    let imagesAdded = 0;
  
    imageMeshes.forEach((mesh, imageUrl, index) => {
      if (imagesAdded > 2) {
        imagePosition.z = 0.4;
        mesh.rotation.y = Math.PI; //if divided by 2 it will rotate 90 degrees
        if (imagesAdded == 3) {
          imagePosition.x = -0.70;
        }
      }
      let newX = imagePosition.x + 0.35;
      let newPosition = new THREE.Vector3(newX, imagePosition.y, imagePosition.z);
      mesh.position.copy(newPosition);
      scene.add(mesh);
      imagePosition = newPosition;
      imagesAdded += 1;
    });

    console.log("images count " + images.length)

  }

  // create a handler for when user clicks on a mesh with the name 'my_interactable_mesh'
  // mmi.addHandler('imageMesh_${index}', 'dblclick', function(mesh) {
  //   console.log('image has been clicked!');
  //   console.log(mesh);
  // });

  // Function to change the background image
  function changeBackgroundImage(imageUrl) {
    // Load the new texture
    const newSkyTexture = textureLoader.load(imageUrl);

    newSkyTexture.onload = function() {
      // Once the image is loaded, add the 'loaded' class to trigger the fade-in effect
      newSkyTexture.classList.add('fade-in-content');
    };

    skyTexture = newSkyTexture;

    // Update the material's map property
    sphereMaterial.map = skyTexture;
    sphereMaterial.needsUpdate = true;

    // Remove the old texture from memory (optional)
    // skyTexture.dispose();
  }



  //-----------------------------WARP----------------------------
 // Code for warp drive is copied and modified, original: https://codepen.io/NiklasKnaack/pen/OmwgKb



  var starHolderCount = 6666;
  var starHolder = [];
  var starBgHolder = [];
  var starSpeed = 20;
  var starSpeedMin = starSpeed;
  var starSpeedMax = 200;
  var starDistance = 8000;
  var starRotation = 0;

  var backgroundColor = { r:0, g:0, b:0, a:0 };

  var colorInvertValue = 0;
  function warp() {
    if (!warpInProcess) {
      console.log("!warpInProcess");
      return
    }
    else {
      warpInProcess = true;
      console.log("warpInProcess");

      var isMobile = false;

      //---

      if ( isMobile.phone || isMobile.tablet ) {

        isMobile = true;

      }

      //---

      var canvas = document.createElement( 'canvas' );
      var canvasWidth = window.innerWidth;
      var canvasHeight = window.innerHeight;

      //---

      canvas.setAttribute( 'width', canvasWidth );
      canvas.setAttribute( 'height', canvasHeight );
      canvas.oncontextmenu = function( e ) {
        e.preventDefault();
      };

      const effect = document.getElementById( 'effect' ).appendChild( canvas );
      effect.style.backgroundColor = 'transparent';
      //---

      var ctx = canvas.getContext( '2d' );
      var imageData = ctx.getImageData( 0, 0, canvasWidth, canvasHeight );
      var pix = imageData.data;

      //---

      var MATHPI180 = Math.PI / 180;
      var MATHPI2 = Math.PI * 2;

      var center = { x:canvas.width / 2, y:canvas.height / 2 };

      //---

      var mouseActive = false;
      var mouseDown = false;
      var mousePos = { x:center.x, y:center.y };

      //---

      var rotationSpeed = -1.00;
      var rotationSpeedFactor = { x: 0, y: 0 };
      rotationSpeedFactor.x = rotationSpeed / center.x;
      rotationSpeedFactor.y = rotationSpeed / center.y;

      var fov = 300;
      var fovMin = 210;
      var fovMax = fov;



      //---

      function clearImageData() {

        for ( var i = 0, l = pix.length; i < l; i += 4 ) {

          pix[ i ] = backgroundColor.r;
          pix[ i + 1 ] = backgroundColor.g;
          pix[ i + 2 ] = backgroundColor.b;
          pix[ i + 3 ] = backgroundColor.a;

        }

      };

      function setPixel( x, y, r, g, b, a ) {

        var i = ( x + y * canvasWidth ) * 4;

        pix[ i ] = r;
        pix[ i + 1 ] = g;
        pix[ i + 2 ] = b;
        pix[ i + 3 ] = a;

      };

      function setPixelAdditive( x, y, r, g, b, a ) {

        var i = ( x + y * canvasWidth ) * 4;

        pix[ i ]     = pix[ i ] + r;
        pix[ i + 1 ] = pix[ i + 1 ] + g;
        pix[ i + 2 ] = pix[ i + 2 ] + b;
        pix[ i + 3 ] = a;

      };

      //---

      function drawLine( x1, y1, x2, y2, r, g, b, a ) {

        var dx = Math.abs( x2 - x1 );
        var dy = Math.abs( y2 - y1 );

        var sx = ( x1 < x2 ) ? 1 : -1;
        var sy = ( y1 < y2 ) ? 1 : -1;

        var err = dx - dy;

        var lx = x1;
        var ly = y1;    

        while ( true ) {

          if ( lx > 0 && lx < canvasWidth && ly > 0 && ly < canvasHeight ) {

            setPixel( lx, ly, r, g, b, a );

          }

          if ( ( lx === x2 ) && ( ly === y2 ) )
            break;

          var e2 = 2 * err;

          if ( e2 > -dx ) { 

            err -= dy; 
            lx += sx; 

          }

          if ( e2 < dy ) { 

            err += dx; 
            ly += sy; 

          }

        }

      };

      //---

      function addParticle( x, y, z, ox, oy, oz ) {

        var particle = {};
        particle.x = x;
        particle.y = y;
        particle.z = z;
        particle.ox = ox;
        particle.oy = oy;
        particle.x2d = 0;
        particle.y2d = 0;

        return particle;

      };

      function addParticles() {

        var i;

        var x, y, z;

        var colorValue;
        var particle;

        for ( i = 0; i < starHolderCount; i++ ) {

          x = Math.random() * 10000 - 5000;
          y = Math.random() * 10000 - 5000;
          z = Math.round( Math.random() * starDistance );//Math.random() * 700 - 350;

          // Define a color range that excludes black and gray (e.g., from light blue to white)
          const minColorValue = 100; // Adjust this value to set the lower limit for colors
          const maxColorValue = 255; // This is the upper limit for colors (white)

          // colorValue = Math.floor( Math.random() * 155 ) + 100;
          // For shades of blue, white, and turquoise
          if (Math.random() < 0.2) { // Adjust the probability as needed
            colorValue = Math.floor(Math.random() * (maxColorValue - minColorValue + 1)) + minColorValue;
          }
          particle = addParticle( x, y, z, x, y, z );
          particle.color = { r:colorValue, g:colorValue, b:colorValue, a:50 };
          particle.oColor = { r:colorValue, g:colorValue, b:colorValue, a:50 };
          particle.w = 1;
          particle.distance = starDistance - z;
          particle.distanceTotal = Math.round( starDistance + fov - particle.w );

          starHolder.push( particle );

        }

      };

      //---

      window.requestAnimationFrame = ( function() {

        return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ) {
          window.setTimeout( callback, 1000 / 60 );
        };

      } )();

      function animloop() {
        if (!warpEnded) {
          requestAnimationFrame(animloop);
          render();
          console.log("animloop in warp function looping");
        }

      };

      function render() {

        clearImageData();

        //---

        var i, j, l, k, m, n;

        //---

        var rx, rz;

        var star;
        var scale;

        //Here's some of my modifications to animate the warp to fit my purpose -----------------------------

        // Get the animation start time
        var animationStartTime = null;

        function animate() {
          // Define your starSpeed parameters
          console.log("starspeed: " + starSpeed);
  
          // Set the animation duration in milliseconds
          var animationDuration = 3000;
          
          if (!animationStartTime) {
            animationStartTime = Date.now();
          }
          
          // Calculate the elapsed time
          var elapsedTime = Date.now() - animationStartTime;
          
          // Update starSpeed based on the elapsed time
          if (elapsedTime < animationDuration / 2) {
            // Accelerate during the first half of the animation
            starSpeed = starSpeedMin + (2 * (starSpeedMax - starSpeedMin) * (elapsedTime / (animationDuration / 2)));
            } else {
              // Decelerate during the second half of the animation
              starSpeed = starSpeedMax - (2 * (starSpeedMax - starSpeedMin) * ((elapsedTime - animationDuration) / (animationDuration / 2)));
            }

            if (elapsedTime < animationDuration){
              contentContainer.innerHTML = `
              <h1 class="header-text" id="header-text">WARP DRIVE</h1>
              `;
              requestAnimationFrame(animate);
              console.log("calling animation 'animate' within time restriction");
            }
            else {
              canvas.remove();
              // warpInProcess = false;
              loadGalleryContent();
              return
            }
            return
          }
          // Start the animation
          if (warpInProcess) {
            requestAnimationFrame(animate);
            console.log("Start the warp animation 'animate'");
          }
          //---

          //End of my part


        var warpSpeedValue;

        if ( isMobile ) {

          warpSpeedValue = starSpeed * ( starSpeed / starSpeedMax );

        } else {

          warpSpeedValue = starSpeed * ( starSpeed / ( starSpeedMax / 2 ) );

        }

        for ( i = 0, l = starHolder.length; i < l; i++ ) {

          star = starHolder[ i ];

          star.z -= starSpeed;
          star.distance += starSpeed;

          if ( star.z < -fov + star.w ) {

            star.z = starDistance;
            star.distance = 0;

          } 

          //---
          //star color

          var distancePercent = star.distance / star.distanceTotal;

          star.color.r = Math.floor( star.oColor.r * distancePercent );
          star.color.g = Math.floor( star.oColor.g * distancePercent );
          star.color.b = Math.floor( star.oColor.b * distancePercent );

          //---
          //star draw

          scale = fov / ( fov + star.z ); 

          star.x2d = ( star.x * scale ) + center.x; 
          star.y2d = ( star.y * scale ) + center.y; 

          if ( star.x2d > 0 && star.x2d < canvasWidth && star.y2d > 0 && star.y2d < canvasHeight ) {

            setPixelAdditive( star.x2d | 0, star.y2d | 0, star.color.r, star.color.g, star.color.b, 150 );

          }

          if ( starSpeed != starSpeedMin ) {

            var nz = star.z + warpSpeedValue;

            scale = fov / ( fov + nz ); 

            var x2d = ( star.x * scale ) + center.x; 
            var y2d = ( star.y * scale ) + center.y; 

            if ( x2d > 0 && x2d < canvasWidth && y2d > 0 && y2d < canvasHeight ) {

              drawLine( star.x2d | 0, star.y2d | 0, x2d | 0, y2d | 0, star.color.r, star.color.g, star.color.b, 150 );

            }

          }

        }

        //---

        ctx.putImageData( imageData, 0, 0 );


      };


      //---
      if (warpInProcess) {
        addParticles();
        animloop();
      }
    }
    warpInProcess = false;
    console.log('warpInProcess ' + warpInProcess);
  }
  
  
  //-----------------------------end of WARP--------------------------------


});