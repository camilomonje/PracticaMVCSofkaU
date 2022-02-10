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

(function(){
    self.Ball = function(x,y,radius,board){ // Se crea la clase BALL
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed_y = 0;
        this.speed_x = 3;
        this.board = board;
        board.ball = this;
        this.kind = "circle";
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

(function(){  //Se crea clase para dibujar en pantalla.
    self.BoardView = function(canvas,board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }

    self.BoardView.prototype = { //Se crea para llamar la funcion draw y parsarle los elementos.
        clean: function(){
            this.ctx.clearRect(0,0,board.width,board.height);
        },
        draw: function(){
            for(var i = this.board.elements.length -1; i>= 0; i--){
                var el = this.board.elements[i];
                draw(this.ctx,el);
            }
        },
        play : function(){
            this.clean();
            this.draw();
        }
    }

    function draw(ctx,element){ //Dibuja el elemento.        
        switch(element.kind){
            case "rectangle":
                ctx.fillRect(element.x,element.y,element.width,element.height);
                break;
            case "circle":
                ctx.beginPath();
                ctx.arc(element.x,element.y, element.radius,0,7);
                ctx.fill();
                ctx.closePath();
                break;
            }
    
    }

    
})();

var board = new Board(800,400); //Se instancia y se le dan los parametros de la clase board
var bar = new Bar(20,100,40,100,board); //Se crea el objeto bar para crear el rectangulo
var bar_2 = new Bar(735,100,40,100,board); //Se crea el objeto bar para crear el rectangulo
var canvas = document.getElementById('canvas'); //Se obtiene el elemento canvas del html
var board_view = new BoardView(canvas,board); //Se instancia la clase BoardView y se utiliza el controlador.
var ball = new Ball(350,100,10, board); //Se instancia la clase Ball 

document.addEventListener("keydown",function(ev){
    ev.preventDefault();
    if(ev.keyCode == 38) {
        bar.up();
    }else if (ev.keyCode == 40){
        bar.down();
    }
    // Tecla W
    else if (ev.keyCode == 87){ 
        bar_2.up();
    }//Tecla S
    else if (ev.keyCode == 83){
        bar_2.down();
    }


    console.log("1. " + bar);
    console.log("2. " + bar_2);
});

window.requestAnimationFrame(controller);

function controller(){
    board_view.play();
    window.requestAnimationFrame(controller);

}

