# blockWright

Most work is in script.js. Small amount in lettersWords.js.

General flow

1. generate board with buttons, store matching js objects in array
2. click header
   [x]a) user clicks a button, the id gets shouted to a js function that parses the id
   [x]b) searches the appropriate object out of matching array
   [x]c) stores clicked id in an array to be checked against to prevent double use
   [x]d) grabs letter from object
   [x]e) applies letter to a display function
   [x]f) compares against a dictionary to see if created word is valid
3. [x]user completes valid word, hits submit
4. grid is filled
   [x]a)based on matching x and y values
   [x]b) word is put on top of grid values
   [x]c) grid values change color at specified location

Making the testing prototype:
Some struggles I have encountered so far was how to refer to specific squares on the grid, scaling the game to the viewport, and placing the words within the squares.
For working with specific squares, I have finagled a unique id system by concatenating strings into id’s which are applied to the squares during board generation. This way I am able to select them by id when highlighting where a word block would go or the actual placing of a word block. Originally I was planning on making a pseudo-ECS system to manage this, which is kind of still there with my classes but a more streamlined system would be better.
One of the problems I encountered in this project was making unneccesary things(arrays,functions) for future work.
I wound up with a whole bunch of redundant data. I'm unwilling to get rid of them to make my code more concise because I keep finding myself asking "what if I DO need this x time down the road". I believe I'm storing every square in an array and I really don't need to, especially with the id system I've made. However, a refactor is in the future.
The grid functions are rather byzantine. Grid manipulation turned out to be much more complex than I was
expecting. There were many places where code is nearly redundant, but because of the different concerns they require something just a _little bit_ different from similar functions and so I call the same three lines that are in a different function. There are a few places I think I could still cut down, but thats a problem for another day.
