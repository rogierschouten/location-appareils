$(document).ready(function () {

    function disableForm() {
        $('#submit').addClass('pure-button-disabled');
        $('#submit').text('...');
        $('#name').attr('disabled, disabled');
        $('#phone').attr('disabled, disabled');
        $('#email').attr('disabled, disabled');
        $('#message').attr('disabled, disabled');
    }

    function enableForm() {
        $('#submit').removeClass('pure-button-disabled');
        $('#name').removeAttr('disabled');
        $('#phone').removeAttr('disabled');
        $('#email').removeAttr('disabled');
        $('#message').removeAttr('disabled');
    }

    function setInputError(selector) {
        $(selector).addClass('ras-input-error');
    }

    function clearInputError(selector) {
        $(selector).removeClass('ras-input-error');
    }

    $("#submit").click(function (e) {
        e.preventDefault();

        var name = $("#name").val(),
            phone = $("#phone").val(),
            email = $("#email").val(),
            message = $("#message").val();

        // client-side validation
        var error = false;
        if (!name || !name.trim() || name.length > 256) {
            error = true;
            setInputError('#name');
        } else {
            clearInputError('#name');
        }
        if (!phone || !phone.trim() || phone.length > 20) {
            error = true;
            setInputError('#phone');
        } else {
            clearInputError('#phone');
        }
        if (!email || !email.trim() || email.length > 256) {
            error = true;
            setInputError('#email');
        } else {
            clearInputError('#email');
        }
        if (!message || !message.trim() || message.length > 16384) {
            error = true;
            setInputError('#message');
        } else {
            clearInputError('#message');
        }
        if (error) {
            return;
        }

        disableForm();
        $.ajax({
            type: "POST",
            url: 'https://dhb0iptmnd.execute-api.eu-west-3.amazonaws.com/prod',
            contentType: 'application/json',
            data: JSON.stringify({
                'name': name,
                'email': email,
                'phone': phone,
                'message': message
            }),
            success: function () {
                enableForm();
                $('#submit').text('Envoyé!');
            },
            error: function () {
                enableForm();
                $('#submit').text('Erreur!');
            }
        });

    });

});

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
