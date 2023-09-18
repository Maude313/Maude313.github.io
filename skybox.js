
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
    <div id="output"></div>
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
        // Start the animation loop
        warp();
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



  //-----------------------------WARP----------------------------

  
  function warp() {
    
    $( document ).ready( function() {

      var isMobile = false;
    
      //---
    
      if ( isMobile.phone || isMobile.tablet ) {
          
        isMobile = true;
          
      }
      
      //---
    
      var canvasWidth = 800;
      var canvasHeight = 300;
    
      //---
    
      var canvas = document.createElement( 'canvas' );
      canvas.setAttribute( 'width', canvasWidth );
      canvas.setAttribute( 'height', canvasHeight );
      canvas.oncontextmenu = function( e ) {
        e.preventDefault();
      };
    
      if ( !isMobile ) {    
    
        canvas.addEventListener( 'mousemove', mouseMoveHandler );
        canvas.addEventListener( 'mousedown', mouseDownHandler );
        canvas.addEventListener( 'mouseup', mouseUpHandler );
        canvas.addEventListener( 'mouseenter', mouseEnterHandler ); 
        canvas.addEventListener( 'mouseleave', mouseLeaveHandler ); 
    
        $( canvas ).css( 'cursor', 'pointer' );
    
      } else {
    
        canvas.addEventListener( 'touchstart', touchStartHandler, false );
        canvas.addEventListener( 'touchend', touchEndHandler, false );
        canvas.addEventListener( 'touchmove', touchMoveHandler, false );
        canvas.addEventListener( 'touchcancel', touchCancelHandler, false );
    
      }
    
      document.getElementById( 'effect' ).appendChild( canvas );
    
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
    
        for ( i = 0; i < starHolderCount / 3; i++ ) {
    
          x = Math.random() * 24000 - 12000;
          y = Math.random() * 4500 - 2250;
          z = Math.round( Math.random() * starDistance );//Math.random() * 700 - 350;
    
          colorValue = Math.floor( Math.random() * 55 ) + 5;
    
          particle = addParticle( x, y, z, x, y, z );
          particle.color = { r:colorValue, g:colorValue, b:colorValue, a:255 };
    
          starBgHolder.push( particle );
    
        }
    
        for ( i = 0; i < starHolderCount; i++ ) {
    
          x = Math.random() * 10000 - 5000;
          y = Math.random() * 10000 - 5000;
          z = Math.round( Math.random() * starDistance );//Math.random() * 700 - 350;
    
          colorValue = Math.floor( Math.random() * 155 ) + 100;
    
          particle = addParticle( x, y, z, x, y, z );
          particle.color = { r:colorValue, g:colorValue, b:colorValue, a:255 };
          particle.oColor = { r:colorValue, g:colorValue, b:colorValue, a:255 };
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
    
        //---
    
        if ( mouseActive ) {
    
          starSpeed += 2;
    
          if ( starSpeed > starSpeedMax )
            starSpeed = starSpeedMax;
    
        } else {
    
          starSpeed -= 1;
    
          if ( starSpeed < starSpeedMin )
            starSpeed = starSpeedMin;
    
        }
    
        //---
    
        if ( !mouseActive ) {
    
          fov += 0.5;
    
          if ( fov > fovMax )
            fov = fovMax;
    
        } else {
    
          fov -= 1;
    
          if ( fov < fovMin )
            fov = fovMin;
    
        }
    
        //---
    
        var warpSpeedValue;
    
        if ( isMobile ) {
    
          warpSpeedValue = starSpeed * ( starSpeed / starSpeedMax );
    
        } else {
    
          warpSpeedValue = starSpeed * ( starSpeed / ( starSpeedMax / 2 ) );
    
        }
    
        //---
    
        for ( i = 0, l = starBgHolder.length; i < l; i++ ) {
    
          star = starBgHolder[ i ];
    
          scale = fov / ( fov + star.z ); 
    
          star.x2d = ( star.x * scale ) + center.x; 
          star.y2d = ( star.y * scale ) + center.y; 
    
          if ( star.x2d > 0 && star.x2d < canvasWidth && star.y2d > 0 && star.y2d < canvasHeight ) {
    
            setPixel( star.x2d | 0, star.y2d | 0, star.color.r, star.color.g, star.color.b, 255 );
    
          }
    
    
        }
    
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
    
            setPixelAdditive( star.x2d | 0, star.y2d | 0, star.color.r, star.color.g, star.color.b, 255 );
    
          }
    
          if ( starSpeed != starSpeedMin ) {
    
            var nz = star.z + warpSpeedValue;
    
            scale = fov / ( fov + nz ); 
    
            var x2d = ( star.x * scale ) + center.x; 
            var y2d = ( star.y * scale ) + center.y; 
    
            if ( x2d > 0 && x2d < canvasWidth && y2d > 0 && y2d < canvasHeight ) {
    
              drawLine( star.x2d | 0, star.y2d | 0, x2d | 0, y2d | 0, star.color.r, star.color.g, star.color.b, 255 );
    
            }
    
          }
    
          if ( mouseDown ) {
    
            //rotation
            var radians = MATHPI180 * starRotation;
    
            var cos = Math.cos( radians );
            var sin = Math.sin( radians );
    
            star.x = ( cos * ( star.ox - center.x ) ) + ( sin * ( star.oy - center.y ) ) + center.x,
              star.y = ( cos * ( star.oy - center.y ) ) - ( sin * ( star.ox - center.x ) ) + center.y;
    
          }
    
        }
    
        //---
    
        ctx.putImageData( imageData, 0, 0 );
    
        //---
    
        if ( mouseActive ) {
    
          center.x += ( mousePos.x - center.x ) * 0.015;
    
        } else {
    
          center.x += ( ( canvas.width / 2 ) - center.x ) * 0.015;
    
        }
    
        //---
        
        if ( mouseDown ) {
    
          starRotation -= 0.5;
    
        }
    
      };
    
      //---
    
      function mouseMoveHandler( event ) {
    
        mousePos = getMousePos( canvas, event );
    
      };
    
      function mouseEnterHandler( event ) {
    
        mouseActive = true;
    
      };
    
      function mouseLeaveHandler( event ) {
    
        mouseActive = false;
    
        mouseDown = false;
    
      };
    
      function mouseDownHandler( event ) {
    
        mouseDown = true;
    
        speed = 0;
    
      };
    
      function mouseUpHandler( event ) {
    
        mouseDown = false;
    
        speed = 0.25;
    
      };
    
      //---
    
      function getMousePos( canvas, event ) {
    
        var rect = canvas.getBoundingClientRect();
    
        return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    
      };
    
      //---
    
      function touchStartHandler( event ) {
    
        event.preventDefault();
    
        mouseDown = true;
        mouseActive = true;
    
      };
    
      function touchEndHandler( event ) {
    
        event.preventDefault();
    
        mouseDown = false;
        mouseActive = false;
    
      };
    
      function touchMoveHandler( event ) {
    
        event.preventDefault();
    
        mousePos = getTouchPos( canvas, event );
    
      };
    
      function touchCancelHandler( event ) {
    
        mouseDown = false;
        mouseActive = false;
    
      };
    
      //---
    
      function getTouchPos( canvas, event ) {
    
        var rect = canvas.getBoundingClientRect();
    
        return { x: event.touches[ 0 ].clientX - rect.left, y: event.touches[ 0 ].clientY - rect.top };
    
      };
    
      //---
    
      addParticles();
      animloop();
    
    } );

  }






  

});