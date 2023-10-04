


// import * as THREE from '../three.module.js';
import CameraControls from '../camera-controls.module.js';


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
  // Create a scene
  const scene = new THREE.Scene();
  const clock = new THREE.Clock();
  document.getElementById('scene_container').appendChild(renderer.domElement);
  // const controls = new THREE.OrbitControls(camera, renderer.domElement);
  // controls.enableZoom = false;
  cameraControls.enableZoom = false;
  // Load skybox textures
  const textureLoader = new THREE.TextureLoader();
  let skyTexture = textureLoader.load('sky4.jpg'); // jpg image for the background, the skybox image
  // Create a sphere geometry
  const sphereGeometry = new THREE.SphereGeometry(2, 32, 32); // Adjust the sphere size and detail as needed
  // Create a material with the sky texture
  const sphereMaterial = new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.BackSide });
  // sphereMaterial.map.minFilter = THREE.LinearFilter;
  // Create the sky sphere
  const skySphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(skySphere);

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
  
  // Animation loop camera controls
  function animate() {
    // update the time
    const delta = clock.getDelta();
    const hasControlsUpdated = cameraControls.update(delta);
    
    requestAnimationFrame(animate);    
    // renderer.render( scene, camera );
    if ( hasControlsUpdated ) {
      renderer.render( scene, camera );
    }
  };
  
  animate();

  function adjustBrightnessAndContrast(color, brightness, contrast) {
    // Ensure brightness and contrast are within valid ranges
    brightness = Math.max(-1, Math.min(1, brightness)); // Range: [-1, 1]
    contrast = Math.max(0, contrast); // Range: [0, ∞)

    // Adjust brightness
    color.r += brightness;
    color.g += brightness;
    color.b += brightness;

    // Adjust contrast
    const midpoint = 0.5; // Midpoint gray (range: [0, 1])
    color.r = (color.r - midpoint) * contrast + midpoint;
    color.g = (color.g - midpoint) * contrast + midpoint;
    color.b = (color.b - midpoint) * contrast + midpoint;

    // Clamp RGB components to the valid range [0, 1]
    color.r = Math.min(1, Math.max(0, color.r));
    color.g = Math.min(1, Math.max(0, color.g));
    color.b = Math.min(1, Math.max(0, color.b));

    return color;
  }
  const originalEmissiveColor = new THREE.Color(0xff0000);

  // Adjusted emissive color with increased brightness and contrast
  const adjustedEmissiveColor = adjustBrightnessAndContrast(originalEmissiveColor, 0.2, 1.5);

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
        case "i":
          console.log("skyTexture");
          console.log('Current image:', skyTexture);
          break;
        case "m":
          console.log("skySphere.material");
          console.log('skySphere material:', skySphere.material);
          break;
        case "w":
          console.log("WARP in process ");
          console.log(warpInProcess);
          break;
      }
    }
  });

