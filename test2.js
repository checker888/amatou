let objectSize =32;// 1マスの正方形の幅
let blank =320;//マップの描画位置調整
let scene=0; //画面遷移　タイトル0 ゲーム1
let enemyPositionX =blank +32*9;
let enemyPositionY =320;

//canvasの設定
let canvas = document.getElementById( 'canvas' );
canvas.width = 960;    //canvasの横幅
canvas.height = 640;    //canvasの縦幅

//コンテキストを取得
let ctx = canvas.getContext( '2d' );
let font = new FontFace('美咲ゴシック', 'url(fonts/misaki_gothic_2nd.ttf)');






//マップのデータ生成
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

//衝突判定
//マップの上を動く





//画像のオブジェクトを作る
let moveCount =16;


let mapchip = new Image();
mapchip.src = 'images/mapChip.png';


let rabbit = new Object();//うさぎのオブジェクト生成
rabbit.img = new Image();
rabbit.img.src ='images/upRabbit1.png';
rabbit.x=blank +32*9;
rabbit.y=blank +32*2;
rabbit.moveDirection=2;//0左 1右 2上 3下
rabbit.left  =false;
rabbit.right =false;
rabbit.up    =false;
rabbit.down  =false;
rabbit.speed =2;


class foxClass {
    constructor(x,y,imgsrc){
        this.x=x;
        this.y=y;
        this.img = new Image();
        this.img.src = imgsrc;
        this.upImg;
        this.downImg;
        this.speed =2;
        this.left=false;
        this.right=false;
        this.up=false;
        this.down=false;
        this.moveCount = objectSize/this.speed;
    }
    move(){
        let fx = (this.x/32)-(blank/32);
        let fy = this.y/32;
        
        if(this.moveCount==0){
            this.moveCount=objectSize/this.speed;
            this.moveDirection = Math.floor(Math.random()*4);//0左 1右 2上 3下
           
            if(this.moveDirection==0){//左
                if(fx>0) {
                    if(map[fy][fx-1] ===0){
                        this.moveReset();
                        this.left=true;
                    }else {
                        this.moveReset();
                        this.moveCount=0;
                    }
                }
            }else if(this.moveDirection ==1){//右
                if(map[fy][fx+1] ===0){
                    this.moveReset();
                    this.right=true;
                }else {
                    this.moveReset();
                    this.moveCount=0;
                }
            }else if(this.moveDirection ==2){//上
                if(fy>0){
                    if(map[fy-1][fx] ===0){
                        this.moveReset();
                        this.up=true;
                    }else {
                        this.moveReset();
                        this.moveCount=0;
                    }
                }
                
            }else if(this.moveDirection ==3){//下
                 if(map[fy+1][fx] ===0){
                    this.moveReset();
                    this.down=true;
                }else {
                    this.moveReset();
                    this.moveCount=0;
                }
            }
        }else{

            if(this.left==true) {
                if(this.moveCount==16){
                 
                }
                this.x-=2;
            }
            if(this.right==true) {
                this.x+=2;
            }
            if(this.up==true) {
                this.y-=2;
            }
            if(this.down==true) {
                this.y+=2;
            }
            this.moveCount--;
        }
    }
    move2(){
        let fx = (this.x/32)-(blank/32);
        let fy = this.y/32;
        
        if(this.moveCount==0){
          
        }








        
    }
    moveReset(){
        this.left=false;
        this.right=false;
        this.up=false;
        this.down=false;
    }
}
let yellowFox = new foxClass(enemyPositionX,enemyPositionY,'images/yellowFox.png');



let key = new Object();//キー入力に関するオブジェクト生成
key.up = false;
key.down = false;
key.right = false;
key.left = false;



let grass = new Object();//草のオブジェクト生成
grass.img = new Image();
grass.img.src ='images/grass2.png';

