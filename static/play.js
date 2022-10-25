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

var $btn_00 = $('#btn_00')
var $btn_01 = $('#btn_01')
var $btn_02 = $('#btn_02')
var $btn_10 = $('#btn_10')
var $btn_11 = $('#btn_11')
var $btn_12 = $('#btn_12')
var $btn_20 = $('#btn_20')
var $btn_21 = $('#btn_21')
var $btn_22 = $('#btn_22')

var $btn_30 = $('#btn_30')
var $btn_31 = $('#btn_31')
var $btn_32 = $('#btn_32')
var $btn_40 = $('#btn_40')
var $btn_41 = $('#btn_41')
var $btn_42 = $('#btn_42')
var $btn_50 = $('#btn_50')
var $btn_51 = $('#btn_51')
var $btn_52 = $('#btn_52')

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

$btn_00.on('click', function(event) {
    event.preventDefault()
    data.btn = "btn_00"
    socket.emit('click', data)
})

$btn_01.on('click', function(event) {
    event.preventDefault()
    data.btn = "btn_01"
    socket.emit('click', data)
})

$btn_02.on('click', function(event) {
    event.preventDefault()
    data.btn = "btn_02"
    socket.emit('click', data)
})

$btn_10.on('click', function(event) {
    event.preventDefault()
    data.btn = "btn_10"
    socket.emit('click', data)
})

$btn_11.on('click', function(event) {
    event.preventDefault()
    data.btn = "btn_11"
    socket.emit('click', data)
})

$btn_12.on('click', function(event) {
    event.preventDefault()
    data.btn = "btn_12"
    socket.emit('click', data)
})

$btn_20.on('click', function(event) {
    event.preventDefault()
    data.btn = "btn_20"
    socket.emit('click', data)
})

$btn_21.on('click', function(event) {
    event.preventDefault()
    data.btn = "btn_21"
    socket.emit('click', data)
})

$btn_22.on('click', function(event) {
    event.preventDefault()
    data.btn = "btn_22"
    socket.emit('click', data)
})

$btn_30.on('click', function(event) {
    event.preventDefault()
    data.btn = "btn_30"
    socket.emit('click', data)
})

$btn_31.on('click', function(event) {
    event.preventDefault()
    data.btn = "btn_31"
    socket.emit('click', data)
})

$btn_32.on('click', function(event) {
    event.preventDefault()
    data.btn = "btn_32"
    socket.emit('click', data)
})

$btn_40.on('click', function(event) {
    event.preventDefault()
    data.btn = "btn_40"
    socket.emit('click', data)
})

$btn_41.on('click', function(event) {
    event.preventDefault()
    data.btn = "btn_41"
    socket.emit('click', data)
})

$btn_42.on('click', function(event) {
    event.preventDefault()
    data.btn = "btn_42"
    socket.emit('click', data)
})

$btn_50.on('click', function(event) {
    event.preventDefault()
    data.btn = "btn_50"
    socket.emit('click', data)
})

$btn_51.on('click', function(event) {
    event.preventDefault()
    data.btn = "btn_51"
    socket.emit('click', data)
})

$btn_52.on('click', function(event) {
    event.preventDefault()
    data.btn = "btn_52"
    socket.emit('click', data)
})

window.onpagehide = function () {
    socket.emit('client_disconnecting', {'name': data.name, 'room': data.room});
}