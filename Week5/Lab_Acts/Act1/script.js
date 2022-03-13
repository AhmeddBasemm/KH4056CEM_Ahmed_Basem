function makeVis()
{
  eye = document.getElementById('togglebtn');
  inp = document.getElementsByClassName('myinput')[0];

  eye.classList.toggle("fa-eye-slash")

  if (inp.getAttribute("type") == "password") inp.setAttribute("type", "text");
  else if (inp.getAttribute("type") == "text") inp.setAttribute("type", "password");


}
