firebase.auth().onAuthStateChanged(function(user) {
  hideloader();
  if (user) {
    // User is signed in.
    var email = user.email;
    var emailVerified = user.emailVerified;
    var username = user.displayName;
    var profilePic = user.photoURL;
    if (emailVerified == false) {
      $("#loggedStatus").html("\
        <a href=\"signin.html\" class=\"logout\">Email Not Verified | Sign in</a>\
      ");
      firebase.auth().signOut().then(function() {}).catch(function(error) {});
    } else {
      $('#loggedStatus').html('\
        <a href="profile.html">\
          <img src="'+profilePic+'" id="profilePic" class="circle" alt="profile pic"></img>\
        </a>\
      ');
      $('#signinreqmessage').hide();
      $('#signinreq').show();
    }
  } else {
    // No user is signed in.
    if (document.getElementById("loggedStatus").innerHTML == "") {
      $("#loggedStatus").html('\
        <ul class="logout">\
          <li>\
            <a href="signin.html">Sign in</a>\
          </li>\
        </ul>\
      ');
    }
    $('#signinreqmessage').show();
    $("#signinreq").hide();
  }
});
