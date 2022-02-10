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

(function(){  //Se crea clase para dibujar en pantalla --> Controlador.
    self.BoardView = function(canvas,board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }

    
})();

addEventListener("load", main); // Se ejecuta la función main

function main(){
    var board = new Board(800,400); //Se instancia y se le dan los parametros de la clase board
    var canvas = document.getElementById('canvas'); //Se obtiene el elemento canvas del html
    var board_view = new BoardView(canvas,board); //Se instancia la clase BoardView y se utiliza el controlador.

}

