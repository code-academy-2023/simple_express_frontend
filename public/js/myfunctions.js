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