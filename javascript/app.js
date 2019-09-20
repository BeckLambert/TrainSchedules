  //Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyByLq7t_UeF1Pl_6zBKDwf0ba9oL_M4mZE",
    authDomain: "testing-84e29.firebaseapp.com",
    databaseURL: "https://testing-84e29.firebaseio.com",
    projectId: "testing-84e29",
    storageBucket: "",
    messagingSenderId: "772947666733",
    appId: "1:772947666733:web:cc8170d861205fc06f95a4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();


  // 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);
  
    alert("added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  });