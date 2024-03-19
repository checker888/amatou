
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

let routes = [];

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
grass.point=100;

let carrot = new Object();//ニンジンのオブジェクト生成
carrot.img = new Image();
carrot.img.src ='images/itemCarrot.png';
carrot.count =0;

let rabbit = new Object();//うさぎのオブジェクト生成

rabbit.leftImg = new Image();
rabbit.leftImg.src  ='images/leftRabbit1.png';
rabbit.leftImg2 = new Image();
rabbit.leftImg2.src ='images/leftRabbit2.png';
rabbit.rightImg = new Image();
rabbit.rightImg.src ='images/rightRabbit1.png';
rabbit.rightImg2 = new Image();
rabbit.rightImg2.src='images/rightRabbit2.png';
rabbit.upImg = new Image();
rabbit.upImg.src    ='images/upRabbit1.png';
rabbit.upImg2= new Image();
rabbit.upImg2.src   ='images/upRabbit2.png';
rabbit.downImg= new Image();
rabbit.downImg.src  ='images/downRabbit1.png';
rabbit.downImg2= new Image();
rabbit.downImg2.src ='images/downRabbit2.png';
rabbit.img = new Image();
rabbit.img = rabbit.leftImg;

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
        this.leftImg = new Image();
        this.leftImg2= new Image();
        this.rightImg= new Image();
        this.rightImg2= new Image();
        this.upImg= new Image();
        this.upImg2= new Image();
        this.downImg= new Image();
        this.downImg2= new Image();

        this.left=false;
        this.right=false;
        this.up=false;
        this.down=false;

        this.moveCount = objectSize/this.speed;
        this.moveCount2 = objectSize/this.speed;
        this.moveDirection2 =[];
        this.chaseCount = Math.floor(Math.random()*5);
        this.moveI =0;
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
                    this.img =this.leftImg;
                }else if(this.moveCount ==8){
                    this.img =this.leftImg2;
                }
                this.x-=this.speed;
            }
            if(this.right==true) {
                if(this.moveCount==16){
                    this.img =this.rightImg;
                }else if(this.moveCount ==8){
                    this.img =this.rightImg2;
                }
                this.x+=this.speed;
            }
            if(this.up==true) {
                if(this.moveCount==16){
                    this.img =this.upImg;
                }else if(this.moveCount ==8){
                    this.img =this.upImg2;
                }
                this.y-=this.speed;
            }
            if(this.down==true) {
                if(this.moveCount==16){
                    this.img =this.downImg;
                }else if(this.moveCount ==8){
                    this.img =this.downImg2;
                }
                this.y+=this.speed;
            }
            
            this.moveCount--;
        }
    }
    move2(){
        let fx2 = (this.x/32)-(blank/32);
        let fy2 = this.y/32;
        
        let rx=Math.floor(rabbit.x/32)-(blank/32);
        let ry=Math.floor(rabbit.y/32)
        
        if(this.moveCount2==0){
            if(this.chaseCount==0){
            
               this.moveI =0;
               //alert(fx2+" "+fy2+" "+rx+" "+ry);
                bfs(fx2,fy2,rx,ry);
                this.chaseCount = Math.floor(Math.random()*3+3);
                //alert("a");
                for(let i=0;i<=5;i++){
                    this.moveDirection2[i]=-1;
                    //alert(this.moveDirection2[i]);
                }
                let x;
                let y;
               // alert(this.chaseCount);
                for(let i=0;i<=this.chaseCount;i++){
                    
                    if(i==0) {
                        x=fx2;
                        y=fy2;
                    }
                    else {
                        x =routes[i-1].x;
                        y =routes[i-1].y;

                    } 

                //alert(x+" "+routes[i].x);
                if(x-routes[i].x==1){
                    this.moveDirection2[i]=0;

                }
                if(x-routes[i].x==-1){
                    this.moveDirection2[i]=1;
                }
                if(y-routes[i].y==1){
                    this.moveDirection2[i]=2;
                }
                if(y-routes[i].y==-1){
                    this.moveDirection2[i]=3;
                }
                //alert(this.moveDirection2[i]);
               // alert(this.moveDirection2[i]);
                
            }


        }
        this.chaseCount--;
        //try{
                //alert(this.moveDirection2[this.moveI]);
                fx2 = (this.x/32)-(blank/32);
                fy2 = this.y/32;
                //alert(map[fy2][fx2]);
                //alert(this.moveDirection2[this.moveI]);
                if(this.moveDirection2[this.moveI]==0){//左
                    if(map[fy2][fx2-1] ===0){
                        this.moveReset();
                        this.left=true;
                        
                    }else {
                        this.moveReset();
                        this.chaseCount=0;
                        this.moveCount2=0;
                    }
                        
                }else if(this.moveDirection2[this.moveI] ==1){//右
                    if(map[fy2][fx2+1] ===0){
                        this.moveReset();
                        this.right=true;
                    }else {
                        this.moveReset();
                        this.chaseCount=0;
                        this.moveCount2=0;
                    }
                }else if(this.moveDirection2[this.moveI] ==2){//上 
                    //alert(map[fx2][fy2-1]);
                    //alert("a");
                    if(map[fy2-1][fx2] ===0){
                        //alert("いける");
                        this.moveReset();
                        this.up=true;    
                    }else {
                        this.moveReset();
                        this.chaseCount=0;
                        this.moveCount2=0;
                    }
                }else if(this.moveDirection2[this.moveI] ==3){//下
                    if(map[fy2+1][fx2] ===0){
                        this.moveReset();
                        this.down=true;
                    }else {
                        this.moveReset();
                        this.chaseCount=0;
                        this.moveCount2=0;
                    }
                }else {
                    this.moveReset();
                    this.chaseCount=0;
                    this.moveCount2=0;
                }
            this.moveI++;
            
            this.moveCount2=16;
           // }catch{
             //   this.moveReset();
             //   this.chaseCount=0;
             //   this.moveCount2=0;
            //}
            
        }else{
            if(this.left==true) {
                if(this.moveCount2==16){
                    this.img =this.leftImg;
                }else if(this.moveCount2 ==8){
                    this.img =this.leftImg2;
                }
                this.x-=this.speed;
            }
            if(this.right==true) {
                if(this.moveCount2==16){
                    this.img =this.rightImg;
                }else if(this.moveCount2 ==8){
                    this.img =this.rightImg2;
                }
                this.x+=this.speed;
            }
            if(this.up==true) {
                if(this.moveCount2==16){
                    this.img =this.upImg;
                }else if(this.moveCount2 ==8){
                    this.img =this.upImg2;
                }
                this.y-=this.speed;
            }
            if(this.down==true) {
                if(this.moveCount2==16){
                    this.img =this.downImg;
                }else if(this.moveCount2 ==8){
                    this.img =this.downImg2;
                }
                this.y+=this.speed;
            }
            this.moveCount2--;
        }

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
yellowFox.leftImg.src='images/leftYellowFox1.png';
yellowFox.leftImg2.src='images/leftYellowFox2.png';
yellowFox.rightImg.src='images/rightYellowFox1.png';
yellowFox.rightImg2.src='images/rightYellowFox2.png';
yellowFox.upImg.src='images/upYellowFox1.png';
yellowFox.upImg2.src='images/upYellowFox2.png';
yellowFox.downImg.src='images/downYellowFox1.png';
yellowFox.downImg2.src='images/downYellowFox2.png';

//灰色きつね
let grayFox = new foxClass(enemyPositionX+objectSize,enemyPositionY,'images/rightGrayFox1.png');
grayFox.leftImg.src='images/leftGrayFox1.png';
grayFox.leftImg2.src='images/leftGrayFox2.png';
grayFox.rightImg.src='images/rightGrayFox1.png';
grayFox.rightImg2.src='images/rightGrayFox2.png';
grayFox.upImg.src='images/upGrayFox1.png';
grayFox.upImg2.src='images/upGrayFox1.png';
grayFox.downImg.src='images/downGrayFox1.png';
grayFox.downImg2.src='images/downGrayFox2.png';

//赤色きつね
let redFox = new foxClass(enemyPositionX,enemyPositionY-objectSize,'images/rightRedFox1.png');
redFox.leftImg.src='images/leftRedFox1.png';
redFox.leftImg2.src='images/leftRedFox2.png';
redFox.rightImg.src='images/rightRedFox1.png';
redFox.rightImg2.src='images/rightRedFox2.png';
redFox.upImg.src='images/upRedFox1.png';
redFox.upImg2.src='images/upRedFox2.png';
redFox.downImg.src='images/downRedFox1.png';
redFox.downImg2.src='images/downRedFox2.png';

//白きつね
let whiteFox = new foxClass(enemyPositionX+objectSize,enemyPositionY-objectSize,'images/rightWhiteFox1.png');
whiteFox.leftImg.src='images/leftWhiteFox1.png';
whiteFox.leftImg2.src='images/leftWhiteFox2.png';
whiteFox.rightImg.src='images/rightWhiteFox1.png';
whiteFox.rightImg2.src='images/rightWhiteFox2.png';
whiteFox.upImg.src='images/upWhiteFox1.png';
whiteFox.upImg2.src='images/upWhiteFox2.png';
whiteFox.downImg.src='images/downWhiteFox1.png';
whiteFox.downImg2.src='images/downWhiteFox2.png';










let grassRepopCount=[];

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
        
    }else if(scene==2){
        drawGameOver();
    }
    requestAnimationFrame( draw );
}
requestAnimationFrame( draw );

