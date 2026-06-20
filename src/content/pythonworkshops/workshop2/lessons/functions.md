# Functions

## What are Functions?
Functions are blocks of code that are stored and executed in a variable. Whenever the function is called by using the variable name followed by a pair of parenthesis, the code is executed, which is called calling the function. 

Functions can have parameters and take arguments, though they are not required to. They may also return a value, which is also not required. The arguments are passed into the functions when the function is called by putting them inside of the parenthesis when called, separating multiple arguments with commas if needed. 

The main point of a function is to make code more clean and efficient, like control structures and some datatypes do. They make it possible to reuse code that appears often in a program so that you don't have to write it out each time it is needed. They can also be used to divide the code into sections that have different roles to make the code easier to read. 

**Functions are different than methods, which are written after a variable and a period. Functions may not work when used as methods and vice versa. The actual difference between functions and methods is complicated.**

## Some Functions you may Recognize
We have alreadly used a lot of built-in functions. Here is a list of the functions we have learned so far:
- `print()`
- `input()`
- `range()`
- `len()`
- `str()`
- `int()`
- `float()`
- `ord()`
- `chr()`
- `range()`
- `sleep()` *(from time module)*
- `list()`
- `sum()`
- `max()`
- `min()`

Python has many more built-in functions as well.

## Creating functions
Creating a function is called defining a function. To define a function, you need to use the **def** keyword. You define the function in the form shown:
```
def function_name(parameters):
  ...
```
The function's name follows the same rules as a variable because it is a variable that stores code instead of data. After the name, there must be a pair of parenthesis and a colon. Parameters can be specified inside the parenthesis, and we will cover that next. The code inside the functions must be indented.

## Parameters and Arguments
Parameters and arguments are both essentially data passed to a function. However, there is a slight difference between them. From a function's perspective:
- Parameters are the variable listed inside the parentheses in the function definition.
- They are the data that is used inside of the function through its name as specified on the function definition.
- Arguments are the variable listed inside of the parentheses when the function is called.
- They exist outside of the function and are passed inside as parameters to be used by the function.

Parameters are specified in the function definition by listing their names, separated by a comma. There may be multiple parameters in one function. You can set a parameter to a default value if an argument is not passed to it when called. You do this by writing `param = default` instead of just `param` when it is listed in the function definition. Parameters with default values must come after parameters without default values, or the parameters that must be included when calling the function.

Argments can be used when a function is called. They are also passed by listing them inside the parentheses. There are two way of passing arguments; through position or through keywords. If the arguments are passed positionally, they are passed into the parameters in the same order. In other words, the argument listed first is passed into the parameter listed first, and so on. If some parameters have default values, they don't have to be included when it is called. That is why parameters with default values are always listed after the parameters without default values. The second way that arguments can be passed is through keywords. These are not the keywords like **if**, **while**, and **for**. This happens when the arguments are passed directly into their parameter. For example, if `param = arg` were inside the parentheses of a function that was called, the argument `arg` is passed into the parameter `param`. If you are combining both ways, then you have to list the arguments passed through keywords after the arguments passed positionally.


### [Back to Homepage](/projects/pythonworkshops/home)