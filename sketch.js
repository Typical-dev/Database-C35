var hypball;
var database;

var position;
function setup(){
    createCanvas(500,500);
    database = firebase.database();
    hypball = createSprite(250,250,10,10);
    hypball.shapeColor = "red";
    console.log(database);
    var hypballPosition = database.ref("ball/position");
    hypballPosition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(position !== undefined){
   
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
}
    drawSprites();
}


function writePosition(x,y){
    database.ref("ball/position").set({x: position.x+x,y: position.y+y})

}
function changePosition(x,y){
    hypball.x = hypball.x + x;
    hypball.y = hypball.y + y;
}

function readPosition(data){
    position = data.val();
    console.log(position);
    hypball.x = position.x;
    hypball.y = position.y;
}

function showError(){
    console.log("error in reading data");
}

