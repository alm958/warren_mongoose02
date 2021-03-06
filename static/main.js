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
            $('.form').html(response);
        }
    })

    $("#rabbitlist").tablesorter();

    $('.form').on('submit', '#newrabbitform',function(e){
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

    $('.form').on('submit', '#updaterabbitform',function(e){
        e.preventDefault();
        console.log($('form'));
        console.log($('form').serialize());
        $.ajax({
            method:'post',
            url:'/rabbits/update',
            data:$('form').serialize(),
            success: function(response){
                $('.warren').html(response);
                $('.error').html('');
                $.ajax({
                    method:'get',
                    url: '/form',
                    success: function(response){
                        console.log("in automatic form load ajax call");
                        $('.form').html(response);
                    }
                })
            },
            error: function(response){
                $('.error').append(response.responseText);
            }
        })
    })

    $('.form').on('reset', 'form',function(e){
        e.preventDefault();
        console.log($('form'));
        console.log($('form').serialize());
        $.ajax({
            method:'get',
            url: '/form',
            success: function(response){
                $('.form').html(response);
                $('.error').html('');
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
        var rabbitdata = $(this).data();
        console.log(rabbitdata.breed);
        $.ajax({
            method:'get',
            url: '/form',
            data: rabbitdata,
            success: function(response){
                $('.form').html(response);
                $('.form').find("option").filter(function(index){
                    return $( this ).attr( "value" ) === rabbitdata.breed ;
                }).attr("selected", true);
            }
        })
    })

    $('.warren').on('click','button.delete',function(e){
        e.preventDefault();
        console.log(this.dataset);
        var rabbitdata = $(this).data();
        $( "#dialog" ).dialog({
            title: 'Delete Rabbit?',
            width: 450,
            height: 150,
            modal: true,
            buttons:[
                {
                    text: `Delete ${rabbitdata.name}`,
                    click: function() {
                        $(this).dialog('close');
                        $.ajax({
                            method:'post',
                            url:'/rabbits/destroy',
                            data: rabbitdata,
                            success: function(response){
                                $('.warren').html(response);
                                $('.error').html('');
                                $.ajax({
                                    method:'get',
                                    url: '/form',
                                    success: function(response){
                                        console.log("in automatic form load ajax call");
                                        $('.form').html(response);
                                    }
                                })
                            },
                            error: function(response){
                                $('.error').append(response.responseText);
                            }
                        })
                    }
                },
                {
                    text: `Cancel`,
                    click: function() {
                        $(this).dialog('close');
                    }
                },
            ]
         });
    })

    $('.warren').on('click','button.show',function(e){
        e.preventDefault();
        console.log(this.dataset);
        var rabbitdata = $(this).data();
        console.log(rabbitdata);
        $.ajax({
            method:'get',
            url: '/rabbits/show',
            data: rabbitdata,
            success: function(response){
                $('.showrabbit').html(response);
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

    $('.showrabbit').on('click','button.unshow',function(e){
        e.preventDefault();
        $('.showrabbit').empty();
    })


});
