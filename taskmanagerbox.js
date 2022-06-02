// drag window
let onMove = false
let offsetX;
let offsetY;
const taskbox = document.querySelector(".taskbox")
let currentDragBox;
let oddStyle = window.getComputedStyle(taskbox)
const dragElements = document.querySelectorAll(".drag-bar")
console.log("dragElements");
console.log(dragElements);
dragElements.forEach((element) => {
    element.addEventListener("mousedown", onMouseDown)
})


function onMouseDown(e) {
    console.log('mouse down dragelement')
    onMove = true
    offsetX = e.offsetX
    offsetY = e.offsetY
    currentDragBox = e.target.parentElement;
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)
}

function onMouseMove(e) {
    if (onMove) {
        let boxWidth = parseFloat(oddStyle.width)
        let boxHeight = parseFloat(oddStyle.height)
        currentDragBox.style.left = `${Math.min(window.innerWidth-boxWidth,Math.max(0,e.clientX-offsetX))}px`
        currentDragBox.style.top = `${Math.min(window.innerHeight-boxHeight,Math.max(0,e.clientY-offsetY))}px`


    }
}

function onMouseUp() {
    onMove = false
    document.removeEventListener("mousemove", onMouseMove)
    document.removeEventListener("mouseup", onMouseUp)
}

// Resize window by four corners
function onResizeCorner(e, cornerClass) {
    let left = parseFloat(oddStyle.left)
    let top = parseFloat(oddStyle.top)
    let width = parseFloat(oddStyle.width)
    let height = parseFloat(oddStyle.height)
    let limitX = 0
    let limitY = 0
    let mX = e.clientX - left
    let mY = e.clientY - top
    let mXIn = left - Math.max(limitX, e.clientX)
    let mYIn = top - Math.max(limitY, e.clientY)
    if (cornerClass == ".corner-rt") {
        taskbox.style.top = `${Math.max(limitY,e.clientY)}px`
        taskbox.style.width = `${Math.max(200,mX)}px`
        taskbox.style.height = `${Math.max(200,height+mYIn)}px`
        return
    }
    if (cornerClass == ".corner-lt") {

        taskbox.style.top = `${Math.max(limitX,e.clientY)}px`
        taskbox.style.left = `${Math.max(limitX,e.clientX)}px`
        taskbox.style.width = `${Math.max(200,width+mXIn)}px`
        taskbox.style.height = `${Math.max(200,height+mYIn)}px`

        return
    }
    if (cornerClass == ".corner-lb") {
        taskbox.style.left = `${Math.max(limitX,e.clientX)}px`
        taskbox.style.width = `${Math.max(200,width+mXIn)}px`
        taskbox.style.height = `${Math.max(200,mY)}px`

        return
    }

    taskbox.style.width = `${Math.min(window.innerWidth-left,Math.max(200,mX))}px`
    taskbox.style.height = `${Math.min(window.innerHeight-top,Math.max(200,mY))}px`
}

function resizeOnCorner(cornerClass) {
    function fn(e) {
        onResizeCorner(e, cornerClass)
    }

    function clearListener() {
        document.removeEventListener("mousemove", fn)
        document.removeEventListener("mouseup", clearListener)
    }
    const target = document.querySelector(cornerClass)
    target.addEventListener("mousedown", () => {
        document.addEventListener("mousemove", fn)
        document.addEventListener("mouseup", clearListener)
    })
}
resizeOnCorner(".corner-rb")
resizeOnCorner(".corner-rt")
resizeOnCorner(".corner-lt")
resizeOnCorner(".corner-lb")