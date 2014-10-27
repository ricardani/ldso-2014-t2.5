$( document ).ready(function() {

    function checkPassword() {
        if (document.registerForm.password.value != document.registerForm.passwordConfirm.value) {
            //alert ('The passwords do not match!');
            return false;
        }
        return true;
    };

    function insert_user(email, password, firstname, lastname){

        $.ajax({
            url: '/register-user',
            type: 'POST',
            data: $.param({'email': email,'password': password,'firstname': firstname, 'lastname': lastname}),
            dataType : 'html',
            success: function(data, textStatus, xhr) {
                window.location='#/login/login';
                $("#alerts").append('<div class="alert alert-success alert-dismissible" role="alert">' +
                    '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+
                    '<strong>Success!</strong> The registration was a success!' +
                    '</div>');
            },
            error: function(xhr, textStatus, errorThrown) {
                $("#alerts").append('<div class="alert alert-danger alert-dismissible" role="alert">' +
                    '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+
                    '<strong>Error!</strong> The registration failed! Please try again later.  '+
                    '</div>');
            }
        });

    };


    $(document).on('submit', '#registerForm', function(){

        if(checkPassword()){
            var email =  document.getElementById('register-email').value;
            var password =  document.getElementById('register-password').value;
            var firstname =  document.getElementById('register-firstname').value;
            var lastname =  document.getElementById('register-lastname').value;
            insert_user(email, password, firstname, lastname);
        }else{
            $("#alerts").append('<div class="alert alert-warning alert-dismissible" role="alert">' +
                '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+
                '<strong>Warning!</strong> The passwords do not match!'+
                '</div>');
        }

    });


});