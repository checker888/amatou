
const objectSize =32;// 1マスの正方形の幅
const blank =320;//マップの描画位置調整
let scene=0; //画面遷移　タイトル0 ゲーム1
let enemyPositionX =blank +objectSize*9;//敵の初期位置基準x
let enemyPositionY =320;//y
let score=0;//スコア
let moveCount =16;//1マスの移動にかかるカウント数(moveCount * キャラのスピード)
let min;//ゲーム内時間（分）
let sec;//ゲーム内時間（秒）
//canvasの設定
let canvas = document.getElementById( 'canvas' );
canvas.width = 1080;    //canvasの横幅
canvas.height = 640;    //canvasの縦幅

//音楽データの生成
const bgm = new Audio('sounds/bgm.mp3');
const getItem = new Audio('sounds/getItem.mp3');
const gameoverSound = new Audio('sounds/gameover.mp3');
const getGrass = new Audio('sounds/getGrass.mp3');
const clickSound = new Audio('sounds/clickSound.wav');
const nockFox = new Audio('sounds/nockFox.wav');

//コンテキストを取得
let ctx = canvas.getContext( '2d' );
let font = new FontFace('美咲ゴシック', 'url(fonts/misaki_gothic_2nd.ttf)');

let routes = [];
let startTime ;
let r = Math.floor(Math.random()*5);

//タイトル画像データ生成
let titleRabbit = new Image();
titleRabbit.src = 'images/titleRabbit.png';

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
carrot.pop = 25;

