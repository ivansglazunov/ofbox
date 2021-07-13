/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/jqueryui/jqueryui.d.ts" />
/// <reference path="typings/jquery.tooltipster/jquery.tooltipster.d.ts" />
/// <reference path="typings/socket.io-client/socket.io-client.d.ts" />
/// <reference path="typings/backbone/backbone.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function (require, exports) {
    var Node = (function (_super) {
        __extends(Node, _super);
        function Node(title, price, 
            // Колличество этого элемента.
            // Например - 10 серверов.
            count, 
            // Разрешенность колличества > 1.
            multiple, 
            // Обязательный родиль.
            // Office может быть только на какой то OS. OS должна быть на каком то сервере.
            // Проставляется при конструировании.
            strictParent) {
            if (count === void 0) { count = 1; }
            if (multiple === void 0) { multiple = false; }
            _super.call(this);
            this.title = title;
            this.price = price;
            this.count = count;
            this.multiple = multiple;
            this.strictParent = strictParent;
        }
        Node.prototype.calculate = function () {
            return this.price * this.count;
        };
        return Node;
    })(Backbone.Model);
    exports.Node = Node;
    var NodesCollection = (function (_super) {
        __extends(NodesCollection, _super);
        function NodesCollection() {
            _super.apply(this, arguments);
        }
        NodesCollection.prototype.calculate = function () {
            var counter = 0;
            this.each(function (node) {
                counter += node.calculate();
            });
            return counter;
        };
        return NodesCollection;
    })(Backbone.Collection);
    exports.NodesCollection = NodesCollection;
});
