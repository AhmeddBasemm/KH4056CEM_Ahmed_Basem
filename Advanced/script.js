
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

//Context Menu Buttons

// Adding click EventListener to the Context Menu Edit button
Editbtn.addEventListener("click", ()=> {
  advancedNote();
  contextmenu();
});

// Adding click EventListener to the Context Menu Delete button
Delbtn.addEventListener("click", ()=> {
  currentlyEditedSN.classList.add("ExitAnim");
  DelAfterAnim(currentlyEditedSN);
  contextmenu();
});

// Adding click EventListener to the Whole document to close the Context Menu
document.addEventListener("click", ()=>
{
  if (menu.style.display === "flex") menu.style.display = "none";
});

// Adding Scroll EventListener to the Whole document to close the Context Menu
document.addEventListener("scroll", ()=>
{
  if (menu.style.display === "flex") menu.style.display = "none";
});

//Advanced Editing Buttons

// Adding click EventListener to the Advanced Editing Save button
checkmark.addEventListener("click",advancedNote)

// Adding click EventListeners to the Advanced Editing Font buttons
Array.from(advancedBtns).forEach(function (btn) {
    btn.addEventListener("click",action, Event);
});


//-------------------------------Functions--------------------------------------
//Creation----------------------------------------------------------------------

//Create New Board Section
function CreateSection(){
  // Variable to hold the html of a basic Board
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

  // creating the fieldset container
  fs = document.createElement("fieldset")

  // Adding Classes to the fieldset container
  fs.classList.add("board-FS")
  fs.classList.add("animated")

  //Append the board base HTML inside the fieldset container
  fs.insertAdjacentHTML("beforeend",inner_HTML)

  //Fetch the close board button and add a click Event Listener to it
  fs.querySelector("#close").addEventListener("click", deleteBoard, Event)

  //Add click Event listners to all 'New Sticky Notes' buttons
  fs.querySelector(":last-child svg").addEventListener("click",CreateNote, Event);

  document.getElementsByClassName("board-div")[0].insertAdjacentElement("beforeend",fs);

  // Remove the animation class tag afer animation is done
  setTimeout(() => {fs.classList.remove("animated");},475)
  //475 miliseconds to seemlessly remove the class after the animation
}

//Create New Sticky Note
function CreateNote(e){

  // Store the pressed button to determine the correct board
  add_btn = e.target;

  // Create 2 divs for the sticky note
  var sn_div = document.createElement("div"); // larger Container
  var sn = document.createElement("div"); // Actual StickyNote

  //Adding Classes to the StickyNote container
  sn_div.classList.add("draggable"); // Drag enable Indicator
  sn_div.classList.add("animated"); // launch the onStart Animation
  sn_div.classList.add("sn-div-i"); //Apply Styling

  // Enabling SickyNote draggable attributte
  sn_div.setAttribute("draggable", "true");

  // Appending the Sticky Note into the container
  sn_div.appendChild(sn);

  //Styling the Actual Random Styling
  sn.classList.add("sn-content"); // Styling Class
  sty = Randomstyl(); //Returns a Random color, margin and rotation

  // Applying the random Values
  sn.style.margin = sty.margin;
  sn.style.transform = sty.transform;
  sn.style.background = sty.color;

  //Positioning the Sticky Note before the 'New Sticky Note' button
  add_btn.insertAdjacentElement("beforebegin", sn_div)

  //Features

  //Enabling the content editable attributte
  sn.setAttribute("contenteditable", "true");

  //Adding a Double click Event Listener to the sticky note container
  sn_div.addEventListener("dblclick", ()=>
  {
     // Update the currently Focused Sticky Note Variable
     currentlyEditedSN = sn;
     advancedNote();
  });

  //Adding a Right click Event Listener to the sticky note container
  sn_div.addEventListener('contextmenu', function(e){

    // Update the currently Focused Sticky Note Variable
    currentlyEditedSN = e.target;
    //Prevent Default Context Menu from Appearing
    e.preventDefault();
    contextmenu();
  });

  // Call the Drag Function on the Sticky Note container to setup Drag & Drop
  Drag(sn_div);
}

//Get Random Styles
function Randomstyl() {

    //Random Margin from the random_margin List
    margin = random_margin[Math.floor(Math.random() * random_margin.length)];


    //Random Rotation  from the random_rotate List
    rot = random_rotate[Math.floor(Math.random() * random_rotate.length)];

    //Check if the color_palette is Empty
    if (color_palette.length == 0)
    {
      // if empty fill the color_palette from the used color list
      color_palette = usedColors;
      // Empty the color list
      usedColors = [];
    }

    //Random Color from the random_color List
    random_color = color_palette[Math.floor(Math.random() * color_palette.length)];
    // Store the Used color in a the used colors list
    usedColors.push(random_color);

    // remove the used color from the main color palette
    color_palette.splice(color_palette.indexOf(random_color),1);

    //return the margin , rotation and color in object format
    return {margin:margin, transform:rot, color:random_color};
}

