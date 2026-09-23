---
title: Robot Jousting
date: 2026-09-23
description: teaching robot arms to joust, Grand Prize @ HackCMU 2026
tags: ["robotics", "hackathon"]
draft: false
links:
  - { label: code, url: https://github.com/avnithv/robot-jousting }
  - { label: demo, url: https://youtu.be/c6h_7mXpHWY }
video: https://youtu.be/Ol8j64tkMzg
---

At [HackCMU ↗](https://www.acmatcmu.com/hackcmu2026/) (Sep 11-12, 2026), [Chris Shi ↗](https://chrisshi.com/), [Siddharth Radhakrishnan ↗](https://www.linkedin.com/in/sidradh/) and I won the Grand Prize with our project Robot Jousting. 
Two robot arms with 3D-printed swords slide towards each other and fight, with players controlling the moves they make on their phones. This was an incredibly fun experience, and I want to share our design process and go into detail about my contributions.

<figure class="pair">
<figure>
<img src="/blog/robot-jousting/img_2041.jpg" alt="Two robot arms on a rail, both blades raised en garde, in a classroom" loading="lazy">
<figcaption>Sat 3:13 PM. Testing fighting gameplay in an empty classroom</figcaption>
</figure>
<figure>
<img src="/blog/robot-jousting/game_plan_phase.jpg" alt="The planning phase of the game: a hand of cards, three beat slots, and a preview of what the arm will do" loading="lazy">
<figcaption>The game UI. Three move slots, a hand of cards, and a simulation preview of the arm movement for the current card</figcaption>
</figure>
</figure>

## The game

Our inspiration was a Slay the Spire type game but with actual SO-100 and SO-101 robotic arms equipped with 3D printed swords doing the fighting. Two players compete against each other and can choose the sequence of moves their robot makes through their phones. The gameplay proceeds in rounds, where in each round players choose a chain of 3 moves. After locking in their selections, the arms charge towards each other on rails built from a two-axis CNC gantry and perform both chains together. However, players are constrained in the moves they can use via a card system, so they must be strategic and try to predict their opponent's moves. 

To determine who wins a round, a fixed move set and rules table are used. There are three main classes of moves: attacks, blocks, and feints. Similar to rock-paper-scissors, attacks beat feints, blocks beat attacks, and feints beat blocks. Thus, the outcome is decided by the set of moves that each player chooses, and the arms perform it. This eliminates a lot of potential headaches such as predicting collisions and determining winners at runtime, and instead frontloads the work into preconstructing a table of arm movements for each pair of moves, which we thought was ideal for a hackathon. Our final move set ended up consisting of 10 possible moves, leading to 100 possible combinations to configure.

As the member least experienced with hardware going in, I focused my efforts on building the entire software controlling the arms and designing the move set, acting as the bridge between the game itself and the hardware. Chris and Siddharth worked on the hardware, including building the gantry controller, attaching the arms to the gantry, and 3D printing swords, as well as on the game front end. However, I enjoyed learning more about the hardware while working with it and will definitely try to get more experience building with hardware in the future.

<figure class="grid">
<figure>
<img src="/blog/robot-jousting/img_1990.jpg" alt="The aluminium extrusion rail frame on its plywood base, controller and power supply at the bottom" loading="lazy">
<figcaption>Fri 11:06 PM. The rail frame on a round table</figcaption>
</figure>
<figure>
<img src="/blog/robot-jousting/img_2002.jpg" alt="A teammate leaning across two tables, wiring up the aluminium extrusion rails" loading="lazy">
<figcaption>Sat 2:44 AM. Wiring the rails across two tables</figcaption>
</figure>
<figure>
<img src="/blog/robot-jousting/img_2018.jpg" alt="Both arms set out on the tables with a tape measure run between them" loading="lazy">
<figcaption>Sat 6:04 AM. Measuring the gap between the arms</figcaption>
</figure>
<figure>
<img src="/blog/robot-jousting/img_2035.jpg" alt="Both arms on the rail on the floor, black blades mounted, LED ring and cables everywhere" loading="lazy">
<figcaption>Sat 8:27 AM. Both arms on the rail with black blades for the first time</figcaption>
</figure>
</figure>

## From sim 

I started brainstorming possible moves in sim before we had working hardware, mainly just trying to find movements which looked cool and had clear interpretations (attack, block, or feint) and how pairs of moves would look together. I used MuJoCo as the simulation software, and placed the two SO-101 and SO-100 arms facing each other 0.61 m apart with an 8 inch blade mesh on the moving jaw, which matched how we wanted them to be in real life. Each candidate move was just one JSON parameter file, and a script turned it into key poses and splined them, then wrote a 50 Hz trajectory in real-arm degrees and rendered a clip. 

I brainstormed up to 41 different moves before deciding on the move set. Eventually, I decided on a set of 10 moves.
- ATTACK_HIGH (overhead chop)
- ATTACK_LOW_LR and ATTACK_LOW_RL (low slashes from either side)
- FEINT_HIGH, FEINT_LEFT, FEINT_RIGHT (same windup as the corresponding attack, but snap back at the end)
- BLOCK_HIGH, BLOCK_LEFT, BLOCK_RIGHT, BLOCK_MIDDLE
- REST (not a move, but just the default resting position)

For each pair of these moves, I also recorded their interactions, such as when one move counters another or which pairs of moves cancel out. The general system is that a successful block counters an attack, a feint counters a block, and an attack counters a feint, leading to a rock-paper-scissors dynamic. With 10 moves, there were 100 combinations and 196 transitions in total, counting in-between poses. Later, I realized that each of these would have to be tuned to avoid hard collisions, but for now I wasn't worried about that.

<figure class="pair fit" style="--cols: 1fr 2fr;">
<figure>
<img src="/blog/robot-jousting/sim_pipeline_still.webp" alt="An overhead chop in the MuJoCo simulation" loading="lazy">
<figcaption>MuJoCo simulation of an overhead chop</figcaption>
</figure>
<figure>
<img src="/blog/robot-jousting/sim_pair_chop_vs_bar_strip.png" alt="Eight frames from the two-arm sim: an overhead chop meeting a level high bar" loading="lazy">
<figcaption>A pair in sim: ATTACK_HIGH against BLOCK_HIGH</figcaption>
</figure>
</figure>

### To real

Directly playing the simulated movement on the real arms did not work very well. Each arm had to be calibrated individually first, and the moves had to take the calibration of the arm into account. Each arm needed a separate calibration and move sequence. Even then, small differences in some of the motor positions still messed up the move. Additionally, there were some hard limits, such as the table and the other arm, which were not accurately captured in the simulation due to differences between the simulation and the real setup. 

My next attempt was to reteach the motions by hand. I turned off the power to the servos and physically pulled the arm through the motion I wanted. A script would record the joint readings and play them back. Unfortunately, but as expected, these motions were both slow and very wobbly, often 10x slower than I wanted the move to actually be. However, I created a script which picked out a handful of key poses and interpolated between them using inverse kinematics, making it smoother and faster. Additionally, since the move is now parametric rather than a pure recording, the same description regenerates it for the other arm with its own calibration. This actually worked very well, and I did this for most of the 10 moves.

<figure class="pair fit" style="--cols: 1.78fr 1.89fr;">
<figure>
<img src="/blog/robot-jousting/real_robot_bts_calibration.webp" alt="A hand holding the arm at a reference pose during calibration" loading="lazy">
<figcaption>Calibration, by hand</figcaption>
</figure>
<figure>
<img src="/blog/robot-jousting/sim_to_real_chop_trajectories.png" alt="Six joint plots: a grey 10.7 s hand-taught demonstration of the chop and a blue 1.72 s parametric strike built from it" loading="lazy">
<figcaption>Grey: by hand (10.7 s), blue: parametric strike (1.72 s) </figcaption>
</figure>
</figure>


Eventually though, I realized that physically making the motions on each arm would be too slow, especially since I would have to do it on every combination of moves together. Instead, I came up with a system where I would capture the arms at the START and END keyframes and let the generator interpolate between them using inverse and forward kinematics helpers. Even for complex motions, two keys were usually enough, and generating the trajectories was fast, so I could iterate quickly when tuning how a move looked. 

This process was still complicated though: for each move, I would have to move the arm into the start and end pose, capture it, generate the trajectory, have it play out, and keep adjusting. With 10 moves and 100 combinations, this would still take a long time. To streamline this process and also allow my teammates to help with it, I made a dashboard which could go through this process in a few seconds. Using the dashboard, I could pick a move from the list, preview it in sim, run it on either arm, and adjust and capture the START or END positions. I also had more fine-grained control with direct access to trajectory parameters as well as higher-level control with a button that sends a description of what I wanted changed to an agent which built out the new trajectory and verified it in sim. Later stages, including chaining moves in sequence and calibrating collisions between arms, were built into this dashboard as well. 

<figure class="pair fit">
<figure>
<img src="/blog/robot-jousting/studio_moves_tab.jpg" alt="The studio: move list on the left, ATTACK_HIGH previewed in the sim, run and capture buttons, and the turn profile knobs below" loading="lazy">
<figcaption>The dashboard. Pick a move and run/tune/capture it on either arm</figcaption>
</figure>
<figure>
<img src="/blog/robot-jousting/studio_calibrate_tab.jpg" alt="The collision calibration tab: a big STOP HERE button and a table of move pairs with their calibrated stop points" loading="lazy">
<figcaption>Collision calibration. One per pair, play the movements on both arms at 0.3 speed and stop right before a collision</figcaption>
</figure>
</figure>


### Putting things together

When testing with both arms together, we realized that moves that we had calibrated in isolation would not work together. The 3D printed blades snapped often, and worse things would have happened if we kept letting the arms hit each other. To address this, I decided to calibrate every pair of moves so that the arms would never collide hard. I used the same trick as before: I moved both arms to a position where they were almost touching and set that as the END keyframe for that move pair. Then, I would run both arms at 30% speed and manually tune where the arms stop, ensuring that they make contact consistently but never with much force. This was repeated for each pair which had such a collision.


<figure class="pair">
<img src="/blog/robot-jousting/sim_attackleft_blockright.webp" alt="A low slash from the left stopped by the right-hand guard, rendered in MuJoCo" loading="lazy">
<img src="/blog/robot-jousting/real_robot_exchange_attackleft_blockright.webp" alt="The same exchange on the real arms" loading="lazy">
<figcaption>The same exchange in MuJoCo and on the arms: a low slash from the left, stopped by the right-hand guard</figcaption>
</figure>

The final stage of the project was chaining sequences of moves together. A turn consists of three moves, and each move ends somewhere different from where the next one starts. The default motion at that point was to snap back to rest between each move, which was not very exciting. I started by looking at all 10 moves in motor space and choosing a few poses which were in the "middle" of all the 10 moves. This way, the arms can move through them as intermediate poses between moves, allowing for more variety and flair while keeping a smooth motion. For each pair of moves, I used these intermediate poses to design a transition table, which stored the exact motions between consecutive moves. The final caveat to address is that both arms need to be in sync for the moves to work. When determining trajectories at the start of each round, the software stretches out the motion of one arm if it will be slower than the other arm. This way, the animation is scaled so the impact lands on the same real instant and the arms are always in sync.

<figure>
<video src="/blog/robot-jousting/crowd.mp4" controls playsinline preload="metadata"></video>
<figcaption>Sat 8:03 PM. Live demo in action</figcaption>
</figure>

## Final thoughts

There are a couple of directions I could see for extending this project. First, the gantry system was not utilized in the fight except for sliding in at the beginning and sliding out at the end. It would be cool to control the position of the arms on the gantry during the fight as well. The biggest change to this project would be to reverse an early design choice and allow for closer to real time control of arms. Instead of having players choose from premade moves which are then played out, we could have players make moves in real time. However, it would be much harder to coordinate both arms without having major collisions if both arms move in real time, and we would have to compute the interpolations at runtime, which would be slow. Another way we could make the game more exciting without fully allowing players to control the arm in real time is to have the software generate more creative and theatrical movements at the start of each round. There are a lot of potential approaches we could use for this, even including diffusion models or VLA models to design movements constrained by certain keyframes and avoiding hard collisions with the other arm. These types of problems are super interesting to me, but unfortunately are not something we could get working during a hackathon.

I couldn't have done this without my amazing teammates Chris and Siddharth, who, among other things, obtained and fully set up all the hardware used in this project. Some additional links:
- Code: [github.com/avnithv/robot-jousting](https://github.com/avnithv/robot-jousting)
- Chris's write-up: [chrisshi.com/robo-jousting](https://chrisshi.com/robo-jousting)
- Trailer: [youtu.be/Ol8j64tkMzg](https://youtu.be/Ol8j64tkMzg)
- Demo: [youtu.be/c6h_7mXpHWY](https://youtu.be/c6h_7mXpHWY)

<figure>
<img src="/blog/robot-jousting/img_2077.jpg" alt="Team of three in front of the Simmons Auditorium sign, with the rig and a laptop on the table" loading="lazy">
<figcaption>Sat 6:37 PM. Right before judging</figcaption>
</figure>
