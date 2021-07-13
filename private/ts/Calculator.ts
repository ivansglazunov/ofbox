/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/jqueryui/jqueryui.d.ts" />
/// <reference path="typings/jquery.tooltipster/jquery.tooltipster.d.ts" />
/// <reference path="typings/socket.io-client/socket.io-client.d.ts" />
/// <reference path="typings/backbone/backbone.d.ts" />

export class Node extends Backbone.Model {
    
    constructor(
        public title: string,
        public price: number,
    
        // Колличество этого элемента.
        // Например - 10 серверов.
        public count: number = 1,
        
        // Разрешенность колличества > 1.
        public multiple: boolean = false,
        
        // Обязательный родиль.
        // Office может быть только на какой то OS. OS должна быть на каком то сервере.
        // Проставляется при конструировании.
        public strictParent?: Node
    ) {
        super();
    }
    
    // Вложенные элементы.
    content: NodesCollection;
    
    calculate(): number {
        return this.price * this.count;
    }
}

export class NodesCollection extends Backbone.Collection<Node> {
    calculate(): number {
       var counter: number = 0; 
       this.each((node: Node) => {
           counter += node.calculate();
       })
       return counter;
    }
}