(function(){ // Esta funcion anonima hace referencia a crear una clase Board --> Vista
    self.Board = function(width,height){
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }

    self.Board.prototype = { //Se crean funciones o metodos para el proto de la clase Board
        get elements(){
            var elements = this.bars;
            elements.push(this.ball);
            return elements; //Retorna las barras y la pelota 
        }
    }
})();

(function(){ //Clase para crear objetos dentro del board.
    self.Bar = function(x,y,width,height,board){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.kind = "rectangle";
        this.speed = 10; //Se creo la variable speed para sumar o restar esta cantidad a la posición
    }

    self.Bar.prototype = { //Se crea para subir o bajar el objeto creado con la clase Bar.
        down: function(){
            this.y += this.speed;
        },
        up: function(){
            this.y -= this.speed;
        },
        toString: function(){
            return "x: " + this.x + " y: " + this.y ;
        }
    }
})();

(function(){  //Se crea clase para dibujar en pantalla --> Controlador.
    self.BoardView = function(canvas,board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }

    self.BoardView.prototype = { //Se crea para llamar la funcion draw y parsarle los elementos.
        draw: function(){
            for(var i = this.board.elements.length -1; i>= 0; i--){
                var el = this.board.elements[i];
                draw(this.ctx,el);
            }
        }
    }

    function draw(ctx,element){ //Dibuja el elemento.
        if(element !== null && element.hasOwnProperty("kind")){    
            switch(element.kind){
                case "rectangle":
                    ctx.fillRect(element.x,element.y,element.width,element.height);
                    break;
            }
        }
    }

    
})();

var board = new Board(800,400); //Se instancia y se le dan los parametros de la clase board
var bar = new Bar(20,100,40,100,board); //Se crea el objeto bar para crear el rectangulo
var bar = new Bar(735,100,40,100,board); //Se crea el objeto bar para crear el rectangulo
var canvas = document.getElementById('canvas'); //Se obtiene el elemento canvas del html
var board_view = new BoardView(canvas,board); //Se instancia la clase BoardView y se utiliza el controlador.

document.addEventListener("keydown",function(ev){
    if(ev.keyCode == 38) {
        bar.up();
    }else if (ev.keyCode == 40){
        bar.down();
    }
    console.log(bar.toString());
});

addEventListener("load", main); // Se ejecuta la función main

function main(){
    console.log("Hola Mundo");
    console.log(board);
    board_view.draw();

}

