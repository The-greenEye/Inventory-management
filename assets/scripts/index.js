// المتغيرات والقيم
let title = document.getElementById("title");
let deleted = document.getElementById("delete");
let price = document.getElementById("price");
let taxs = document.getElementById("taxs");
let descount = document.getElementById("descount");
let total = document.getElementById("total");
let category = document.getElementById("category");
let caunt = document.getElementById("caunt");
let search = document.getElementById("search");
let create = document.getElementById("create");
let tbody = document.getElementById("tbody");
let tbodyBtnUpdate = document.getElementById("tbody-update");
let tbodyBtnDelete = document.getElementById("tbody-delete");
let upMove = document.getElementById("move-up");
// نهاية المتغيرات
function pluseTotal() {
  let equalTotal = +price.value - +descount.value + +taxs.value;
  total.innerHTML = equalTotal;
}
// الاوامر
let data = [];
if (localStorage.dataProdecttion != null) {
  data = JSON.parse(localStorage.dataProdecttion);
} else {
  data = [];
}
create.onclick = function () {
  let dataopject = {
    title: title.value,
    price: price.value,
    taxs: taxs.value,
    descount: descount.value,
    category: category.value,
    caunt: caunt.value,
    total: total.innerHTML,
  };
  if (title.value != "" && price.value != 0 && category.value != "") {
    data.push(dataopject);
    if (caunt.value > 1) {
      for (let q = 1; q < caunt.value; q++) {
        data.push(dataopject);
      }
    }
  } else {
    setInterval(function () {
      title.style.borderBlockColor = "red";
      price.style.borderBlockColor = "red";
      category.style.borderBlockColor = "red";
      setTimeout(function () {
        title.style.borderBlockColor = "#ced4da";
        price.style.borderBlockColor = "#ced4da";
        category.style.borderBlockColor = "#ced4da";
      }, 3000);
    }, 100);
  }
  localStorage.dataProdecttion = JSON.stringify(data);
  create.innerHTML = "create";
  deleteInput();
  dataShow();
};
function deleteInput() {
  title.value = "";
  price.value = "";
  taxs.value = "";
  descount.value = "";
  category.value = "";
  caunt.value = "";
  total.innerHTML = "";
}
function dataShow() {
  let cartona = "";
  for (let i = 0; i < data.length; i++) {
    cartona += `
        <tr>
        <td>${i + 1}</td>
        <td>${data[i].title}</td>
        <td>${data[i].total}</td>
        <td>${data[i].category}</td>
        <td><button class="col-sm-0 btn btn-danger m-1"}' onclick="deleteFromeTable(${i})">delete</button></td>
        <td><button class="btn btn-warning mt-1" id="tbody-update" onclick="update(${i})">update</button></td>
    </tr>
        `;
  }
  tbody.innerHTML = cartona;
}
dataShow();
deleted.onclick = function () {
  data.splice(0);
  localStorage.removeItem("dataProdecttion");
  dataShow();
};
function deleteFromeTable(e) {
  data.splice(e, 1);
  localStorage.dataProdecttion = JSON.stringify(data);
  dataShow();
}
function update(i) {
  title.value = data[i].title;
  price.value = data[i].price;
  taxs.value = data[i].taxs;
  descount.value = data[i].descount;
  category.value = data[i].category;
  caunt.value = data[i].caunt;
  total.innerHTML = data[i].total;
  data.splice(i, 1);
  localStorage.dataProdecttion = JSON.stringify(data);
  create.innerHTML = "update";
  dataShow();
}
function serched(value) {
  let searchTab = "";
  for (let i = 0; i < data.length; i++) {
    if (data[i].title.includes(value)) {
      searchTab += ` 
      
     <tr>
     <td>${data[i].title}</td>
     <td>جنيه ${data[i].price}</td>
     <td>${data[i].descount}</td>
     <td>${data[i].total}</td>
     <td>${data[i].category}</td>
     <td>${data[i].caunt}</td>
     <td><button class="col-sm-0 btn btn-danger m-1"}' onclick="deleteFromeTable(${i})">delete</button></td>
     <td><button class="btn btn-warning mt-1" id="tbody-update" onclick="update(${i})">update</button></td>
 </tr>

     `;
    } else {
      searchTab = "404/NOT FUND?!";
    }
  }
  tbody.innerHTML = searchTab;
}
