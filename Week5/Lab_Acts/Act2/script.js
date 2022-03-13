btn = document.getElementById('btn');
divv = btn.parentNode;

divv.addEventListener("click", function()
{
  divv.classList.toggle("circle");
  divv.classList.toggle("square");

  if (divv.classList.contains("square")) btn.innerHTML = "I'm a square Now !";
  else if (divv.classList.contains("circle")) btn.innerHTML = "I'm a Circle Now !";

});
