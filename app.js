const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");

// canvas.width = 700;      // 인강처럼 할 때에 선그릴때 좌표 벗어나는 오류
// canvas.heigth = 700;
canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;


ctx.strokeStyle = "#2c2c2c";    // 선 색상 옵션
ctx.lineWidth = 2.5;        // 선 넓이

let painting = false; 

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    // console.log(event);
    const x = event.offsetX;
    const y = event.offsetY;
    // console.log(x, y);

    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);   // path의 이전의 위치에서 지금에 위치까지 선을 만든다.
        ctx.stroke();   // 획을 긋는 작업
        // ctx.closePath()  // 이 함수 사용시 시작점부터 계속 새로운 지점까지 직선이 생긴다.
    }

}

// function onMouseUp(event) {
//     stopPainting();
// }

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))     // 버튼 갯수만큼 배열을 만들어 각각에 이벤트를 걸어준다.



