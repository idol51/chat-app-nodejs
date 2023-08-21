var users = {};

function getUsers (arr) {
    var onlineUsers = [];

    arr.forEach((onlineUser) => {
        onlineUsers.push(Object.values(onlineUser)[0])
    })

    return onlineUsers
}

module.exports = {getUsers, users};