let selected = JSON.parse(localStorage.getItem("selected"));

function deleteOrder(data) {
    selected.order.splice(data.target.dataset.id, 1);
    localStorage.setItem("selected", JSON.stringify(selected));
    location.reload();
}



function loadOrder() {
    const list = document.querySelector(".checkout__products");
    if (selected === null) {
        let button = document.querySelector(".checkout__btn");
    } else {
        let i = 0;
        selected.order.forEach(order => {
            // Count foreach. Use for delete
            let prodName = order.name;
            let prodPrice = order.price;
            let prodAmount = order.amount;
            let priceAmount = order.amount * order.price;
            let Proditem = document.createTextNode(prodName + " Price: " + "$" + prodPrice + " x " + prodAmount + " = " + priceAmount);
            let prodList = document.createElement("li");

            let btnMin = document.createElement("button")
            btnMin.className = "cart__min";
            btnMin.innerHTML = "-";
            let btnPlus = document.createElement("button")
            btnPlus.className = "cart__plus";
            btnPlus.innerHTML = "+";
            list.appendChild(btnPlus);
            list.appendChild(btnMin);

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
    let total = 0;
    let counter = 0;

    selected.order.forEach(info => {
        counter++
        total += parseFloat(info.price * info.amount);
    })
    let totalPriceElement = document.querySelector(".checkout__totalprice");
    if (counter == 0) {
        totaltext = document.createTextNode("Shopping cart is empty");
    }
    else {
        totaltext = document.createTextNode("The total price is: " + total + "$");
    }

    totalPriceElement.appendChild(totaltext);
}

window.onload = function () {
    loadOrder();
    totalPrice();
}