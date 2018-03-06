let currentPos = '0202';
let newPosition;
const mazeContainer = document.getElementById('container');

const map = [
    "  WWWWW ",
    "WWW   W ",
    "W S   W ",
    "WWW   W ",
    "W WW  W ",
    "W W   WW",
    "W      W",
    "W      W",
    "WWWWWWWW"
  ];


function createMaze() {
   for (let i = 0; i < map.length; i++) {
      let row = document.createElement('div');
      row.className = 'row';
      mazeContainer.appendChild(row);
      for (let j = 0; j < map[i].length; j++) {

         let randomVar = String(i > 9 ? "" + i : "0" + i) + String(j > 9 ? "" + j : "0" + j)

         if (map[i][j] === 'W') {
            let cell = document.createElement("div");
            cell.className = 'wall mazeBlock';
            cell.id = randomVar;
            row.appendChild(cell);
         } else if (map[i][j] === 'X') {
            let cell = document.createElement("div");
            cell.className = 'filledLocation mazeBlock';
            cell.id = randomVar;
            row.appendChild(cell);

         } else if (map[i][j] === 'B') {
            let cell = document.createElement("div");
            cell.className = 'crate mazeBlock';
            cell.id = randomVar;
            row.appendChild(cell);

        } else if (map[i][j] === 'S') {
            let cell = document.createElement("div");
            cell.className = 'open mazeBlock';
            cell.id = randomVar;
            row.appendChild(cell);

            // Appending the starting cursor to the starting div
            let cursor = document.createElement('div');
            cursor.className = 'cursor';
            cell.appendChild(cursor);

        } else if (map[i][j] === 'O') {
            let cell = document.createElement("div");
            cell.className = 'storageLocation mazeBlock';
            cell.id = randomVar;
            row.appendChild(cell);
         
        } else {
            let cell = document.createElement("div");
            cell.className = 'open mazeBlock';
            cell.id = randomVar;
            row.appendChild(cell);
        }

      }
   }
}



function moveCursor() {
   // take class cursor away from current div
   var toCancelClass = document.getElementById(currentPos);
   console.log(toCancelClass);
   toCancelClass.removeChild(toCancelClass.childNodes[0]);

   // move class cursor to new div
   const moveCursorTo = document.getElementById(newPosition);
   let newCursor = document.createElement("div");
   newCursor.className = 'cursor';
   moveCursorTo.appendChild(newCursor);

   currentPos = newPosition;

   return true;
   console.log(map);
}

function checkLeft() {
   currentCol = Number(currentPos.substring(2, 4));
   columnToMoveTo = currentCol - 1
   if (columnToMoveTo < 0) {
      alert('Illegal Move');
      return;
   }

   columnToMoveTo > 9 ? "" + columnToMoveTo : columnToMoveTo = "0" + columnToMoveTo;
   newPosition = currentPos.substring(0, 2) + String(columnToMoveTo);
   // console.log("columnToMoveTo " + columnToMoveTo);

   let leftRightOptions = map[Number(currentPos.substring(0, 2))][Number(columnToMoveTo)]

   return leftRightOptions === 'W' ? false : moveCursor();

}

function checkRight() {
   currentCol = Number(currentPos.substring(2, 4));
   columnToMoveTo = currentCol + 1;
   columnIn3rdPosition = currentCol + 2;

   // pads 0 to single digits //
   columnToMoveTo > 9 ? "" + columnToMoveTo : columnToMoveTo = "0" + columnToMoveTo;
   // identifies the intended new position //
   newPosition = currentPos.substring(0, 2) + String(columnToMoveTo);

    // assigns variable to the position on either left or right of cursor (depending on arrow selected) //
   let leftRightOptions = map[Number(currentPos.substring(0, 2))][Number(columnToMoveTo)];
   //assigns variable to the second position to the left or right (depending on arrow selected) //
   let leftRight3rdPosition = map[Number(currentPos.substring(0, 2))][Number(columnIn3rdPosition)];

   if (leftRightOptions === "B") {
        if (leftRight3rdPosition === "W"){
            alert("Wall preventing move");
            return;
        }else if(leftRight3rdPosition === "B"){
            alert("2nd crate preventing move");
            return;
        }else{ 
            moveCursor();
        }
    }


//    if (leftRightOptions === "F") {
//       moveCursor();
//       alert('You Win!!');
//    }

   return leftRightOptions === 'W' ? false : moveCursor();
}

function checkUp() {
   currentRow = Number(currentPos.substring(0, 2));
   rowToMoveTo = currentRow - 1;

   rowToMoveTo > 9 ? "" + rowToMoveTo : rowToMoveTo = "0" + rowToMoveTo;
   newPosition = String(rowToMoveTo) + currentPos.substring(2, 4);

   upDownOptions = map[Number(rowToMoveTo)][Number(currentPos.substring(2, 4))];

   return upDownOptions === 'W' ? false : moveCursor();
}

function checkDown() {
   currentRow = Number(currentPos.substring(0, 2));
   rowToMoveTo = currentRow + 1;

   rowToMoveTo > 9 ? "" + rowToMoveTo : rowToMoveTo = "0" + rowToMoveTo;
   newPosition = String(rowToMoveTo) + currentPos.substring(2, 4);

   upDownOptions = map[Number(rowToMoveTo)][Number(currentPos.substring(2, 4))];

   return upDownOptions === 'W' ? false : moveCursor();
}

document.addEventListener('keydown', (event) => {
   const keyName = event.key;
   if (keyName === 'ArrowLeft') {
      checkLeft();
   };
   if (keyName === 'ArrowRight') {
      checkRight();
   };
   if (keyName === 'ArrowUp') {
      checkUp();
   };
   if (keyName === 'ArrowDown') {
      checkDown();
   }

});

createMaze();
