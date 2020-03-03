var m = 1500;
var friction = 1000;

var f = 0.0;
var a = 0.0;
var v = 0.0;
var d = 0.0;
var resistance = 0.0;
var refresh_rate = 0.01666666667;
var keypress = false;
var time_multiplier = 0.0;

function getForce() {
    f = document.getElementById("power-output").value;


    document.getElementById("f").innerHTML = f;
}



function calculateAcceleration() {
    //var initial_a = a;
    //a = (f / m) - (resistance) / m; //((friction * f) / m );
    if ((v < 0.01 && v > -0.01) && (f < friction && f > -.01)) {
        a = 0.0;
        v = 0.0;
    }
    else if (v > 0) {
        a = (f / m) - (resistance / m) - (friction / m);
    }
    else if (v < 0) {
        a = (f / m) + (resistance / m) + (friction / m);
    }
    else {
        a = (f / m) - (resistance) / m;
    }
    document.getElementById("a").innerHTML = a.toFixed(2);

}

function calculateVelocity() {
    var initial_v = v;

    v = (parseFloat(v) + (parseFloat(a) * refresh_rate));
    document.getElementById("v").innerHTML = (v * 3.6).toFixed(1);
    resistance = 2.7 * v * v;
}

function calculateDistance() {
    var current_d = d;

    d += refresh_rate * parseFloat(v) + (0.5 * parseFloat(a) * (refresh_rate * refresh_rate));
    document.getElementById("d").innerHTML = d.toFixed(1);

}

//element.addEventListener("click", getForce());
setInterval(calculateVelocity, '16.66666667');
setInterval(calculateDistance, '16.66666667');
setInterval(calculateAcceleration, '16.66666667');
//setInterval(getForce, '16.66666667')


// document.getElementById("power-output").addEventListener("onclick", whatEver);

// function whatEver() {
// }
function increaseForce() {
    //f = document.getElementById("power-output").value;
    f = f + 1*time_multiplier;
    time_multiplier++;
    document.getElementById("f").innerHTML = f;
}

function decreaseForce() {
    //f = document.getElementById("power-output").value;
    if (!f == 0) {
        f = f - 1;
    }
    document.getElementById("f").innerHTML = f;
}

function onKeyDown(e) {

    console.log(e.code);
     if (e.code == "ArrowUp" && keypress != true) {
        keypress = true; //prevents keypress from repeating
        var forceIncrementor = setInterval(() => { 
            increaseForce();
            if(keypress == false) {
                clearInterval(forceIncrementor); 
                setInterval(decreaseForce,'1');
            } 
          }, '50');
        //increaseForce();
        console.log("Arrow key pressed");
        
    }  
}

function onKeyUp(e) {
    keypress = false; 
    //console.log(e.code);
    if (e.code == "ArrowUp") {
 
        //clearInterval(forceIncrementor);
        console.log("Arrow key let go");
        //increaseForce();
    }  //clearInterval(forceIncrementor);
}




document.onkeydown = onKeyDown;
document.onkeyup = onKeyUp;
document.getElementById("f").innerHTML = f;


//setInterval(calculateVelocity,'1000');