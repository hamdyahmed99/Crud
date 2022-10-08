let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = "create";
let tmp;
// console.log(title,price,ads,discount,total,count,category,submit);

//get total
function getTotal() {
    // console.log("done")
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }
    else {
        total.innerHTML = '';
        total.style.background = ' #a00d02'
    }

}


//create proudct
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
}
else {
    dataPro = [];
}

submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        category: category.value.toLowerCase(),
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,

    }
    // if (title.value != '' && price.value != '' && category.value != '') {
    if (mood === "create") {
        if (newPro.count > 1) {
            for (let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro);
            }
        }
        else {
            dataPro.push(newPro);
        }

    }
    else {
        dataPro[tmp] = newPro;
        mood = "create"; 0
        submit.innerHTML = "create";
        count.style.display = "block";
    }


    //save localStorage 
    localStorage.setItem('product', JSON.stringify(dataPro));
    clearData()
    showData()
    console.log(newPro);
}




//clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    ads.value = '';
    taxes.value = '';
    category.value = '';
    count.value = '';
    discount.value = '';
    total.innerHTML = '';
}


//red 
function showData() {
    let table = '';
    for (let i = 1; i < dataPro.length; i++) {
        table +=
            `<tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button id="update" onclick= "updateDate(${i})" >update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>`
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById("deleteAll");
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `<button onclick = "deleteAll(${dataPro.length})">Delete All</button>`
    }
    else {
        btnDelete.innerHTML = '';
    }
    getTotal()
}
showData()


//delete
function deleteData(i) {
    dataPro.splice(i, 1)
    localStorage.product = JSON.stringify(dataPro);
    showData()
    console.log(i)
}

//delete all
function deleteAll() {
    localStorage.clear()
    dataPro.splice(0)
    showData()
}


//count


//update Date

function updateDate(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    ads.value = dataPro[i].ads;
    taxes.value = dataPro[i].taxes;
    category.value = dataPro[i].category;
    discount.value = dataPro[i].discount;
    count.style.display = "none";
    submit.innerHTML = "Update";
    mood = "update"
    tmp = i;
    scroll({
        top: 0, behavior: 'smooth',
    })
    getTotal()
}

//search

let searchMood = 'title';
function getsearchMood(id) {
    let search = document.getElementById("search");
    if (id == "searchTitle") {
        searchMood = 'title';
        // search.placeholder = 'Search By Title'
    }
    else {
        searchMood = 'category';
        // search.placeholder = 'Search By Category'
    }
    search.placeholder = 'Search By ' + searchMood;
    // console.log(searchMood)
    search.focus()
    showData()
    search.value = '';
}

function searchDate(value) {
    let table = '';
    if (searchMood == 'title') {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table +=
                    `<tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button id="update" onclick= "updateDate(${i})" >update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`
            }
        }
    }
    else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table +=
                    `<tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button id="update" onclick= "updateDate(${i})" >update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}