//Menu Togglers-----------------------------------------------------------------

//Toggle Context Menu
function contextmenu(){

  //Check The context menu display property to toggle display
  if (menu.style.display === "none")
  {
    //Set the css properties mouse x and y values
    menu.style.setProperty('--mouse-x', event.clientX + 'px')
    menu.style.setProperty('--mouse-y', event.clientY + 'px')

    //Set the display property to flex to view the menu
    menu.style.display = "flex";
  }
  else menu.style.display = "none";
}

//Toggle Advanced Editing Mode
function advancedNote() {

  //Check The Advanced Editing window display property to toggle display
  if (Sec_AdvStickyNote.style.display == "none"){

    // Mimic the Small Note data and style
    newNoteContent.innerHTML = currentlyEditedSN.innerHTML;
    newNoteContent.style.backgroundColor = currentlyEditedSN.style.backgroundColor;

    // Open Advanced Menu and Focus
    Sec_AdvStickyNote.style.display = "flex"
    newNoteContent.focus();
  }
  else{
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

//Dragging---------------------------------------------------------------------

//Dragging Functions
function Drag(draggable){

  //Get all Boards
  boards = document.getElementsByClassName('board-FS');

  // Add Drag start and End Event listeners on the draggable element
  draggable.addEventListener("dragstart",() => { onDragStart(draggable); });
  draggable.addEventListener("dragend",() =>{ onDrop(draggable); });

  // Loop over the boards and add a dragover Event Listener
  Array.from(boards).forEach(function (board) {
    board.addEventListener("dragover", function(e){ onDragOver(e, draggable); })
  })

}

//When Dragging Begins
function onDragStart(draggable){
  //Remove the Class animated from the draggable StickyNote
  draggable.classList.remove("animated");

  //Adding the dragging class to diffrentiate the dragged sticky note from others
  draggable.classList.add("dragging");
  currentBoard = draggable.parentNode.parentNode;

  //Create Ghost Note by cloning the dragged sticky note & changing its opacity
  dragClone = draggable.cloneNode(true);
  dragClone.style.opacity = "0.2"
}

//create a ghost preview element
function onDragOver(e, draggable){
  //Allow Dropping icon
  e.preventDefault()

  //Check for the currently Dragged StickyNote
  if (e.target.classList.contains("sn-content") && !e.target.parentNode.classList.contains("dragging") )
  {
    // Create a Rectangular bounding box to get the dimensions of the underlying stickyNote
    var box = e.target.getBoundingClientRect();

    // Calculating the offset between the mouse and the dragged over StickyNote element
    var offset = e.clientX-box.left-box.height/2;

    //Storing the current target position and offset in an object
    pos = {target: e.target.parentNode, offset: offset};
    //Storing the the ghost intial ParentNode (Board)
    currentGParent = dragClone.parentNode;

    //Check if the dragged over board is diffrent than the intial Board and transfrer the ghost to the correct board
    if(!currentBoard == pos.target.parentNode.parentNode) pos.target.parentNode.appendChild(dragClone);

    // Check if the DragClone has a value and not Null
    if (dragClone)
    {
      // A function to position the draggable in the position of the Ghost Node
      position(draggable,dragClone);
    }
  }

}

//On Releasing the Dragged Element
function onDrop(draggable){
  // Remove the Dragging indicator class
  draggable.classList.remove("dragging");

  //Append the dropped note to the right board if available
  if (currentGParent) currentGParent.appendChild(draggable)

  //position the Ghost Note in place of expected Sticky Note drop position
  position(draggable, draggable);

  //Delete the Ghost Node (clone)
  dragClone.remove();
}

//Helper Function to Make Code smaller
function position(item,item2Bplaced){
  // Check if the position offset is more or less than 0
  if (pos.offset > 0)
  {
    //Right
    //Insert the item to be placed to right of item
    try{item.parentNode.insertBefore(item2Bplaced, pos.target.nextSibling);}catch{return;}
  }
  else
  {
    //Left
    //Insert the item to be placed to left of item
    try{item.parentNode.insertBefore(item2Bplaced, pos.target);}catch{return;}
  }
}

//Deletion---------------------------------------------------------------------

//Function to Delete an item after Almost 500ms
function DelAfterAnim(item){
  // A timeout function to wait for animation then seemlessly delete an element
  setTimeout(() =>
  {
    item.parentNode.parentNode.removeChild(item.parentNode)
  }, 475)
}

//Function to Delete a board
function deleteBoard (e){
  //Confirm deletion from user
  if (confirm("Are you Sure that u want to delete this board")){
    //Add Exiting Animation class to the board
    e.target.parentNode.parentNode.classList.add("ExitAnim");

    // Wait fot animation to finish and delete board seemlessly
    DelAfterAnim(e.target.parentNode);
  }
}

//Refrences---------------------------------------------------------------------
//https://flatuicolors.com/palette/defo
