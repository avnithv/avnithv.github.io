# Control Structures
Control structures are what control how and when different pieces of code are executed. The three basic control strucutures are If-else statements, While loops, and For loops. If-else statements execute a piece of code if a condition is true, while loops execute a piece of code as long as a condition is true, and for loops execute a piece of code while iterating through a sequence.  All control structures involve **keywords**, **colons**, and **indents**.  (_Keywords are  words in Python that have a special purpose and they cannot be used as names of variables._)

## If Statements
If statements execute the code inside it if and only if a specified condition is true. The first line of an if structure written in the form `if condition:`
The word **if** is a keyword that defines that it is an If statement and the condition is any boolean value. The condition can also be a conditional operation, since that returns a boolean value. The next lines of the If statement must have an indent in front of them. To end the If statement, stop putting the indent in front the lines. 

### Elif
You can also add an elif statement, which is a contraction of else-if. In other words, if the previous conditions were false, but if this condition is true, then the code inside will be executed. It is written in the form `elif condition:`. Here, **elif** is also a keyword and defines the elif statement, and the lines inside the statement should be indented. _Without an If statement before, the Elif statement will not work!_

### Else
You can also add an else statement after an If statement which will execute the code inside if and only if all previous conditions are false. It is defined in the form `else:`. **Else** is the keyword that defines the Else statement and each line of code in the Else statement should also be indented. _Without an If statement before, the Else statement will not work!_

## While loops
While loops execute the same piece of code for as long as a condition is true. If the condition becomes false, or is false when the loop is reached, it will stop executing the code inside the loop and move on. The first line of a While loop is `while condition:`. The word **while** is the keyword that defines the While loop, and the codition is a boolean value or a conditional statement. The lines of code inside the loop must also have an indent in front of them. While loops can be an efficient way to repeat the same code for a specific number of times. _The only way a while loop can be useful is if the code inside affects the value of the condition. Otherwise, the code inside would either be executed zero times (if the condition is false), or infinitely many times (if the condition is true)._

## For Loops
For loops also repeatedly execute a piece of code, similar to While loops. However, they repeat it for a specific number of times. Furthermore, they define a variable which changes each time the code is executed. The For loop iterates through a sequence in order from first to last and assigns the current value to a variable. Each time the variable assigned the next value in the sequence, the code inside the loop will be executed with the updated value of the variable. This will continue until the end of the sequence has been reached. Because of this, the For loop can be used to process or use items in a list easily.

To define a For loop, you need to use two key words like this: `for item in sequence:`. In this case, both **for** and **in** are keywords. The word `item` is the variable that changes with each execution and `sequence` is the sequence which is iterated through. This sequence is most commonly the `range()` function. The `range()` function is similar to the slicing feature in strings, which gives a sequence starting at the first value (inclusive) and ending at the second value (exclusive) by step. In this case, the sequence is a sequence of ints and not a sequence of characters.

### [Back to Homepage](/projects/pythonworkshops/home)
