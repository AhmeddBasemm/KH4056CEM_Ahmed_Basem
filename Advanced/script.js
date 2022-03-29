
// ---------------------------Global Variables----------------------------------

//Styling Variables
var random_margin = ["-5px", "1px", "5px", "10px", "15px", "20px"]
var random_rotate = ["rotate(3deg)", "rotate(1deg)", "rotate(-1deg)", "rotate(-3deg)", "rotate(-10deg)", "rotate(-5deg)"]
var color_palette = ["#1abc9c", "#f1c40f", "#e67e22", "#e74c3c", "#3498db","#2980b9","#f39c12", "#d35400","#c0392b", "#8e44ad" ,"#2980b9","#27ae60","#16a085"]
var usedColors = [];

//Buttons
var checkmark = document.getElementById("donebtn")
var add_sec_btn = document.getElementById("section-add-btn")
var add_btn = document.getElementsByClassName("sn-add-btn")[0];

//Advanced Sticky Note
var newNoteContentdiv = document.getElementById('newNoteContent');
var Sec_AdvStickyNote = document.getElementsByClassName("add-sn-div")[0];
var advancedBtns = document.getElementsByClassName("AdvBtn");
var currentlyEditedSN;

//Drag and Drop
var currentBoard = null;
var currentGParent = null
var pos= {offset:null, target: null};
var draggables = [];
var dragClone;

//Menu
menu = document.getElementById("contextMenu")
Editbtn = document.getElementById("Editbtn")
Delbtn = document.getElementById("Delbtn")

// -------------------------Base Event Listsners--------------------------------

//Adding Buttons
add_sec_btn.addEventListener("click", CreateSection)
add_btn.addEventListener("click",CreateNote, Event);
document.getElementById("close").addEventListener("click", deleteBoard, Event )

//Context Menu
Editbtn.addEventListener("click", ()=> {
  advancedNote();
  contextmenu();
});

Delbtn.addEventListener("click", ()=> {

  currentlyEditedSN.classList.add("ExitAnim");

  setTimeout(() => {
    currentlyEditedSN.parentNode.parentNode.removeChild(currentlyEditedSN.parentNode)
  }, 475)

  contextmenu();
});

document.addEventListener("click", ()=>
{
  if (menu.style.display === "flex") menu.style.display = "none";
});

document.addEventListener("scroll", ()=>
{
  if (menu.style.display === "flex") menu.style.display = "none";
});

//Advanced Editing Buttons
checkmark.addEventListener("click",advancedNote)

Array.from(advancedBtns).forEach(function (btn) {
    btn.addEventListener("click",action, Event);
});


//-------------------------------Functions--------------------------------------

function deleteBoard (e){
  if (confirm("Are you Sure that u want to delete this board")){
    e.target.parentNode.parentNode.classList.add("ExitAnim");
    setTimeout(() => {
    e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode); return false;
  },475)
  }
}

//Create New Board Section
function CreateSection(){
  var inner_HTML = `
    <legend class="board-legend editable" data-placeholder="Title" contenteditable ></legend>

    <!-- Final Sticky Note -->
    <div class="sn-div" style="padding-top: 5px">

    <!-- Add Sticky Note Button Icon -->
    <svg id="sn-add-btn" class="sn-add-btn" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="none" stroke-width="7.5"></circle>
      <line x1="32.5" y1="50" x2="67.5" y2="50" stroke-width="5"></line>
      <line x1="50" y1="32.5" x2="50" y2="67.5" stroke-width="5"></line>
    </svg>
    </div>
    <span id='close'><i id="x-icon" class="fa-regular fa-circle-xmark"></i></span>
    `
  fs = document.createElement("fieldset")
  fs.classList.add("board-FS")
  fs.classList.add("animated")
  fs.insertAdjacentHTML("beforeend",inner_HTML)

  fs.querySelector("#close").addEventListener("click", deleteBoard, Event)
  // closebtn = document.createElement("span")
  // closebtn.onclick = this.parentNode.parentNode.removeChild(this.parentNode); return false;
  // fs.insertAdjacentElement("beforeend",closebtn);

  document.getElementsByClassName("board-div")[0].insertAdjacentElement("beforeend",fs);

  //Add Event listners to all add sn buttons
  fs.querySelector(":last-child svg").addEventListener("click",CreateNote, Event);

  setTimeout(() => {
  fs.classList.remove("animated");
},475)

}

