const canvas = document.querySelector('canvas') //DO NOT COMMENT OUT

canvas.width = window.innerWidth //self-explanatory 
canvas.height = window.innerHeight

const c = canvas.getContext('2d') //returning drawing context

// c.fillRect(x-coord., y-coord., width, height); 

// c.fillStyle = "rgb(255,0,0)"
// c.fillRect(100,100,100,100) //basically fills 100px square at (100,100)
// c.fillStyle = "rgb(0,255,0)"
// c.fillRect(300,300,100,100)
// c.fillStyle = "rgb(0,0,255)"
// c.fillRect(100,300,100,100)

//Line 

// c.beginPath();
// c.moveTo(50, 300) //draws diagonal line
// c.lineTo(300, 100)
// c.lineTo(400,300) //lineTo draws lines between pts
// c.strokeStyle = "red" 
// c.stroke(); //used to draw the lines 

//Arc / Circle

//c.arc(x-coord, y-coord, radius, startAngle, endAngle, drawCounterBool)
//angle coordinates takes radians ONLY 
//the last boolean value determines if it's drawn counterclockwise or not

// setInterval(() => {
//     for (let i = 0; i < 1; i++) {
    
//     const x = Math.random() * window.innerWidth;
//     const y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = `rgb(${r},${g},${b})`;
//     c.stroke();
//     }
// }, 50)

// function animate() {
//         requestAnimationFrame(animate);
//         c.clearRect(0, 0, innerWidth, innerHeight);
//         c.beginPath();
//         c.arc(x, y, radius, 0, Math.PI * 2, false);
//         c.lineWidth = 30;
//         c.strokeStyle = `rgb(${r},${g},${b})`;
//         c.stroke();
//         circle.update()
//     }




//Animation//

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove' || 'touch' || 'drag', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

var maxRadius = 50;
var minRadius = 10;

var colorArray = [
    'rgb(225,125,10)',
    'rgb(100,100,20)'
]

function Circle(x,y,dx,dy,radius) {
    const r = Math.random() * 256
    const g = Math.random() * 256
    const b = Math.random() * 256
    this.x = x;
    this.y = y;
    this.dx = dx; //ISOLATES VARIABLES TO INDIVIDUAL CIRCLES, i.e. instantiated objects
    this.dy = dy;
    this.radius = radius;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.lineWidth = 5;
        c.strokeStyle = `rgb(${r},${g},${b})`;
        c.stroke();
        c.fillStyle = `rgb(${r},${g},${b})`;
        c.fill(); //fills circles
    }

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) { //conditional reverses velocity on impact w/ canvas border
            this.dx = -this.dx 
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy
        }
        this.x += this.dx; //+= velocity changes position
        this.y += this.dy;

        //interactivity
        if (mouse.x - this.x < 100 && mouse.x - this.x > -100  //grows circles within 50 pixel radius of the cursor
            && mouse.y - this.y < 100 && mouse.y - this.y > -100 ) {
            if (this.radius < maxRadius) {
                this.radius += 1; //controls growth limit
            } 
        } else if (this.radius > minRadius) {
            this.radius -= 1; //shrinks radius outside of mousemove event, i.e. when no longer hovering
        }
        this.draw();
    }
}

const circleArray = [];

for (let i = 0; i < 200; i++) {
    var x = Math.random() * (innerWidth - radius * 2) + radius; //prevents circles from getting stuck on sides
    var y = Math.random() * (innerHeight - radius * 2) + radius; //prevents circles from getting stuck above/below
    //the reason these guys will get stuck is because center spawns too close to edges and gets trapped

    var dx = (Math.random() - 0.5) * 10; //dx/dy standard notation for velocity
    var dy = (Math.random() - 0.5) * 10; //random will either be - or +, altering direction (Math.random < 1)
    var radius = 5 //set radii
    circleArray.push(new Circle(x,y,dx,dy,radius))//the 5 variables are input into the new object
} //this loop function calls back to the Circle object; the variables are input in the relevant locations
   
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
}

animate();
