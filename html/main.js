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

let boardObj = [[],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                []];

let turn = 0;

init();

//初期化関数
function init(){
    const div = document.createElement("div");
    document.body.appendChild(div);
    for(let y = 0; y < height; y++){
        let rowDiv = document.createElement("div");
        for(let x = 0; x < width; x++){
            let cell = document.createElement("input");
            cell.setAttribute("type", "image");
            cell.width = 32;
            cell.height = 32;
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
                checkPutFirstEnable([y, x, cell].slice());
            }, false);
            rowDiv.appendChild(cell);
            boardObj[y][x] = cell;
        }
        div.appendChild(rowDiv);
    }
}

//おけるかチェック(初回)
function checkPutFirstEnable(position){
    let enable;

    //もう置かれているか山か
    if(board[position[0]][position[1]] != 1){
        return false;
    }

    //一応その場におけるので
    for(let i = -1; i <= 1; i++){
        for(let j = -1; j <= 1; j++){
            enable = checkPutEnable(position.slice(), [i, j]) || enable;
        }
    }

    if(enable){
        turn = 1 - turn;
    }
}

//おけるかチェック
function checkPutEnable(position, next){
    let counter = 0;
    let originPosition = position.slice();

    position[0] += next[0];
    position[1] += next[1];

    //操作方向に相手のコマの数を確認
    while(board[position[0]][position[1]] == 3 - turn){
        //次の座標を指定
        position[0] += next[0];
        position[1] += next[1];
        counter++;
    }

    //ひっくり返せるとき
    if(counter > 0 && board[position[0]][position[1]] == turn + 2){
        while(position[0] != originPosition[0] || position[1] != originPosition[1]){
            originPosition[2] = boardObj[originPosition[0]][originPosition[1]];
            putStone(originPosition, turn + 2);
            originPosition[0] += next[0];
            originPosition[1] += next[1];
        }
        return true;
    }

    return false;
}

//石を置く
function putStone(position, type){
    if(type == 2){
        position[2].setAttribute("src", "player1.png");
    }
    if(type == 3){
        position[2].setAttribute("src", "player2.png");
    }
    board[position[0]][position[1]] = type;
}