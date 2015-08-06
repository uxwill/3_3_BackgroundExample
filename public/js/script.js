$(document).ready(function() {

    //socket io code
    //thats it, this allows the client to try and connect to a server that us using socketio
    var socket = io();

    $('#ping').click(function() {
        socket.emit('ping', 'Hello Server');
        console.log('pinged');
    });

    //add an event listener to the button, when clicked execute the function that sends the socket message
    socket.on('pong', function(data) {
        console.log("server responed: " + data);
        $('#serverResponse').append('Server says: ' + data + '</br>');
    });

    //generate random colour, send to server and get server to send to all other clients
    $('#changeBackground').click(function() {

        //logic to generate random colour in hex
        var newColour = '#' + Math.floor(Math.random() * 16777215).toString(16);

        //send to server
        socket.emit('changeBackground', newColour);

    });


    socket.on('setBackground', function(data) {
        //wait for server to send colour details in 'setBackground' message then changethe colour to $

        $('body').css("background-color", data);
    })

});
