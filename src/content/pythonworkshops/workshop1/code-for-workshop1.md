# Example programs from the first workshop:

## Hello world program
```
print('Hello, world!')
```

## Reply program
```
name = input('Enter your name: ')
reply = 'Hello, ' + name + '!'
print(reply)
```

## How are you program
```
feeling = input('How are you today? ')
if feeling == 'Good':
  print("That's good to hear!")
elif feeling == 'Bad':
  print("I hope you feel better soon.")
elif feeling == 'Okay':
  print("Thank you for sharing!")
else:
  print('Please say if you feel good, bad, or okay.')
```

## Say my name program
```
name = input('What is your name? ')
times = int(input('How many times should I say your name? '))
count = 1
while count <= times:
  print(str(count) + ') Hello, ' + name + '!')
  count += 1
```

## Count character program
```
user_string = input('Please type any string: ')
user_char = input('What character would you like to count? ')

char_count = 0
for char in user_string:
  if char == user_char:
    char_count += 1
print(user_char+' appeared '+str(char_count)+' times in your string.')
```

## Timer program
```
from time import sleep

seconds = int(input('Enter time in seconds: '))
print(seconds)
for second in range(1, seconds + 1):
  sleep(1)
  print(seconds - second)
  if seconds - second == 0:
    print('TIME UP')
```

### [Back to Homepage](/projects/pythonworkshops/home)
