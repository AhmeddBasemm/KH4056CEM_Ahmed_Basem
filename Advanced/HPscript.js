// Get All Elements with the accordion Class
var acc = document.getElementsByClassName("accordion");
var i; //Looping Variable

// Loop through the accordion class elements
for (i = 0; i < acc.length; i++) {
    // add a click Event Listener to the elemnt
    acc[i].addEventListener("click", function() {

      /* Toggle between adding and removing the "active" class,
      to highlight the button that controls the panel */
      this.classList.toggle("active");

      // Toggle between hiding and showing the active panel
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") panel.style.display = "none";
      else panel.style.display = "block";
  });
}
