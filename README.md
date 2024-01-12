# Padel Tournaments Mobile App

## Introduction

I decided to do a mobile app for padel clubs which organize tournaments along the entire year.
From my point of view not only the management of the tournaments, but also the communication with players and viewers are doing it with differents tools, so my idea with this app is integrate all information and management in one place.
This app will provide the administrators a simpler way to organize and communicate the tournaments to players and users who go to the clubs to watch the matches.

## Objectives

1. Manage Tours and Tournaments.
2. Show Tournaments information to players & viewers.

## Value proposal

- The app wil provide to the clients a better organization where includes all information about tournaments, rankings and brackets per category.
- It is a closer and simpler approach to all players and viewers.

## Scope

- The scope of this proyect is limited to one client.

## Modules

The modules are:

- Users
- Tours/Tournament
- News
- Single Players
- **_Tour Coins_**

## Requirements List

### **_Tours/Tournament_**

1. **Create Tour:**
   - A Tour needs: name, club with amount of courts,categories (M/F).
   - It generates a code once it is created.
2. **Create Tournament:**
   - A tournament needs: name, amount of points per position.
   - The admins can add players by their username.
3. **View of Tours:**
   - Show a list of all tours created and joined.
   - Every row has to show the Tour's name, an **A** if you are an admin or a **J** if you joined.
   - Show **_Create Tour_** Button.
   - Show **_Join Tour_** Button.
   - The **_Join Tour_** Button opens a modal where the user can use the Tour's Code.
4. **View of Tournaments:**
   - Show a list of all tournaments of a Tour.
   - Show amount of points granted per tournament.
   - Every row has to show the Tournament's name, an **_Add team_** Button.
   - The tournament will appear in the list no matter if the user is an admin, player or viewer.
   - It has to has a **_Ranking_**, **_Create Tournament_** & **_Search Tournament_** Buttons.
   - An **ADMIN** can:
     - See the users joined to the Tour.
     - Add users to a Tournament as players from the list of users.
     - Delete Teams from a Tournament.
     - Add ADMINS to a Tour.
5. **Brackets:**
   - Contains all instances of the tournaments, those instances are **_Groups_**, **_Round 16_**, **_Quarter-Finals_**, **_Semi-Finals_**, **_Final_**.
   - The instances are in a dropdown.
   - If a Tournament's category doesn't complete the **_Round 16_**, the algorithm will complete the brackets according to ....
   - There has to be a _Category_ Button which change the brackets from one category to another.
   - Every bracket shows the names of the 4 players, the date and hour of the match, the place where it is going to play and the result of the match.
   - The user can scroll between all brackets.
   - The group instance has the 3 matches.
   - The group instance view uses pages to see all groups.
   - From group instace, the first 2 teams passes to the next round.
   - An **ADMIN** can:
     - Click on any match and add the results of the sets.
6. **Ranking:**
   - It has to has a **_Category_** Button which shows the ranking of any category.
   - It has to has a **_Search Player_** Button which find a player rank by its lastname or name.
   - If the user search for a player the view only shows the player/s found.
   - This view shows a table which has the rank on the left, Player's name in the middle & Accumulated points on the right.

### **_News_**

1.  ## **Tournament's Rewards:**
2.  ## **Tournament's Rules:**
3.  ## **Sponsors:**
