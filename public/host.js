/*
p5.multiplayer - HOST

This 'host' sketch is intended to be run in desktop browsers. 
It connects to a node server via socket.io, from which it receives
rerouted input data from all connected 'clients'.

Navigate to the project's 'public' directory.
Run http-server -c-1 to start server. This will default to port 8080.
Run http-server -c-1 -p80 to start server on open port 80.

*/

////////////
// Network Settings
// const serverIp      = 'https://yourservername.herokuapp.com';
// const serverIp      = 'https://yourprojectname.glitch.me';
const serverIp      = 'http://cdm.jordanorelli.com:3000';
const serverPort    = '3000';
const local         = false;   // true if running locally, false
                              // if running on remote server

// Global variables here. ---->

const velScale	= 10;
const debug = false;
let game;

// <----

function preload() {
  setupHost();
  Images.loadAll();
}

function setup () {
  createCanvas(windowWidth, windowHeight);

  // Host/Game setup here. ---->
  
  game = new Game(width, height);

  // <----
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw () {
  background(Colors.Sky);

  if(isHostConnected(display=true)) {
    // Host/Game draw here. --->

    // Update and draw game objects
    game.draw();

    // <----

    // Display server address
    displayAddress();
  }
}

function onClientConnect (data) {
  // Client connect logic here. --->
  console.log(data.id + ' has connected.');

  if (!game.checkId(data.id)) {
    game.add(data.id,
            random(0.25*width, 0.75*width),
            random(0.75*height, 0.85*height),
            64, 64
    );
  }

  // <----
}

function onClientDisconnect (data) {
  // Client disconnect logic here. --->

  if (game.checkId(data.id)) {
    game.remove(data.id);
  }

  // <----
}

function onReceiveData (data) {
  // Input data processing here. --->
  // console.log(data);

  if (data.type === 'joystick') {
    processJoystick(data);
  }
  else if (data.type === 'button') {
    processButton(data);
  }
  else if (data.type === 'playerColor') {
    // game.setColor(data.id, data.r*255, data.g*255, data.b*255);
  }

  // <----

  /* Example:
     if (data.type === 'myDataType') {
       processMyData(data);
     }

     Use `data.type` to get the message type sent by client.
  */
}

// This is included for testing purposes to demonstrate that
// messages can be sent from a host back to all connected clients
function mousePressed() {
  sendData('timestamp', { timestamp: millis() });
}

////////////
// Input processing
function processJoystick (data) {
  game.joystickInput(data.id, data.joystickX, data.joystickY);
}

function processButton (data) {
  console.log(data);
  game.buttonInput(data.id, data.button);
}
