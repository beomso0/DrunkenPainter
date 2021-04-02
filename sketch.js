let randomX;
let randomY;
let lineRandomX;
let lineRandomY;
let handsize = 50;
let circleAndLineArray = [];
let pickedColor;
let clicked = false;
let colorOrNot = true;
let weightSlider;

makeAlert();

function preload() {
    image_canvas = loadImage('./canvas.jpg');
    image_hand = loadImage('./real_hand.png');
}



function setup() {
    cnvs = createCanvas(500, 500);
    background(image_canvas);
    //colorpicker 만들기
    // textSize(30);
    // fill(0);
    // text('COLOR PICKER', 550, 200)
    pickedColor = createColorPicker('rgb(182,103,197)');
    pickedColor.position(730, 130);

    //저장 버튼 만들기 
    button = createButton('DOWNLOAD');
    button.position(620, 264);
    button.mousePressed(saveFile);

    //strokeweight slider
    weightSlider = createSlider(1, 50, 6);
    weightSlider.position(788, 197);
    noCursor();
}

function draw() {
    background(image_canvas);

    // 물감 및 검은 직선 그리기
    circleAndLineArray.forEach(function(item) {
        if (item[4] == 'circle') { // 클릭 좌표인 경우
            makeArt(item[0], item[1], item[2], item[3]);
        } else { // 드래그 좌표인 경우
            limitedLine(item[0], item[1], item[2], item[3], item[5], item[6]);
        }
    })

    //random 좌표 생성 -> 손떨림 속도 조정
    if (frameCount % 5 == 0) {
        randomX = mouseX - 20 + random(-10, 10);
        randomY = mouseY - 20 + random(-10, 10);
    }

    if (colorOrNot == true) {
        push();
        translate(randomX, randomY);
        image(image_hand, 0, 0, handsize, handsize);
        pop();
    } else {
        makeLineArray();
        image(image_hand, mouseX, mouseY, handsize, handsize);
    } //손 이미지 커서

}


function mousePressed() {
    if (colorOrNot == true) {
        let i = 3
        while (i < random(3, 9)) {
            circleAndLineArray.push([randomX, randomY, random(1, 10000), pickedColor.value(), 'circle']);
            i++;
        }
    }
}


function keyPressed() {
    if (key == 'c') {
        colorOrNot = !colorOrNot;
        // console.log(colorOrNot);
    }
}


function makeLineArray() {
    if (mouseIsPressed) {
        circleAndLineArray.push([mouseX + 10, mouseY + 35, pmouseX + 10, pmouseY + 35, 'line', pickedColor.value(), weightSlider.value()]);
    }
}


function makeArt(x, y, seed, pickedRGB) {
    noStroke();
    randomSeed(seed);

    let pickedR = parseInt(pickedRGB.slice(1, 3), 16);
    let pickedG = parseInt(pickedRGB.slice(3, 5), 16);
    let pickedB = parseInt(pickedRGB.slice(5, 7), 16);

    let thisColor = color(random(pickedR - 50, pickedR + 50), random(pickedG - 50, pickedG + 50), random(pickedB - 50, pickedB + 50));


    let thisX = x + random(-20, 20);
    let thisY = y + random(-20, 20);
    fill(thisColor);
    ellipse(thisX, thisY, random(3, 5), random(3, 5));
    stroke(thisColor);
    strokeCap(ROUND);
    let times = 50;
    while (times < random(50, 80)) {
        strokeWeight(random(0.5, 7));
        line(thisX, thisY, thisX + random(-50, 50), thisY + random(-50, 50));
        times++;
    }
    randomSeed();
}


function limitedLine(x, y, px, py, pickedRGB, weight) {

    let pickedR = parseInt(pickedRGB.slice(1, 3), 16);
    let pickedG = parseInt(pickedRGB.slice(3, 5), 16);
    let pickedB = parseInt(pickedRGB.slice(5, 7), 16);
    let thisColor = color(pickedR, pickedG, pickedB);


    strokeWeight(weight);
    stroke(thisColor);
    strokeCap(ROUND);
    strokeJoin(ROUND);
    line(x, y, px, py);
}


function saveFile() {
    let myImage = get(95, 34, 300, 428);
    save(myImage);
}

function makeAlert() {
    alert("크롬 전체화면으로 이용해주세요");
}

seeViewport();