var checkmark = document.getElementById("donebtn")
var add_sec_btn = document.getElementById("section-add-btn")

var Sec_NewStickyNote = document.getElementsByClassName("add-sn-div")[0]
var sn_div;

add_sec_btn.addEventListener("click", function(){
    CreateSection();
})


checkmark.addEventListener("click", function(){
    CreateNote();
})

Array.from(document.getElementsByClassName("sn-add-btn")).forEach(function (e) {
    e.addEventListener("click", function (event) {
      typeNote(event.target);
    });
});


function CreateSection()
{
  var board_div = document.getElementsByClassName("board-div")[0];
  var inner_HTML = `<fieldset class="board-FS">
    <legend class="board-legend" contenteditable>Title</legend>


    <!-- Final Sticky Note -->
    <div class="sn-div" style="padding-top: 5px">


    </div>

    <!-- Add Sticky Note Button Icon -->
    <svg id="sn-add-btn" class="sn-add-btn" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="none" stroke-width="7.5"></circle>
      <line x1="32.5" y1="50" x2="67.5" y2="50" stroke-width="5"></line>
      <line x1="50" y1="32.5" x2="50" y2="67.5" stroke-width="5"></line>
    </svg>



  </fieldset>`

  board_div.innerHTML += inner_HTML

  Array.from(document.getElementsByClassName("sn-add-btn")).forEach(function (e) {
      e.addEventListener("click", function (event) {
        typeNote(event.target);
      });
  });

}


function CreateNote()
{
  var noteText = document.getElementById("newNoteContent");
  var div_s = document.createElement("div");
  var sn = document.createElement("p");

  div_s.classList.add("sn-div-i")
  div_s.appendChild(sn)

  sn.classList.add("sn-content")
  sn.style.margin = margin();
  sn.style.transform = rotate();
  sn.style.background = color();
  sn.innerHTML = noteText.value;

  sn_div.insertAdjacentElement("beforebegin", div_s)

  Sec_NewStickyNote.style.display = "none";
  noteText.value ="";

  sn.setAttribute("contenteditable", "true");




}
function typeNote(e) {
    sn_div = e;
    if (Sec_NewStickyNote.style.display == "none"){
        Sec_NewStickyNote.style.display = "flex"
    }
     else
      {
        Sec_NewStickyNote.style.display = "none"
    }

}

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
