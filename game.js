/* The class delcaration for the object ROOM, 
includes the constructor(), and the operations available on it
namely, linkRoom(), move(), getDescrip()
*/

class room {
  constructor(num, name, descrip, charac, locked, gameOver, hh, key) {
    this._num = num; // number only
    this._name = name; //name of room: Room x
    this._descrip = descrip; // description of it
    this._linkedCharacter = charac; // character in the room
    this._linkedRooms = []; // rooms that are linked
    this._locked = locked; // boolean - true if locked
    this._gameOver = gameOver; // this is set to true for the game over rooms
    this._hh = hh; // 1 = heaven, 2 = hell, 0 = neither
    this._key = key; // 0 = no key, other value: it is the key to that room
  }
  linkRoom(direction, roomToLink) {
    this._linkedRooms[direction] = roomToLink;
  }

  move(direction) {
    let roomname;
    let locked;
    let roomnum;
    document.getElementById("Locked").innerHTML = "";

    if (direction in this._linkedRooms) {
      locked = this._linkedRooms[direction]._locked;
      roomnum = this._linkedRooms[direction]._num;
      if (locked) {
        if (haveKey1 === roomnum || haveKey2 === roomnum) {
          // have the key to this room
          highlightTheRoom(this._num);
          return this._linkedRooms[direction];
        }
        roomname = this._linkedRooms[direction]._name;
        document.getElementById("Locked").innerHTML =
          roomname + " is locked. You need the key!";
        highlightTheRoom(this._num);
        return this;
      }
      highlightTheRoom(this._num);
      return this._linkedRooms[direction];
    } else {
      highlightTheRoom(this._num);
      return this;
    }
  }
  getDescrip() {
    return this._descrip;
  }
}
/* END of the class declaration */

/* global declarations of which room is heaven and hell 
    this is accessed by function assignRoom() only
*/
let roomHeaven = 0;
let roomHell = 0;
let key1 = 0;
let key2 = 0;
let haveKey1 = 0; //have the key to this room
let haveKey2 = 0; // have the key to this room

/* create the instances of the object room, with their individual attributes
In this case there are 9 rooms, and two of them are locked
*/

let room0 = new room(
  0,
  "Room0",
  "Room 0 is an empty room. ",
  "none",
  false,
  false,
  0,
  0
);

let room1 = new room(
  1,
  "Room1",
  "Room 1 is an empty room.",
  "none",
  false,
  false,
  0,
  0
);

let room2 = new room(
  2,
  "Room2",
  "Room 2 has a wise man in it. He says 'Room 7 is the BEST room.'",
  "WISE MAN",
  false,
  false,
  0,
  0
);

let room3 = new room(
  3,
  "Room3",
  "Room 3 is an empty room.",
  "none",
  false,
  false,
  0,
  0
);

let room4 = new room(
  4,
  "Room4",
  "Room 4 has a VERY strange man in it. He says 'Go to Room 5 to win.'",
  "STRANGE MAN",
  false,
  false,
  0,
  0
);

let room5 = new room(
  5,
  "Room5",
  "Room 5 is an empty room.",
  "none",
  false,
  false,
  0,
  0
);

let room6 = new room(6, "Room6", "Room 6 is empty", "none", false, false, 0, 0);

let room7 = new room(
  7,
  "Room7",
  "Room 7 is an empty room",
  "none",
  false,
  false,
  0,
  0
);

let room8 = new room(
  8,
  "Room8",
  "Room 8 is an empty room",
  "none",
  false,
  false,
  0,
  0
);

/* This is the current room */
let currentRoom = room0;

/* now linking the rooms */

room0.linkRoom("left", room7);
room0.linkRoom("right", room3);
room0.linkRoom("above", room1);
room0.linkRoom("below", room5);

room1.linkRoom("left", room8);
room1.linkRoom("right", room2);
room1.linkRoom("below", room0);

room2.linkRoom("left", room1);
room2.linkRoom("below", room3);

room3.linkRoom("above", room2);
room3.linkRoom("below", room4);
room3.linkRoom("left", room0);

room4.linkRoom("left", room5);
room4.linkRoom("above", room3);

room5.linkRoom("left", room6);
room5.linkRoom("right", room4);
room5.linkRoom("above", room0);

room6.linkRoom("above", room7);
room6.linkRoom("right", room5);

room7.linkRoom("above", room8);
room7.linkRoom("right", room0);
room7.linkRoom("below", room6);

room8.linkRoom("right", room1);
room8.linkRoom("below", room7);

/* the game starts here. Uses the random function to create random room numbers to use */

