let rval ;
let yval = document.getElementById("y-textinput");
let xval;
let xChosen = false;



function clickF(element){

    xval = element;
    xChosen = true;

}
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function validateX() {
    let newPoint = '<circle id="point" r="4" cx="150" cy="150" fill-opacity="0.8" fill="green" stroke="green"></circle>'


    $(".scroll-container").append(newPoint)
    if (xChosen){
        $(".x-button1").removeClass('text-error');
        $(".x-button1").off();
        document.getElementById("x-error").innerHTML = "";

        return true;
    }
    else{
        $(".x-button1").addClass('text-error');
        document.getElementById("x-error").innerHTML = "Поле не может быть пустым";

        return false;
    }
    return false;
}

function validateY() {
    const Y_MIN = -3;
    const Y_MAX = 3;

    let yField = $('#y-textinput');
    let numY = yval.value.replace(',', '.');

    if (isNumeric(numY) && numY >= Y_MIN && numY <= Y_MAX)
    {
        yField.removeClass('text-error');
        document.getElementById("y-error").innerHTML = "";
        return true;
    } else {
        yField.addClass('text-error');
        document.getElementById("y-error").innerHTML = "Введите правильное значение.";
        return false;
    }
}

function validateR() {
    if ($('.r-radio').is(':checked')) {
        rval = $('.r-radio:checked');
        $('.r-label').removeClass('box-error');
        document.getElementById("r-error").innerHTML = "";
        return true;
    } else {
        $('.r-label').addClass('box-error');
        document.getElementById("r-error").innerHTML = "Поле не может быть пустым";
        return false;
    }
}

document.getElementsByClassName("mySvg")[0].addEventListener("mousedown", function (e){

    setPoints();
});
function setPoints(){

    var element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    element.setAttribute('cx', "150")
    element.setAttribute('cy', "200")
    element.setAttribute("visibility","visible")
    element.setAttribute('r', "4")
    element.setAttribute('class', "points")
        document.getElementById("graph").appendChild(element);
}

function unsetPoints(){
    let pointsArray = document.querySelectorAll('.points'); // обращаю внимание на точку
    for( let i = 0; i < pointsArray.length; i++ ){
        pointsArray[i].setAttribute("visibility", "hidden");
    }


}
function validateForm() {
    return validateX() & validateY() & validateR();
}

$(document).ready(function(){

    $('#input-form').on('submit', function(event) {

        event.preventDefault();
        if (!validateForm()) {
            return;
        }

        $.ajax({
            url: 'php/script.php',
            method: 'POST',
            data: {"xval": xval.value, "yval": yval.value, "rval": rval.val()},
            dataType: "json",
            beforeSend: function() {
                $('.button').attr('disabled', 'disabled');
            },
            success: function(data) {
                $('.button').attr('disabled', false);
                if (data.validate) {
                    newRow = '<tr>';
                    newRow += '<td>' + data.xval + '</td>';
                    newRow += '<td>' + data.yval + '</td>';
                    newRow += '<td>' + data.rval + '</td>';
                    newRow += '<td>' + data.curtime + '</td>';
                    newRow += '<td>' + data.exectime + '</td>';
                    newRow += '<td>' + data.hitres + '</td>';
                    $('#result-table').append(newRow);
                }
                else{
                    alert('Ошибка ввода данных');
                }
            },
            error: function (jqXHR, exception) {
                if (jqXHR.status === 0) {
                    alert('Not connect. Verify Network.');
                } else if (jqXHR.status == 404) {
                    alert('Requested page not found (404).');
                } else if (jqXHR.status == 500) {
                    alert('Internal Server Error (500).');
                } else if (exception === 'parsererror') {
                    alert('Requested JSON parse failed.');
                } else if (exception === 'timeout') {
                    alert('Time out error.');
                } else if (exception === 'abort') {
                    alert('Ajax request aborted.');
                } else {
                    alert('Uncaught Error. ' + jqXHR.responseText);
                }
            }
        });
    });
});