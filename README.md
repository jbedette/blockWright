# blockWright

General flow

1. generate board with buttons, store matching js objects in array
2. click header
   [x]a) user clicks a button, the id gets shouted to a js function that parses the id
   [x]b) searches the appropriate object out of matching array
   [xish]c) stores clicked id in an array to be checked against to prevent double use
   [x]d) grabs letter from object
   [x]e) applies letter to a display function
   []f) compares against a dictionary to see if created word is valid
3. user completes valid word, hits submit
4. grid is filled
   []a)based on matching x and y values
   []b) word is put on top of grid values
   []c) grid values change color at specified location
