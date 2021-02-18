const canvas = document.getElementById('canvas')

const ctx = canvas.getContext("2d")

canvas.height = window.innerHeight
canvas.width = window.innerWidth

let painting = false

function startposition()
{
    painting=true
    draw(e)
}
function finishedposition()
{
    painting=false
    ctx.beginPath()
}
function draw(e)
{
    if(!painting) return
    ctx.lineWidth=6
    ctx.lineCap = "round"
    ctx.strokeStyle = "red"
    ctx.lineTo(e.clientX,e.clientY)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(e.clientX,e.clientY)
}

canvas.addEventListener("mousedown",startposition)
canvas.addEventListener("mouseup",finishedposition)
canvas.addEventListener("mousemove",draw)
