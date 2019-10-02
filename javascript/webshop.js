let method = "";
let category_id = "";

function prodClick(cat) {
    let clickevent = event.target.className.split(' ')[1];
    let id = cat.products.find(catProd => catProd.id == clickevent)
    console.log(id.name);
    alert(clickevent);
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
        let btncategory = document.createElement("button")
        btncategory.className = "product__button";

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


        catname.innerHTML = cat.name;
        catpricename.innerHTML = "Price";


        cattitles.appendChild(catname);
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

                prodcontainer.appendChild(productname);
                prodcontainer.appendChild(productPrice);
                category.appendChild(prodcontainer);

                productname.addEventListener("click", function() {
                    prodClick(cat);
                })
            })

        document.getElementById("products").appendChild(category);
    })

}

window.onload = function () {
    method = "categoriesWithProducts";
    api()
}