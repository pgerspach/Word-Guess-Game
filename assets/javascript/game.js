$(document).ready(function() {
  var wordArray = ["chicken", "peacock", "gorilla"];
  var gameWord = "";
  var letters = "";
  var guessedTag = false;
  var amtRight = 0;

  $(".startClick").on("click", function() { // initialize a new
    $(".result").text("");
    amtRight = 0; // reset the amount of letters revealed
    gameWord = wordArray[Math.floor(Math.random() * wordArray.length)]; // randomly grab word from word array
    console.log("Game word: " + gameWord); // after word is grabbed, print to console

    for (var i = 0; i < gameWord.length; i++) {
      // simply write blanks to screen
      $(".l" + String(i)).text("_");
    }
  });

  $("body").keyup(function(event) { //when a key is pressed
    // When a key is typed
    if (event.which > 64 && event.which < 91) {
      // IF AN ALPHA CHARACTER
      var keyString = String.fromCharCode(event.which).toLowerCase(); //CONVERT TO LOWERCASE
      console.log(keyString);
      for (var i = 0; i < letters.length; i++) {
        //COMPARE TYPED VALUE TO LETTERS IN THE SECRET WORD
        if (keyString === letters[i]) {
          // has the typed value already been guessed?
          guessedTag = true; // flag for an already guessed letter
        }
      }

      if (!guessedTag) {
        // IF THE LETTER HAS NOT BEEN GUESSED YET
        for (var i = 0; i < gameWord.length; i++) {
          // loop through the secret word
          if (keyString === gameWord[i]) {
            // if typed key matches any value, do...
            console.log("Word letter: " + gameWord[i]);
            console.log("Key: " + keyString);

            $(".l" + String(i)).text(keyString); // write letter to the appropriate blank space
            console.log(".l" + String(i));
            amtRight++; // increase the amount correct
            if (amtRight === gameWord.length) {
              // if the amount of revealed letters matches the length of the gameWord, you win
              $(".result").text("You win!");
              gameWord = ""; // reset gameword
              letters = ""; // reset letters guessed
              console.log("Amount right: " + String(amtRight));
            } else {
              // if not all letters have been revealed, add the guessed letter to the letter string
              letters += keyString;
              console.log("guessed letters: " + letters);
              console.log("Amount right: " + amtRight);
            }
          }
        }
      }
    }
  });
});
