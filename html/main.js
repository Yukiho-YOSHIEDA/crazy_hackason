const div = document.createElement("div");
document.body.appendChild(div);

const width = 18;
const height = 12;

let board = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0],
             [0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0],
             [0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0],
             [0,0,0,0,0,0,1,1,1,1,3,2,1,1,1,1,0,0],
             [0,0,0,0,1,1,1,1,1,1,2,3,1,1,1,1,0,0],
             [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
             [0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            ];

let boardObj = [height, width];

let turn = 0;

init();

//初期化関数
function init(){
    for(let y = 0; y < height; y++){
        let rowDiv = document.createElement("div");
        for(let x = 0; x < width; x++){
            let cell = document.createElement("input");
            cell.setAttribute("type", "image");
            cell.width = 48;
            cell.height = 48;
            switch(board[y][x]){
                //山
                case 0:
                    cell.setAttribute("src", "glass.png");
                    break;
                //海
                case 1:
                    cell.setAttribute("src", "water.png");
                    break;
                //先手
                case 2:
                    cell.setAttribute("src", "player1.png");
                    break;
                //後手
                case 3:
                    cell.setAttribute("src", "player2.png");
                    break;
            }
            cell.addEventListener('click', function(){
                putStone([y, x, cell]);
            }, false);
            rowDiv.appendChild(cell);
            //boardObj[y][x] = cell;
        }
        div.appendChild(rowDiv);
    }
}

//おけるかチェック(初回)
function checkPutFirstEnable(potision){
    //もう置かれているか山か
    if(board[potision[0]][potision[1]] != 1){
        return false;
    }

    //一応その場におけるので
    for(let i = -1; i <= 1; i++){
        for(let j = -1; j <= 1; j++){
            checkPutEnable(potision, [i, j]);
        }
    }
}

//おけるかチェック
function checkPutEnable(potision, next){
    //ぶつかったところが山なら駄目
    if(board[potision[0]][potision[1]] == 0){
        return false;
    }

    //ぶつかったところが自分のところ
    if(board[potision[0]][potision[1]] == turn){
        return true;
    }

    potision[0] += next[0];
    potision[0] += next[1];

    //返却値がtrueのとき
    if(checkPutEnable(potision, next)){
        putStone(potision);
        return true;
    }

    return false;
}

//石を置く
function putStone(potision){
    if(board[potision[0]][potision[1]] == 0){
        potision[2].setAttribute("src", "player2.png");
    }else{
        potision[2].setAttribute("src", "player1.png");
    }
    board[potision[0]][potision[1]] = 1 - board[potision[0]][potision[1]];
}