const objectSize =32;// 1マスの正方形の幅
const blank =320;//マップの描画位置調整
let scene=0; //画面遷移　タイトル0 ゲーム1
let enemyPositionX =blank +objectSize*9;//敵の初期位置基準x
let enemyPositionY =320;//y
let score=0;//スコア
let moveCount =16;//1マスの移動にかかるカウント数(moveCount * キャラのスピード)
//canvasの設定
let canvas = document.getElementById( 'canvas' );
canvas.width = 1088;    //canvasの横幅
canvas.height = 640;    //canvasの縦幅

//コンテキストを取得
let ctx = canvas.getContext( '2d' );
let font = new FontFace('美咲ゴシック', 'url(fonts/misaki_gothic_2nd.ttf)');



//マップのデータ生成
let mapImg = new Image();
mapImg.src = 'images/mapImg.png';
let mapchip = new Image();
mapchip.src = 'images/mapChip.png';
const WALL =1;//配列mapの1は通れない壁
let map = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1],
	[1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1],
	[1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1],
	[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1],
	[1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
	[1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
	[1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
	[1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
	[1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1],
	[1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1],
	[1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1],
	[1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1],
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
grass.img.src ='images/grass2.png';

let carrot = new Object();//ニンジンのオブジェクト生成
carrot.img = new Image();
carrot.img.src ='images/itemCarrot.png';
carrot.has =false;



let rabbit = new Object();//うさぎのオブジェクト生成

rabbit.img = new Image();
rabbit.leftImg  ='images/leftRabbit1.png';
rabbit.leftImg2 ='images/leftRabbit2.png';
rabbit.rightImg ='images/rightRabbit1.png';
rabbit.rightImg2='images/rightRabbit2.png';
rabbit.upImg    ='images/upRabbit1.png';
rabbit.upImg2   ='images/upRabbit2.png';
rabbit.downImg  ='images/downRabbit1.png';
rabbit.downImg2 ='images/downRabbit2.png';
rabbit.img.src =rabbit.upImg;//初期画像

rabbit.x=blank +32*9;
rabbit.y=blank +32*2;

rabbit.moveDirection=2;//0左 1右 2上 3下
rabbit.left  =false;
rabbit.right =false;
rabbit.up    =false;
rabbit.down  =false;
rabbit.speed =2;


class foxClass { //きつねのクラス生成
    constructor(x,y,nowimg){
        this.x=x;
        this.y=y;
        this.speed=2;

        this.img = new Image();
        this.img.src = nowimg;
        this.leftImg;
        this.leftImg2;
        this.rightImg;
        this.rightImg2;
        this.upImg;
        this.upImg2;
        this.downImg;
        this.downImg2;

        this.left=false;
        this.right=false;
        this.up=false;
        this.down=false;

        this.moveCount = objectSize/this.speed;
    }
    move(){//きつねの移動関数1 (完全ランダムに動く)
        let fx = (this.x/32)-(blank/32);
        let fy = this.y/32;
        
        if(this.moveCount==0){
            this.moveCount=objectSize/this.speed;
            this.moveDirection = Math.floor(Math.random()*4);//0左 1右 2上 3下
            try{
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
            }catch{}
                   
        }else{

            if(this.left==true) {
                if(this.moveCount==16){
                    this.img.src =this.leftImg;
                }else if(this.moveCount ==8){
                    this.img.src =this.leftImg2;
                }
                this.x-=this.speed;
            }
            if(this.right==true) {
                if(this.moveCount==16){
                    this.img.src =this.rightImg;
                }else if(this.moveCount ==8){
                    this.img.src =this.rightImg2;
                }
                this.x+=this.speed;
            }
            if(this.up==true) {
                if(this.moveCount==16){
                    this.img.src =this.upImg;
                }else if(this.moveCount ==8){
                    this.img.src =this.upImg2;
                }
                this.y-=this.speed;
            }
            if(this.down==true) {
                if(this.moveCount==16){
                    this.img.src =this.downImg;
                }else if(this.moveCount ==8){
                    this.img.src =this.downImg2;
                }
                this.y+=this.speed;
            }
            
            this.moveCount--;
        }
    }
    move2(){
        this.moveCount--;
        const fx2 = (this.x/32)-(blank/32);
        const fy2 = this.y/32;
        let rx=Math.floor(rabbit.x/32)-(blank/32);
        let ry=Math.floor(rabbit.y/32)
        if(this.moveCount==0){
          bfs(fx2,fy2,rx,ry);
        }
//ここにアルゴリズム書いてく







        
    }
    moveReset(){//きつねの移動リセット
        this.left=false;
        this.right=false;
        this.up=false;
        this.down=false;
    }
}


//黄色いきつね
let yellowFox = new foxClass(enemyPositionX,enemyPositionY,'images/rightYellowFox1.png');
yellowFox.leftImg='images/leftYellowFox1.png';
yellowFox.leftImg2='images/leftYellowFox2.png';
yellowFox.rightImg='images/rightYellowFox1.png';
yellowFox.rightImg2='images/rightYellowFox2.png';
yellowFox.upImg='images/upYellowFox1.png';
yellowFox.upImg2='images/upYellowFox2.png';
yellowFox.downImg='images/downYellowFox1.png';
yellowFox.downImg2='images/downYellowFox2.png';

//灰色きつね
let grayFox = new foxClass(enemyPositionX+objectSize,enemyPositionY,'images/rightGrayFox1.png');
grayFox.leftImg='images/leftGrayFox1.png';
grayFox.leftImg2='images/leftGrayFox2.png';
grayFox.rightImg='images/rightGrayFox1.png';
grayFox.rightImg2='images/rightGrayFox2.png';
grayFox.upImg='images/upGrayFox1.png';
grayFox.upImg2='images/upGrayFox1.png';
grayFox.downImg='images/downGrayFox1.png';
grayFox.downImg2='images/downGrayFox2.png';

//赤色きつね
let redFox = new foxClass(enemyPositionX,enemyPositionY-objectSize,'images/rightRedFox1.png');
redFox.leftImg='images/leftRedFox1.png';
redFox.leftImg2='images/leftRedFox2.png';
redFox.rightImg='images/rightRedFox1.png';
redFox.rightImg2='images/rightRedFox2.png';
redFox.upImg='images/upRedFox1.png';
redFox.upImg2='images/upRedFox2.png';
redFox.downImg='images/downRedFox1.png';
redFox.downImg2='images/downRedFox2.png';

//白きつね
let whiteFox = new foxClass(enemyPositionX+objectSize,enemyPositionY-objectSize,'images/rightWhiteFox1.png');
whiteFox.leftImg='images/leftWhiteFox1.png';
whiteFox.leftImg2='images/leftWhiteFox2.png';
whiteFox.rightImg='images/rightWhiteFox1.png';
whiteFox.rightImg2='images/rightWhiteFox2.png';
whiteFox.upImg='images/upWhiteFox1.png';
whiteFox.upImg2='images/upWhiteFox2.png';
whiteFox.downImg='images/downWhiteFox1.png';
whiteFox.downImg2='images/downWhiteFox2.png';












let mapObjects = [//マップに配置するアイテムの配列（値は下でランダムに決めてるのでここの中身の数字は関係ない
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0],
	[0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0],
	[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0],
	[0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0],
	[0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
	[0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
	[0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0],
	[0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
	[0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0],
	[0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0],
	[0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0],
	[0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0],
	[0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
	[0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
const GRASS =1;
const CARROT =2;

for (let y=0; y<map.length; y++) {//ランダムオブジェクト（アイテム）生成
    for (let x=0; x<map[y].length; x++) {
        if(map[y][x]===0){
            let item=Math.floor(Math.random()*150)
            if(item==2){
                mapObjects[y][x]=CARROT;//ニンジン 
            }
            else mapObjects[y][x]=GRASS;//草
        }else if(map[y][x]===1) mapObjects[y][x] =0;//壁にはオブジェクトを生成しない
    }
}

















function draw() {//常時繰り返し呼び出される関数
    //キーボードが押された時、keydownfunc関数を呼び出す
	addEventListener( "keydown", keydownfunc );
    
    if(scene==0){
        drawTitle();//タイトル画面
    }else if(scene==1){
        drawGame();//ゲーム画面
        drawScore();//スコア表示
        
    }



    requestAnimationFrame( draw );
}
requestAnimationFrame( draw );

function drawTitle(){//タイトル画面
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
    grayFox.move();
    redFox.move();
    whiteFox.move();
    drawMap();//マップを描画
   

    
    ctx.drawImage( rabbit.img,    0, 0, 1280, 1280,rabbit.x,    rabbit.y ,  32,32);//うさぎを描画
    ctx.drawImage( yellowFox.img, 0, 0, 1280, 1280,yellowFox.x, yellowFox.y,32,32 );//きつねを描画
    ctx.drawImage( grayFox.img, 0, 0, 1280, 1280,grayFox.x, grayFox.y,32,32 );//きつねを描画
    ctx.drawImage( redFox.img, 0, 0, 1280, 1280,redFox.x, redFox.y,32,32 );//きつねを描画
    ctx.drawImage( whiteFox.img, 0, 0, 1280, 1280,whiteFox.x, whiteFox.y,32,32 );//きつねを描画
    
   
    enemyCollider();//敵との衝突判定


   
	
}

function drawScore(){
    ctx.font = '36px 美咲ゴシック'; // 使用するフォントを指定
    ctx.fillStyle = '#A7CC65';
    ctx.fillText("score", 970, 100); // Canvas上にテキストを描画
    ctx.fillText(score, 1000, 160); // Canvas上にテキストを描画
}

function drawMap(){
    ctx.fillStyle = 'black';
    ctx.fillRect(blank, 0, canvas.width, canvas.height);
    ctx.drawImage( mapImg, 0, 0, 640, 640, blank, 0  ,640, 640 );
    for (let y=0; y<map.length; y++) {
        for (let x=0; x<map[y].length; x++) {
            if ( map[y][x] === 0 ) {
                if(mapObjects[y][x]===1){
                    ctx.drawImage( grass.img, 0, 0, 1280, 1280, 32 * x +blank, 32 * y , 32, 32 );
                }
                if(mapObjects[y][x]===2){
                    ctx.drawImage(carrot.img, 0, 0, 1280, 1280, 32 * x +blank, 32 * y , 32, 32 );
                }
            }
        }
    }
}

function drawMapChip(){
    ctx.fillStyle = 'black';
    ctx.fillRect(blank, 0, canvas.width, canvas.height);
    for (let y=0; y<map.length; y++) {
        for (let x=0; x<map[y].length; x++) {
            if ( map[y][x] === 0 ) {
                ctx.drawImage( mapchip, 0, 0, 16, 16, 32 * x +blank, 32 * y , 32, 32 );
                if(mapObjects[y][x]===1){
                    ctx.drawImage( grass.img, 0, 0, 1280, 1280, 32 * x +blank, 32 * y , 32, 32 );
                }
                if(mapObjects[y][x]===2){
                    ctx.drawImage(carrot.img, 0, 0, 1280, 1280, 32 * x +blank, 32 * y , 32, 32 );
                }
            }
            if ( map[y][x] === 1 ) {
                ctx.drawImage( mapchip, 16, 0, 16, 16, 32 * x +blank, 32 * y ,32, 32 );
            }
        }
    }
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


    if( scene==0 && key_code === 32 ){//スペースキーで画面遷移
        scene=1;
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
                    if(map[y+1][x] ===0) rabbit.down =true;
                }else if(rabbit.moveDirection==0) moveCount=0;
                
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
                        if(map[y][x-1] ===0) rabbit.left =true;
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
            if(moveCount ==16-1){
               rabbit.img.src =rabbit.leftImg;
                
            }else if(moveCount==8-1){
                rabbit.img.src =rabbit.leftImg2;
            }
            objectCollider(y,x-1);
            
            
        }
        if(rabbit.right==true){
            rabbit.x += rabbit.speed;
            rabbit.moveDirection=1;
            if(moveCount ==16-1){
                rabbit.img.src =rabbit.rightImg;
                 
             }else if(moveCount==8-1){
                 rabbit.img.src =rabbit.rightImg2;
             }
             objectCollider(y,x+1);
        }
        if(rabbit.up==true){
            rabbit.y -= rabbit.speed;
            rabbit.moveDirection=2;
            if(moveCount ==16-1){
                rabbit.img.src =rabbit.upImg;
                 
             }else if(moveCount==8-1){
                 rabbit.img.src =rabbit.upImg2;
             }
             objectCollider(y-1,x);
            
        }
        if(rabbit.down==true){
            rabbit.y += rabbit.speed;
            rabbit.moveDirection=3;
            if(moveCount ==16-1){
                rabbit.img.src =rabbit.downImg;
                 
             }else if(moveCount==8-1){
                 rabbit.img.src =rabbit.downImg2;
             }
             objectCollider(y+1,x);
            
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


function objectCollider(y,x){
    if(x>0 && y>0){
        try{
            if(mapObjects[y][x] ===1){//草と接触したら、草を消す
                mapObjects[y][x]=0;
                getScore(100);
                ctx.clearRect((x)*32+blank, (y)*32, (x)*32+blank+32, (y)*32+32);
            }
            if(mapObjects[y][x] ===2){//ニンジンと接触したときの処理
                mapObjects[y][x]=0;
                getScore(1000);
                ctx.clearRect((x)*32+blank, (y)*32, (x)*32+blank+32, (y)*32+32);
                carrot.has=true;
            }
        }catch{}
    }
}

function enemyCollider(){//敵との衝突判定
    
    if(rabbit.x<=yellowFox.x+31 && rabbit.x+31>=yellowFox.x && rabbit.y<=yellowFox.y+31 &&rabbit.y+31>=yellowFox.y){
        ctx.clearRect(0,0,1200,800); 
    }

}

function getScore(p){
 score+=p;
}




const INF = 1000000000;
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
const width = 20;
const height = 20;

function bfs(sx, sy, gx, gy) {
   
    const prev = [];
    const dist=[];
    for(let y =0;y<height;y++){
        dist[y] =[];
        for(let x =0;x<width;x++){
            dist[y][x]=INF;
        }
    }
    dist[sy][sx] = 0;
  
    const queue = [{ x: sx, y: sy }];
    while (queue.length > 0) {
        const cur = queue.shift();


        if (cur.x === gx && cur.y === gy) break;
    

        for (let i = 0; i < 4; i++) {
            const nx = cur.x + dx[i];
            const ny = cur.y + dy[i];
      
            if (nx < 0 || nx >= width || ny < 0 || ny >= height) {
                //alert("範囲外");
                continue;
            }
            if (map[ny][nx] === 1) {
                //alert("壁");
                continue;
            }
            if (dist[ny][nx] !== INF) {
                //alert("もう見た");
                continue;
            }
     
        dist[ny][nx] = dist[cur.y][cur.x] + 1;
        //alert(dist[ny][nx]);
        queue.push({ x: nx, y: ny });
        prev[cur.y][cur.x] = cur;

        }
    
    } 
    let cx=nx;
    let cy=ny;
    let routes = [];
    while(dist[cy][cx]!=0){
        for(let i=0;i<4;i++){
            const px = cx + dx[i];
            const py = cy + dy[i];
            if (px < 0 || px >= width || py < 0 || py >= height) {
                //alert("範囲外");
                continue;
            }
            if (map[py][px] === 1) {
                //alert("壁");
                continue;
            }
            if (dist[py][px] === INF) {
                //alert("見なくていい");
                continue;
            }
            if(dist[py][px]==dist[cy][cx]+1){
                routes.unshift({ x: cx, y: cy });
                cx=px;
                cy=py;
            }
          
          
        }
    }
  
  alert("できた");
 
 
}

