let method = "";
let category_id = "";

window.onload = function () {
    method = "categoriesWithProducts";
    api()
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
        btncategory.className = "menu__button";

        let category = document.createElement("article")
        category.className = "menu__items";

        let catcontainer = document.createElement("div")
        catcontainer.className = "menu__container";
        let catname = document.createElement("h3")
        catname.className = "menu__name";


        catname.innerHTML = cat.name;



        catcontainer.appendChild(catname);
        category.appendChild(catcontainer);

            cat.products.forEach(catProd => {
                let productname = document.createElement("p");
                productname.className = "product__name" + cat.name;
                productname.innerHTML = catProd.name;
                catcontainer.appendChild(productname);
            })

        document.getElementById("products").appendChild(category);
    })

}