let titleRabbit = new Image();
titleRabbit.src = 'images/titleRabbit.png';
function drawTitle(){//タイトル画面
    ctx.fillStyle = 'black';
    ctx.fillRect(blank, 0, canvas.width, canvas.height);
    // フォントのロードが完了したら描画を開始
    font.load().then(function(loadedFont) {
        document.fonts.add(loadedFont);
        ctx.font = '36px 美咲ゴシック'; // 使用するフォントを指定
        ctx.fillStyle = '#A7CC65';
        ctx.fillText('PUSH SPACE KEY', 580, 560); // Canvas上にテキストを描画

        ctx.font = '72px 美咲ゴシック'; // 使用するフォントを指定
        ctx.fillStyle = '#E0712C';
        ctx.fillText('GRASSRUNNER', 500, 160); // Canvas上にテキストを描画

        ctx.drawImage( titleRabbit, 0, 0, 1280, 1280, 555, 200, 300, 300);
    });
       

}
let r = Math.floor(Math.random()*5);
function drawGame(){
    
    rabbitMove();//うさぎを移動する関数を呼び出す
    yellowFox.move();
    grayFox.move2();   
    whiteFox.move();
    if(redFox.moveCount==16 && redFox.moveCount2==16){     
         r = Math.floor(Math.random()*2);
    }
    if(r==0){
        redFox.move2();
    }
    else{
        redFox.move();
    } 
    
    hasItem();
    
    drawMap();//マップを描画
   

    
    ctx.drawImage( rabbit.img,    0, 0, 1280, 1280,rabbit.x,    rabbit.y ,  32,32);//うさぎを描画
    ctx.drawImage( yellowFox.img, 0, 0, 1280, 1280,yellowFox.x, yellowFox.y,32,32 );//きつねを描画
    ctx.drawImage( grayFox.img, 0, 0, 1280, 1280,grayFox.x, grayFox.y,32,32 );//きつねを描画
    ctx.drawImage( redFox.img, 0, 0, 1280, 1280,redFox.x, redFox.y,32,32 );//きつねを描画
    ctx.drawImage( whiteFox.img, 0, 0, 1280, 1280,whiteFox.x, whiteFox.y,32,32 );//きつねを描画
    
   
    enemyCollider();//敵との衝突判定


   
	
}

