---
title: Sorting for humans
date: 2026-08-12
description: some of my strategies for ranking things (sub)optimally
tags: ["algorithms"]
draft: false
---

So I recently had this idea of ranking all of the songs in my playlist based on how much I liked them. There are several potential problems I noticed:

1. My preferences change very frequently (possibly within minutes).
2. There might be some songs I like equally or I'm not able to decide.
3. My preferences might not be transitive.

I can't really do anything about problem $1$ other than try to rank them quickly. If problem $2$ is true, then some pairs of songs might be incomparable, implying a total order (ranking) does not exist. Fortunately, I can fix this by forcing myself to always choose one of the songs. Unfortunately, there's no easy way to solve problem $3$. As we'll see later, I can either conveniently avoid it or try heuristics to still produce a ranking.

## The tool

With these assumptions, I can start making the ranking. There are around $90$ songs in my playlist, which doesn't seem like much, until you try ranking them all. Around this point, I realized people invented sorting algorithms for a reason, and I could probably use one of them. So I asked Claude to make me this tool:

<iframe
  src="/blog/sorting/manual-sort.html"
  title="Hand Sort"
  style="height: 640px;"
  loading="lazy"
></iframe>

[Open in its own page →](/blog/sorting/manual-sort.html)

The premise is that sorting a big list is hard, but given two songs I should always be able to pick one. You may have noticed that the tool allows you to select from $5$ different comparison-based sorts. Each of these was chosen for a reason and has a unique feel to it.

- Insertion sort: I think this is what most people (myself included) do when trying to sort a list. In this context, it means sorting the first $x-1$ songs, then inserting the $x$-th song in the right place by going from the best song down until you reach a song that is worse than song $x$. Very simple, but a high schooler could tell you that it is inefficient and requires $O(N^2)$ operations.
- Merge sort: close to the "gold standard" sorting algorithm. Split the list into equal parts, recursively sort them, then zipper merge them.
- Quicksort: also a "gold standard" sorting algorithm. Choose a random song as the pivot and arrange all worse songs on one side and all the better songs on the other side, then recursively sort both sides.

## The lower bound

The latter two sorts require $O(N log N)$ operations, which is asymptotically optimal for comparison-based sorting algorithms. In other words, any ranking algorithm which works by repeatedly choosing between two songs can never do better than $O(N log N)$ comparisons. There's an intuitive way to prove this: each comparison has only $2$ outcomes, so $N$ comparisons can only distinguish between $2^N$ outcomes. On the other hand, there are $N! tilde exp(N ln N)$ different rankings and we need at least $log_2 N! tilde N ln N$ comparisons to distinguish them all. Thus, all comparison-based sorting algorithms cannot be faster than $O(N log N)$.

## Merge-insertion sort

However, these two sorts are only asymptotically optimal. A key difference in this situation is we want to minimize the number of comparisons (questions that are asked of me) and not the number of operations (moving things into the right place in an array, for example). When I was originally trying to rank the songs without this tool, I realized this intuitively and actually used a faster version of insertion sort. Instead of linearly searching where to insert song $x$ from the best song, I binary searched through the list of currently sorted songs. If we cared about operations, it would be impossible to execute insertions faster than $O(N)$ without reinventing a set-like data structure. However, we only care about comparisons, and this algorithm now uses only $O(N log N)$ of them. The fastest of the sorts in the tool uses an optimized version of this idea:

- Merge-insertion sort: intuitively, we're still building up a sorted prefix of songs and inserting new songs in between, but we put these insertions in a particular order to get the most value out of our binary searches. It took me a while to understand, but it's genius.

<details>
<summary>how merge-insertion works</summary>

Let's assume we have an even number of items, say $2N$. We split them up into $N$ pairs and compare each pair. We store the smaller ones from each pair in $a_1 ... a_N$ and the larger ones in $b_1 ... b_N$. Now, we sort $b_1 ... b_N$ recursively and relabel the indexes so that $b_1 < ... < b_N$ is in sorted order and each $a_i$ is still linked with its pair $b_i$. The critical part of the sort is inserting the items $a_1 ... a_N$ into the sorted list $b_1 ... b_N$.

Based on how we split the pairs, we know that $a_i < b_i$ for every $i$. Thus, we can immediately insert $a_1$ at the beginning of the list $b_1 ... b_N$. Each other $a_i$ will be inserted somewhere before $b_i$, among the current first $i$ elements. For each $i$, we can binary search for this insertion point, which will take $floor(log_2 i)$ comparisons. Thus, the total number of comparisons needed is $N + sum_(i=2)^N floor(log_2 i)$ plus the number of comparisons for the recursive sort.

Unfortunately, this doesn't work out so perfectly because when we insert $a_i$, the number of elements we need to binary search on for $a_(i+1)$ increases. We can take advantage of this by ordering the insertions so that the window size clusters around one less than a power of $2$. For example, to insert $a_2$, we would need to search on $[a_1, b_1]$, which would require $2$ comparisons. Inserting $a_3$ now also requires $2$ comparisons since we would search on $[a_1, b_1, b_2]$. If we insert $a_2$ after inserting $a_3$, in the worst case the window size would be $3$ (either $[a_3, a_1, b_1]$, $[a_1, a_3, b_1]$, or $[a_1, b_1, a_3]$), which still requires $2$ comparisons, for a total of $2+2=4$ comparisons. This is an improvement over inserting $a_3$ after $a_2$, because then the window size when inserting $a_3$ could be $4$ items, which would require $3$ comparisons.

