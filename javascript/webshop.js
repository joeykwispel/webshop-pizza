let method = "";
let category_id = "";
let selected = {
    order: []
}

document.querySelector(".navbar__shoppingcart").addEventListener("click", function () {
    let x = document.querySelector(".shoppingcart__info");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
})


function checkOrder() {
    if (localStorage.getItem("selected") != undefined) {
        selected = JSON.parse(localStorage.getItem("selected"));
        console.log(selected);
    }
    else {
        console.log("Geen bestelling");
    }
}

function orderProds(catProd) {
    let check = selected.order.find(e => e.name === catProd.name);
    
    if (check == undefined) {
        catProd['amount'] = 1;
        selected.order.push(catProd);
    }
    else {
        catProd['amount'] = check.amount;
        catProd['amount']++;
        check.amount = catProd['amount'];
    }
    
    
    localStorage.setItem("selected", JSON.stringify(selected));
}

function shoppingCart() {
    document.querySelector('.shoppingcart__total').innerHTML = "";
    document.querySelector('.cart__items').innerHTML = "";
    a = selected.order;
    a.forEach(data => {
        let shopitem = document.createElement("li")
        shopitem.className = "cart__prod";

        let x = document.querySelector(".cart__items")
        let btnMin = document.createElement("button")
        btnMin.className = "cart__min";
        btnMin.innerHTML = "-";
        let btnPlus = document.createElement("button")
        btnPlus.className = "cart__plus";
        btnPlus.innerHTML = "+";
        x.appendChild(shopitem);
        x.appendChild(btnPlus);
        x.appendChild(btnMin);

        shopitem.innerHTML = data.name + " "  + data.amount + " x " + "$" + data.price;


    });
    let total = 0;
    let counter = 0;

    selected.order.forEach(info => {
        counter++
        total += parseFloat(info.price * info.amount);
    })
    let totalPriceElement = document.querySelector(".shoppingcart__total");
    if (counter == 0) {
        totalPrice = document.createTextNode("Shopping cart is empty");
    }
    else {
        totalPrice = document.createTextNode("The total price is: " + "$" +total);
    }

    totalPriceElement.appendChild(totalPrice);
    
    // let prodTotal = data.amount * data.price;
    // console.log(prodTotal);
    
    // let totalprice = document.querySelector(".shoppingcart__total");
    // totalprice.innerHTML = "$" + prodTotal;
    // let totalprice = document.querySelector(".shoppingcart__total");
    // let sum = 0;
    
    // for (let i = 0; i < price.length; i++) {
    //     sum += Math.max(price[i]);
    // }
    
}


function api() {
    fetch(`https://competa-api.dev.competa.com/api/${method}`).then(result => {
        return result.json();
    })
        .then(function (categories) {
            categoryAdd(categories);
        })
}

function categoryAdd(cat) {
    cat.forEach(cat => {
        if (cat.products.length > 0) {

            let category = document.createElement("article")
            category.className = "product__items";

            let catcontainer = document.createElement("div")
            catcontainer.className = "product__container";

            let cattitles = document.createElement("div")
            cattitles.className = "product__title";

            let catpricename = document.createElement("h3")
            catpricename.className = "product__pricename";

            let catname = document.createElement("h3")
            catname.className = "product__nametitle";

            let catdesc = document.createElement("h3")
            catdesc.className = "product__description";


            catname.innerHTML = cat.name;
            catpricename.innerHTML = "Price";
            catdesc.innerHTML = "Description";


            cattitles.appendChild(catname);
            cattitles.appendChild(catdesc);
            cattitles.appendChild(catpricename);
            category.appendChild(cattitles);
            category.appendChild(catcontainer);


            cat.products.forEach(catProd => {
                let prodcontainer = document.createElement("div")
                prodcontainer.className = "product__contain";

                let productname = document.createElement("p");
                productname.className = "product__name " + catProd.id;
                productname.innerHTML = catProd.name;
                catcontainer.appendChild(productname);

                let productPrice = document.createElement("p");
                productPrice.className = "product__price";
                productPrice.innerHTML = catProd.price + "$";
                catcontainer.appendChild(productPrice);

                let productdesc = document.createElement("p");
                productdesc.className = "product__desc";
                productdesc.innerHTML = catProd.description;
                catcontainer.appendChild(productdesc);

                prodcontainer.appendChild(productname);
                prodcontainer.appendChild(productdesc);
                prodcontainer.appendChild(productPrice);
                category.appendChild(prodcontainer);

                productname.addEventListener("click", function () {
                    shoppingCart();
                    orderProds(catProd)
                })
            })

            document.getElementById("products").appendChild(category);
        }
    })

}

window.onload = function () {
    method = "categoriesWithProducts";
    api()
    checkOrder();
    shoppingCart();
}
