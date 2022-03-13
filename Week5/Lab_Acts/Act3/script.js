var num1 = document.getElementById("num1") ;
var num2 = document.getElementById("num2") ;

var result = document.getElementById("result") ;

var labelId =document.getElementById("label-id");
var mybutton =  document.getElementById("button");

mybutton.addEventListener("click" , Calculate) ;

function Calculate() {
  if(isNaN(num1.value) || isNaN(num2.value)) alert("Please Enter Twon Numbers");
  else
  {
     var resultOfDiv =  ( Number(num1.value) / Number(num2.value) ) * 100 ;

     result.value= resultOfDiv + " %" ;
     console.log(result.value) ;

     labelId.setAttribute("class" , "style-result");
     result.setAttribute("class" , "style-input");

  }

}
