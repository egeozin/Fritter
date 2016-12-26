
$(document).ready(function() {
  Handlebars.partials = Handlebars.templates;


  //Bring all freets of the session-owner, if not render the login/signup page.
  $.get('/freets', function(resp) {
    if(resp.success){
      var form = Handlebars.templates.form();
      var html = Handlebars.templates.freet_items(resp);;
      $(".container").empty();
      $(".container").append(form);
      $("#freets-list").append(html);
    } else {
        var signupHtml = Handlebars.templates.signup();
        var loginHtml = Handlebars.templates.login();
        $(".container").append(signupHtml).append(loginHtml);
        console.log(resp.message);
    }

});

	

//SIGN-UP
$(document).on('click', '#signup-button',function() {
		var currentUser = $('#name-input').val();
    var password = $('#password-input').val();
    if (currentUser && password) {
        $.post('/signup', {
              username: currentUser,
              password: password
          }, function(resp) {
              if (resp.success) {
                console.log('here10!');
		            var form = Handlebars.templates.form();
		            var html = Handlebars.templates.freet_items(resp);
		            $(".container").empty();
		            $(".container").append(form);
		            $("#freets-list").append(html);
              } else {
                console.log(resp.message);
                $('#signup-username').removeClass("warning-signup-username-1").addClass("warning-show").text(resp.message);
              }
        })
    } else {
        console.log('here6!');
        $('#signup-password').removeClass("warning-signup-password-1").addClass("warning-show");
    } 
  	
  });

  //LOGIN
  $(document).on('click', '#login-button', function() {
    var currentUser = $('#name-input-login').val();
    var password = $('#password-input-login').val();
    if (currentUser && password) {
        $.post('/login', {
              username: currentUser,
              password: password
          }, function(resp) {
              if (resp.success) {
                console.log('success login client!');
                var form = Handlebars.templates.form();
                var accountHtml = '<div id="account-section"><h1>'+resp.name+'</h1></div>';
                var html = Handlebars.templates.freet_items(resp);
                $('#signup-section').remove();
                $('#login-section').remove();
                $(".container").append(accountHtml);
                $(".container").append(form);
                $("#freets-list").append(html);
              } else {
                console.log(resp.message);
                $('#login-username').removeClass("warning-login-username-1").addClass("warning-show").text(resp.message);
              }
        })
    } else {
        $('#login-password').removeClass("warning-login-password-1").addClass("warning-show");
    } 
    
  });


	//Sends POST request with the submitted freet.
  //In success condition, appends it to the freets-list item.
  $(document).on('click', '#freet-post-button', function(){
    var text = $('#freet-item').val();
    $.post('/freet', {
            content: text
    		}, function(resp) {
      	if (resp.success) {
        	var html = Handlebars.templates.freet(resp.freet[0]);
        	$("#freets-list").prepend(html);
      	} else {
        	alert(resp);
      	}
    });
	});


  //Sends POST request with the retweeted freet.
  //In success condition, appends it to the freets-list item.
  $(document).on('click', '.refreet-button', function(){
    var name = $(this).parent().find('.username').text();
    var id = $(this).parent().data('id');
    $.post('/refreet', {
            name: name,
            _id: id
        }, function(resp) {
        if (resp.success) {
          var html = Handlebars.templates.freet(resp.refreet[0]);
          $("#freets-list").prepend(html);
          console.log(resp.message)
        } else {
          console.log(resp.message);
        }
    });
  });

  

  //Sends GET request.
  //Brings users list.
  $(document).on('click', '#users-list-link', function(){
    $.get('/users', function(resp) {
        if (resp.success) {
          var usersListHtml = '<div id="users-list"></div>';
          var html = Handlebars.templates.users(resp);
          $(".container").empty()
          $(".container").append(usersListHtml);
          $("#users-list").append(html);
        } else {
          console.log(resp.message);
        }
    });
  });

  
    //Sends a GET request.
    //Renders individual account pages.
    $(document).on('click', '.users-list-item', function(){
      var user = $(this).attr('id');
      $.get('/freets', {name:user}, function(resp) {
          if (resp.success) {
            var accountHtml = '<div id="account-section"><h1>'+user+'</h1></div>';
            var freetsHtml = Handlebars.templates.freets_list();
            var html = Handlebars.templates.freet_items(resp);
            $(".container").children().remove();
            $(".container").append(accountHtml).append(freetsHtml);
            if (user != resp.name) { 
              followHtml = '<div id="follow-section"><button class="btn" id="follow-button">Follow</button></div>';
              $("#account-section").append(followHtml);
            };
            $("#freets-list").append(html);
          } else {
              $(".container").empty();
              var signupHtml = Handlebars.templates.signup();
              var loginHtml = Handlebars.templates.login();
              $(".container").append(signupHtml).append(loginHtml);
              console.log(resp.message);
          }
      });
    });


  //Sends the name of the to-be-followed individual with the POST request.
  $(document).on('click', '#follow-button', function(){
    var followed = $('#account-section').find('h1').text();
    $.post('/follow',{toBeFollowed:followed}, function(resp) {
        if (resp.success) {
          $("#follow-button").text('Followed').off();
        } else {
          alert(resp);
        }
      });
  });



  //Sends GET request.
  //Brings all freets.
  $(document).on('click', '#freets-list-link', function(){
    $.get('/allFreets', function(resp) {
        if (resp.success) {
          var introduce = Handlebars.templates.all_the_freets();
          var freetsHtml = Handlebars.templates.freets_list();
          var html = Handlebars.templates.freet_items(resp);
          $(".container").empty();
          $(".container").append(introduce).append(freetsHtml);
          $("#freets-list").append(html);
        } else {
          console.log(resp.message);
          $(".container").empty()
          var signupHtml = Handlebars.templates.signup();
          var loginHtml = Handlebars.templates.login();
          $(".container").append(signupHtml).append(loginHtml);
        }
    });
  });



  //Sends Ajax DELETE request with the information related to the target freet.
  //In success condition, appends it to the freets-list item.
	$(document).on('click', '.close', function(){
        var name = $(this).parent().find('.username').text();
        var reposter = $(this).parent().find('.refreeter').text().split(" ", 2)[0];
    		var id = $(this).parent().data('id');
  			$.ajax({
    			url: '/freets',
    			type: 'DELETE',
    			data: {
            '_id': id,
            'name': name,
            'reposter': reposter
          },
    			dataType: 'json',
    			success: function(resp) { 
    				if (resp.success) {
    					var html = Handlebars.templates.freet_items(resp);
    					$("#freets-list").empty();
    					$("#freets-list").append(html);
      				} else {
        			 console.log('You can not delete this freet!');
      			  }
    			}
			});	
	});

});

