// Yin-Yang Symbol MicroSim
// Complementary Balancing Forces
// Take a list of items and display them on a Yin and Yang symbol
// Width responsive design

/*
Large Language Models
1. Models of language
2. Contains Knowledge of the Outside World
3. Designed to predict the next token
4. Statistical
5. Likely to hallucinate

Enterprise Knowledge Graphs
1. Models of your customers, products and workflows
2. Contains Knowledge of your Internal Organization
3. Designed for knowledge traversal
4. Deterministic
5. Precise graph queries

*/

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 400;
let canvasHeight = drawHeight;
let margin = 25;
let product_name_text_size = 16;
let product_feature_text_size = 10;

// Global variables for responsive design
let containerWidth; // calculated by container upon resize
let containerHeight = canvasHeight; // fixed height on page

// Yin-Yang parameters
let circleSize = 350; // default size of the yin-yang symbol
let yinTextInput, yangTextInput;
let drawingTextSize = circleSize/20;

 // Text in the upper left of the yin-yang in black fill on a white background
let yangText = "Large Language Model";
// TODO - display these under the Product A Text
let Product_A_Features = [
  "Models of language", 
  "Contains Knowledge of the outside world",
  "Designed to predict the next token",
  "Statistical",
  "Likely to hallucinate"]

// Test in the lower gith
let yinText = "Knowledge Graph";
let Product_B_Features = [
"Models of your customers, products",
"Contains internal knowledge",
"Designed for knowledge traversal",
"Deterministic",
"Precise graph queries"
]

function setup() {
  // Create a canvas to match the parent container's size
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  
  describe('A Yin-Yang symbol MicroSim that allows the user to see features of complemetary prodcuts.', LABEL);
}

function draw() {
  // Draw the background in a light blue with a light gray border
  stroke('silver');
  strokeWeight(1);
  background('aliceblue');
  // Draw the Yin-Yang symbol
  drawYinYang();
  // TODO - add hover text for each term in the product name and attributes
}

function drawYinYang() {
  // Calculate position at center of draw area
  let centerX = canvasWidth / 2;
  let centerY = drawHeight / 2;
  let radius = circleSize / 2;
  
  push();
  translate(centerX, centerY);
  
  // Draw outer circle
  stroke(0);
  strokeWeight(1);
  fill(255);
  circle(0, 0, circleSize);
  
  // Draw the yin-yang symbol with proper teardrop shapes
  push();
  
  // First, draw the full white circle as background
  fill(255);
  noStroke();
  circle(0, 0, circleSize);
  
  // Create the black half with the S-curve
  fill(0);
  noStroke();
  
  // Draw the black half (right side)
  beginShape();
    // Start at the top of the circle
    vertex(0, -radius);
    
    // Go around the right side of the circle
    for (let angle = -HALF_PI; angle <= HALF_PI; angle += 0.05) {
      let x = radius * cos(angle);
      let y = radius * sin(angle);
      vertex(x, y);
    }
    
    // Continue to bottom of the circle
    vertex(0, radius);
    
    // Now create the S-curve by going around the white teardrop
    for (let angle = HALF_PI; angle <= HALF_PI + PI; angle += 0.05) {
      let x = radius/2 * cos(angle);
      let y = radius/2 * sin(angle) + radius/2; // Offset to position at bottom half
      vertex(x, y);
    }
    
    // Close the shape
    endShape(CLOSE);
  
  // Draw white teardrop in the top half (needed for proper overlap)
  fill(255);
  beginShape();
    // Start at the center
    vertex(0, 0);
    
    // Top half of the circle
    for (let angle = -2*PI ; angle < HALF_PI; angle += 0.05) {
      let x = radius/2 * cos(angle);
      let y = radius/2 * sin(angle) - radius/2; // Offset to position at top half
      vertex(x, y);
    }
    
    // Close the shape
    endShape(CLOSE);
  
  pop();
  
  
  // Draw text in each half
  let textSizeVal = constrain(radius / 5, 10, 24);
  textSize(product_name_text_size);
  textAlign(CENTER, CENTER);
  
  // Yang - black text in white area
  fill('black');
  text(yangText, -radius*.2, -110);
  
  textSize(product_feature_text_size);
  // remove the bold font here 
  textStyle(NORMAL);
  noStroke();
  textAlign(LEFT, CENTER);
  // Set these by trial and error
  let startY = -80;
  let startX = -110;
  let lineHeight = 16;
  for (let i = 0; i < Product_A_Features.length; i++) {
      let yPos = startY + (i * lineHeight);

      // Draw bullet point
      fill(0);
      circle(startX-8, yPos, 4);

      // Draw text
      text(Product_A_Features[i], startX, yPos);
  }
  
  // Yin - white text in black area
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(product_name_text_size);
  text(yinText, radius*.2, radius*.15);
  
  textSize(product_feature_text_size);
  textAlign(LEFT, CENTER);

  startY = 50;
  startX = -30;
  for (let i = 0; i < Product_B_Features.length; i++) {
      let yPos = startY + (i * lineHeight);

      // Draw bullet point
      fill('white');
      circle(startX-8, yPos, 4);

      // Draw text
      text(Product_B_Features[i], startX, yPos);
  }
  pop();
}


function windowResized() {
  // Update canvas size when the container resizes
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  yinTextInput.size(containerWidth/2 - 100 - margin*4);
  
  yangTextInput.position(containerWidth/2 + 10, drawHeight + 50);
  yangTextInput.size(containerWidth/2 - 40);
  
  redraw();
}

function updateCanvasSize() {
  // Get the exact dimensions of the container
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);  // Avoid fractional pixels
  canvasWidth = containerWidth;
}