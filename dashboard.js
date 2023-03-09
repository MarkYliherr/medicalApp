const firebaseConfig = {
  apiKey: "AIzaSyC6wm4-duyfF86gdDaAED-MkwSwo69woN0",
  authDomain: "medicalsystem-adminsite.firebaseapp.com",
  databaseURL: "https://medicalsystem-adminsite-default-rtdb.firebaseio.com",
  projectId: "medicalsystem-adminsite",
  storageBucket: "medicalsystem-adminsite.appspot.com",
  messagingSenderId: "497552428634",
  appId: "1:497552428634:web:d2c6c5bf957f089c9c1263"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var contactNo = getElementVal("contactNo");
  var msgContent = getElementVal("msgContent");
  
  if (!msgContent) {
    alert("Please fill in important fields!");
    return;
  }

  saveMessages(name, contactNo, msgContent);

  //   enable alert
  document.querySelector(".alert").style.display = "block";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  //   reset the form
  document.getElementById("contactForm").reset();
}

const saveMessages = (name, contactNo, msgContent) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    name: name,
    contactNo: contactNo,
    msgContent: msgContent,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};