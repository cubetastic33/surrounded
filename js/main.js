// Initialize Firebase
var config = {
  apiKey: "apiKey",
  authDomain: "authDomain",
  databaseURL: "databaseURL",
  projectId: "projectId",
  storageBucket: "storageBucket",
  messagingSenderId: "messagingSenderId"
};
firebase.initializeApp(config);

$(document).ready(function() {
  if ($('select').length) {
    $('select').material_select();
  }
  if ($('.modal').length) {
    $('.modal').modal();
  }
});

$('#signUp').submit(function(e) {
  e.preventDefault();
  signUpUser();
});

$('#signIn').submit(function(e) {
  e.preventDefault();
  signInUser();
});

var db = firebase.database();
var storage = firebase.storage();

$('#username').keyup(function() {
  if ($('#username').val()) {
    $('#username').attr('class', 'valid');
    $('#usernameLabel').attr('data-success', $('#username').val() + ' is available.');
    var ref = firebase.database().ref('users').orderByChild('username').equalTo($('#username').val());
    ref.on('child_added', function(snapshot) {
      var usersdata = snapshot.val();
      if (usersdata.username == $('#username').val()) {
        $('#username').attr('class', 'invalid');
        $('#usernameLabel').attr('data-error', usersdata.username+' already exists. Choose a different name!');
      } else {
        $('#username').attr('class', 'valid');
        $('#usernameLabel').attr('data-success', $('#username').val() + ' is available.');
      }
    });
  } else {
    $('#username').attr('class', 'validate');
  }
});

$('#confPassword').keyup(function() {
  if ($('#confPassword').val() == $('#password').val()) {
    $('#confPassword').attr('class', 'valid');
  } else {
    $('#confPassword').attr('class', 'invalid');
  }
});

function signUpUser() {
  //Get values
  var username = $('#username').val();
  var email = $('#email').val();
  var password = $('#password').val();
  var gender = $('input[name=gender]:checked').val();
  if (($('#usernameLabel').attr('class') != 'invalid') && ($('#confPassword').attr('class') == 'valid') && (gender)) {
    Materialize.toast('Please wait...');
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        $('#password').attr('class', 'invalid');
        $('#passwordLabel').attr('data-error', 'The password is too weak.');
      }
      else {
        Materialize.toast(errorMessage, 10000);
      }
    });

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var uid = user.uid;
        db.ref('users/'+uid).child('email').set(email);
        db.ref('users/'+uid).child('gender').set(gender);
        db.ref('users/'+uid).child('profilePic').set('/images/defaultProfilePic.png');
        db.ref('users/'+uid).child('username').set(username);
        user.updateProfile({
          displayName: username,
          photoURL: "/images/defaultProfilePic.png"
        });
        user.sendEmailVerification().then(function() {
          // Email sent.
          alert("Verification email has been sent.");
          window.location.href="index.html";
        }).catch(function(error) {
          // An error happened.
          Materialize.toast(errorMessage, 10000);
        });
      }
    });
  } else if ($('#confPassword').attr('class') != 'valid') {
    Materialize.toast('The two passwords don\'t match!');
    $('#confPasswordLabel').attr('data-error', 'The two passwords don\'t match!');
  } else if (!gender) {
    Materialize.toast('Please select your gender!');
  }
}

function signInUser() {
  //Get values
  var username = $("#username").val();
  var password = $("#password").val();
  Materialize.toast('Please wait...');

  var usersRef = db.ref('users').orderByChild('username').equalTo(username);
  usersRef.once("child_added", function(snapshot) {
    email = snapshot.val().email;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      Materialize.toast(errorMessage);
    });
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        window.location.href="index.html";
      }
    });
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

$('#forgotPassword').click(function() {
  firebase.auth().sendPasswordResetEmail(prompt('Enter your email address')).then(function() {
    console.log('Sent password reset email.');
  }).catch(function(error) {
    console.log('Error: ', error);
  });
});

function signOutUser() {
  firebase.auth().signOut().then(function() {}).catch(function(error) {console.log(error);});
}
