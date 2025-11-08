// Yin-Yang Symbol MicroSim
// Complementary Balancing Forces: LLM vs Knowledge Graph
// Displays characteristics of Large Language Models and Enterprise Knowledge Graphs
// on a Yin-Yang symbol to illustrate their complementary nature
// Width responsive design

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let product_name_text_size = 16;
let product_feature_text_size = 10;
let defaultTextSize = 16;

// Global variables for responsive design
let containerWidth; // calculated by container upon resize
let containerHeight = canvasHeight;

// Yin-Yang parameters
let circleSize = 350; // default size of the yin-yang symbol
let drawingTextSize = circleSize/20;

// Text in the upper left of the yin-yang in black fill on a white background (Yang)
let yangText = "Large Language Model";
// LLM Features displayed in the Yang (white) area
let Product_A_Features = [
  "Models of language",
  "Contains knowledge of the outside world",
  "Designed to predict the next token",
  "Statistical",
  "Likely to hallucinate"
];

// Text in the lower right of the yin-yang in white fill on a black background (Yin)
let yinText = "Knowledge Graph";
// Knowledge Graph features displayed in the Yin (black) area
let Product_B_Features = [
  "Models of your customers, products",
  "Contains internal knowledge",
  "Designed for knowledge traversal",
  "Deterministic",
  "Precise graph queries"
];

function setup() {
  // Create a canvas to match the parent container's size
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  describe('A Yin-Yang symbol comparing Large Language Models and Knowledge Graphs, showing their complementary characteristics.', LABEL);
}

function draw() {
  // Update canvas size for responsiveness
  updateCanvasSize();

  // Draw the drawing area background in light blue with a light gray border
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Draw the control area background in white
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Draw title
  fill('black');
  textSize(24);
  textAlign(CENTER, TOP);
  noStroke();
  text('LLM vs Knowledge Graph', canvasWidth/2, 10);

  // Reset to defaults
  stroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);

  // Draw the Yin-Yang symbol
  drawYinYang();

  // Draw info text in control area
  fill('black');
  textSize(12);
  textAlign(CENTER, CENTER);
  text('Complementary technologies for AI and data management', canvasWidth/2, drawHeight + 25);
}

function drawYinYang() {
  // Calculate position at center of draw area
  let centerX = canvasWidth / 2;
  let centerY = drawHeight / 2 + 15; // Offset down slightly for title
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
  textSize(product_name_text_size);
  textAlign(CENTER, CENTER);

  // Yang - black text in white area (LLM)
  fill('black');
  textStyle(BOLD);
  text(yangText, -radius*.2, -110);

  textSize(product_feature_text_size);
  textStyle(NORMAL);
  noStroke();
  textAlign(LEFT, CENTER);

  // Draw LLM features
  let startY = -80;
  let startX = -110;
  let lineHeight = 16;
  for (let i = 0; i < Product_A_Features.length; i++) {
    let yPos = startY + (i * lineHeight);

    // Draw bullet point
    fill(0);
    circle(startX - 8, yPos, 4);

    // Draw text
    text(Product_A_Features[i], startX, yPos);
  }

  // Yin - white text in black area (Knowledge Graph)
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(product_name_text_size);
  textStyle(BOLD);
  text(yinText, radius*.2, radius*.15);

  textSize(product_feature_text_size);
  textStyle(NORMAL);
  textAlign(LEFT, CENTER);

  // Draw Knowledge Graph features
  startY = 50;
  startX = -30;
  for (let i = 0; i < Product_B_Features.length; i++) {
    let yPos = startY + (i * lineHeight);

    // Draw bullet point
    fill('white');
    circle(startX - 8, yPos, 4);

    // Draw text
    text(Product_B_Features[i], startX, yPos);
  }

  pop();
}

function windowResized() {
  // Update canvas size when the container resizes
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
}

function updateCanvasSize() {
  // Get the exact dimensions of the container
  const container = document.querySelector('main');
  if (container) {
    const rect = container.getBoundingClientRect();
    containerWidth = Math.floor(rect.width);
    canvasWidth = containerWidth;
  }
}
