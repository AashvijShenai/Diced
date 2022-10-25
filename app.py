#TODO: Please fix this garbage code


from flask import Flask, render_template, request, url_for
from flask_socketio import SocketIO, emit, join_room, leave_room
import os
import random
import time

app = Flask(__name__)
SECRET_KEY = os.urandom(32)
app.config['SECRET_KEY'] = SECRET_KEY
socketio = SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

#Dictionary containing room names paired with players in them
rooms = {}

#Dictionary containing room names paired with the dice grid
grids = {}

#Dictionary to control turns (Random)
turns = {}

scores = {}

names = {}

def is_gameOver(grid):
    for i in range(2):
        zeros = 0
        for j in range(3):
            zeros += grid[3*i + j].count(0)
        
        if(zeros == 0):
            return True
    return False

def roll(room):
    if(turns[room] == 0):
        emit('dice1_roll', room=room)
    else:
        emit('dice2_roll', room=room)

    val = random.randint(1,6)

    #This section was supposed to add the dice rolling animation
    #but the emits take effect only after the socketio func completes
    #TODO
    index = random.randint(10,15)
    for i in range(1,index):
        emit('dice_' + str((i%6) + 1) + '_show', {'val': val}, room=room)
        time.sleep(0.01)
        emit('dice_' + str((i%6) + 1) + '_hide', room=room)
    
    emit('dice_' + str(val) + '_show', {'val': val}, room=room)

def updateScore(room, turn, btn):
    grid = grids[room]

    row = int(btn.strip()[-2])
    col = int(btn.strip()[-1])
    val = grid[row][col]

    #Drop same numbers
    for i in range(3):
        row_t = 3*(1-turn) + i
        if(val == grid[row_t][col]):
            grid[row_t][col] = 0
            emit('btn_val', {'btn': f"btn_{row_t}{col}",'value': 0}, room=room)

    #Calculate scores
    for i in range(2):
        score = 0
        for j in range(3):
            temp_arr = [grid[3*i + 0][j], grid[3*i + 1][j], grid[3*i + 2][j]]   #TODO: Change grid
            for k in range(3):
                temp_val = temp_arr[k]
                multiplier = temp_arr.count(temp_val)

                score += temp_val*multiplier
        scores[room][i] = score

    emit('updateScore', {'p1':scores[room][0], 'p2':scores[room][1]}, room=room)

    grids[room] = grid


###########################################################
#URLs
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/<room>')
def play(room):
    return render_template('play.html')

#Socket events
@socketio.on('create')
def on_create(data):
    room = data['room']

    if(room in rooms or len(room) < 3):
        emit('create', False)
    else:
        join_room(room)
        rooms[room] = []
        grids[room] = [[0]*3 for i in range(6)]
        scores[room] = []
        names[room] = []

        emit('create', True)
        print(f"Created room: {room}")

@socketio.on('exists')
def on_exists(data):
    room = data['room']
    emit('exists', room in rooms)

@socketio.on('client_disconnecting')
def on_clientDisconnect(data):
    name = data['name']
    room = data['room']
    print(f"{name} has left {room}")
    leave_room(room)
    
    del rooms[room]
    del grids[room]
    del turns[room]
    del scores[room]
    del names[room]

    emit('gameover',room=room)

@socketio.on('join')
def on_join(data):
    name = data['name']
    room = data['room']

    if(len(rooms[room]) < 2):
        rooms[room].append(request.sid)
        scores[room].append(0)
        names[room].append(name)
        turns[room] = 0

        join_room(room)
        emit('join', True, room=room)
        print(f'{name} joined {room}')
    else:
        emit('join', False)

    if(len(rooms[room]) == 2):
        #Assign the turn to a random player once both join
        turns[room] = random.randint(0,1)

        emit('updateNames', {'p1' : names[room][0], 'p2' : names[room][1]}, room=room)

        emit('begin', {'turn':turns[room]}, room=room)
        print("Room is full. Game can start")

        roll(room)
    
@socketio.on('click')
def on_click(data):
    room = data['room']
    valid = 0
    dice_val = int(data['val'])
    grid = grids[room]

    #Proceeding only if correct player clicks
    if(request.sid == rooms[room][turns[room]]):
        emit('hide_beginturn', room=room)

        row = int(data['btn'][4])
        col = int(data['btn'][5])
        
        if(turns[room] == 0):
            if(row < 3 and grid[row][col] == 0):
                grid[row][col] = dice_val
                valid = 1
                emit(f'btn_{row}{col}_val', {'value': dice_val}, room=room)
        else:
            if(row > 2 and grid[row][col] == 0):
                grid[row][col] = dice_val
                valid = 1
                emit(f'btn_{row}{col}_val', {'value': dice_val}, room=room)        
    
    if(valid):
        updateScore(room, turns[room], data['btn'])

        if(is_gameOver(grid)):
            emit('gameover',room=room)
        else:
            turns[room] = 1 - turns[room]
            roll(room)


@socketio.on('reset')
def on_reset(data):
    room = data['room']
    grids[room] = [[0]*3 for i in range(6)]
    scores[room] = [0,0]
    turns[room] = random.randint(0,1)

    emit('updateScore', {'p1':scores[room][0], 'p2':scores[room][1]}, room=room)
    emit('reset', room=room)
    emit('begin', {'turn':turns[room]}, room=room)


if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)
