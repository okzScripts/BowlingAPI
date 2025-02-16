Bowling simulator / calculator.
backend: C# 
Frontend: REACT
Styling: CSS

Usage instruction:

#Server is run on Localhost port 5000.

1. in /server, make a "dotnet run".
2. in /client, make a "npm run dev".

3. Roll for scores.

Each time the page loads, a game from the backend is generated and passed to the frontend as a JSON-object.
The JSX then iterates through the data and makes queryselects for the HTML elements showing the results

The C# contains some debugging Writelines etc that can be ignored.
