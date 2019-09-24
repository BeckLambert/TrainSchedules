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
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.trainName);
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

//Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());
	
  // Store everything into a variable.
  valueTrain = childSnapshot.val().trainName;
  valueDestination = childSnapshot.val().destination;
  valueFirst = childSnapshot.val().firstTrain;
  valueFrequency = childSnapshot.val().frequency;

    // how often train runs
    var tFrequency = 3;

    // Time is 3:30 
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
	
	
  //Adding into the table
  var newRow = $("<tr>").append(
    $("<th>").text(valueTrain),
    $("<th>").text(valueDestination),
    $("<th>").text(valueFrequency),
    $("<th>").text(nextTrain),
    $("<th>").text(tMinutesTillTrain)
);

$("#train-table > tbody").append(newRow);
});
