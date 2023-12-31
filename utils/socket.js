const { getUsers, users } = require('./getUsers');

function socket (io) {
    io.on('connection', (socket) => {
        socket.on('joined-user', (data) => {
            var user = {};
            users[socket.id] = data.username;

            if ( users[data.roomname] ) {
                users[data.roomname].push(user);
            }
            else {
                users[data.roomname] = [user];
            }

            socket.join(data.roomname);

            io.to(data.roomname).emit('joined-user', { username: data.username });

            io.to(data.roomname).emit('online-users', getUsers(users[data.roomname]));
        })

        socket.on('chat', (data) => {
            io.to(data.roomname).emit('chat', { username: data.username, message: data.message });
        })

        socket.on('typing', (data) => {
            io.to(data.roomname).emit('typing', data.username);
        })

        socket.on('disconnecting', () => {
            var rooms = Object.keys(socket.rooms);
            var socketId = rooms[0];
            var roomname = rooms[1];
            console.log(rooms);

            if ( users[roomname] && io.to[roomname] ) {
                users[roomname].forEach((user, index) => {
                    if (user[socketId]) {
                        users[roomname].splice(index, 1)
                    }
                });

                io.to[roomname].emit('online-users', getUsers(users[roomname]));
            }

        })
    })
}

module.exports = socket;