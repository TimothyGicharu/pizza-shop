// Back-end

//size of pizza
//crust
//toppings
//place order
//delivery charge and location

/**
 * Pizza sizes
 * s = 500
 * m = 700
 * l = 1000
 * 
 * Toppings
 * olives = 30,40,50
 * tomatoes = 10,15,20
 * mushroom = 15,20,25
 * peppers = 20,25,30
 * 
 * Crust
 * Crispy = 100
 * Stuffed = 200
 * Gluten-free = 300
 * 
 * Total = size + toppings + crust + (delivery)
 */

var pizzaSizeCost = [500, 700, 1000]
var pizzaCrustCost = [100, 200, 300]
var pizzaToppings = new Map()
pizzaToppings['olives'] = [30, 40, 50]
pizzaToppings['tomatoes'] = [10, 15, 20]
pizzaToppings['mushrooms'] = [15, 20, 25]
pizzaToppings['pepper'] = [20, 25, 30]

function Order(pizza, size, crust, topping) {
    this.pizza = pizza;
    this.size = size;
    this.crust = crust;
    this.topping = topping;
}

function AddOrder(arg) {
    console.log(arg)

    //fetch orders that were already added
    var currentOrders = localStorage.getItem('orders')

    //if no orders added then initialize empty array
    if (currentOrders == null) {
        currentOrders = "[]"
    }

    //convert from string to array
    currentOrders = JSON.parse(currentOrders);
    //add new order
    currentOrders.push(arg);

    //save to storage as string
    localStorage.setItem('orders', JSON.stringify(currentOrders));

    updatePizzaCount();
}

function updatePizzaCount() {
    var currentOrders = localStorage.getItem('orders')
    var pizzaCount = 0

    if (currentOrders != null) {
        try {
            var pizzas = JSON.parse(currentOrders)
            pizzaCount = pizzas.length;
        } catch (error) {
            console.log(error)
        }
    }

    document.getElementById("pizzaCount").innerHTML = pizzaCount;
    calculateTotal()
}

function clearOrders() {
    localStorage.setItem('orders') = null
}

function calculateTotal() {
    //Total = size + toppings + crust
    var currentOrders = localStorage.getItem('orders')
    var orderTotal = 0

    if (currentOrders != null) {
        try {
            var pizzas = JSON.parse(currentOrders)

            pizzas.forEach(element => {
                var total = 0

                total += pizzaSizeCost[element.size]
                total += pizzaCrustCost[element.crust]

                element.topping.forEach(top => {
                    var topp = pizzaToppings[top]
                    total += topp[element.size]
                });

                orderTotal += total
            });
        } catch (error) {
            console.log(error)
        }
    }

    console.log(`Order Total ${orderTotal}`)
}

// Front-end

$(document).ready(function () {
    updatePizzaCount()

    //add order
    document.getElementById("addToOrder").addEventListener("click", function () {
        //get size 0=small 1=medium 2=large
        var opt = document.getElementById("pizzaType");
        var pizzaType = opt.options[opt.selectedIndex].text;
        console.log(pizzaType)

        //get size 0=small 1=medium 2=large
        var pizzaSize = document.getElementById("pizzaSize").selectedIndex;
        console.log(pizzaSize)

        //get crust 0=crispy 1=stuffed 2=gluten-free
        var crust = document.getElementById("pizzaCrust").selectedIndex;
        console.log(crust)

        //toppings
        var pizzaToppings = [];
        if (document.getElementById("olives").checked) pizzaToppings.push("olives");
        if (document.getElementById("tomatoes").checked) pizzaToppings.push("tomatoes");
        if (document.getElementById("mushrooms").checked) pizzaToppings.push("mushrooms");
        if (document.getElementById("pepper").checked) pizzaToppings.push("pepper");
        console.log(pizzaToppings)

        var order = new Order(pizzaType, pizzaSize, crust, pizzaToppings);
        AddOrder(order)

    });

    // write summary on checkout
    document.getElementById("clickTheNumber").addEventListener("click", function () {
        var opt = document.getElementById("pizzaType");
        var pizzaType = opt.options[opt.selectedIndex].text;
        var sizes = document.getElementById("pizzaSize")
        var pizzaSize = sizes.options[sizes.selectedIndex].text;
        var checkoutAlert = `Your order summary: ${pizzaType}, ${pizzaSize}`
        alert(checkoutAlert)
    })
})
