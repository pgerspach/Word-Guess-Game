$(document).ready(function() {
  var wordArray = [
    "cat",
    "giraffe",
    "horse",
    "rabbit",
    "tiger",
    "tortoise",
    "wolf",
    "cow",
    "pig",
    "turkey",
    "ostrich"
  ];
  var gameWord = "";
  var letters = "";
  var amtRight = 0;
  var numGuess = 0;
  var maxGuess = 11;
  var numWins = 0;
  var wrongLet = "";
  var gameStart = false;

  $(".startClick").on("click", function() {
    // initialize a new
    $(".winImage").html(
      '<img src="assets/images/animals.png" alt="Generic Hangman Photo" width=120%>'
    );
    numGuess = 0;
    letters = "";
    amtRight = 0; // reset the amount of letters revealed
    wrongLet = "";

    $(".gameSide.theWord").text("");
    $(".result").text("");
    gameWord = wordArray[Math.floor(Math.random() * wordArray.length)]; // randomly grab word from word array
    console.log("Game word: " + gameWord); // after word is grabbed, print to console

    for (var i = 0; i < gameWord.length; i++) {
      $(".gameSide.theWord").append(
        '<span class="l' + String(i) + '"> _ </span>'
      ); // write blanks to document, with unique classes based on size of word
    }
    $(".wrongRem").text(String(maxGuess - numGuess));
    $(".guessed").text(wrongLet); // display wrong guesses

    gameStart = true;
  });

  $("body").keyup(function(event) {
    if (gameStart) {
      var inWord = false;
      //when a key is pressed
      if (event.which > 64 && event.which < 91) {
        // IF AN ALPHA CHARACTER
        var keyString = String.fromCharCode(event.which).toLowerCase(); //CONVERT TO LOWERCASE
        console.log(keyString);

        if (!inArray(keyString, letters)) {
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

                $(".winImage").html(
                  '<img src="assets/images/' +
                    gameWord +
                    '.png" alt="Generic Hangman Photo" width=100%>'
                );

                gameWord = ""; // reset gameword
                letters = ""; // reset letters guessed
                console.log("Amount right: " + String(amtRight));
                numWins++;
                numGuess = 0;
                wrongLet = "";
                amtRight = 0;
                $(".wins").text(numWins);
                inWord = true;
                gameStart = false;
                startAfterWin();
              } else {
                // if not all letters have been revealed, add the guessed letter to the letter string
                if (!inWord) {
                  letters += keyString;
                }
                inWord = true;
                console.log("guessed letters: " + letters);
                console.log("Amount right: " + amtRight);
              }
            }
          }
          if (!inWord) {
            numGuess++;
            letters += keyString;
            wrongLet += keyString;
            $(".wrongRem").text(String(maxGuess - numGuess));
            if (numGuess >= maxGuess) {
              $(".result").text("You lose! :(");
              gameWord = ""; // reset gameword
              letters = ""; // reset letters guessed
              numGuess = 0; // reset number of incorrect guesses
              wrongLet = ""; // reset wrong letters
              amtRight = 0; // reset number of right guesses
              numWins = 0;
              gameStart = false;
            }
          }
          $(".guessed").text(wrongLet); // display wrong guesses
        }
      }
    }
  });
  function startAfterWin() {
    // initialize a new
    //$(".winImage").html('');
   
    numGuess = 0;
    letters = "";
    amtRight = 0; // reset the amount of letters revealed
    wrongLet = "";

    $(".gameSide.theWord").text("");
    $(".result").text("");
    gameWord = wordArray[Math.floor(Math.random() * wordArray.length)]; // randomly grab word from word array
    console.log("Game word: " + gameWord); // after word is grabbed, print to console

    for (var i = 0; i < gameWord.length; i++) {
      $(".gameSide.theWord").append(
        '<span class="l' + String(i) + '"> _ </span>'
      ); // write blanks to document, with unique classes based on size of word
    }
    $(".wrongRem").text(String(maxGuess - numGuess));
    $(".guessed").text(wrongLet); // display wrong guesses

    gameStart = true;
  }

  function inArray(checkKey, checkArr) {
    var tflag = false;
    for (var i = 0; i < checkArr.length; i++) {
      //COMPARE TYPED VALUE TO LETTERS IN THE SECRET WORD
      if (checkKey === checkArr[i]) {
        // has the typed value already been guessed?
        tflag = true; // flag for an already guessed letter
      }
    }
    return tflag;
  }
});
