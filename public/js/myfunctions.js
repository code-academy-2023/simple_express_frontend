function loadPage(page){
    console.log("Sivua pyydetty");
     const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          document.getElementById("content").innerHTML=this.responseText;
      }
      else {
          console.log("Can not get data"); 
      }
    }
    xhttp.open("GET", page);
    xhttp.send();   
}
window.onload=function loadMainPage(){
    //kutsutaan aina kun sivu ladataan
    loadPage('mainpage.html');
}
function showLanguage(){
	var select=document.getElementById("source_language");
	//console.log(select);
	var source_language=select.value;
	console.log(source_language);
	var target_language=document.getElementById("target_language");
	target_language.value=source_language;
}

function showPhone(phone){
	console.log(phone);
	var target_phone=document.getElementById("target_phone");
	target_phone.value=phone;
}