const arr = Array(9).fill(0);
let step = 1;
//game field//
arr.forEach((item, index) => {
  const div = document.createElement("div");
  div.setAttribute("data-n", index);
  ttt.append(div);
});

function click(event) {
  //получаю номер элемента по которому кликаю//
  const n = +event.target.getAttribute("data-n");
  if (arr[n] !== 0) return;
  arr[n] = step;
  draw();
  checkWinner(step);
  step =(step === 1) ? 2 : 1; //если step равен 1 то ставим два .если нет ставим 1//
}
const tttDiv = document.querySelectorAll("#ttt>div"); //получаем все дивы внутри игрового поля//
function draw() {
  arr.forEach((item, index) => {
    switch (item) {
      case 1:
        tttDiv[index].textContent = 'X' ;
        break;
      case 2:
        tttDiv[index].textContent ="0";
        break;
    }
  });
}
//выиграшные комбинации..//
function checkWinner(step) {
const winnerArr =['012','345','678','036','147','258','048','246'];
//массив индексов
let indexStep  = [];
arr.forEach((item,index) => {
    if(item === step) indexStep.push(index);
    for(let i = 0; i < winnerArr.length; i++) {
        const winPattern = winnerArr[i];
        let count = 0;
        winPattern.split('').forEach(item => {
         if(indexStep.includes(+item)) count++;
        });
        if (count === 3) {
           showWin(step);
           return;
        }

    }
    if(!arr.includes(0)) showDrow();
})
}
// функция Победаа !!!!!!!!!!!//
function showWin(step) {
    console.log ('win' + (step === 1 ? 'X' : '0'));
    ttt.removeEventListener('click',click);//после победы ставить знаки нельзя//
    ttt.style.opacity = 0.5;//после победы игровое поле меняет цвет//
    document.querySelector('.out').textContent = 'win' +(step === 1 ? 'X' : '0');
}
//Функция не победил ни выиграл = ничья//
function showDrow() {
    ttt.removeEventListener('click',click);
    ttt.style.opacity = 0.5;
    document.querySelector('.out').textContent = 'Draw';
}

ttt.addEventListener("click", click);
document.querySelector('.button-start-new-game').onclick = function() {
    location.reload();
}
