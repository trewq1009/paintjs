const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "2c2c2c";
const CANVAS_SIZE = 700;    // 크기 지정해서 변수사용 하면 됨, 지금은 오류로 인해 선언만 함

// canvas.width = 700;      // 인강처럼 할 때에 선그릴때 좌표 벗어나는 오류
// canvas.heigth = 700;
canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

ctx.fillStyle = "white";    // canvas 배경색 지정 (지정 안하면 배경이 투명으로 표현됨)
ctx.fillRect(0, 0, canvas.width, canvas.height);    // 기본 크기 색상 지정

ctx.strokeStyle = "INITIAL_COLOR";    // 선 색상 옵션
ctx.fillStyle = "INITIAL_COLOR";
ctx.lineWidth = 2.5;        // 선 넓이

// ctx.fillStyle = "green";    // 색상 지정
// ctx.fillRect(50, 20, 100, 40);      // x, y, width, height 순으로 값 지정 (x, y좌표랑 가로, 세로 크기)
// ctx.fillStyle = "purple";
// ctx.fillRect(80, 100, 100, 49);

let painting = false; 
let filling = false;

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
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    if(filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

}

function handleCM(event) {      // 우클릭 방지 함수
    event.preventDefault();
}

function handleSaveClick() {        // 파일 저장 함수
    const image = canvas.toDataURL("image/jpeg");       // 저장될 파일의 타입 지정을 안하면 png로 저장
    // console.log(image);
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]";              // 저장될 파일의 이름
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);       // 우클릭 방지 이벤트
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))     // 버튼 갯수만큼 배열을 만들어 각각에 이벤트를 걸어준다.


if(range) {
    range.addEventListener("input", handleRangeChange)
}


if(mode) {
    mode.addEventListener("click", handleModeClick);
}


if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}


