function imagesToSlotsInCircle() {



// Define the number of slots and their positions
const numSlots = 8; // Change this to the desired number of slots
const circleCenter = new THREE.Vector3(0, 0, 0); // Center of the circle
const radius = 2; // Radius of the circle


// Create an array to store the positions of the slots
const slotPositions = [];

// Calculate the angle increment based on the number of slots
const angleIncrement = (2 * Math.PI) / numSlots;

// Loop through angles to calculate slot positions
for (let i = 0; i < numSlots; i++) {
  const angle = i * angleIncrement;
  
  // Calculate the position of the slot
  const x = circleCenter.x + radius * Math.cos(angle);
  const z = circleCenter.z + radius * Math.sin(angle);
  
  // Create a Vector3 to store the slot position
  const slotPosition = new THREE.Vector3(x, 0, z);
  
  // Add the slot position to the array
  slotPositions.push(slotPosition);
}

// Create an array to hold the loaded images
const images = [];

// Function to load an image and push it into the images array
function loadImageAndPushToArray(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  image.onload = function () {
    // Rotate the planes to face inward
    image.rotation.y = Math.PI;
    // Push the loaded image into the images array
    images.push(image);

    // You can do something with the loaded image here if needed
    // For example, append it to a container or perform other operations
  };
}

// Call the function to load images
loadImageAndPushToArray('sky3.jpg');
loadImageAndPushToArray('sky4.jpg');
loadImageAndPushToArray('sky5.jpg');

// Create slots for the images
const slotGeometry = new THREE.PlaneGeometry(0.4, 0.3); // Image size
const slotMesh = new THREE.Mesh(slotGeometry, image);

// slotMesh.position.set(slotPosition); // Adjust x, y, and z coordinates

for (let i = 0; i < slotPositions.length; i++) {
    const image = images[i]; // Get the image from the images array
    const slotPosition = slotPositions[i]; // Get the position from the slotPositions array
  
    // Now you can use the image and slotPosition to place the image into the slot.
    // You can set the position of the image using its style or any other method depending on your HTML structure.
    image.style.left = slotPosition.x + 'px';
    image.style.top = slotPosition.y + 'px';
  
    // Assuming you have a container element to hold the images, you can append the image to it.
    slotMesh.appendChild(image);
  }


}

