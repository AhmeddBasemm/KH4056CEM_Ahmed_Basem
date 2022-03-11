
function margin() {

    var random_margin = ["-5px", "1px", "5px", "10px", "15px", "20px"]
    return random_margin[Math.floor(Math.random() * random_margin.length)];

}

function rotate() {
    var random_rotate = ["rotate(3deg)", "rotate(1deg)", "rotate(-1deg)", "rotate(-3deg)", "rotate(-10deg)", "rotate(-5deg)"]
    return random_rotate[Math.floor(Math.random() * random_rotate.length)];

}

function color() {
    var random_color = ["#c2ff3d", "#ff3de8", "#04e022", "#bc83e6", "#ebb328"]
    return random_color[Math.floor(Math.random() * random_color.length)];

}
