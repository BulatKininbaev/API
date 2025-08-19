


function display(menu){
let a = document.getElementById('inputinfo').style.display;
document.getElementById('dinamikblock').style.display = 'none';
document.getElementById('inputinfo').style.display = 'block';
document.getElementById('idlist').style.visibility = (menu === 'delete'||menu==='edit')?'visible':'hidden';
document.getElementById('fiolist').style.visibility = (menu === 'find'|| menu ==='add'|| menu === 'edit')?'visible':'hidden';
document.getElementById('phonelist').style.visibility = (menu === 'add'|| menu === 'edit')?'visible':'hidden';
document.getElementById('commentlist').style.visibility = (menu === 'add'|| menu === 'edit')?'visible':'hidden';


switch (menu) {
  case "delete":
      document.getElementById('btnmenu').textContent = 'Удалить';
      break;
  case "find":
      document.getElementById('btnmenu').textContent = 'Найти';
      break;
  case "add":
      document.getElementById('btnmenu').textContent = 'Добавить';
      break;
  case "edit":  document.getElementById('btnmenu').textContent = 'Редактировать';
}



}

function DoSomething(menu){
    let menu_btn = document.getElementById('btnmenu').textContent;

switch (menu_btn) {
    case "Добавить" :
            AddList();
            break;
    case "Найти":
            FindContact()
            break;
    case "Редактировать":
            EditList();
            break;
    case "Удалить":
            DeleteList();
            break;

}

}


function GetAbout(){
    let element = document.getElementById("dinamikblock");

    const apiUrl = ' http://127.0.0.1:8000/api/about';

fetch(apiUrl)
.then(function (response) {
	// The API call was successful!
	return response.text();
}).then(function (html) {
	// This is the HTML from our response as a text string
	element.innerHTML =  html;
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});
document.getElementById('dinamikblock').style.display = 'block';
document.getElementById('inputinfo').style.display = 'none';

}




function LoadList(){
    let element = document.getElementById("dinamikblock");

    const apiUrl = ' http://127.0.0.1:8000/api/loadlist';

fetch(apiUrl)
.then(function (response) {
	// The API call was successful!
	return response.text();
}).then(function (html) {
	// This is the HTML from our response as a text string
	element.innerHTML =  html;
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});
document.getElementById('dinamikblock').style.display = 'block';
document.getElementById('inputinfo').style.display = 'none';

}

function GetList(){
    let element = document.getElementById("dinamikblock");

    const apiUrl = ' http://127.0.0.1:8000/api/list';

fetch(apiUrl)
.then(function (response) {
	// The API call was successful!
	return response.text();
}).then(function (html) {
	// This is the HTML from our response as a text string
	element.innerHTML =  html;
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});
document.getElementById('dinamikblock').style.display = 'block';
document.getElementById('inputinfo').style.display = 'none';

}

function AddList(){

    const apiUrl = ' http://127.0.0.1:8000/api/list';

    let fio = document.getElementById('fiolist').value;
    let phone = document.getElementById('phonelist').value;
    let comment = document.getElementById('commentlist').value;

    let  contactinfo = {"id":0,"fio":fio,"phone":phone,"comment":comment};
fetch(apiUrl, {
  method: "POST",
  body: JSON.stringify(contactinfo),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
  })
  .then((response) => response.json())
  .then((json) => console.log(json));

document.getElementById('inputinfo').style.display = 'block';
document.getElementById('inputinfo').style.display = 'none';

}

function FindContact(){
    let element = document.getElementById("dinamikblock");
    let fio = document.getElementById('fiolist').value;

    const apiUrl = 'http://127.0.0.1:8000/api/find?fio='+fio;

fetch(apiUrl)
.then(function (response) {
	// The API call was successful!
	return response.text();
}).then(function (html) {
	// This is the HTML from our response as a text string
	element.innerHTML =  html;
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});
document.getElementById('dinamikblock').style.display = 'block';
document.getElementById('inputinfo').style.display = 'none';

}

function EditList(){


    let id = document.getElementById('idlist').value;
    let fio = document.getElementById('fiolist').value;
    let phone = document.getElementById('phonelist').value;
    let comment = document.getElementById('commentlist').value;
    const apiUrl = ' http://127.0.0.1:8000/api/list/'+id.toString();
    if (phone.length===0) {
        phone='80000000000';
    }

    let  contactinfo = {"id":id,"fio":fio,"phone":phone,"comment":comment};
fetch(apiUrl, {
  method: "PUT",
  body: JSON.stringify(contactinfo),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
  })
  .then((response) => response.json())
  .then((json) => console.log(json));

document.getElementById('inputinfo').style.display = 'block';
document.getElementById('inputinfo').style.display = 'none';

}

function DeleteList(){


    let id = document.getElementById('idlist').value;
    const apiUrl = ' http://127.0.0.1:8000/api/list/'+id.toString();

fetch(apiUrl, {
  method: "DELETE",
  body: JSON.stringify(''),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
  })
  .then((response) => response.json())
  .then((json) => console.log(json));

document.getElementById('inputinfo').style.display = 'block';
document.getElementById('inputinfo').style.display = 'none';

}
