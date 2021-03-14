let socket

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function _(selector){
	return document.querySelector(selector);
  }
const jamid = getParameterByName('_id')
const userid = getParameterByName('_uid')
const perm = getParameterByName('p')
let arr=[];
let dragged = false
let eraserenable = false

const clearbtn = document.querySelector("#btnerase")
const eraser = document.querySelector("#eraser")
console.log('permission is '+perm+' and its type is '+typeof(perm))


function setup(){
	let mycanvas=createCanvas(innerWidth,550)
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
	socket.on('eraser',newerasedDrawing)
	if(perm!='false')
	{
		clearbtn.addEventListener('click',async(e)=>{
			socket.emit('erase')
		})
		eraser.addEventListener('click',async(e)=>{
			if(eraserenable){
				eraserenable=false
			}else{
				eraserenable=true
			}
		})
	}
	socket.on('eraseall',erasemsg)
}

console.log(clearbtn)

function newDrawing(data){
	console.log(data)
	console.log(data.x,data.y)
		let type =data.typepen
		let size = data.sizepen
		let color = data.colorpen
		fill(color);
		stroke(color);
		
		if(type == "pencil"){
			// mouseX = data.x
			// mouseY=data.y
			line(data.px, data.py, data.x, data.y);
		  } else {
			ellipse(data.x, data.y, size, size);
		  }
}

function newerasedDrawing(data){
	location.assign('/jamboard?_id='+data.jamid+'&_uid='+data.userid+'&p='+perm)
}

function mouseReleased(){
	if(perm!="false")
	{
		if(dragged)
		{
			console.log('inside released if')
			if(eraserenable)
			{
				console.log(arr)
				socket.emit('eraser',arr);
			}else{
				socket.emit('mouse',arr);
			}
			arr=[]
			dragged=false	
		}
	}
}


function mouseDragged()
{
	let type = _("#pen-pencil").checked?"pencil":"brush";
		let size = parseInt(_("#pen-size").value);
		let color = _("#pen-color").value;
	if(perm!="false")
	{
		dragged = true
		if(eraserenable){
			erase()
		}else{
			noErase()
		}
		var data= {
			x: mouseX,
			y: mouseY,
			typepen:type,
			sizepen:size,
			colorpen:color,
			px:pmouseX,
			py:pmouseY
		}
		arr.push(data);
		fill(color);
		stroke(color);

		if(type == "pencil"){
			line(pmouseX, pmouseY, mouseX, mouseY);
		  } else {
			ellipse(mouseX, mouseY, size, size);
		  }

	}
}

function erasemsg(data)
{
	location.assign('/jamboard?_id='+data.jamid+'&_uid='+data.userid+'&p='+perm)
}

function draw()
{
}