let candy = new Object();
candy.img = new Image();
candy.img.src ='images/itemCandy.png';
candy.count =0;
candy.pop = 8;


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
rabbit.goldLeftImg= new Image();
rabbit.goldLeftImg.src ='images/leftGoldRabbit.png';
rabbit.goldLeftImg2= new Image();
rabbit.goldLeftImg2.src = 'images/leftGoldRabbit2.png';
rabbit.goldRightImg= new Image();
rabbit.goldRightImg.src ='images/rightGoldRabbit.png';
rabbit.goldRightImg2= new Image();
rabbit.goldRightImg2.src ='images/rightGoldRabbit2.png';
rabbit.goldUpImg = new Image();
rabbit.goldUpImg.src ='images/upGoldRabbit.png';
rabbit.goldUpImg2 = new Image();
rabbit.goldUpImg2.src ='images/upGoldRabbit2.png';
rabbit.goldDownImg = new Image();
rabbit.goldDownImg.src = 'images/downGoldRabbit.png';
rabbit.goldDownImg2 = new Image();
rabbit.goldDownImg2.src = 'images/downGoldRabbit2.png';
rabbit.normalImg =new Image();
rabbit.normalImg.src = 'images/normalRabbit.png';
rabbit.carrotImg =new Image();
rabbit.carrotImg.src = 'images/carrotRabbit.png';
rabbit.goldImg =new Image();
rabbit.goldImg.src ='images/goldRabbit.png';

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

        this.exist = true;
        this.existCount=0;
    }
    move(){//きつねの移動関数1 (完全ランダムに動く)
        let fx = (this.x/32)-(blank/32);
        let fy = this.y/32;
        
        if(this.moveCount==0){//移動カウントが0のとき、移動の方向を決める
            if(this.existCount<0){
                this.existCount++;
                if(this.existCount==0){
                    this.x=enemyPositionX;
                    this.y=enemyPositionY;
                    this.moveReset();
                    fx = (this.x/32)-(blank/32);
                    fy = this.y/32;
                    this.exist=true;
                }
            }
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
                   
        }else{//移動カウントが0より大きい時移動を行う

            if(this.left==true) {//左アニメーション
                if(this.moveCount==16){
                    this.img =this.leftImg;
                }else if(this.moveCount ==8){
                    this.img =this.leftImg2;
                }
                this.x-=this.speed;
            }
            if(this.right==true) {//右アニメーション
                if(this.moveCount==16){
                    this.img =this.rightImg;
                }else if(this.moveCount ==8){
                    this.img =this.rightImg2;
                }
                this.x+=this.speed;
            }
            if(this.up==true) {//上アニメーション
                if(this.moveCount==16){
                    this.img =this.upImg;
                }else if(this.moveCount ==8){
                    this.img =this.upImg2;
                }
                this.y-=this.speed;
            }
            if(this.down==true) {//下アニメーション
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
    move2(){//きつねの移動関数（幅優先探索を用いたおいかけ
        let fx2 = (this.x/32)-(blank/32);//きつねの現在位置x
        let fy2 = this.y/32;//きつねの現在位置y

        
        
        let rx=Math.floor(rabbit.x/32)-(blank/32);//うさぎの現在位置x
        let ry=Math.floor(rabbit.y/32)//うさぎの現在位置y
        
        if(this.moveCount2==0){
            if(this.existCount<0){
                this.existCount++;
                if(this.existCount==0){
                    this.x=enemyPositionX;
                    this.y=enemyPositionY;
                    this.moveReset();
                    fx2 = (this.x/32)-(blank/32);
                    fy2 = this.y/32;
                    this.exist=true;
                }
            }
            if(this.chaseCount==0){
            
               this.moveI =0;
                bfs(fx2,fy2,rx,ry);//幅優先探索する関数を呼び出す
                this.chaseCount = Math.floor(Math.random()*3+3);
                for(let i=0;i<=5;i++){
                    this.moveDirection2[i]=-1;
                    //alert(this.moveDirection2[i]);
                }
                let x;
                let y;
                for(let i=0;i<=this.chaseCount;i++){
                    
                    if(i==0) {
                        x=fx2;
                        y=fy2;
                    }
                    else {
                        x =routes[i-1].x;
                        y =routes[i-1].y;

                    } 
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
                
            }


        }
        this.chaseCount--;
        //try{
                fx2 = (this.x/32)-(blank/32);
                fy2 = this.y/32;
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
                    if(map[fy2-1][fx2] ===0){
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


let grassRepopCount = [//マップに草が復活するまでのカウント配列
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
const GRASS =1;
const CARROT =2;
const CANDY =3;
let itemPop =1000;


//初期設定　ランダムオブジェクト（アイテム）生成
for (let y=0; y<map.length; y++) {
    for (let x=0; x<map[y].length; x++) {
        if(map[y][x]===0){
            let item=Math.floor(Math.random()*itemPop)
            if(item<carrot.pop)mapObjects[y][x]=CARROT;//ニンジン 
            else if(item<carrot.pop+candy.pop) mapObjects[y][x]=CANDY;
            else mapObjects[y][x]=GRASS;//草
        }else if(map[y][x]===1) mapObjects[y][x] =0;//壁にはオブジェクトを生成しない
    }
}
















let bgmplayer =false;
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


function drawTitle(){//タイトル画面
    ctx.fillStyle = 'black';
    ctx.fillRect(blank, 0, canvas.width, canvas.height);
    // フォントのロードが完了したら描画を開始
    font.load().then(function(loadedFont) {
        document.fonts.add(loadedFont);
        ctx.font = '36px 美咲ゴシック'; // 使用するフォントを指定
        ctx.fillStyle = '#8FC7E4';
        ctx.fillText('PUSH SPACE KEY', 580, 570); // Canvas上にテキストを描画

        ctx.font = '72px 美咲ゴシック'; // 使用するフォントを指定
        ctx.fillStyle = '#E0712C';
        ctx.fillText('GRASSCORRIDOR', 475, 160); // Canvas上にテキストを描画

        ctx.drawImage( titleRabbit, 0, 0, 1280, 1280, 555, 200, 300, 300);
    });


}

function drawGame(){
    
    rabbitMove();//うさぎを移動する関数を呼び出す
    yellowFox.move();
    grayFox.move2();   
    whiteFox.move();
    if(redFox.moveCount==16 && redFox.moveCount2==16){
         r = Math.floor(Math.random()*3);
    }
    if(r==0 || r==1){
        redFox.move2();
    }
    else{
        redFox.move();
    } 
    
    hasItem();
    grassRepop();
    
    drawMap();//マップを描画
   

    ctx.drawImage( rabbit.img,    0, 0, 1280, 1280,rabbit.x,    rabbit.y ,  32,32);//うさぎを描画
    drawFox();
    
    
   
    enemyCollider();//敵との衝突判定


   
	
}

function hasItem(){
    if(carrot.count>0){
        carrot.count--;
        grass.point ++;
    }else  grass.point=100;
    

}
function grassRepop(){
    for (let y=0; y<map.length; y++) {
        for (let x=0; x<map[y].length; x++) {
            if(grassRepopCount[y][x]>0){
                grassRepopCount[y][x]--;
                if(grassRepopCount[y][x]==0){
                    let item=Math.floor(Math.random()*itemPop);
                    if(item<carrot.pop)mapObjects[y][x]=CARROT;
                    else if(item<carrot.pop+candy.pop)mapObjects[y][x]=CANDY;
                    else mapObjects[y][x]=GRASS;
                }
            }
        }
    }
}

function drawScore(){
    ctx.font = '36px 美咲ゴシック'; // 使用するフォントを指定
    ctx.fillStyle = '#A7CC65';
    ctx.fillText("score", 975, 100); // Canvas上にテキストを描画
    ctx.fillText(score, 970, 160); // Canvas上にテキストを描画

    let endTime = performance.now();
    min = Math.floor((endTime-startTime)/(60000));
    sec = Math.floor(((endTime-startTime)/1000)%60);
    if(min<10){
        min="0"+min;
    }
    if(sec<10){
        sec="0"+sec;
    }

    if(candy.count>0){
        ctx.drawImage( rabbit.goldImg, 0, 0, 1280, 1280, 945, 400, 150, 150);
    }else if(carrot.count>0){
        ctx.drawImage( rabbit.carrotImg, 0, 0, 1280, 1280, 945, 400, 150, 150);
    }else ctx.drawImage( rabbit.normalImg, 0, 0, 1280, 1280, 945, 400, 150, 150);
    

    ctx.font = '24px 美咲ゴシック'; // 使用するフォントを指定
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText("time", 1020, 600); // Canvas上にテキストを描画
    ctx.fillText(min+":"+sec, 1020, 630); // Canvas上にテキストを描画
    //ctx.fillText(min, 970, 360); // Canvas上にテキストを描画

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
                if(mapObjects[y][x]===3){
                    ctx.drawImage(candy.img, 0, 0, 1280, 1280, 32 * x +blank, 32 * y , 32, 32 );
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
        ctx.fillText('GAME OVER', 630, 540); // Canvas上にテキストを描画

        ctx.font = '36px 美咲ゴシック'; // 使用するフォントを指定
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('TIME', 840, 200); // Canvas上にテキストを描画
        ctx.fillText(min+":"+sec, 850, 320);


        ctx.font = '60px 美咲ゴシック'; // 使用するフォントを指定
        ctx.fillStyle = '#FDE200';
        ctx.fillText('SCORE', 640, 200); // Canvas上にテキストを描画
        ctx.fillText(score, 650, 320);

        ctx.font = '30px 美咲ゴシック'; // 使用するフォントを指定
        ctx.fillStyle = 'white';
        ctx.fillText('Go back with space key', 550, 610); // Canvas上にテキストを描画

        ctx.drawImage( grave, 0, 0, 1280, 1280, 330, 180, 300, 300);
    });


}






//キーが押されたときに呼び出される関数
function keydownfunc( event ) {


    let key_code = event.keyCode;

    if( key_code === 37 || key_code ===65){//左キーが押されたとき、key.leftをtrueにする
        key.left  = true;
        key.up    = false;
        key.down  = false;
        key.right = false;
    } 		
    if( key_code === 38 || key_code ===87){//上キー
        key.left  = false;
        key.up    = true;
        key.down  = false;
        key.right = false;
    } 		
    if( key_code === 39 || key_code ===68){//右キー
        key.left  = false;
        key.up    = false;
        key.down  = false;
        key.right = true;
    } 	
    if( key_code === 40 || key_code ===83){//下キー
        key.left  = false;
        key.up    = false;
        key.down  = true;
        key.right = false;
    } 


    if( scene==0 && key_code === 32 ){//スペースキーで画面遷移
        clickSound.play();
        startTime = performance.now();
        bgm.play();
        bgm.loop = true;  // ループ再生
        scene=1;
    } 
    if( scene==2 && key_code === 32 ){//スペースキーで画面遷移
        clickSound.play();
        reset();
        
        scene=0;
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
                if(candy.count>0){
                    candy.count--;
                    rabbit.img =rabbit.goldLeftImg;
                }else rabbit.img =rabbit.leftImg;
               
                
            }else if(moveCount==8-1){
                if(candy.count>0){
                    candy.count--;
                    rabbit.img = rabbit.goldLeftImg2;
                }else rabbit.img =rabbit.leftImg2;
            }
            objectCollider(y,x-1);     
        }
        if(rabbit.right==true){
            rabbit.x += rabbit.speed;
            rabbit.moveDirection=1;
            if(moveCount ==16-1){
                if(candy.count>0){
                    candy.count--;
                    rabbit.img = rabbit.goldRightImg;
                }else rabbit.img =rabbit.rightImg;
                 
             }else if(moveCount==8-1){
                if(candy.count>0){
                    candy.count--;
                    rabbit.img= rabbit.goldRightImg2;
                }else rabbit.img =rabbit.rightImg2;
             }
             objectCollider(y,x+1);
        }
        if(rabbit.up==true){
            rabbit.y -= rabbit.speed;
            rabbit.moveDirection=2;
            if(moveCount ==16-1){
                if(candy.count>0){
                    candy.count--;
                    rabbit.img = rabbit.goldUpImg;
                }else rabbit.img =rabbit.upImg;
                 
             }else if(moveCount==8-1){
                if(candy.count>0){
                    candy.count--;
                    rabbit.img =rabbit.goldUpImg2;
                }else rabbit.img =rabbit.upImg2;
             }
             objectCollider(y-1,x);
            
        }
        if(rabbit.down==true){
            rabbit.y += rabbit.speed;
            rabbit.moveDirection=3;
            if(moveCount ==16-1){
                if(candy.count>0){
                    candy.count--;
                    rabbit.img = rabbit.goldDownImg;
                }else rabbit.img =rabbit.downImg;
                 
             }else if(moveCount==8-1){
                if(candy.count>0){
                    candy.count--;
                    rabbit.img =rabbit.goldDownImg2;
                }else rabbit.img =rabbit.downImg2;
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


function objectCollider(y,x){//アイテムや草との衝突判定
    if(x>0 && y>0){
        try{
            if(mapObjects[y][x] ===1){//草と接触したら、草を消す
                mapObjects[y][x]=-1;
                grassRepopCount[y][x]=480*4;
                getGrass.play();
                getScore(grass.point);
                ctx.clearRect((x)*32+blank, (y)*32, (x)*32+blank+32, (y)*32+32);
            }
            if(mapObjects[y][x] ===2){//ニンジンと接触したときの処理
                mapObjects[y][x]=-1;
                getItem.play();
                getScore(1000);
                ctx.clearRect((x)*32+blank, (y)*32, (x)*32+blank+32, (y)*32+32);
                carrot.count+=320;
            }
            if(mapObjects[y][x] ===3){
                mapObjects[y][x]=-1;
                getItem.play();
                getScore(1500);
                ctx.clearRect((x)*32+blank, (y)*32, (x)*32+blank+32, (y)*32+32);
                candy.count+=30;
            }
        }catch{}
    }
}

function drawFox(){
    if(yellowFox.exist==true){
        ctx.drawImage( yellowFox.img, 0, 0, 1280, 1280,yellowFox.x, yellowFox.y,32,32 );//黄きつねを描画
    }
    if(grayFox.exist==true){
        ctx.drawImage( grayFox.img, 0, 0, 1280, 1280,grayFox.x, grayFox.y,32,32 );//灰きつねを描画
    }
    if(redFox.exist==true){
        ctx.drawImage( redFox.img, 0, 0, 1280, 1280,redFox.x, redFox.y,32,32 );//赤きつねを描画
    }
    if(whiteFox.exist==true){
        ctx.drawImage( whiteFox.img, 0, 0, 1280, 1280,whiteFox.x, whiteFox.y,32,32 );//白きつねを描画
    }
}





function enemyCollider(){//敵との衝突判定
    
    if(rabbit.x<=yellowFox.x+objectSize-1 && rabbit.x+objectSize-1>=yellowFox.x && rabbit.y<=yellowFox.y+objectSize-1 &&rabbit.y+objectSize-1>=yellowFox.y){
        if(yellowFox.exist==true){
            if(candy.count>0){
                nockFox.play();
                yellowFox.existCount-=40;
                yellowFox.exist=false;
                getScore(10000);
            }else{
                gameoverSound.play();
                bgm.pause();
                scene=2;
            }
        }
    }
    if(rabbit.x<=grayFox.x+objectSize-1 && rabbit.x+objectSize-1>=grayFox.x && rabbit.y<=grayFox.y+objectSize-1 &&rabbit.y+objectSize-1>=grayFox.y){
        if(grayFox.exist==true){
            if(candy.count>0){
                nockFox.play();
                grayFox.existCount-=40;
                grayFox.exist=false;
                getScore(10000);
            }else{
                gameoverSound.play();
                bgm.pause();
                scene=2;
            }
        }
    }
    if(rabbit.x<=whiteFox.x+objectSize-1 && rabbit.x+objectSize-1>=whiteFox.x && rabbit.y<=whiteFox.y+objectSize-1 &&rabbit.y+objectSize-1>=whiteFox.y){
        if(whiteFox.exist==true){
            if(candy.count>0){
                nockFox.play();
                whiteFox.exist=false;
                whiteFox.existCount-=40;
                getScore(10000);
            }else{
                gameoverSound.play();
                bgm.pause();
                scene=2;
            }
        }
    }
    if(rabbit.x<=redFox.x+objectSize-1 && rabbit.x+objectSize-1>=redFox.x && rabbit.y<=redFox.y+objectSize-1 &&rabbit.y+objectSize-1>=redFox.y){
        if(redFox.exist==true){
            if(candy.count>0){
                nockFox.play();
                redFox.exist=false;
                redFox.existCount-=40;
                getScore(10000);
            }else{
                gameoverSound.play();
                bgm.pause();
                scene=2;
            }
        }
    }

}

function getScore(p){
    score+=p;
}










const INF = 1000000000;//はじめに配列全体を適当な数で満たす
const dx = [-1, 1, 0, 0];//(dx,dy)で全ての移動方向を表現
const dy = [0, 0, -1, 1];
const width = 20;//マップ横幅
const height = 20;//マップ縦幅
 

function bfs(sx, sy, gx, gy) {//幅優先探索関数

    const dist=[];//移動距離を格納する変数の初期設定
    for(let y =0;y<height;y++){
        dist[y] =[];

        for(let x =0;x<width;x++){
            dist[y][x]=INF;
        }
    }
    dist[sy][sx] = 0;
  
    const queue = [{ x: sx, y: sy }];
    while (queue.length > 0) {//調べられる要素の数だけ調べる
        const cur = queue.shift();


        if (cur.x === gx && cur.y === gy) break;//ゴールに辿り着いたらループを抜ける
    

        for (let i = 0; i < 4; i++) {
            let nx = cur.x + dx[i];
            let ny = cur.y + dy[i];
      
            if (nx < 0 || nx >= width || ny < 0 || ny >= height) {//範囲外;
                continue;
            }
            if (map[ny][nx] === 1) {//壁;
                continue;
            }
            if (dist[ny][nx] !== INF) {//もう見た;
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
            const px = cx + dx[i];
            const py = cy + dy[i];
            if (px < 0 || px >= width || py < 0 || py >= height) {//範囲外;
                continue;
            }
            if (map[py][px] === 1) {//壁
                continue;
            }
            if (dist[py][px] === INF) {//もう見なくていい
                continue;
            }
            if(dist[py][px]==dist[cy][cx]-1){
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
















function reset(){
    score=0;
    moveCount =16;
    routes = [];
    key.up = false;
    key.down = false;
    key.right = false;
    key.left = false;   
    carrot.count =0;
    candy.count =0;
    rabbit.img = rabbit.leftImg;
    rabbit.x=blank +32*9;
    rabbit.y=blank +32*2;   
    rabbit.moveDirection=2;//0左 1右 2上 3下
    rabbit.left  =false;
    rabbit.right =false;
    rabbit.up    =false;
    rabbit.down  =false;
    rabbit.speed =2;    


    redFox.moveReset();
    redFox.x=enemyPositionX;
    redFox.y=enemyPositionY-objectSize;
    redFox.speed=2;
    redFox.left=false;
    redFox.right=false;
    redFox.up=false;
    redFox.down=false;
    redFox.moveCount = objectSize/redFox.speed;
    redFox.moveCount2 = objectSize/redFox.speed;
    redFox.moveI =0;
    redFox.exist=true;
    redFox.existCount=0;

    grayFox.moveReset();
    grayFox.x=enemyPositionX+objectSize;
    grayFox.y=enemyPositionY;
    grayFox.speed=2;
    grayFox.left=false;
    grayFox.right=false;
    grayFox.up=false;
    grayFox.down=false;
    grayFox.moveCount = objectSize/grayFox.speed;
    grayFox.moveCount2 = objectSize/grayFox.speed;
    grayFox.moveI =0;
    grayFox.exist=true;
    grayFox.existCount=0;

    whiteFox.moveReset();
    whiteFox.x=enemyPositionX+objectSize;
    whiteFox.y=enemyPositionY-objectSize;
    whiteFox.speed=2;
    whiteFox.left=false;
    whiteFox.right=false;
    whiteFox.up=false;
    whiteFox.down=false;
    whiteFox.moveCount = objectSize/ whiteFox.speed;
    whiteFox.moveCount2 = objectSize/ whiteFox.speed;
    whiteFox.moveI =0;
    whiteFox.exist=true;
    whiteFox.existCount=0;

    yellowFox.moveReset();
    yellowFox.x=enemyPositionX;
    yellowFox.y=enemyPositionY;
    yellowFox.speed=2;
    yellowFox.left=false;
    yellowFox.right=false;
    yellowFox.up=false;
    yellowFox.down=false;
    yellowFox.moveCount = objectSize/yellowFox.speed;
    yellowFox.moveCount2 = objectSize/yellowFox.speed;
    yellowFox.moveI =0;
    yellowFox.exist=true;
    yellowFox.existCount=0;




    itemPop =1000;
    //初期設定　ランダムオブジェクト（アイテム）生成
    for (let y=0; y<map.length; y++) {
        for (let x=0; x<map[y].length; x++) {
            if(map[y][x]===0){
                let item=Math.floor(Math.random()*itemPop)
                if(item<carrot.pop)mapObjects[y][x]=CARROT;//ニンジン 
                else if(item<carrot.pop+candy.pop) mapObjects[y][x]=CANDY;
                else mapObjects[y][x]=GRASS;//草
            }else if(map[y][x]===1) mapObjects[y][x] =0;//壁にはオブジェクトを生成しない
        }
    }


grassRepopCount = [//マップに草が復活するまでのカウント配列
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

}