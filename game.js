let objectSize =32;// 1マスの正方形の幅
let blank =320;

//衝突判定
//マップの上を動く



//canvasの設定
let canvas = document.getElementById( 'canvas' );
canvas.width = 1000;    //canvasの横幅
canvas.height = 640;    //canvasの縦幅

//コンテキストを取得
let ctx = canvas.getContext( '2d' );

//画像のオブジェクトを作る
let moveCount =16;


let mapchip = new Image();
mapchip.src = 'images/mapChip.png';


let rabbit = new Object();//うさぎのオブジェクト生成
rabbit.img = new Image();
rabbit.img.src ='images/testrabbit3.png';
rabbit.x=blank +32+32*8;
rabbit.y=blank +64;
rabbit.left  =false;
rabbit.right =false;
rabbit.up    =false;
rabbit.down  =false;
rabbit.speed =2;




//マップの作成
let map = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1],
	[1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1],
	[1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1],
	[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1],
	[1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
	[1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
	[1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1],
	[1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
	[1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1],
	[1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1],
	[1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1],
	[1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1],
	[1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
	[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];













let key = new Object();//キー入力に関するオブジェクト生成
key.up = false;
key.down = false;
key.right = false;
key.left = false;



let grass = new Object();//草のオブジェクト生成
grass.img = new Image();
grass.img.src ='images/grass.png';

let mapObjects = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1],
	[1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1],
	[1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1],
	[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1],
	[1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
	[1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
	[1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1],
	[1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
	[1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1],
	[1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1],
	[1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1],
	[1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1],
	[1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
	[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

//let pics_src = new Array("images/kusa.png","images/halfkusa.png","");



//マップチップを表示（ひょうじ）する
addEventListener('load', function() {
    for (let y=0; y<map.length; y++) {
        for (let x=0; x<map[y].length; x++) {
            if ( map[y][x] === 0 ) ctx.drawImage( mapchip, 0, 0, 16, 16, 32 * x +blank, 32 * y , 32, 32 );
            if ( map[y][x] === 1 ) {
                ctx.drawImage( mapchip, 16, 0, 16, 16, 32 * x +blank, 32 * y , 32, 32 );
                ctx.drawImage( grass.img, 0, 0, 32, 32, 32 * x +blank, 32 * y , 32, 32 );
            }
        }
    }
}, false);

function draw() {//常時繰り返し呼び出される関数
    


    
	//キーボードが押された時、keydownfunc関数を呼び出す
	addEventListener( "keydown", keydownfunc );
    rabbitMove();
   
	
	//マップを描画
    for (let y=0; y<map.length; y++) {
        for (let x=0; x<map[y].length; x++) {
            if ( map[y][x] === 0 ) {
                ctx.drawImage( mapchip, 0, 0, 16, 16, 32 * x +blank, 32 * y , 32, 32 );
                if(mapObjects[y][x]===0){
                    ctx.drawImage( grass.img, 0, 0, 32, 32, 32 * x +blank, 32 * y , 32, 32 );
                }
                
            }
            if ( map[y][x] === 1 ) {
                ctx.drawImage( mapchip, 16, 0, 16, 16, 32 * x +blank, 32 * y ,32, 32 );
            }
        }
    }
    //うさぎを描画
    
    //うさぎを移動する関数を呼び出す
    ctx.drawImage( rabbit.img, rabbit.x, rabbit.y );


    //main関数を呼び出しループさせる
	requestAnimationFrame( draw );
}
requestAnimationFrame( draw );

//キーが押されたときに呼び出される関数
function keydownfunc( event ) {

    //押されたボタンに割り当てられた数値をkey_codeに代入
    let key_code = event.keyCode;

    if( key_code === 37 ){//左キーが押されたとき、key.leftをtrueにする
        key.left  = true;
        key.up    = false;
        key.down  = false;
        key.right = false;
    } 		
    if( key_code === 38 ){//上キー
        key.left  = false;
        key.up    = true;
        key.down  = false;
        key.right = false;
    } 		
    if( key_code === 39 ){//右キー
        key.left  = false;
        key.up    = false;
        key.down  = false;
        key.right = true;
    } 	
    if( key_code === 40 ){//下キー
        key.left  = false;
        key.up    = false;
        key.down  = true;
        key.right = false;
    } 

    //--この中は完成時削除する
    if( key_code === 32 ){//スペースキーで止まる
        key.left  = false;
        key.up    = false;
        key.down  = false;
        key.right = false;
    } 
    //--この中は完成時削除する
}

function rabbitMove(){
    let x = (rabbit.x/32)-(blank/32);
    let y = rabbit.y/32;
    if(moveCount==0){
        moveCount=objectSize/rabbit.speed;
       
        if( key.left   === true ) {
            if(x>0) {
                if(map[y][x-1] ===0){
                    rabbitMoveReset();
                    rabbit.left=true;
                }else rabbitMoveReset();
            }
        }
        if( key.right  === true ) {
            if(map[y][x+1] ===0){
                rabbitMoveReset();
                rabbit.right =true;
            }else rabbitMoveReset();
        }
                
        if( key.up     === true ) {
            if(y>0) {
                if(map[y-1][x] ===0){
                    rabbitMoveReset();
                    rabbit.up=true;
                }else rabbitMoveReset();
            }
        }
            
        if( key.down   === true ) {
            if(map[y+1][x] ===0){
                rabbitMoveReset();
                rabbit.down=true;
            }else rabbitMoveReset();
        }
    }else{
        moveCount--;
        if(rabbit.left==true){
            rabbit.x -=rabbit.speed;
            if(x>0){
                if(mapObjects[y][x-1] ===0){
                    mapObjects[y][x-1]=1;
                    ctx.clearRect((x-1)*32+blank, y*32, (x-1)*32+blank+32, y*32+32);
                }
            }
        }
        if(rabbit.right==true){
            rabbit.x += rabbit.speed;
            if(mapObjects[y][x+1] ===0){
                mapObjects[y][x+1]=1;
                ctx.clearRect((x+1)*32+blank, y*32, (x+1)*32+blank+32, y*32+32);
            }
        }
        if(rabbit.up==true){
            rabbit.y -= rabbit.speed;
            
            if(y>0){
                try{
                    if(mapObjects[y-1][x] ===0){
                        mapObjects[y-1][x]=1;
                        ctx.clearRect(x*32+blank, (y-1)*32, x*32+blank+32, (y-1)*32+32);
                    }
                }catch{

                }
                
            }
            
        }
        if(rabbit.down==true){
            rabbit.y += rabbit.speed;
            try{
                if(mapObjects[y+1][x] ===0){
                    mapObjects[y+1][x]=1;
                    ctx.clearRect(x*32+blank, (y+1)*32, x*32+blank+32, (y+1)*32+32);
                }
            }catch{

            }
            
        }
    }   
}


function rabbitMoveReset(){
    rabbit.left=false;
    rabbit.right=false;
    rabbit.up=false;
    rabbit.down=false;
}