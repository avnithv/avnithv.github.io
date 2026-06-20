# Practice Problem - Bridge

## Overview
- Bridge is a card game played by 2 pairs of people, or 4 people. 
- Each player recieves 13 cards.
- The pairs who are partners can only communicate through verbal bids.
- These bids tell both partners the strength of the hand of cards they have.
- The point is to communicate until it is found that both partners are strong in one suit.
- Instead of saying ‘I have at least 5 hearts and at least 13 points.”, a partner would bid 'One heart'
- Points are scored by 4 points for each ace, 3 for each king, 2 for each queen and 1 for each jack. 
- The suits are ranked from highest to lowest as Spades(S), Hearts(H), Diamonds(D), and Clubs(C).

## Bidding rules:
- First bidder must have at least 13 points. They bid one of the suit with the highest number of cards that is at least 5 for S and H and 3 for D and C.
- If there is a tie in the number of cards, they bid the one with the highest suit
- If the player does not have 13, they bid PASS

## Input
- Five lines of input
- Each line has four strings separated by a comma and a space
- Each string is the cards the player has for each suit in the order S, H, D, and C
- The string contains the characters `'A'` (ace), `'K'` (king), `'Q'` (queen),`'J'` (jack), or `'x'` (any other card), which represents the cards of that suit.

## Output
- For each line, print the number of points the player has as well as their bid, separated by a comma and a space
- Both must be correct to score one point for the line

## Sample Inputs
```
AKxx, Qxx, AJxxx, J
AKxxx, Qxx, AJxx, J
Axx, Qxx, Axxx, Jxx
Axxx, Qxx, Jxxx, Jx
KQxxx, AKxxx, J, xx
```

## Sample Outputs
```
15, 1D
15, 1S
11, PASS
8, PASS
13, 1S
```

## Test Input
```
AKxx, xxx, xxx, AKx
AKxx, AKxxx, x, AKx
KJxx, Kxxx, QJ, QJx
AKxxx, Qxxxx, xx, A
AKxx, xxx, xxx, Axx
```

## Test Output
```
15, 1D
15, 1S
11, PASS
8, PASS
13, 1S
```

# Bridge Program With Errors
```
def AddNumbers(cards)
  value = {'A': 4, 'K': 3, 'Q': 2, 'J': 1}
  points = 0
  for card in cards:
    if card in ['A', 'K', 'Q', 'J']:
      points + value[card]
  return points

def FindBid(cards):
  suits = cards().split(', ')
  max_suit = [0, None]
  number_of_cards = {0 : 5, 1 : 5, 2 : 3, 3 : 3}
  specific_suit = {0 :'S', 1 :'H', 2 :'D', 3 : C}
  for suit in range(len((suits))):
    if len(suits[suit]) > number_of_cards[suit]:
      if len(suits[suit]) > max_suit[0]:
        max_suit = [len(suits[suit]), specific_suit[suit]]
  return '1' + max_suit[1]

for i in range():
  cards = input("Enter cards: ")
  points = AddNumbers(cards)
  bid = FindBid(cards) 
  if points < 13
    print(str(points) + ', PASS')
  else:
    print(str(points + ', ' + bid)
 ```
 
 Try to find the errors in this code. There are more than 5.
 
### [Back to Homepage](/projects/pythonworkshops/home)