function startGame() {
  roomHeaven = getRandomIntInclusive(1, 8);
  roomHell = getRandomIntInclusive(1, 8);
  key1 = getRandomIntInclusive(1, 8);
  key2 = getRandomIntInclusive(1, 8);

  while (roomHeaven === roomHell) {
    //make sure the rooms are different room numbers for heaven and hell
    heaven = getRandomIntInclusive(1, 8);
  }

  while (key1 === roomHeaven || key1 === roomHell || key1 === key2) {
    key1 = getRandomIntInclusive(1, 8);
  }

  while (key2 === roomHeaven || key2 === roomHell || key2 === key1) {
    key2 = getRandomIntInclusive(1, 8);
  }

  /* all 4 of the rooms chosen at random are now different rooms
      so that heaven and hell are not the same room, and neither contains a key (they are endgame rooms)
      the two keys are also now in different rooms from each other

  Next step is to make the chosen rooms into heaven and hell.
    Then place the keys into the the chosen rooms. 
  */

  assignRoom(roomHeaven, 1); // 1 means make this room 'heaven'
  assignRoom(roomHell, 2); // 2 means make it hell
  assignRoom(key1, 3); // 3 - make this room hold the key to heaven
  assignRoom(key2, 4); // 4 - make this room hold the key to hell

  /* the heaven room, hell room and the rooms with the keys to them have now been assigned
   */
  if (currentRoom !== room0) {
    displayCurrentRoom(currentRoom);
  }
  currentRoom = room0;
  displayCurrentRoom(currentRoom);
} //end of the startGame() function

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

/* Display the current room both as text and by highlighting it 
in the 3x3 box grid shown to the player
*/

function displayCurrentRoom(current) {
  document.getElementById("Descrip").innerHTML =
    "Current Room : " + current.getDescrip();
  highlightTheRoom(current._num);
  if (current._key !== 0) {
    // 0 means no key
    if (haveKey1 === 0) {
      //there is no key collected so far
      haveKey1 = current._key;
    } else {
      // already have one key
      haveKey2 = current._key;
    }
  }

  if (current._gameOver) {
    document.getElementById("Locked").innerHTML = " GAME OVER! ";
    document.getElementById("Move").style.display = "none";
  }
}

/* clicking on the navigation buttons makes a call to these functions */

function moveUp() {
  currentRoom = currentRoom.move("above");
  displayCurrentRoom(currentRoom);
}
function moveDown() {
  currentRoom = currentRoom.move("below");
  displayCurrentRoom(currentRoom);
}
function moveLeft() {
  currentRoom = currentRoom.move("left");
  displayCurrentRoom(currentRoom);
}
function moveRight() {
  currentRoom = currentRoom.move("right");
  displayCurrentRoom(currentRoom);
}

/* hightlight the room by changing the color of the button 
  it is called once to "unlightlight" the current room
  and it is called again to hightlight the new room that is moved into
*/

function highlightTheRoom(roomno) {
  switch (roomno) {
    case 0:
      document.getElementById("Button0").classList.toggle("myStyle");
      break;
    case 1:
      document.getElementById("Button1").classList.toggle("myStyle");
      break;
    case 2:
      document.getElementById("Button2").classList.toggle("myStyle");
      break;
    case 3:
      document.getElementById("Button3").classList.toggle("myStyle");
      break;
    case 4:
      document.getElementById("Button4").classList.toggle("myStyle");
      break;
    case 5:
      document.getElementById("Button5").classList.toggle("myStyle");
      break;
    case 6:
      document.getElementById("Button6").classList.toggle("myStyle");
      break;
    case 7:
      document.getElementById("Button7").classList.toggle("myStyle");
      break;
    case 8:
      document.getElementById("Button8").classList.toggle("myStyle");
      break;
  }
}

/* This function sets up the rooms to be a heaven room, a hell room,
and the keys to each room. "roomno" (an integer) is the room to assign to.
"flag" (integer) tells the function WHAT to assign: 
1: make this the heaven room by assigning value 1 to roomno
2: make this the hell room by assigning value 2 to roomno
3: make roomon hold the key to heaven
4: make roomon hold the key to hell

This has been set up as a switch because I need to amend each object (room1 for instance)
but I only have an intenger value to tell me which room (1 for instance)
*/

