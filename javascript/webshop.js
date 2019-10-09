let method = "";
let category_id = "";
let orders = localStorage.getItem("order");
let order = [];
let price = [];


document.querySelector(".navbar__shoppingcart").addEventListener("click", function(){
    var x = document.querySelector(".shoppingcart__info");
  if (x.style.display === "block") {
    x.style.display = "none";
} else {
    x.style.display = "block";
  }
})

function prodClick(cat) {
    console.log(cat);
    order.push(cat);
    localStorage.setItem("order", JSON.stringify(order));
}

function shoppingCart(catProd){
    let shopitem = document.createElement("li")
    shopitem.className = "cart__prod";

    shopitem.innerHTML = catProd.name + " " + catProd.price + "$";

    let x = document.querySelector(".cart__items")
    x.appendChild(shopitem);
    price.push(catProd.price);
    let totalprice = document.querySelector(".shoppingcart__total");
    let sum = 0;
    
    for (let i = 0; i < price.length; i++) {
        sum += Math.max(price[i]);
    }
    totalprice.innerHTML = "$" + sum;
}

function api() {
    fetch(`https://competa-api.dev.competa.com/api/${method}`).then(result => {
        return result.json();
    })
        .then(function (categories) {
            console.log(categories);
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
                    prodClick(catProd);
                    shoppingCart(catProd);
                })
            })

            document.getElementById("products").appendChild(category);
        }
        else {
            console.log(`${cat.name} heeft geen producten`);
        }
    })

}

window.onload = function () {
    method = "categoriesWithProducts";
    api()
}
