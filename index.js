const firebaseConfig = {
 apiKey: "AIzaSyCTeDkJDvCRl21h2zx_yKM5-2hSuhsHXYA",
 authDomain: "medicalsystem-4aab8.firebaseapp.com",
 projectId: "medicalsystem-4aab8",
 storageBucket: "medicalsystem-4aab8.appspot.com",
 messagingSenderId: "195093582325",
 appId: "1:195093582325:web:4610af2ea4b23f98b550bc"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const database = firebase.database()
const rememberMe = document.getElementById('remember');

function register () {
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value

  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is wrong.')
    return
  }
  if (validate_field(full_name) == false) {
    alert('Wrong name.')
    return
  }
 
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {

    var user = auth.currentUser
    var database_ref = database.ref()
    var user_data = {
      email : email,
      full_name : full_name,
      last_login : Date.now()
    }

    database_ref.child('users/' + user.uid).set(user_data)

    alert('Account Creation success.')
    
    window.location.href = "/Dashboard/dashboard.html";
  })
  
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}


function login () {

  email = document.getElementById('email').value
  password = document.getElementById('password').value

  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is wrong.')
    return
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    var user = auth.currentUser
    var database_ref = database.ref()
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    alert('Account Login success.')
    
    window.location.href = "dashboard.html";
    
  })

  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}


function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    return true
  } else {
    return false
  }
}

function validate_password(password) {
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}
