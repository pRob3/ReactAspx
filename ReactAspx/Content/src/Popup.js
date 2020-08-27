"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popup = void 0;
const React = require("react");
class Popup extends React.Component {
    constructor(state) {
        super(state);
        this.state = { items: null, myOrder: null, showPopup: false, userId: 0, orderPlaced: false };
        this.placeOrder = this.placeOrder.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }
    placeOrder() {
        var xhr = new XMLHttpRequest();
        xhr.open('post', "/data/PlaceOrder/" + this.props.userId, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                this.props.handlerFromParent(false, true);
            }
        }.bind(this);
        xhr.send(JSON.stringify(this.props.myOrder));
    }
    closePopup() {
        this.props.handlerFromParent(false, false);
    }
    render() {
        var total = 0;
        var totalMsg = '';
        let myCart = this.props.myOrder || [];
        var myItems = myCart.map(function (menu) {
            total += menu.Price * menu.Quantity;
            return (React.createElement("div", { key: menu.Id },
                menu.Name,
                ", Qty: ",
                menu.Quantity));
        }, this);
        return (React.createElement("div", { className: 'popup' },
            React.createElement("div", { className: 'popup_inner' },
                React.createElement("div", { style: { height: '35px', fontSize: '18' } },
                    React.createElement("b", null, "Order from Bubblan's Restautrant"),
                    React.createElement("hr", null)),
                React.createElement("div", { className: 'foodList' }, myItems),
                React.createElement("div", { style: { height: '35px' } },
                    React.createElement("hr", null),
                    "Total = $",
                    (Math.round(total * 100) / 100).toFixed(2)),
                React.createElement("div", { style: { height: '25px' } }, "Tax = 0"),
                React.createElement("div", { className: 'grandSum' },
                    "Grand Total: $",
                    (Math.round(total * 100) / 100).toFixed(2)),
                React.createElement("div", { className: 'payment' }, "Payment:  [Cedit Card on file will be Charged!]"),
                React.createElement("div", { style: { height: '20px' } }, "Deliver to: [address on file]"),
                React.createElement("div", { className: 'delivEstimate' }, "Delivery estimates: 20 - 40 minutes"),
                React.createElement("div", { style: { bottom: '11px' } },
                    React.createElement("button", { className: "greenBtn a_left", onClick: this.placeOrder }, "Submit Order"),
                    React.createElement("button", { className: "greenBtn a_right", onClick: this.closePopup }, "Back")))));
    }
}
exports.Popup = Popup;
//# sourceMappingURL=Popup.js.map