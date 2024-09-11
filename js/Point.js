function checkXArea(x){
    return x <= 3 && x >= -5;
}

function checkYArea(y){
    return y > -5 && y < 3;
}

function checkAreaCoordinates(x, y){
    let errorMsg;
    if (checkXArea(x) && checkYArea(y)){
        return true;
    }
    if (!checkXArea(x)) {
        errorMsg = "X must be in range [-5;3]!";
    }
    if (!checkYArea(y)){
        errorMsg = "Y must be in range (-5;3)!";
    }
    alert(errorMsg);
}

function click(xCoord, yCoord){
    if (validateR()){
        let r = document.getElementById("r-textinput");
        let x = convertCoordinates(xCoord, yCoord, r)[0];
        let y = convertCoordinates(xCoord, yCoord, r)[1];
        alert(x);
        if (checkAreaCoordinates(x, y)){
            sendRequest("no", x, y, r);
            return false;
        }
        else {
            unsetPoints();
            return false;
        }
    }
}

//так как центр находится в точке 150, 150, необходимо перенести его в (0;0)
function changeX(coordinatesX){
    let centerX = 150;

    if (coordinatesX > centerX){
        return coordinatesX - centerX;
    }
    else {
        return -(centerX - coordinatesX);
    }


}
function changeY(coordinatesY){
    let centerY = 150;

    if (coordinatesY > centerY){
        return -(coordinatesY - centerY);
    }
    else {
        return centerY - coordinatesY;
    }
}

//длина по OX и OY 300 (по 150 с каждой стороны осей абсцисс и ординат), от 0 до R берем 120 (единичное деление)
function convertCoordinates(x, y, r){
    x = (changeX(x) / 120)*r;
    y = (changeY(y) / 120)*r;
    return [x, y];
}