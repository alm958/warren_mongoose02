$(document).ready(function() {
    console.log( "ready!" );

    $.ajax({
        method:'get',
        url: '/rabbits',
        success: function(response){
            $('.warren').html(response);
        }
    })

    $.ajax({
        method:'get',
        url: '/form',
        success: function(response){
            console.log("in automatic form load ajax call");
            console.log(response);
            $('.form').html(response);
        }
    })

    $('.form').on('submit', function(e){
        e.preventDefault();
        console.log($('form'));
        console.log($('form').serialize());
        $.ajax({
            method:'post',
            url:'/rabbits/new',
            data:$('form').serialize(),
            success: function(response){
                $('.warren').html(response);
                $('.error').html('');
                document.getElementById("newrabbitform").reset();
            },
            error: function(response){
                $('.error').append(response.responseText);
            }
        })
    })

    $('.warren').on('click','button.edit',function(e){
        e.preventDefault();
        console.log(this);
        console.log(this.dataset);
        console.log($('this.dataset').serialize);
        var tempForm = $(this).data();
        console.log(tempForm);
        $.ajax({
            method:'get',
            url: '/form',
            data: tempForm,
            success: function(response){
                $('form').html(response);
            }
        })

    })

    $('.warren').on('click','button.reset',function(e){
        e.preventDefault();
        $('form').toggleClass("hide");
        $('.error').html('');
        $('.warren').empty();
        document.getElementById("newrabbitform").reset();
    })


});
