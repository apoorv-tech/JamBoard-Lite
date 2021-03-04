let socket

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const userid = getParameterByName('_id')

function setup(){
	let mycanvas=createCanvas(600,600)
	mycanvas.parent("webcanvas") 
	background(51)
	console.log(userid)
	socket = io.connect('http://127.0.0.1:4000',{
		query: {
			_id: userid 
		}
	})
	socket.on('mouse',newDrawing)
}

function newDrawing(data){
	noStroke()
	fill(255)
	ellipse(data.x,data.y,10,10)
}

function mouseDragged()
{
	var data= {
		x: mouseX,
		y: mouseY
	}
	socket.emit('mouse',data)
	noStroke()
	fill(255)
	ellipse(mouseX,mouseY,10,10)
}

function draw()
{
}