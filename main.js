song=""; 
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scoreleftwrist=0;

function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function gotposes(results)
{
    if(results.length>0)
    {
        console.log(results);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log("scoreleftwrist="+scoreleftwrist);

        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        console.log("leftwristx="+leftwristx+"leftwristy="+leftwristy);

        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log(" rightwristx="+ rightwristx+"rightwristy="+rightwristy);
    }
}

function modelLoaded()
{
    console.log('modelLoad');
}

function draw()
{
    image(video,0,0,600,500);

    fill("#e6005c");
    stroke("#000000");
    circle(rightwristx,rightwristy,20);
    if(rightwristy>0 && rightwristy<=100)
    {
        document.getElementById("speed").innerHTML="speed=0.5x";
        song.rate(0.5);
    }
    else if(rightwristy>100 && rightwristy<=200)
    {
        document.getElementById("speed").innerHTML="speed=1x";
        song.rate(1);
    }
    else if(rightwristy>200 && rightwristy<=300)
    {
        document.getElementById("speed").innerHTML="speed=1.5x";
        song.rate(1.5);
    }
    else if(rightwristy>300 && rightwristy<=400)
    {
        document.getElementById("speed").innerHTML="speed=2x";
        song.rate(2);
    }
    else if(rightwristy>400 && rightwristy<=500)
    {
        document.getElementById("speed").innerHTML="speed=2.5x";
        song.rate(2.5);
    }

    
    if(scoreleftwrist>0.2)
    {
        circle(leftwristx,leftwristy,20);
        numberleftwristy=Number(leftwristy);
        remove=floor(numberleftwristy);
        volume=remove/500;
        document.getElementById("volume").innerHTML="volume="+volume;
        song.setVolume(volume);
    }
}

function preload()
{
    song=loadSound("music.mp3");
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

