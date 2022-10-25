var socket = io()

var $startForm = $('#start')
var $nameField = $('#name')
var $panel = $('#panel')

var $name1_span = $('#name1')
var $name2_span = $('#name2')

var $score1_span = $('#score1')
var $score2_span = $('#score2')

var $btn_toolbar1 = $('#btn_toolbar1')
var $btn_toolbar2 = $('#btn_toolbar2')

var $dice1_class = $('#dice1_class')
var $dice2_class = $('#dice2_class')

var $turn1 = $('#turn1')
var $turn2 = $('#turn2')

var $gameover = $('#gameover_img')

var $dice0_1 = $('#dice0_1')
var $dice1_1 = $('#dice1_1')

var $reset_btn = $('#reset')

var data = {
    room: window.location.pathname.split('/')[1], // get the first path
    name: null,
    btn: null,
    val: null
}

$('body').addClass('center')

$startForm.on('submit', function(event) {
    event.preventDefault()
    data.name = $nameField.val()

    socket.emit('join', data)
})

socket.on('join', function(free) {
    if(free){
        var name = data.name
        $startForm.hide()
        $panel.show()
        $name1_span.html(`${name}`)
    }
    else{
        alert("Room is full")
    }
})

socket.on('updateNames', function(names){
    $name1_span.html(`${names.p1}`)
    $name2_span.html(`${names.p2}`)
})

socket.on('begin', function(turn) {
    $btn_toolbar1.show()
    $btn_toolbar2.show()

    if(turn.turn == 0){
        $turn1.html(`You begin`)
    }
    else{
        $turn2.html(`You begin`)
    }
})

socket.on('updateScore', function(scores){
    $score1_span.html(`${scores.p1}`)
    $score2_span.html(`${scores.p2}`)
})

socket.on('gameover', function(scores){
    $gameover.show()
    $reset_btn.show()
})

socket.on('reset', function(){
    $gameover.hide()
    $reset_btn.hide()

    for(let i = 0; i < 6; i++){
        for(let j = 0; j < 3; j++){
            document.getElementById(`btn_${i}${j}`).style.setProperty(
                "background-image",
                "url('/static/0.png')")
        }
    }
})

socket.on('hide_beginturn', function(){
    $turn1.hide()
    $turn2.hide()
})

socket.on('dice1_roll', function(){
    $dice1_class.show()
    $dice2_class.hide()
    $dice0_1.show()
})

socket.on('dice2_roll', function(){
    $dice2_class.show()
    $dice1_class.hide()
    $dice1_1.show()
})

socket.on('dice_show', function(event){
    data.val = event.dice_val
    document.getElementById(`dice0_${data.val}`).style.setProperty("display", "block")
    document.getElementById(`dice1_${data.val}`).style.setProperty("display", "block")
})

socket.on('dice_hide', function(event){
    var dice_val = event.dice_val
    document.getElementById(`dice0_${dice_val}`).style.setProperty("display", "none")
    document.getElementById(`dice1_${dice_val}`).style.setProperty("display", "none")
})

socket.on('btn_val', function(event){
    var btn = event.btn
    var btn_url = `/static/${event.value}.png`
    document.getElementById(btn).style.setProperty(
        "background-image",
        `url(${btn_url})`)
})

$reset_btn.on('click', function(event) {
    event.preventDefault()
    socket.emit('reset', data)
})

var allButtons = document.querySelectorAll('button[type="submit"]');
for (var i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener('click', function(event) {
    event.preventDefault()
    data.btn = this.id
    socket.emit('click', data)
  });
}

window.onpagehide = function () {
    socket.emit('client_disconnecting', {'name': data.name, 'room': data.room});
}