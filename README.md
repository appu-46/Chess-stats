# Chess Stats
Enter a [chess.com](https://chess.com) username and it will show you statistics of your Blitz, Rapid, Bullet and Daily games. It also shows a overview of profile like name, country, Profile picture and league. 


# How to use
I have hosted it on netlify. [Here is the link](https://chess-stats-46.netlify.app/). Just visit the link, enter username and you get the stats. If it says something went wrong, just click the chess stats and retry.

# How it works
I have used chess.com public API to fetch the rating and results data using AJAX calls. In profile it also loads profile picture of the respective username and a country flag. I have used rest countries API to get flag svg, profile picture is provided by chess.com API. 
Since country code is recieved from chess.com's API, I am calling yet another AJAX call to render the country flag. 

For some chess.com players, country is international. In such a scenario, I have handled by showing earth flag. Same thing goes for profile picture. If the user doesn't have one, a default pawn image will render instead. 

# Error Handling
1. Pressing the button without entering any username.
2. Entering a invalid username.
3. API failed response.
   1. If API fails to fetch stats.
   2. If API fails to fetch profile.
4. No data for a particular time control
5. Not enough data to render the win loss draw graph.
6. For Titled player, respective title will be shown in profile.  

## Future work
There is much work to do on this project. I will keep updating this as I keep adding more and more features. 

