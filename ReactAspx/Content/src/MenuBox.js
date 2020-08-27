"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuBox = void 0;
const React = require("react");
const Popup_1 = require("./Popup");
class MenuBox extends React.Component {
    constructor(state) {
        super(state);
        this.state = { items: null, myOrder: null, showPopup: false, userId: 0, orderPlaced: false };
        this.getLoginStatus();
        this.loadMenusFromServer();
        this.handleDataFromChild = this.handleDataFromChild.bind(this);
    }
    handleDataFromChild(popupShown, isOrderPlaced) {
        var tmp = this.state;
        if (isOrderPlaced) {
            tmp.myOrder = null;
            tmp.orderPlaced = true;
            tmp.showPopup = false;
        }
        else {
            tmp.orderPlaced = false;
            tmp.showPopup = false;
        }
        this.setState(tmp);
        document.getElementById('dvcart').style.visibility = 'visible';
    }
    getLoginStatus() {
        var xhr = new XMLHttpRequest();
        xhr.open('get', '/data/GetUserId/', true);
        xhr.onload = function () {
            var userid = parseInt(xhr.responseText);
            var tmp = this.state;
            tmp.userId = userid;
            this.setState(tmp);
        }.bind(this);
        xhr.send();
    }
    loadMenusFromServer() {
        var xhr = new XMLHttpRequest();
        xhr.open('get', '/data/GetMenuList/', true);
        xhr.onload = function () {
            var dataitems = JSON.parse(xhr.responseText);
            var tmp = this.state;
            tmp.items = dataitems;
            this.setState(tmp);
        }.bind(this);
        xhr.send();
    }
    addToCart(id) {
        if (this.state.userId < 1) {
            alert('Log in to continue!');
            return;
        }
        id--;
        var myCart = this.state.myOrder || [];
        var allItems = this.state.items;
        if (myCart.indexOf(allItems[id]) > -1) {
            var itemToOrder = myCart.find(m => m.Id === allItems[id].Id);
            itemToOrder["Quantity"] = itemToOrder["Quantity"] + 1;
        }
        else {
            var itemToOrder = allItems[id];
            itemToOrder["Quantity"] = 1;
            myCart.push(allItems[id]);
        }
        var tmp = this.state;
        tmp.myOrder = myCart;
        tmp.showPopup = false;
        this.setState(tmp);
    }
    removeFromCart(id) {
        if (this.state.userId < 1) {
            alert('Log in to continue!');
            return;
        }
        var myCart = this.state.myOrder || [];
        var allItems = this.state.items;
        myCart.splice(id, 1);
        var tmp = this.state;
        tmp.myOrder = myCart;
        this.setState(tmp);
    }
    continueOrder() {
        var tmp = this.state;
        tmp.showPopup = true;
        this.setState(tmp);
        document.getElementById('dvcart').style.visibility = 'hidden';
    }
    render() {
        let menus = this.state.items || [];
        var menuList = menus.map(function (menu) {
            return (React.createElement("div", { key: menu.Id },
                React.createElement("b", null,
                    menu.Name,
                    " "),
                "    ",
                React.createElement("br", null),
                React.createElement("img", { style: { width: '100px', float: 'left', margin: '5px' }, src: "/img/" + menu.Picture }),
                menu.Description,
                React.createElement("p", null),
                React.createElement("div", null,
                    "$",
                    menu.Price,
                    " | ",
                    React.createElement("a", { href: '#', onClick: this.addToCart.bind(this, menu.Id) }, "Add to cart")),
                React.createElement("hr", null)));
        }, this);
        var total = 0;
        var cartItemIndex = 0;
        let myCart = this.state.myOrder || [];
        var myItems = myCart.map(function (menu) {
            total += menu.Price * menu.Quantity;
            return (React.createElement("div", { key: menu.Id },
                React.createElement("img", { style: { width: '75px', float: 'left', margin: '5px' }, src: "/img/" + menu.Picture }),
                menu.Name,
                React.createElement("br", null),
                "Qty: ",
                menu.Quantity,
                React.createElement("br", null),
                "Price: $",
                menu.Price * menu.Quantity,
                " ",
                React.createElement("br", null),
                "| ",
                React.createElement("a", { href: '#', onClick: this.removeFromCart.bind(this, cartItemIndex++) }, "Remove"),
                React.createElement("hr", null)));
        }, this);
        var totalAndContinueLink = React.createElement("div", { className: "grandTotal cartEmpty" }, "Cart Empty!!");
        if (total > 0)
            totalAndContinueLink =
                React.createElement("div", { className: "grandTotal cartNotEmpty" },
                    "Grand Total: $",
                    total,
                    React.createElement("button", { className: "greenBtn continueOrder", onClick: this.continueOrder.bind(this) }, " Continue Order"));
        var cart = document.getElementById("dvcart");
        var menu = document.getElementById("dvmenu");
        if (this.state.orderPlaced)
            cart.innerHTML = '<div class="orderPlaced">Order Placed successfully</div>';
        if (this.state.userId < 1) {
            myItems = null;
            if (cart != null)
                cart.style.display = "none";
            if (menu != null)
                menu.style.flex = "0 0 85%";
        }
        else {
            if (cart != null)
                cart.style.display = "block";
            if (menu != null)
                menu.style.flex = "0 0 55%";
        }
        return (React.createElement("div", null,
            this.state.showPopup ?
                React.createElement(Popup_1.Popup, { handlerFromParent: this.handleDataFromChild, myOrder: this.state.myOrder, userId: this.state.userId }) : null,
            React.createElement("div", { id: "wrapper" },
                React.createElement("div", { id: "dvmenu" }, menuList),
                React.createElement("div", { id: "dvcart" },
                    React.createElement("div", { id: "cartContent" }, myItems),
                    totalAndContinueLink))));
    }
}
exports.MenuBox = MenuBox;
//# sourceMappingURL=MenuBox.js.map