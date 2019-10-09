let orders = JSON.parse(localStorage.getItem("order"));

function deleteOrder(data) {
    orders.splice(data.target.dataset.id, 1);
    localStorage.setItem("order", JSON.stringify(orders));
    location.reload();
}

function loadOrder() {
    const list = document.querySelector(".checkout__products");
    if (orders === null) {
        let button = document.querySelector(".checkout__btn");
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

function totalPrice() {
    const totalPriceElement = document.querySelector(".checkout__totalprice");
    let totalPrice = 0;
    let counter = 0;

    for (let order in orders) {
        counter++
        totalPrice += parseFloat(orders[order].price);
    }


    totalPriceElement.innerHTML = counter === 0 ? "Shoppingcart is empty" : "The total price is: $" + totalPrice;
}

window.onload = function () {
    loadOrder();
    totalPrice();
}