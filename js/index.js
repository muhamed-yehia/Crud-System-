var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDesc = document.getElementById('productDesc');
var productImg = document.getElementById('productImg');
var searchInput = document.getElementById('searchinput');
var updateBtn = document.getElementById('updateBtn');
var addBtn = document.getElementById('addBtn');
var productContainer;
var updatedIndex;


if (localStorage.getItem(`products`) == null) {
    productContainer = [];
}
else {
    productContainer = JSON.parse(localStorage.getItem(`products`))
    displayProduct()
}

function addProduct() {
    var product = {
        code: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDesc.value,
        image: `img/${productImg.files[0]?.name}`

    }
    productContainer.push(product)
    clearInput()
    displayProduct()
    localStorage.setItem(`products`, JSON.stringify(productContainer))
    console.log(productContainer)
}
function clearInput() {
    productName.value = null;
    productPrice.value = null;
    productCategory.value = null;
    productDesc.value = null;
    productImg.value = null;
}
function displayProduct() {
    var productInput = ``;
    for (var i = 0; i < productContainer.length; i++) {
        productInput += `<div class="text-center col-lg-2 col-md-3 col-sm-6">
        <h2 class="h6 text-white my-2">Name : ${productContainer[i].code}</h2>
        <h3 class="h6 text-white my-2">Price : ${productContainer[i].price}</h3>
        <p class="h6 text-light my-2 ">Category : ${productContainer[i].category}</p>
        <img src="${productContainer[i].image}" class="w-100 my-2" alt="">
        <h3 class="h6 text-white my-2">Desc : ${productContainer[i].desc}</h3>
        <button onclick= "setUpdateForm(${i})" class="btn btn-outline-success btn-sm my-2 w-100 ">update product</button>
        <button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm my-2 w-100 ">Delete product</button>

    </div>`
    }
    document.getElementById(`productInput`).innerHTML = productInput;

}
function deleteProduct(deletedIndex) {
    productContainer.splice(deletedIndex, 1)
    displayProduct()
    localStorage.setItem(`products`, JSON.stringify(productContainer))

}
function searchProducts() {
    var term = searchInput.value;
    var searchInputs = ``;

    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].code.toLowerCase().includes(term.toLowerCase())) {
            searchInputs += `<div class="text-center col-lg-2 col-md-3 col-sm-6">
        <h2 class="h6 text-white">Name : ${productContainer[i].code}</h2>
        <h3 class="h6 text-white">Price : ${productContainer[i].price}</h3>
        <p class="h6 text-light">Category : ${productContainer[i].category}</p>
        <img src="${productContainer[i].image}" class="w-100" alt="">
        <h3 class="h6 text-white">Desc : ${productContainer[i].desc}</h3>
        <button onclick="setUpdateForm(${i})" class="btn btn-outline-success btn-sm my-2 w-100 ">update product</button>
        <button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm my-2 w-100 ">Delete product</button>
    </div>`
        }
    }
    document.getElementById(`productInput`).innerHTML = searchInputs;
}

function setUpdateForm(i) {
    updatedIndex = i;
    addBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
    productName.value = productContainer[i].code;
    productPrice.value = productContainer[i].price;
    productCategory.value = productContainer[i].category;
    productDesc.value = productContainer[i].desc;
}


function update() {
    console.log(updatedIndex)
    productContainer[updatedIndex].code = productName.value;
    productContainer[updatedIndex].price = productPrice.value;
    productContainer[updatedIndex].category = productCategory.value;
    productContainer[updatedIndex].desc = productDesc.value;
    displayProduct()
    localStorage.setItem(`products`, JSON.stringify(productContainer))
    addBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');
    clearInput()
}

function validatInputs(element) {
    var regex = {
        productName: /^[A-Z][a-z]{2,9}$/,
        productPrice: /^[1-3][0-9][0-9][0-9]/,
        productDesc: /^.{3,9}$/,
        productCategory: /^(Mobiles|T.V|Laptops|screens)$/
    }

    if (regex[element.id].test(element.value) == true) {
        element.classList.add(`is-valid`);
        element.classList.remove(`is-invalid`);
        element.nextElementSibling.classList.replace('d-block', 'd-none');
    }
    else {
        element.classList.add(`is-invalid`);
        element.classList.remove(`is-valid`);
        element.nextElementSibling.classList.replace(`d-none`, `d-block`);
    }
    // if (productImg == null) {
    //     document.getElementById('productImg').nextElementSibling.classList.replace(`d-none`,`d-block`);
    //     document.getElementById('productImg').classList.remove(`is-valid`)
    //     document.getElementById('productImg').classList.add(`is-invalid`)
    // }
    // else{

    //     document.getElementById('productImg').nextElementSibling.classList.replace(`d-block`,`d-none`);
    //     document.getElementById('productImg').classList.add(`is-valid`)
    //     document.getElementById('productImg').classList.remove(`is-invalid`)
    // }
}