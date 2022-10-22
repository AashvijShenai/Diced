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
var $dice0_2 = $('#dice0_2')
var $dice0_3 = $('#dice0_3')
var $dice0_4 = $('#dice0_4')
var $dice0_5 = $('#dice0_5')
var $dice0_6 = $('#dice0_6')

var $dice1_1 = $('#dice1_1')
var $dice1_2 = $('#dice1_2')
var $dice1_3 = $('#dice1_3')
var $dice1_4 = $('#dice1_4')
var $dice1_5 = $('#dice1_5')
var $dice1_6 = $('#dice1_6')

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

var $btn_00_span = $('#btn_00_span')
var $btn_01_span = $('#btn_01_span')
var $btn_02_span = $('#btn_02_span')
var $btn_10_span = $('#btn_10_span')
var $btn_11_span = $('#btn_11_span')
var $btn_12_span = $('#btn_12_span')
var $btn_20_span = $('#btn_20_span')
var $btn_21_span = $('#btn_21_span')
var $btn_22_span = $('#btn_22_span')

var $btn_30_span = $('#btn_30_span')
var $btn_31_span = $('#btn_31_span')
var $btn_32_span = $('#btn_32_span')
var $btn_40_span = $('#btn_40_span')
var $btn_41_span = $('#btn_41_span')
var $btn_42_span = $('#btn_42_span')
var $btn_50_span = $('#btn_50_span')
var $btn_51_span = $('#btn_51_span')
var $btn_52_span = $('#btn_52_span')

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

    $btn_00_span.html(`${0}`)
    $btn_01_span.html(`${0}`)
    $btn_02_span.html(`${0}`)
    $btn_10_span.html(`${0}`)
    $btn_11_span.html(`${0}`)
    $btn_12_span.html(`${0}`)
    $btn_20_span.html(`${0}`)
    $btn_21_span.html(`${0}`)
    $btn_22_span.html(`${0}`)

    $btn_30_span.html(`${0}`)
    $btn_31_span.html(`${0}`)
    $btn_32_span.html(`${0}`)
    $btn_40_span.html(`${0}`)
    $btn_41_span.html(`${0}`)
    $btn_42_span.html(`${0}`)
    $btn_50_span.html(`${0}`)
    $btn_51_span.html(`${0}`)
    $btn_52_span.html(`${0}`)
    

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

socket.on('dice_1_show', function(value){
    data.val = value.val
    $dice0_1.show()
    $dice1_1.show()
})

socket.on('dice_2_show', function(value){
    data.val = value.val
    $dice0_2.show()
    $dice1_2.show()
})

socket.on('dice_3_show', function(value){
    data.val = value.val
    $dice0_3.show()
    $dice1_3.show()
})

socket.on('dice_4_show', function(value){
    data.val = value.val
    $dice0_4.show()
    $dice1_4.show()
})

socket.on('dice_5_show', function(value){
    data.val = value.val
    $dice0_5.show()
    $dice1_5.show()
})

socket.on('dice_6_show', function(value){
    data.val = value.val
    $dice0_6.show()
    $dice1_6.show()
})

socket.on('dice_1_hide', function(){
    $dice0_1.hide()
    $dice1_1.hide()
})

socket.on('dice_2_hide', function(){
    $dice0_2.hide()
    $dice1_2.hide()
})

socket.on('dice_3_hide', function(){
    $dice0_3.hide()
    $dice1_3.hide()
})

socket.on('dice_4_hide', function(){
    $dice0_4.hide()
    $dice1_4.hide()
})

socket.on('dice_5_hide', function(){
    $dice0_5.hide()
    $dice1_5.hide()
})

socket.on('dice_6_hide', function(){
    $dice0_6.hide()
    $dice1_6.hide()
})

socket.on('btn_00_val', function(value){
    var valu = value.value
    $btn_00_span.html(`${valu}`)
    document.getElementById("btn_00_span").style.setProperty("background", "url(static/1.png)")
})

socket.on('btn_01_val', function(value){
    var valu = value.value
    $btn_01_span.html(`${valu}`)
})

socket.on('btn_02_val', function(value){
    var valu = value.value
    $btn_02_span.html(`${valu}`)
})

socket.on('btn_10_val', function(value){
    var valu = value.value
    $btn_10_span.html(`${valu}`)
})

socket.on('btn_11_val', function(value){
    var valu = value.value
    $btn_11_span.html(`${valu}`)
})

socket.on('btn_12_val', function(value){
    var valu = value.value
    $btn_12_span.html(`${valu}`)
})

socket.on('btn_20_val', function(value){
    var valu = value.value
    $btn_20_span.html(`${valu}`)
})

socket.on('btn_21_val', function(value){
    var valu = value.value
    $btn_21_span.html(`${valu}`)
})

socket.on('btn_22_val', function(value){
    var valu = value.value
    $btn_22_span.html(`${valu}`)
})

socket.on('btn_30_val', function(value){
    var valu = value.value
    $btn_30_span.html(`${valu}`)
})

socket.on('btn_31_val', function(value){
    var valu = value.value
    $btn_31_span.html(`${valu}`)
})

socket.on('btn_32_val', function(value){
    var valu = value.value
    $btn_32_span.html(`${valu}`)
})

socket.on('btn_40_val', function(value){
    var valu = value.value
    $btn_40_span.html(`${valu}`)
})

socket.on('btn_41_val', function(value){
    var valu = value.value
    $btn_41_span.html(`${valu}`)
})

socket.on('btn_42_val', function(value){
    var valu = value.value
    $btn_42_span.html(`${valu}`)
})

socket.on('btn_50_val', function(value){
    var valu = value.value
    $btn_50_span.html(`${valu}`)
})

socket.on('btn_51_val', function(value){
    var valu = value.value
    $btn_51_span.html(`${valu}`)
})

socket.on('btn_52_val', function(value){
    var valu = value.value
    $btn_52_span.html(`${valu}`)
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