function hasItem(){
    if(carrot.count>0){
        carrot.count--;
        grass.point ++;
    }else  grass.point=100;
    

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
let grave = new Image();
grave.src = 'images/grave.png';
function drawGameOver(){
    ctx.fillStyle = 'black';
    ctx.fillRect(blank, 0, canvas.width, canvas.height);
    // フォントのロードが完了したら描画を開始
    font.load().then(function(loadedFont) {
        document.fonts.add(loadedFont);
        ctx.font = '36px 美咲ゴシック'; // 使用するフォントを指定
        ctx.fillStyle = 'red';
        ctx.fillText('GAME OVER', 630, 560); // Canvas上にテキストを描画

        ctx.font = '60px 美咲ゴシック'; // 使用するフォントを指定
        ctx.fillStyle = '#A7CC65';
        ctx.fillText('SCORE', 640, 200); // Canvas上にテキストを描画
        ctx.fillText(score, 770, 320);

        ctx.drawImage( grave, 0, 0, 1280, 1280, 330, 180, 300, 300);
    });


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
    //if( scene==2 && key_code === 32 ){//スペースキーで画面遷移
    //   reset();
    //    scene=0;
    //} 
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
               rabbit.img =rabbit.leftImg;
                
            }else if(moveCount==8-1){
                rabbit.img =rabbit.leftImg2;
            }
            objectCollider(y,x-1);     
        }
        if(rabbit.right==true){
            rabbit.x += rabbit.speed;
            rabbit.moveDirection=1;
            if(moveCount ==16-1){
                rabbit.img =rabbit.rightImg;
                 
             }else if(moveCount==8-1){
                 rabbit.img =rabbit.rightImg2;
             }
             objectCollider(y,x+1);
        }
        if(rabbit.up==true){
            rabbit.y -= rabbit.speed;
            rabbit.moveDirection=2;
            if(moveCount ==16-1){
                rabbit.img =rabbit.upImg;
                 
             }else if(moveCount==8-1){
                 rabbit.img =rabbit.upImg2;
             }
             objectCollider(y-1,x);
            
        }
        if(rabbit.down==true){
            rabbit.y += rabbit.speed;
            rabbit.moveDirection=3;
            if(moveCount ==16-1){
                rabbit.img =rabbit.downImg;
                 
             }else if(moveCount==8-1){
                 rabbit.img =rabbit.downImg2;
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
                mapObjects[y][x]=-1;
                getScore(grass.point);
                ctx.clearRect((x)*32+blank, (y)*32, (x)*32+blank+32, (y)*32+32);
            }
            if(mapObjects[y][x] ===2){//ニンジンと接触したときの処理
                mapObjects[y][x]=0;
                getScore(1000);
                ctx.clearRect((x)*32+blank, (y)*32, (x)*32+blank+32, (y)*32+32);
                carrot.count+=320;
            }
        }catch{}
    }
}

