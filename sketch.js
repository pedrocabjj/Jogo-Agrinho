let heroi;
let arvores = [];
let lixo = [];
let poluicoes = [];
let pontos = 0;
let vidas = 3;
let gameOver = false;

function setup() {
  createCanvas(600, 400);
  heroi = new Heroi();

  // Criar elementos iniciais
  for (let i = 0; i < 5; i++) {
    arvores.push(new Arvore());
    lixo.push(new Lixo());
    poluicoes.push(new Poluicao());
  }
}

function draw() {
  background(100, 200, 100);

  if (gameOver) {
    textSize(32);
    fill(0);
    textAlign(CENTER);
    text("FIM DE JOGO!", width / 2, height / 2 - 20);
    text("Pontos: " + pontos, width / 2, height / 2 + 20);
    return;
  }

  heroi.mostrar();
  heroi.mover();

  // Mostrar árvores
  for (let a of arvores) {
    a.mostrar();
    if (heroi.coletou(a)) {
      pontos++;
      a.reiniciar();
    }
  }

  // Mostrar lixo
  for (let l of lixo) {
    l.mostrar();
    if (heroi.coletou(l)) {
      pontos += 2;
      l.reiniciar();
    }
  }

  // Mostrar poluição
  for (let p of poluicoes) {
    p.mostrar();
    if (heroi.coletou(p)) {
      vidas--;
      p.reiniciar();
      if (vidas <= 0) {
        gameOver = true;
      }
    }
  }

  // Mostrar HUD
  fill(255);
  textSize(16);
  text("Pontos: " + pontos, 10, 20);
  text("Vidas: " + vidas, 10, 40);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) heroi.dir = "esquerda";
  if (keyCode === RIGHT_ARROW) heroi.dir = "direita";
  if (keyCode === UP_ARROW) heroi.dir = "cima";
  if (keyCode === DOWN_ARROW) heroi.dir = "baixo";
}

function keyReleased() {
  heroi.dir = "";
}

// Classes do jogo

class Heroi {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.dir = "";
  }

  mostrar() {
    fill(0, 102, 204);
    rect(this.x, this.y, 30, 30);
  }

  mover() {
    if (this.dir === "esquerda") this.x -= 5;
    if (this.dir === "direita") this.x += 5;
    if (this.dir === "cima") this.y -= 5;
    if (this.dir === "baixo") this.y += 5;

    // Limites da tela
    this.x = constrain(this.x, 0, width - 30);
    this.y = constrain(this.y, 0, height - 30);
  }

  coletou(objeto) {
    let d = dist(this.x + 15, this.y + 15, objeto.x, objeto.y);
    return d < 25;
  }
}

class Arvore {
  constructor() {
    this.reiniciar();
  }

  reiniciar() {
    this.x = random(30, width - 30);
    this.y = random(30, height - 30);
  }

  mostrar() {
    fill(34, 139, 34);
    ellipse(this.x, this.y, 20, 20);
  }
}

class Lixo {
  constructor() {
    this.reiniciar();
  }

  reiniciar() {
    this.x = random(30, width - 30);
    this.y = random(30, height - 30);
  }

  mostrar() {
    fill(255, 255, 0);
    rect(this.x - 10, this.y - 10, 20, 20);
  }
}

class Poluicao {
  constructor() {
    this.reiniciar();
  }

  reiniciar() {
    this.x = random(30, width - 30);
    this.y = random(30, height - 30);
  }

  mostrar() {
    fill(100);
    ellipse(this.x, this.y, 25, 25);
  }
}
