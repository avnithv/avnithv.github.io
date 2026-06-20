### Lists
```
# list() constructor
string = 'Hello, world'
l = list(string)
print(l)

# split() method
words = input('Enter a sentence: ').split()
for word in words:
  print(word)

# Square brackets
ls = []
for x in range(5):
  ls.append(input('Enter a word: '))
ls.insert(1, 'Hello')
del ls[3:]
print(ls)
print(ls.pop(2))
```

### Dictionary
```
dictionary = {'A' : 1}
print(dictionary)

dictionary['B'] = 2
print(dictionary)

dictionary.update({'C' : 3, 'D' : 4})
print(dictionary)

del dictionary['A']
print(dictionary)

x = dictionary.pop('B')
print(x)
print(dictionary)
```

### Function
```
def my_function(name):
  print('Hello, ' + name + '!')
```

### Parameters
```
def my_function(v1 = 1, v2 = 1):
  print(v1, 'x', v2, '=', v1*v2)

my_function(3, v2 = 7)
```

### Returning
```
def print_name(name):
  print('Hello, ' + name + '!')

def return_name(name):
  return 'Hello, ' + name + '!'

name = input('Enter your name: ')
func1 = print_name(name) 
func2 = return_name(name)
print(func1)
print(func2)
```

### With function
```
def AddNumbers(cards):
  value = {'A': 4, 'K': 3, 'Q': 2, 'J': 1}
  points = 0
  for card in cards:
    if card in ['A', 'K', 'Q', 'J']:
      points += value[card]
  return points

def FindBid(cards):
  suits = cards.split(', ')
  number_of_cards = {0 : 5, 1 : 5, 2 : 3, 3 : 3}
  specific_suit = {0 :'S', 1 :'H', 2 :'D', 3 :'C'}
  for suit, cards in enumerate(suits):
    if len(cards) >= number_of_cards[suit]:
      return '1' + specific_suit[suit]
  return "PASS"

for i in range(5):
  cards = input("Enter cards: ")
  points = AddNumbers(cards)
  bid = FindBid(cards)
  if points < 13:
    print(str(points) + ', PASS')
  else:
    print(str(points) + ', ' + bid)
```

### Without function
```
value = {'A': 4, 'K': 3, 'Q': 2, 'J': 1}
number_of_cards = {0 : 5, 1 : 5, 2 : 3, 3 : 3}
specific_suit = {0 :'S', 1 :'H', 2 :'D', 3 :'C'}
for i in range(5):
  cards = input("Enter cards: ")
  points = 0
  for card in cards:
    if card in ['A', 'K', 'Q', 'J']:
      points += value[card]
  suits = cards.split(', ')
  bid = ''
  for suit, cards in enumerate(suits):
    if len(cards) >= number_of_cards[suit]:
       bid = '1' + specific_suit[suit]
  if bid == '':
    bid = 'PASS'
  if points < 13:
    print(str(points) + ', PASS')
  else:
    print(str(points) + ', ' + bid)
```

### [Back to Homepage](/projects/pythonworkshops/home)