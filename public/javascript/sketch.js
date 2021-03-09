let socket

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const jamid = getParameterByName('_id')
const userid = getParameterByName('_uid')
let arr=[];
function setup(){
	let mycanvas=createCanvas(600,600)
	mycanvas.parent("webcanvas") 
	background(51)
	console.log(jamid)
	console.log(userid)
	socket = io.connect('http://127.0.0.1:4000',{
		query: {
			_id: jamid,
			_uid: userid 
		}
	})
	socket.emit('join',{jam : jamid})
	socket.on('mouse',newDrawing)
}

function newDrawing(data){
	console.log(data)
	console.log(data.x,data.y)
	noStroke()
	fill(255)
	ellipse(data.x,data.y,10,10)
}
function mouseReleased(){
socket.emit('mouse',arr);
arr=[]
}
function mouseDragged()
{
	var data= {
		x: mouseX,
		y: mouseY
	}
	arr.push(data);
	noStroke()
	fill(255)
	ellipse(mouseX,mouseY,10,10)
}

function draw()
{
}