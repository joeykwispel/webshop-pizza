let orders = JSON.parse(localStorage.getItem("order"));

function deleteOrder(data) {
    orders.splice(data.target.dataset.id, 1);
    localStorage.setItem("order", JSON.stringify(orders));
}

function loadOrder() {
    const list = document.querySelector(".checkout__products");
    if (orders === null) {
        let button = document.querySelector(".checkout__btn");
        list.innerHTML = 'U heeft geen eten in uw winkelmandje. Voeg eten toe voor je verder kan gaan.';
        button.disabled = true;
        button.innerHTML = "DISABLED";
    } else {
        let i = 0;
        orders.forEach(order => {
            // Count foreach. Use for delete
            let prodName = order.name;
            let prodPrice = order.price;
            let Proditem = document.createTextNode(prodName + " Price: " + prodPrice + "$");
            let prodList = document.createElement("li");

            let prodButton = document.createElement("button");
            let prodButtontext = document.createTextNode("Delete");
            prodButton.dataset.id = i;

            prodButton.className = 'checkout__btn';
            prodList.className = 'checkout__text';

            prodButton.appendChild(prodButtontext);
            prodList.appendChild(Proditem);
            prodList.appendChild(prodButton);

            prodButton.addEventListener("click", function (E) {
                deleteOrder(E);
                E.path[1].remove();
                prodPutton.remove();
                E.preventDefault();
            })
            i++;
            list.appendChild(prodList);
        });
    }
}

window.onload = loadOrder();
