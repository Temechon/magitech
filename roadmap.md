# Enemy is created by the wave manager
  * ~~A line is selected by the wave manager~~
  * ~~The link line-enemy is saved in the wave manager~~
  * ~~Enemy position is updated according to the line position~~

# Enemy sent
 * ~~enemy is set as isWalking~~
 * ~~Setting an enemy as 'walking' set the corresponding line as hot (in the wave manager)~~
 * ~~Setting a line as hot activates all tower in this line~~

# Setting a tower
 * ~~if the line is hot activate the tower~~

# When an enemy dies
 * ~~notify the game, which notifies the wavemanager~~
 * ~~wave manager check the line of this enemy~~
 * ~~If there are no more enemies in this line, deactivate all towers in this line~~

# Remove bullet
 * ~~if collision with enemy~~
 * ~~if position.x > max value~~

# Enemy
 * ~~Throw him some life points~~
 * ~~When collision, a bullet decrease his life points~~
 * ~~When life points == 0, kill the poor guy~~

# Tower
 * ~~A tower costs gold to be built (decreased from the player account)~~
 * Different kind of tower
    * Attack strategy ?
 * ~~Create a tower that generate gold every X seconds~~
 * ~~Do not stop the generator when all enemies are killed~~

# Bullet
 * ~~Give a bullet a strength~~
 * ~~When hit an enemy, decrease his life by this strength~~
 * Elemental damage ?

# Player
 * ~~Create a gold account~~
 * Create a life point amounts
   * If an enemy cross the finish line, it's over
   * Deactivate all lines where the enemy crossed the finish line


