# surrounded

Welcome to the strategy game of surrounded! What is so special about this game? Well, you can play against an AI that uses a 
Neural Network, made using Google's TensorFlow, and try to win!

```
-Note: The Neural Network is still in progress. So, right now, the opponent only makes random moves. However, we are working on the AI.
```

###How to Play
The objective of the game is to SURROUND an enemy tile.<br><br>

The blue tiles are the tiles which you can control, and are called Ally Tiles.        ![Ally Tile](https://surrounded.herokuapp.com/images/ally_tile.png)

The red tiles belong to your opponent, and are called Enemy Tiles.                    ![Enemy Tile](https://surrounded.herokuapp.com/images/enemy_tile.png)

The ally and enemy tiles can move to Empty Tiles, which are light grey in colour.     ![Empty Tile](https://surrounded.herokuapp.com/images/empty_tile.png)

To move an ally tile, you need to first click on it, and then click on the empty tile where you want 
to move it to. Selected tiles will be higher than unselected tiles, and will have a shadow. To unselect 
a tile, you can just click on it again.

![Selected Ally Tile](https://surrounded.herokuapp.com/images/selected_ally_tile.png)

Tiles can move horizontally and vertically, 1 step at a time. The game ends when an ally or an enemy tile 
cannot move anywhere, because they are surrounded. Be careful not to surround your own tiles!

![Allies Win](https://surrounded.herokuapp.com/images/ally_wins.png)
In this picture, the Allies win, because the enemy tile can't move anywhere. It is surrounded in 3 sides by Ally Tiles, 
and in the other side by an Enemy Tile. Remember, to start a new game, you can click on the logo in the header.


So now that you know the game, why not [play](https://surrounded.herokuapp.com)?