function enemyCollider(){//敵との衝突判定
    
    if(rabbit.x<=yellowFox.x+31 && rabbit.x+31>=yellowFox.x && rabbit.y<=yellowFox.y+31 &&rabbit.y+31>=yellowFox.y){
        scene=2;
    }
    if(rabbit.x<=grayFox.x+31 && rabbit.x+31>=grayFox.x && rabbit.y<=grayFox.y+31 &&rabbit.y+31>=grayFox.y){
        scene=2;
    }
    if(rabbit.x<=whiteFox.x+31 && rabbit.x+31>=whiteFox.x && rabbit.y<=whiteFox.y+31 &&rabbit.y+31>=whiteFox.y){
        scene=2;
    }
    if(rabbit.x<=redFox.x+31 && rabbit.x+31>=redFox.x && rabbit.y<=redFox.y+31 &&rabbit.y+31>=redFox.y){
        scene=2;
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
    //alert(gx+" "+gy);
   
    //const prev = [];
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
            let nx = cur.x + dx[i];
            let ny = cur.y + dy[i];
      
            if (nx < 0 || nx >= width || ny < 0 || ny >= height) {//alert("範囲外");
                continue;
            }
            if (map[ny][nx] === 1) {//alert("壁");
                continue;
            }
            if (dist[ny][nx] !== INF) {//alert("もう見た");
                continue;
            }
            
        dist[ny][nx] = dist[cur.y][cur.x] + 1;
        queue.push({ x: nx, y: ny });
        }
    } 
    //let cx=queue[queue.length-1].x;
    //let cy=queue[queue.length-1].y;
    let cx=gx;
    let cy=gy;
    while(dist[cy][cx]!=0){
        for(let i=0;i<4;i++){
            //alert (cx+" "+cy);
            const px = cx + dx[i];
            const py = cy + dy[i];
            //alert (px+" "+py);
            if (px < 0 || px >= width || py < 0 || py >= height) {//alert("範囲外");
                continue;
            }
            if (map[py][px] === 1) {//alert("壁");
                continue;
            }
            if (dist[py][px] === INF) {//alert("見なくていい");
                continue;
            }
            if(dist[py][px]==dist[cy][cx]-1){
               // alert("近い");
                routes.unshift({ x: cx, y: cy });
                cx=px;
                cy=py;
            }
        }
    }

    //for(let i=0;i<routes.length;i++){
      //  alert(routes[i].x+" "+routes[i].y);
    //}
    
     
        
 
}