//Create New Sticky Note
function CreateNote(e){
  // console.log("start")
  add_btn = e.target;
  var sn_div = document.createElement("div");
  var sn = document.createElement("div");

  //Drag
  sn_div.classList.add("draggable");
  sn_div.classList.add("sortable");
  sn_div.classList.add("animated");
  sn_div.setAttribute("draggable", "true");

  //Styling
  sn_div.classList.add("sn-div-i");
  sn_div.appendChild(sn);

  //Styling
  sn.classList.add("sn-content");
  sty = Randomstyl();
  sn.style.margin = sty.margin;
  sn.style.transform = sty.transform;
  sn.style.background = sty.color;

  //Positioning
  add_btn.insertAdjacentElement("beforebegin", sn_div)

  //Features

  //Editable
  sn.setAttribute("contenteditable", "true");

  //AdvancedEdit
  sn_div.addEventListener("dblclick", ()=>
  {
     currentlyEditedSN = sn;
     advancedNote()
  });


  sn_div.addEventListener('contextmenu', function(e){
    currentlyEditedSN = e.target
    contextmenu()
    e.preventDefault();
  });


  //Drag and Drop
  Drag(sn_div);
}

//Toggle Context Menu
function contextmenu(){
    if (menu.style.display === "none")
    {
      menu.style.setProperty('--mouse-x', event.clientX + 'px')
      menu.style.setProperty('--mouse-y', event.clientY + 'px')
      menu.style.display = "flex";
    }
    else menu.style.display = "none";
}

//Get Random Styles
function Randomstyl() {

    //Margin
    margin = random_margin[Math.floor(Math.random() * random_margin.length)];

    //Rotation
    rot = random_rotate[Math.floor(Math.random() * random_rotate.length)];

    //Color
    if (color_palette.length == 0)
    {
      color_palette = usedColors;
      usedColors = [];
    }

    random_color = color_palette[Math.floor(Math.random() * color_palette.length)];
    usedColors.push(random_color);
    color_palette.splice(color_palette.indexOf(random_color),1);


    return {margin:margin, transform:rot, color:random_color};
}

//Toggle Advanced Editing Mode
function advancedNote() {

  //Toggle menu Condidtion
  if (Sec_AdvStickyNote.style.display == "none"){
    // Mimic the Small Note
    newNoteContent.innerHTML = currentlyEditedSN.innerHTML;
    newNoteContent.style.backgroundColor = currentlyEditedSN.style.backgroundColor;

    // Open Advanced Menu and Focus
    Sec_AdvStickyNote.style.display = "flex"
    newNoteContent.focus();
  }
  else{
    // document.onselectionchange = null;
    //Save Changes and hide menu
    currentlyEditedSN.innerHTML = newNoteContent.innerHTML ;
    Sec_AdvStickyNote.style.display = "none"
  }
}

//For Advanced Editing Buttons
function action(btn){
  var val = null;
  var command = btn.target.id;

  if (command =="fontSize")val = prompt("Please Choose a Number Between 1-7","4");
  else if (command =="fontName") val = prompt("Please Choose a Font Family Name", "Times New Roman");
  document.execCommand(command,false,val)
}

//Dragging Functions
function Drag(draggable){
  boards = document.getElementsByClassName('board-FS');


  draggable.addEventListener("dragstart",() => { onDragStart(draggable); });
  draggable.addEventListener("dragend",() =>{ onDrop(draggable); });

  Array.from(boards).forEach(function (board) {
    board.addEventListener("dragover", function(e){ onDrag(e, draggable); })
  })

}

//When Dragging Begins
function onDragStart(draggable){
  draggable.classList.remove("animated");
  //Setup the currently dragged sticky Note
  draggable.classList.add("dragging");
  currentBoard = draggable.parentNode.parentNode;

  //Create Ghost Note
  dragClone = draggable.cloneNode(true);
  dragClone.style.opacity = "0.2"
}

//create a ghost preview element
function onDrag(e, draggable){
  //Allow Dropping
  e.preventDefault()

  //Check for the currently Dragged StickyNote
  if (e.target.classList.contains("sn-content") && !e.target.parentNode.classList.contains("dragging") )
  {
    var box = e.target.getBoundingClientRect();
    var offset = e.clientX-box.left-box.height/2;

    pos = {target: e.target.parentNode, offset: offset}
    currentGParent = dragClone.parentNode;

    if(!currentBoard == pos.target.parentNode.parentNode) pos.target.parentNode.appendChild(dragClone);

    if (dragClone)
    {
      position(draggable,dragClone);
    }
  }
}

//On Releasing the Dragged Element
function onDrop(draggable){
  draggable.classList.remove("dragging");

  if (currentGParent) currentGParent.appendChild(draggable)

  //Drop the Sticky Note in place of Ghost Note
  position(draggable, draggable);

  dragClone.remove();
}

//Helper Function to Make Code smaller
function position(item,item2Bplaced){
  if (pos.offset > 0)
  {
    //Right
    try{item.parentNode.insertBefore(item2Bplaced, pos.target.nextSibling);}catch{return;}
  }
  else
  {
    //Left
    try{item.parentNode.insertBefore(item2Bplaced, pos.target);}catch{return;}
  }
}

//Refrences
//https://flatuicolors.com/palette/defo
