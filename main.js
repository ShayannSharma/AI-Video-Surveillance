video = ""
status = ""
objects = []
function setup(){
    canvas = createCanvas(600,470)
    canvas.center()
}
function draw(){
    image(video,0,0,600,470)
    if (status != ""){
        objectDetector.detect(video, gotResult) 
        for (let i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Decected!"
            document.getElementById("no").innerHTML = "Number of Objects Detected: " + objects.length
            fill("#FF0000")
            percent  = floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15)
            noFill()
            stroke("#FF0000")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)

            
        }
    }
}
function gotResult(error, results){
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        objects = results
    }
}
function preload(){
    video = createVideo("video.mp4")
    video.hide()
}
function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Status: Dectecting Objects."
}
function modelLoaded(){
   console.log("Model has loaded!")
   status = true
   video.volume(0)
   video.speed(1)
   video.loop()
}