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
	roomname = localStorage.getItem("room_name");

function send()

{
  msg = document.getElementById("msg").value;
  firebase.database().ref(roomname).push({
    name:user_name,
    message:msg,
    like:0
   });

  document.getElementById("msg").value = "";
}






function getData() { firebase.database().ref("/"+roomname).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
name=message_data['name'];
message=message_data['message'];
like=message_data['like'];


name_tag="<h4>"+name+"<img src='tick.png'class='user_tick'></h4>";
message_tag="<h4 class='message_h4'>"+message+"</h4>";
like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
span_tag="<span class='glyphicon glyphicon-thumbs-up'> Like:"+like+"</span></button><hr>";

row=name_tag+message_tag+like_button+span_tag;
document.getElementById("output").innerHTML+=row;



      } });  }); }
getData();

function updateLike(text_id) {
  console.log(text_id);
  button_id=text_id;

like=document.getElementById(button_id).value;

updateLikes=Number(like)+1;
console.log(updateLikes);
firebase.database().ref(roomname).child(text_id).update({
  like:updateLikes
});



}

