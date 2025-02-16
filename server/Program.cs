using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using System.Text.Json;
using server;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();


Game game = new Game();


app.MapGet("/api/getGame", GetGame);

List<Round> GetGame()
{
    List<Round> gameRounds = game.NewGame();


    foreach (Round round in gameRounds)
    {
        Console.WriteLine($"Round ID: {round.Id}");
        Console.WriteLine($"{gameRounds.Count}");
    }
    return gameRounds;
}
app.Run();