This strategy can be expanded to the rest of the list. We essentially want to jump to the next element where the window to the left has size one less than a power of $2$ and insert from that element backwards. It turns out the element we jump to is given by the Jacobsthal sequence, defined by

$$
J_0 = 0, J_1 = 1, J_n = J_(n-1) + 2J_(n-2)
$$

The first few elements are

$$
0, 1, 1, 3, 5, 11, 21, 43, ...
$$

Thus, after inserting $a_1$, we jump to $a_3$ then go backwards to $a_2$. Next, we would insert $a_5$ and go back to $a_4$, then jump to $a_11$ and back to $a_10$, $a_9$, etc. This optimizes the window size for our binary search at each step.

</details>

With merge-insertion sort, we can push the number of comparisons down from $N log_2 N - N + 1$ for merge sort to $N log_2 N - 1.415N$ (yay!).

## Stooge sort

You may have noticed that I left out one of the sorts (I saved the best for last):

- Stooge sort: my favorite sort. It's simple: recursively sort the first $2/3$ of the list, then the last $2/3$, then the first $2/3$ again. We are splitting the problem into $3$ subproblems of size $2/3$ with $O(N)$ work in between, which by the Master theorem gives a time complexity of $O(N^(log_(3/2) 3)) approx O(N^2.71)$ (this is absurd; it's slower than $O(N^2)$ insertion sort).

I mostly included it because it was my favorite sort, but it turns out it has a hidden advantage for this use case which I didn't realize. But first, I have to talk about how it felt using these sorts as a human and their limitations.

## Repeated comparisons

The main pattern that affected how it felt to sort the songs was how often the same song came up in a sequence of comparisons. I definitely preferred when the same song did not come up multiple times in a row. I felt that when this happened, my answer was more biased later on in the sequence. For example, if I ranked a song as worse multiple times in a row, I'd be more likely to rank it as better if it came up again immediately. This might have just been an illusion, but the patterns with a more shuffled order of comparisons felt more refreshing.

## Simulating the sorts

Thinking about the different sorts, it's clear that quicksort and insertion sort are the worst in this regard. Quicksort starts by comparing every song with a selected "pivot" song, and insertion sort searches linearly to find the spot to insert a song $x$. It seems that merge-insertion sort, merge sort, and stooge sort are probably better, but unfortunately I did not have the time and willpower to thoroughly test each of them. I asked Claude to simulate the process for me by generating $1000$ random permutations of size $50$, putting them through each of the sorts, and graphing the frequency of lengths of consecutive runs of comparisons involving the same element.

<iframe
  src="/blog/sorting/runs-graph.html"
  title="Comparison run lengths"
  style="height: 620px;"
  loading="lazy"
></iframe>

As we can see, quicksort and insertion sort extend far beyond the others, indicating their tendency to have long runs. Stooge sort also starts significantly above but drops off quickly, indicating it has a higher volume of runs but fewer longer runs. Both merge-insertion sort and merge sort are similarly good, and merge-insertion sort is probably slightly better due to fewer total runs and a faster drop-off for longer runs.

Another way to decrease run lengths while maintaining the essence of a sort is to interleave comparisons if the sort has two independent subproblems. For example, for merge sort we could ask one comparison from the left half, then one from the right half, then left, etc. This would essentially eliminate all runs. However, I did not explore this idea much.

## Non-transitivity

The other thing our sort has to deal with is non-transitivity as described in problem $3$ from the beginning of this post. There might be songs $A$, $B$, $C$ where I prefer $A$ over $B$, $B$ over $C$, and $C$ over $A$. In this case, a perfect ranking does not exist, but I can still try to find a ranking which matches most of my comparisons.

When I was initially designing the tool, I thought that the non-transitivity making my comparisons inconsistent could break my sort. However, it turns out that most of these sorting algorithms avoid this problem by not asking any comparisons if the answer can already be inferred from past comparisons. For example, quicksort splits the elements into two groups by comparing each element with the pivot. After this point, all comparisons are only asked between elements in the same group. But since no information about the relative order is known within each group, it's not possible for a future comparison to contradict an earlier one. This is also true for merge sort, merge-insertion sort, and insertion sort. For these $4$ sorts, the problem of non-transitivity is avoided by assuming the first comparison made is correct and never asking comparisons that could potentially contradict past answers.

## Flexibility

However, this has a downside, since early choices can be locked in and affect the sort much later on. I ran into this problem when I tried sorting: I realized later on that I had put one of my songs lower than I wanted. Interestingly, stooge sort has some flexibility built in which might allow later preferences to override earlier ones. In stooge sort, the first $1/3$ and last $1/3$ of elements are fixed after one round of comparisons, but the middle $1/3$ of elements could have up to $3$ rounds of comparisons. The middle elements are given more time to settle, and later choices are prioritized over earlier ones, which helps avoid bad early choices and builds in flexibility for my vague preferences. For this reason as well as the lower proportion of long runs, I'd choose stooge sort as the best overall sort for humans, given the list is small enough. The $90$ songs in my playlist were definitely too many, but I didn't feel like spending the time to test it thoroughly.

## Conclusion

For my original use case of sorting through my $90$ songs, I think merge-insertion sort worked pretty well. It took a good $30$ minutes and there were some flukes, but I think overall the ranking was pretty accurate. This turned out to be a longer post than I originally expected, but I thought this idea was pretty funny and there were some interesting ideas hidden in this real-world application. My next few posts will probably be shorter though...
