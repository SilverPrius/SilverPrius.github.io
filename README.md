# Connect Four / Project 1

This game was the first project in my Software Engineering program at Per Scholas.  
Try it out! [Live site](https://silverprius.github.io)  
More information about the game: https://en.wikipedia.org/wiki/Connect_Four  

## Game Functions: 

This is a 2 player turn based game that begins with the red player going first.

When the current player hovers the mouse on a column that has an empty space, the player's color piece will appear above the column. This indicates that the player can drop their piece into that column by clicking the mouse.

If the player's piece is not shown above that column, this indicates that the column is full. They must select a different column.

Once the player drops their piece into an available space, it will be the next player's turn, and the color of the piece will switch between red and yellow.

The first player to connect 4 of their pieces in a row (horizontally, vertically or diagonally), wins the game! 

If the board is completely filled up without a winner, the game is a draw!

Clicking the Reset button will reload the webpage. This will clear all the pieces from the board, and restart the game.


## How I built this game:

The first step was to design the board. I started off by creating a div for the board. I used display:grid to design the board to have 7 columns and 6 rows. Next, I used a for loop to create 42 divs to represent the cells inside of the board div. Lastly, I styled each cell to have a white border.

To keep track of what pieces are on the board, I used an array that was updated after every round. Each zero represents an empty cell on the board at the beginning of the game. The first zero in the array represents the first cell at the top left of the index grid and so forth. As the game progresses, the zeros will be updated to a 1 for a red piece and a 2 for yellow.

![arrayGridBoard](https://user-images.githubusercontent.com/100508022/202620688-8f5920ab-3e45-42c8-89ac-00f24c7dc3e9.png)

To determine a winner, there is a hasPlayerWon function with an algorithim to check the array to see if there are any 4 1's or 2's in the correct positions to represent a winning 4 in a row on the board.

After getting all of the game functions completed, the most challenging part of the project was that I wanted to add a feature to make the 4 winning pieces distinct from the others. It took a long time to figure out, but I did this by using the .children and .firstChild methods to get the indexes of the winning pieces, then I set a dataset attribute to those elements and used CSS to style those pieces into squares. 

## Features preview:

A falling animation will play when a piece is dropped

https://user-images.githubusercontent.com/100508022/202604557-d9f201dd-1c74-4f49-ba82-02daeb71f567.mp4

If the player's piece is not shown above that column, this indicates that the column is full. They must select a different column.

https://user-images.githubusercontent.com/100508022/202604932-1b2abd17-ffe0-401f-93da-896348920bab.mp4

Alerts will pop up indicating which player won, or if the game was a draw.

![winnerAlert](https://user-images.githubusercontent.com/100508022/202607287-e0669dc4-b41d-41bb-809b-bd81431bdef4.png)

![drawAlert](https://user-images.githubusercontent.com/100508022/202607440-d8da1ad2-367c-49b3-99c8-ed555aff1123.png)

The 4 winning pieces will turn into squares; so that they can be easily identified.

![winnerSquares](https://user-images.githubusercontent.com/100508022/202604744-4c051930-0031-4701-a65a-3d9307ebe887.png)

## Technologies used:

HTML, CSS, Javascript

## Acknowledgements and Resources:

- YouTube tutorials  
- Google  
- Kasper Kain  
- Tishana Trainor  
- Richard Harris  
- Cody Jennings  

## Options to access this repo:

1. Open Git Bash and run this in your terminal: git clone https://github.com/SilverPrius/SilverPrius.github.io.git
2. Run index.html file from browse
3. Try it out via the [Live site](https://silverprius.github.io)