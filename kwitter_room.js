var firebaseConfig = {
  apiKey: "AIzaSyA7lQuvLewOMRnB8Kuj5L26zehsB_w5K9E",
  authDomain: "kwitter-e9c14.firebaseapp.com",
  databaseURL: "https://kwitter-e9c14-default-rtdb.firebaseio.com",
  projectId: "kwitter-e9c14",
  storageBucket: "kwitter-e9c14.appspot.com",
  messagingSenderId: "1068671038916",
  appId: "1:1068671038916:web:b8e50a6890f6c4e45b2091"
};

firebase.initializeApp(firebaseConfig);


  user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom()
{
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose : "adding room name"
  });

    localStorage.setItem("room_name", room_name);
    
    window.location = "kwitter_page.html";
}

function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
       Room_names = childKey;
       console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
    window.location = "index.html";
}
