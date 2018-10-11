$(document).ready(function() {
  var wordArray;
  var letters;
  var amtRight;
  var numGuess;
  var maxGuess;
  var numWins = 0;
  var wrongLet;
  var gameStart;
  var gameWord;

  setUp();
  startGame();

  $(".startClick").on("click", function() {
    changeImage("animals");
    startGame();
  });

  $("body").keyup(function(event) {
    console.log("HERE in KEYUP");
    if (gameStart) {
      var rawKey = event.which;

      var keyString = convertKey(rawKey);
      if (keyString != "") {
        compareToWord(keyString);
      }
    }
  });

  function startGame() {
    numGuess = 0;
    letters = "";
    amtRight = 0; // reset the amount of letters revealed
    wrongLet = "";
    getGW(); //get gameword
    createWordDisp();
    gameStart = true;
    console.log("HETE AT END OF STARTGAME");
  }
  function getGW() {
    gameWord = wordArray[Math.floor(Math.random() * wordArray.length)]; // randomly grab word from word array
  }

  function setUp() {
    wordArray = [
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
    gameWord = "";
    letters = "";
    amtRight = 0;
    numGuess = 0;
    maxGuess = 11;
    numWins = 0;
    wrongLet = "";
    gameStart = false;
    changeImage("animals");
  }

  function changeImage(word) {
    $(".winImage").html(
      '<img src="assets/images/' +
        word +
        '.png" alt="Generic Hangman Photo" height=60%>'
    );
  }

  function createWordDisp() {
    $(".gameSide.theWord").text("");
    $(".result").text("");
    for (var i = 0; i < gameWord.length; i++) {
      $(".gameSide.theWord").append(
        '<span class="l' + String(i) + '"> _ </span>'
      ); // write blanks to document, with unique classes based on size of word
    }
    $(".wrongRem").text(String(maxGuess - numGuess));
    $(".guessed").text(wrongLet); // display wrong guesses
  }

  function convertKey(rawKey) {
    //should be called when there is an event, returns alpha character or nothing if not alpha
    var keyString = "";
    if (rawKey > 64 && rawKey < 91) {
      keyString = String.fromCharCode(rawKey).toLowerCase();
    }
    return keyString;
  }

  function compareToWord(key) {
    var inWord = false;
    if (!inArray(key, letters)) {
      for (var i = 0; i < gameWord.length; i++) {
        if (key === gameWord[i]) {
          writeToWord(key, i);
          didWin(key);
          inWord = true;
        }
      }
      if (!inWord) {
        letters += key;
        wrongLet += key;
        numGuess += 1;
        $(".wrongRem").text(String(maxGuess - numGuess));
        if (numGuess >= maxGuess) {
          $(".result").text("You lose! :(");
          setUp();
          changeImage("animals");
        }
      }
      $(".guessed").text(wrongLet);
    }
  }

  function writeToWord(letter, i) {
    $(".l" + String(i)).text(letter); // write letter to the appropriate blank space
    amtRight++; // increase the amount correct
  }

  function didWin(key) {
    if (amtRight === gameWord.length) {
      // if the amount of revealed letters matches the length of the gameWord, you win
      $(".result").text("You win!");
      changeImage(gameWord);
      numWins++;
      $(".wins").text(numWins);
      gameStart = false;
      startGame();
    } else {
      if (!inArray(key, letters)) {
        letters += key;
      }
    }
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