// InnerHTML content to upload without loading new page
  const startContent = `
    <h1 class="header-text" id="header-text">You must first fail to reach your ultimate goal</h1>
    <a id="toggle_full_screen" class="toggle_full_screen">Full screen on/off</a>
    <h2 id="aboutthiswebsite">This interstellar spacecraft is under construction<br><br>Come back later</h2>
    <a class="currentpage" id="link3">Back to start</a>
    <a class="link" id="link2">Travel to Gallery</a>
    <a class="link" id="link1">About this website</a>
    <a class="link" id="link4">Portfolio</a>
  `;
  const galleryContent = `
    <h1 class="header-text" id="header-text">Gallery</h1>
    <a id="toggle_full_screen" class="toggle_full_screen">Full screen on/off</a>
    <a class="link" id="link3">Back to start</a>
    <a class="currentpage" id="link2">Travel to Gallery</a>
    <a class="link" id="link1">About this website</a>
    <a class="link" id="link4">Portfolio</a>
  `;
  const aboutContent = `
    <a id="toggle_full_screen" class="toggle_full_screen">Full screen on/off</a>
    <h2 id="aboutthiswebsite">This page is created by using an AI skybox tool by Blockade Labs,<br>
        Three.js, a 3D JavaScript library and my imagination.<br>The font is from fontlibrary.org.<br>
        The warp drive effect is copied and edited from https://codepen.io/NiklasKnaack/pen/OmwgKb.<br>
        You can look around by left clicking and dragging with the mouse.</h2>
    <a class="link" id="link3">Back to start</a>
    <a class="link" id="link2">Travel to Gallery</a>
    <a class="currentpage" id="link1">About this website</a>
    <a class="link" id="link4">Portfolio</a>
  `;
  const portfolioContent = `
    <h1 class="header-text" id="header-text">Portfolio</h1>
    <a id="toggle_full_screen" class="toggle_full_screen">Full screen on/off</a>
    <h2 id="aboutthiswebsite">There will be content later</h2>
    <a class="link" id="link3">Back to start</a>
    <a class="link" id="link2">Travel to Gallery</a>
    <a class="link" id="link1">About this website</a>
    <a class="currentpage" id="link4">Portfolio</a>
  `;
  const curriculumVitaeContent = `
  
  `;
  const puzzleContent = `
  
  `;

  contentContainer.innerHTML = startContent;
  let currentContent;
  let warpInProcess;

  //Click events for buttons/links
  contentContainer.addEventListener('click', (event) => {
    // Check if the clicked element has a specific ID
    const targetId = event.target.id;

    switch (targetId) {
      case 'link1':
        event.preventDefault();
        contentContainer.innerHTML = aboutContent;
        break;
      case 'link2':
        if (currentContent !== galleryContent) {
          warpInProcess = true;
          handleWarp();
          currentContent = galleryContent;       
        }
        else if (contentContainer.innerHTML === aboutContent || contentContainer.innerHTML === portfolioContent) {
          contentContainer.innerHTML = galleryContent;
          currentContent = galleryContent;       
        }
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
        currentContent = startContent;
        break;
      case 'link4':
        event.preventDefault();
        contentContainer.innerHTML = portfolioContent;
        break;
      case 'toggle_full_screen':
        break;
      case 'aboutthiswebsite':
        break
      case 'header-text':
        break
      default:
        contentContainer.innerHTML = `
        <p class="content">Something went wrong. Please try again.</p>
        `
        break;
    }
    console.log("content " + contentContainer.innerHTML);

    // Get a reference to the full-screen button with its new ID (reference is lost after uploading new content)
    const fullScreenButtonNew = document.getElementById('toggle_full_screen');
    if (fullScreenButtonNew) {
      // Add or update the click event listener for the new full-screen button
      fullScreenButtonNew.addEventListener('click', toggleFullScreen);
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
      
      // After both complex transition and warp animation are complete, load the gallery content
      animationPromise.then(() => {
        contentContainer.innerHTML = galleryContent;
        skyTexture = textureLoader.load('sky5.jpg');
      });
    } else {
      contentContainer.innerHTML = galleryContent;
      skyTexture = textureLoader.load('sky5.jpg');
    }
  }

  function loadGalleryContent() {
    contentContainer.innerHTML = galleryContent;
    changeBackgroundImage('sky5.jpg');

    // cameraControls.zoom(1, false);
    cameraControls.reset();


    // Cylinder wall for the gallery
    // const cylinderGeometry = new THREE.CylinderGeometry(0.4, 0.4, 2, 32, 32, true); // Set openEnded to true
    // const cylinderMaterial = new THREE.MeshBasicMaterial({
    //   color: new THREE.Color(1, 1, 1), // White color
    //   side: THREE.DoubleSide,
    //   transparent: true,
    //   opacity: 0.0, // Set the opacity (0.0 to 1.0)
    // });
    // const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    // scene.add(cylinderMesh);

    // Images
    const imageLoader = new THREE.TextureLoader();
    const texture1 = imageLoader.load('sky3.jpg');
    const texture2 = imageLoader.load('sky5.jpg');
    const texture3 = imageLoader.load('sky6.jpg');

    const texture4 = imageLoader.load('sky4.jpg');
    const texture5 = imageLoader.load('sky4.jpg');
    const texture6 = imageLoader.load('sky4.jpg');



    // Create materials with textures for the images
    const planeMaterial1 = new THREE.MeshBasicMaterial({ map: texture1 });
    const planeMaterial2 = new THREE.MeshBasicMaterial({ map: texture2 });
    const planeMaterial3 = new THREE.MeshBasicMaterial({ map: texture3 });

    const planeMaterial4 = new THREE.MeshBasicMaterial({ map: texture4 });
    const planeMaterial5 = new THREE.MeshBasicMaterial({ map: texture5 });
    const planeMaterial6 = new THREE.MeshBasicMaterial({ map: texture6 });


    // Create planes for the images
    const planeGeometry = new THREE.PlaneGeometry(0.3, 0.2); // Image size
    const planeMesh1 = new THREE.Mesh(planeGeometry, planeMaterial1);
    const planeMesh2 = new THREE.Mesh(planeGeometry, planeMaterial2);
    const planeMesh3 = new THREE.Mesh(planeGeometry, planeMaterial3);

    const planeMesh4 = new THREE.Mesh(planeGeometry, planeMaterial4);
    const planeMesh5 = new THREE.Mesh(planeGeometry, planeMaterial5);
    const planeMesh6 = new THREE.Mesh(planeGeometry, planeMaterial6);


    // Rotate the planes to face inward if the position on z axis is 0 or more (other side of the gallery)
    // planeMesh1.rotation.y = Math.PI;
    // planeMesh2.rotation.y = Math.PI;
    // planeMesh3.rotation.y = Math.PI;

    planeMesh4.rotation.y = Math.PI;
    planeMesh5.rotation.y = Math.PI;
    planeMesh6.rotation.y = Math.PI;

    // Position and scale the planes within the cylinder
    planeMesh1.position.set(0, 0, -0.4); // Adjust x, y, and z coordinates
    planeMesh2.position.set(0.35, 0, -0.4);
    planeMesh3.position.set(-0.35, 0, -0.4);

    planeMesh4.position.set(0, 0, 0.4);
    planeMesh5.position.set(0.35, 0, 0.4);
    planeMesh6.position.set(-0.35, 0, 0.4);


    // Add the planes (images) to the cylinder
    // cylinderMesh.add(planeMesh1);
    // cylinderMesh.add(planeMesh2);

    scene.add(planeMesh1);
    scene.add(planeMesh2);
    scene.add(planeMesh3);

    scene.add(planeMesh4);
    scene.add(planeMesh5);
    scene.add(planeMesh6);
  }

  // Function to change the background image
  function changeBackgroundImage(imageUrl) {
    // Load the new texture
    const newSkyTexture = textureLoader.load(imageUrl);

    skyTexture = newSkyTexture;
    // Update the material's map property
    sphereMaterial.map = skyTexture;
    sphereMaterial.needsUpdate = true;

    // Remove the old texture from memory (optional)
    skyTexture.dispose();

    // Update the skyTexture reference

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
      console.log("warp has ended");
      return
    }
    else {
      console.log("warping function started");
      $( document ).ready( function() {

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

          // for ( i = 0; i < starHolderCount / 3; i++ ) {

          //   x = Math.random() * 24000 - 12000;
          //   y = Math.random() * 4500 - 2250;
          //   z = Math.round( Math.random() * starDistance );//Math.random() * 700 - 350;

          //   colorValue = Math.floor( Math.random() * 255 ) + 5;

          //   particle = addParticle( x, y, z, x, y, z );
          //   particle.color = { r:colorValue, g:colorValue, b:colorValue, a:255 };

          //   starBgHolder.push( particle );

          // }

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

        window.requestAnimFrame = ( function() {

          return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ) {
            window.setTimeout( callback, 1000 / 60 );
          };

        } )();

        function animloop() {

          requestAnimFrame( animloop );
          render();

        };

        function render() {

          clearImageData();

          //---

          var i, j, l, k, m, n;

          //---

          var rx, rz;

          var star;
          var scale;

          //Here's some of my modifications to animate the warp to fit my purpose

          // Get the animation start time
          var animationStartTime = null;

          function animate() {
            // Define your starSpeed parameters
            console.log("starspeed: " + starSpeed);
    
            // Set the animation duration in milliseconds
            var animationDuration = 3000; // Adjust this value as needed
            
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
              }
              else {
                canvas.remove();
                console.log("canvas removed");
                warpInProcess = false;
                loadGalleryContent();
                return
              }
              return
            }
            // Start the animation
            if (warpInProcess) {
              requestAnimationFrame(animate);
            }
            warpInProcess = false;
            //---

            //End of my part

          // if ( !mouseActive ) {

          //   fov += 0.5;

          //   if ( fov > fovMax )
          //     fov = fovMax;

          // } else {

          //   fov -= 1;

          //   if ( fov < fovMin )
          //     fov = fovMin;

          // }

          //---

          var warpSpeedValue;

          if ( isMobile ) {

            warpSpeedValue = starSpeed * ( starSpeed / starSpeedMax );

          } else {

            warpSpeedValue = starSpeed * ( starSpeed / ( starSpeedMax / 2 ) );

          }

          //---

          // for ( i = 0, l = starBgHolder.length; i < l; i++ ) {

          //   star = starBgHolder[ i ];

          //   scale = fov / ( fov + star.z ); 

          //   star.x2d = ( star.x * scale ) + center.x; 
          //   star.y2d = ( star.y * scale ) + center.y; 

          //   if ( star.x2d > 0 && star.x2d < canvasWidth && star.y2d > 0 && star.y2d < canvasHeight ) {

          //     setPixel( star.x2d | 0, star.y2d | 0, star.color.r, star.color.g, star.color.b, 255 );

          //   }


          // }

          //---

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

            // if ( mouseDown ) {

            //   //rotation
            //   var radians = MATHPI180 * starRotation;

            //   var cos = Math.cos( radians );
            //   var sin = Math.sin( radians );

            //   star.x = ( cos * ( star.ox - center.x ) ) + ( sin * ( star.oy - center.y ) ) + center.x,
            //     star.y = ( cos * ( star.oy - center.y ) ) - ( sin * ( star.ox - center.x ) ) + center.y;

            // }

          }

          //---

          ctx.putImageData( imageData, 0, 0 );

          //---

          // if ( mouseActive ) {

          //   center.x += ( mousePos.x - center.x ) * 0.015;

          // } else {

          //   center.x += ( ( canvas.width / 2 ) - center.x ) * 0.015;

          // }

          // //---

          // if ( mouseDown ) {

          //   starRotation -= 0.5;

          // }

        };


        //---
        if (warpInProcess) {
          addParticles();
          animloop();
        }
      })
       
    }
  }
});



  //-----------------------------end of WARP--------------------------------

