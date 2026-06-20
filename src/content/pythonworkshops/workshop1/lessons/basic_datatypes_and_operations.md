# Hello World
In your repl, add a new file and call it helloworld.py. In that file, write the code below:

`print('Hello, world!')`

Make sure that your code is exactly the same as the one shown above. If it isn't, the program will not run properly. This is a basic python program. Now run the program using the instructions in the introduction. The console on the right should show this:

`Hello, world!`

This happens because the `print()` function outputs the string `'Hello, world!'` onto the console. We will learn about basic datatypes and operations in this lesson. In the next lesson, we will learn about basic control structures and functions.

# Basic Datatypes
There are different types of data that can be stored in variables. The basic ones are:
- String: Data which is a series of characters. It is defined using quotation marks such as `''` or `""`.
- Int - Data which is an integer, and can be negative. It is automatically defined whenever you assign an integer to a variable.
- Float - Data which is a number, and may or may not be an integer, but will always have a decimal point. It is automatically defined whenever you assign a number with a decimal point to a variable.
- Boolean - Data which is either True or False. It is automatically defined whenever you assign a variable either `True` or `False`.

To assign a datatype to a variable, you just use the equal sign and put the variable on the left side and the datatype on the right side. Variables must not have spaces or start with a number. Some examples of assigning data to variables:
```
month = 'November'
year = 2020
pi = 3.14
MyBirthdayIsInAugust = False
```

Strings, ints, and floats can be converted into other datatypes, if it is possible. For example, you can convert the int `8` into a string of the character `‘8’`, but cannot convert `‘abcdef’`, a string, into an int. You can convert data types to strings, ints, and floats by using the `str()`, `int()`, and `float()` functions respectively. For example:
```
number_8 = 8
string_8 = str(number_8)
float_8 = float(string_8)
```

# Basic Operations
To use and manipulate variables and data, you need to use operations. Operations allow you to change data so that it becomes more useful or to complete a task. Most basic operations involve two pieces of data with an operator in between. With all of these operations, you can use parentheses to specify the order in which the operations should be executed. 

## Int and Float Operations
The following operations are ranked in order of importance:
- Exponent: `**`
- Multiplication, Division, Floor Division, Modulo: `*, /, //, %`
- Addition, Subtraction: `+, -`

Floor Division gives the greatest integer that is less than the quotient of two numbers. Modulo gives the remainder of the division of two numbers if the quotient is an integer.

There is another form that can also be used with these operations. `x += 3` can be used instead of `x = x + 3` and also assigns the value of `x + 3` to `x`.

## String Operations
There aren't many operations with strings, because strings are immutable, or cannot be changed. They can only be added or used to create other variables. Here are some of the operations:
- Concatenate: `+`
- Multiplication: `*`

Concatenate adds two strings into one large string. Multiplication adds the same string a given amount of times. For example, `'race'+'car' = 'racecar'` and `'abcd'*3 = 'abcdabcdabcd'`. Like int and float operations, the form `x += y` can be used instead of `x = x + y`.

## Boolean Operations
There are again not many operations with booleans. The following operations are ranked in order of importance:
- Not: `not`
- And: `and`
- Or: `or`

The Not operator changes `True` into `False` and vice versa. The And operator gives `True` if both booleans are `True` and `False` otherwise. The Or operator gives `True` if at least one of the booleans is `True` and `False` otherwise.

## Comparison Operations
Sometimes, you need to compare two pieces of data to find their relationship. Comparison operators return a boolean variable that indicates if two pieces of data are related in a certain way. The basic ones are listed below:
- Equal to (case sensitive): `==`
- Not equal to (case sensitive): `!=`
- Greater than: `>`
- Less than: `<`
- Greater than or equal to: `>=`
- Less than or equal to: `<=`

All of these operators return a boolean value, either `True` or `False`. However, ints and floats are the only datatype that works with all of these operators. Strings and booleans can only be used with the first two operators.

# String Functions
The following is a list of functions, methods, and other useful features that you can use with strings.
- `len(string)` - Gives length of string
- `string[index]` - Strings are stored as a sequence of characters, and each of these characters can be accessed using an index. Indices start from zero and increase as you move through the sequence.
- `string[start:stop:step]` - Start,stop, and step are all ints. This feature is called slicing, and it gives a **substring** of a string, or a string that is inside of the bigger string. This substring starts at index start (inclusive) to index stop (exclusive) with every step character, or by step. For example, `string[2:7:2]` gives the substring from index 2 to index 6 skipping every other character. Start, stop, and step can also be negative. The rightmost index is -1 and decreases as you go left. Negative steps just reverse the substring.
- `string.find(character)` - Gives the index of first instance of specified character in string, otherwise returns -1.
- `string.upper()`, `string.lower()`, `string.capitalize()` - Returns a string that is all uppercase, all lowercase, or has first character uppercase and rest lowercase. Only changes letters and not numbers or spaces.
- `ord(character)`, `chr(int)` - Returns the **ASCII** value of a character, returns the **ASCII** character at a value. The **ASCII** table allows computers to store characters and other values as numbers and save space.
<img src="/projects/pythonworkshops/img/asciitable.gif"/>

### [Next Lesson](/projects/pythonworkshops/workshop1/lessons/control_structures)
### [Back to Homepage](/projects/pythonworkshops/home)
