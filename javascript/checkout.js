function loadOrder() {
    let orders = JSON.parse(localStorage.getItem("order"));
    let text = document.querySelector(".checkout__products");
    if(orders === null) {
        let button = document.querySelector(".checkout__btn");
        text.innerHTML = 'U heeft geen eten in uw winkelmandje. Voeg eten toe voor je verder kan gaan.';
        button.disabled = true;
        button.innerHTML = "DISABLED"
    }
    else {
        orders.forEach(order => {
            let checkoutInfo = document.createElement("p");
            checkoutInfo.className = "product__price";
                text.appendChild(checkoutInfo);
            text.innerHTML += `◦${order.name} / ${order.price}$ `
        });
    }
}

window.onload = loadOrder();
