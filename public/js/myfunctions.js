const base_url="http://localhost:3000";

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

function allBooks(){
    let xmlBooks = new XMLHttpRequest();
    xmlBooks.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let books = JSON.parse(this.response);
            let row = "<ul>";
            books.map(book => {
                row += "<li key="+book.id_book+">" + book.name +", "+ book.author+"</li>"
            });
            row += "</ul>";
            document.getElementById("allbooks").innerHTML = row;
        }
        else {
            //console.log("Can not get data");
            document.getElementById("allbooks").innerHTML="Ei dataa";
        }
    }
    let url = base_url+"/book";
    xmlBooks.open("GET", url);
    let token=window.localStorage.getItem('myToken');
    console.log(token);
    xmlBooks.setRequestHeader('Authorization', "Bearer " + token);

    xmlBooks.send(); 
}

function addBook() {
    let name = document.getElementById("addname").value;
    let author = document.getElementById("addauthor").value;
    let postData =
        '{"name": "' + name + '", "author": "' + author + '" }';

    let xmlBooks = new XMLHttpRequest();
    xmlBooks.onreadystatechange = function () {
        if (xmlBooks.readyState == 4 && xmlBooks.status == 200) {
            document.getElementById('message').innerHTML = "Kirja lisättiin";
            allBooks();
        }
        else {
            document.getElementById('message').innerHTML = "Virhe tallennuksessa";
        }
    };
    let url = base_url+"/book";
    xmlBooks.open('POST', url, true);
    xmlBooks.setRequestHeader("Content-Type", "application/json");

    xmlBooks.setRequestHeader('Authorization', "Bearer " + window.localStorage.getItem('myToken'));
    xmlBooks.send(postData);
}

function login() {
    let userName = document.getElementById("uname").value;
    let passWord = document.getElementById("pass").value;
    let postData =
        '{"username": "' + userName + '", "password": "' + passWord + '" }';

    let url = base_url+"/login";
    let xmlLogin = new XMLHttpRequest();
    xmlLogin.onreadystatechange = function () {
        if (xmlLogin.readyState == 4 && xmlLogin.status == 200) {
            console.log(this.response);
            window.localStorage.setItem('myToken', this.response);
            //lenght of false =5
            if (window.localStorage.getItem('myToken').length == 5) {
                document.getElementById('message').innerHTML = "Wrong username/password";
            }
            else {
                document.getElementById('message').innerHTML = "Login Success";
            }
        }
        else {
            document.getElementById('message').innerHTML = "Something went wrong";
        }
    };
    xmlLogin.open('POST', url, true);
    xmlLogin.setRequestHeader("Content-Type", "application/json");
    xmlLogin.send(postData);
}
function logout(){
    window.localStorage.clear();
    document.getElementById('message').innerHTML = "You have logged out";
    document.getElementById("allbooks").innerHTML = "";
}