let mapObjects = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0],
	[0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0],
	[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0],
	[0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0],
	[0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
	[0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
	[0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0],
	[0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
	[0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0],
	[0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0],
	[0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0],
	[0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0],
	[0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
	[0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

];













function draw() {//常時繰り返し呼び出される関数
    //キーボードが押された時、keydownfunc関数を呼び出す
	addEventListener( "keydown", keydownfunc );
    
    if(scene==0){
        drawTitle();
    }else if(scene==1){
        drawGame();
        
    }



    requestAnimationFrame( draw );
}
requestAnimationFrame( draw );

function drawTitle(){
    ctx.fillStyle = 'black';
    ctx.fillRect(blank, 0, canvas.width, canvas.height);
    // フォントのロードが完了したら描画を開始
    font.load().then(function(loadedFont) {
        document.fonts.add(loadedFont);
        ctx.font = '36px 美咲ゴシック'; // 使用するフォントを指定
        ctx.fillStyle = '#A7CC65';
        ctx.fillText('PUSH SPACE KEY', 500, 320); // Canvas上にテキストを描画
    });
       

}

function drawGame(){
    
    rabbitMove();//うさぎを移動する関数を呼び出す
    yellowFox.move();
    drawMap();//マップを描画
   

    
    
    ctx.drawImage( rabbit.img, rabbit.x, rabbit.y );//うさぎを描画
    ctx.drawImage( yellowFox.img, yellowFox.x, yellowFox.y );//うさぎを描画

    enemyCollider();//敵との衝突判定


   
	
}









//キーが押されたときに呼び出される関数
function keydownfunc( event ) {


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


    if( scene==0 && key_code === 32 ){//スペースキーで止まる
        
        scene=1;
    
    } 
   
}


function drawMap(){
    for (let y=0; y<map.length; y++) {
        for (let x=0; x<map[y].length; x++) {
            if ( map[y][x] === 0 ) {
                ctx.drawImage( mapchip, 0, 0, 16, 16, 32 * x +blank, 32 * y , 32, 32 );
                if(mapObjects[y][x]===1){
                    ctx.drawImage( grass.img, 0, 0, 1280, 1280, 32 * x +blank, 32 * y , 32, 32 );
                }
            }
            if ( map[y][x] === 1 ) {
                ctx.drawImage( mapchip, 16, 0, 16, 16, 32 * x +blank, 32 * y ,32, 32 );
            }
        }
    }
}

function rabbitMove(){//うさぎを移動する関数
    let x = (rabbit.x/32)-(blank/32);
    let y = rabbit.y/32;
    if(moveCount==0){
        moveCount=objectSize/rabbit.speed;
       
        if( key.left   === true ) {
            if(x>0) {
                if(map[y][x-1] ===0){
                    rabbitMoveReset();
                    rabbit.left=true;
                }else {
                    rabbitMoveReset();
                    if(rabbit.moveDirection==2 &&y>0){
                        if(map[y-1][x] ===0)  rabbit.up  =true;
                    }else if(rabbit.moveDirection==3){
                        if(map[y+1][x] ===0) rabbit.down=true;
                    }else moveCount=0;
                }
            }
        }
        if( key.right  === true ) {
            if(map[y][x+1] ===0){
                rabbitMoveReset();
                rabbit.right =true;
            }else {
                rabbitMoveReset();
                if(rabbit.moveDirection==2 &&y>0){
                    if(map[y-1][x] ===0)  rabbit.up  =true;
                }else if(rabbit.moveDirection==3){
                    if(map[y+1][x] ===0) rabbit.down=true;
                }else moveCount=0;
            }
        }
                
        if( key.up     === true ) {
            if(y>0) {
                if(map[y-1][x] ===0){
                    rabbitMoveReset();
                    rabbit.up=true;
                }else {
                    rabbitMoveReset();
                    if(rabbit.moveDirection==0 && x>0){
                        if(map[y][x-1] ===0) rabbit.left  =true;
                    }else if(rabbit.moveDirection==1){
                        if(map[y][x+1] ===0)rabbit.right =true;
                    }else moveCount=0;
                }
            }
        }
            
        if( key.down   === true ) {
            if(map[y+1][x] ===0){
                rabbitMoveReset();
                rabbit.down=true;
            }else {
                rabbitMoveReset();
                if(rabbit.moveDirection==0 && x>0){
                    if(map[y][x-1] ===0) rabbit.left  =true;
                }else if(rabbit.moveDirection==1){
                    if(map[y][x+1] ===0)rabbit.right =true;
                }else moveCount=0;
            }
        }
    }else{
        if(rabbit.left==true){
            rabbit.x -=rabbit.speed;
            rabbit.moveDirection=0;
            if(moveCount ==16){
               rabbit.img.src ='images/leftRabbit1.png';
                
            }else if(moveCount==8){
                rabbit.img.src ='images/leftRabbit2.png';
            }
            if(x>0){
                if(mapObjects[y][x-1] ===1){
                    mapObjects[y][x-1]=0;
                    ctx.clearRect((x-1)*32+blank, y*32, (x-1)*32+blank+32, y*32+32);
                }
            }
            if(key.right==true){
                moveCount=16-moveCount;
                rabbitMoveReset();
                rabbit.right=true;
                rabbit.img.src ='images/rightRabbit1.png';
            }
        }
        if(rabbit.right==true){
            rabbit.x += rabbit.speed;
            rabbit.moveDirection=1;
            if(moveCount ==16){
                rabbit.img.src ='images/rightRabbit1.png';
                 
             }else if(moveCount==8){
                 rabbit.img.src ='images/rightRabbit2.png';
             }
            if(mapObjects[y][x+1] ===1){
                mapObjects[y][x+1]=0;
                ctx.clearRect((x+1)*32+blank, y*32, (x+1)*32+blank+32, y*32+32);
            }
        }
        if(rabbit.up==true){
            rabbit.y -= rabbit.speed;
            rabbit.moveDirection=2;
            if(moveCount ==16){
                rabbit.img.src ='images/upRabbit1.png';
                 
             }else if(moveCount==8){
                 rabbit.img.src ='images/upRabbit2.png';
             }
            if(y>0){
                try{
                    if(mapObjects[y-1][x] ===1){
                        mapObjects[y-1][x]=0;
                        ctx.clearRect(x*32+blank, (y-1)*32, x*32+blank+32, (y-1)*32+32);
                    }
                }catch{

                }
                
            }
            
        }
        if(rabbit.down==true){
            rabbit.y += rabbit.speed;
            rabbit.moveDirection=3;
            if(moveCount ==16){
                rabbit.img.src ='images/downRabbit1.png';
                 
             }else if(moveCount==8){
                 rabbit.img.src ='images/downRabbit2.png';
             }
            try{
                if(mapObjects[y+1][x] ===1){
                    mapObjects[y+1][x]=0;
                    ctx.clearRect(x*32+blank, (y+1)*32, x*32+blank+32, (y+1)*32+32);
                }
            }catch{

            }
            
        }
        moveCount--;
    }   
}


function rabbitMoveReset(){//移動完了時のうさぎの挙動リセット
    rabbit.left=false;
    rabbit.right=false;
    rabbit.up=false;
    rabbit.down=false;
}










function enemyCollider(){
    if(rabbit.x<=yellowFox.x+31 && rabbit.x+31>=yellowFox.x && rabbit.y<=yellowFox.y+31 &&rabbit.y+31>=yellowFox.y){
        ctx.clearRect(0,0,1000,700);
    }

}