function assignRoom(roomNo, flag) {
  switch (roomNo) {
    case 1:
      if (flag === 1) {
        room1._hh = flag; // make this room heaven(1) or hell(2)
        room1._descrip =
          "Room1: You have arrived in HEAVEN. You WIN. GAME OVER";
        room1._key = 0; // the room cannot contain a key
        room1._locked = true; // lock the room
        roomHeaven = roomNo; // roomHeaven (global) is set to heaven room
        room1._gameOver = true; // this is a game over room
      }
      if (flag === 2) {
        room1._hh = flag; // make this room heavem(1) or hell(2)
        room1._descrip = "Room1: You have FALLEN into HELL, GOODBYE. GAME OVER";
        room1._key = 0; // the room cannot contain a key
        room1._locked = true; // lock the room
        roomHell = roomNo; // roomHell (global) is set to the hell room
        room1._gameOver = true; // this is a game over room
      }

      if (flag === 3) {
        // key to heaven
        room1._key = roomHeaven;
        room1._descrip =
          "Room 1. You have found the KEY to HEAVEN. It's in your pocket now.";
      }
      if (flag === 4) {
        // key to hell
        room1._key = roomHell;
        room1._descrip =
          "Room 1. You have found the KEY to HELL. It's in your pocket now.";
      }
      break;

    case 2:
      if (flag === 1) {
        room2._hh = flag; // make this room heavem(1) or hell(2)
        room2._descrip = "You have arrived in HEAVEN. You WIN. GAME OVER";
        room2._key = 0; // the room cannot contain a key
        room2._locked = true; // lock the room
        roomHeaven = roomNo; // roomHeaven (global) is set to heaven room
        room2._gameOver = true; // this is a game over room
      }
      if (flag === 2) {
        room2._hh = flag; // make this room heavem(1) or hell(2)
        room2._descrip = "You have FALLEN into HELL, GOODBYE. GAME OVER";
        room2._key = 0; // the room cannot contain a key
        room2._locked = true; // lock the room
        roomHell = roomNo; // roomHell (global) is set to the hell room
        room2._gameOver = true; // this is a game over room
      }

      if (flag === 3) {
        // key to heaven
        room2._key = roomHeaven;
        room2._descrip =
          "Room 2. You have found the KEY to HEAVEN. It's in your pocket now.";
      }
      if (flag === 4) {
        // key to hell
        room2._key = roomHell;
        room2._descrip =
          "Room 2. You have found the KEY to HELL. It's in your pocket now.";
      }
      break;

    case 3:
      if (flag === 1) {
        room3._hh = flag; // make this room heavem(1) or hell(2)
        room3._descrip = "You have arrived in HEAVEN. You WIN. GAME OVER";
        room3._key = 0; // the room cannot contain a key
        room3._locked = true; // lock the room
        roomHeaven = roomNo; // roomHeaven (global) is set to heaven room
        room3._gameOver = true; // this is a game over room
      }
      if (flag === 2) {
        room3._hh = flag; // make this room heavem(1) or hell(2)
        room3._descrip = "You have FALLEN into HELL, GOODBYE. GAME OVER";
        room3._key = 0; // the room cannot contain a key
        room3._locked = true; // lock the room
        roomHell = roomNo; // roomHell (global) is set to the hell room
        room3._gameOver = true; // this is a game over room
      }

      if (flag === 3) {
        // key to heaven
        room3._key = roomHeaven;
        room3._descrip =
          "Room 3. You have found the KEY to HEAVEN. It's in your pocket now.";
      }
      if (flag === 4) {
        // key to hell
        room3._key = roomHell;
        room3._descrip =
          "Room 3. You have found the KEY to HELL. It's in your pocket now.";
      }
      break;

    case 4:
      if (flag === 1) {
        room4._hh = flag; // make this room heavem(1) or hell(2)
        room4._descrip = "You have arrived in HEAVEN. You WIN. GAME OVER";
        room4._key = 0; // the room cannot contain a key
        room4._locked = true; // lock the room
        roomHeaven = roomNo; // roomHeaven (global) is set to heaven room
        room4._gameOver = true; // this is a game over room
      }
      if (flag === 2) {
        room4._hh = flag; // make this room heavem(1) or hell(2)
        room4._descrip = "You have FALLEN into HELL, GOODBYE. GAME OVER";
        room4._key = 0; // the room cannot contain a key
        room4._locked = true; // lock the room
        roomHell = roomNo; // roomHell (global) is set to the hell room
        room4._gameOver = true; // this is a game over room
      }

      if (flag === 3) {
        // key to heaven
        room4._key = roomHeaven;
        room4._descrip =
          "Room 4. You have found the KEY to HEAVEN. It's in your pocket now.";
      }
      if (flag === 4) {
        // key to hell
        room4._key = roomHell;
        room4._descrip =
          "Room 4. You have found the KEY to HELL. It's in your pocket now.";
      }
      break;

    case 5:
      if (flag === 1) {
        room5._hh = flag; // make this room heavem(1) or hell(2)
        room5._descrip = "You have arrived in HEAVEN. You WIN. GAME OVER";
        room5._key = 0; // the room cannot contain a key
        room5._locked = true; // lock the room
        roomHeaven = roomNo; // roomHeaven (global) is set to heaven room
        room5._gameOver = true; // this is a game over room
      }
      if (flag === 2) {
        room5._hh = flag; // make this room heavem(1) or hell(2)
        room5._descrip = "You have FALLEN into HELL, GOODBYE. GAME OVER";
        room5._key = 0; // the room cannot contain a key
        room5._locked = true; // lock the room
        roomHell = roomNo; // roomHell (global) is set to the hell room
        room5._gameOver = true; // this is a game over room
      }

      if (flag === 3) {
        // key to heaven
        room5._key = roomHeaven;
        room5._descrip =
          "Room 5. You have found the KEY to HEAVEN. It's in your pocket now.";
      }
      if (flag === 4) {
        // key to hell
        room5._key = roomHell;
        room5._descrip =
          "Room 5. You have found the KEY to HELL. It's in your pocket now.";
      }
      break;

    case 6:
      if (flag === 1) {
        room6._hh = flag; // make this room heavem(1) or hell(2)
        room6._descrip = "You have arrived in HEAVEN. You WIN. GAME OVER";
        room6._key = 0; // the room cannot contain a key
        room6._locked = true; // lock the room
        roomHeaven = roomNo; // roomHeaven (global) is set to heaven room
        room6._gameOver = true; // this is a game over room
      }
      if (flag === 2) {
        room6._hh = flag; // make this room heavem(1) or hell(2)
        room6._descrip = "You have FALLEN into HELL, GOODBYE. GAME OVER";
        room6._key = 0; // the room cannot contain a key
        room6._locked = true; // lock the room
        roomHell = roomNo; // roomHell (global) is set to the hell room
        room6._gameOver = true; // this is a game over room
      }

      if (flag === 3) {
        // key to heaven
        room6._key = roomHeaven;
        room6._descrip =
          "Room 6. You have found the KEY to HEAVEN. It's in your pocket now.";
      }
      if (flag === 4) {
        // key to hell
        room6._key = roomHell;
        room6._descrip =
          "Room 6. You have found the KEY to HELL. It's in your pocket now.";
      }
      break;

    case 7:
      if (flag === 1) {
        room7._hh = flag; // make this room heavem(1) or hell(2)
        room7._descrip = "You have arrived in HEAVEN. You WIN. GAME OVER";
        room7._key = 0; // the room cannot contain a key
        room7._locked = true; // lock the room
        roomHeaven = roomNo; // roomHeaven (global) is set to heaven room
        room7._gameOver = true; // this is a game over room
      }
      if (flag === 2) {
        room7._hh = flag; // make this room heavem(1) or hell(2)
        room7._descrip = "You have FALLEN into HELL, GOODBYE. GAME OVER";
        room7._key = 0; // the room cannot contain a key
        room7._locked = true; // lock the room
        roomHell = roomNo; // roomHell (global) is set to the hell room
        room7._gameOver = true; // this is a game over room
      }

      if (flag === 3) {
        // key to heaven
        room7._key = roomHeaven;
        room7._descrip =
          "Room 7. You have found the KEY to HEAVEN. It's in your pocket now.";
      }
      if (flag === 4) {
        // key to hell
        room7._key = roomHell;
        room7._descrip =
          "Room 7. You have found the KEY to HELL. It's in your pocket now.";
      }
      break;

    case 8:
      if (flag === 1) {
        room8._hh = flag; // make this room heavem(1) or hell(2)
        room8._descrip = "You have arrived in HEAVEN. You WIN. GAME OVER";
        room8._key = 0; // the room cannot contain a key
        room8._locked = true; // lock the room
        roomHeaven = roomNo; // roomHeaven (global) is set to heaven room
        room8._gameOver = true; // this is a game over room
      }
      if (flag === 2) {
        room8._hh = flag; // make this room heavem(1) or hell(2)
        room8._descrip = "You have FALLEN into HELL, GOODBYE. GAME OVER";
        room8._key = 0; // the room cannot contain a key
        room8._locked = true; // lock the room
        roomHell = roomNo; // roomHell (global) is set to the hell room
        room8._gameOver = true; // this is a game over room
      }

      if (flag === 3) {
        // key to heaven
        room8._key = roomHeaven; //this is the key to the heaven room
        room8._descrip =
          "Room 8. You have found the KEY to HEAVEN. It's in your pocket now.";
      }
      if (flag === 4) {
        // key to hell
        room8._key = roomHell; // this is the key to the hell room
        room8._descrip =
          "Room 8. You have found the KEY to HELL. It's in your pocket now.";
      }
      break;
  }
}

startGame();
