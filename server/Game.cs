using System;
using System.Collections.Generic;

namespace server
{
    public class Game
    {
        private bool isEnded = false;

        private int totalScore = 0;
        private int currentRound = 1;
        private List<Round> roundList = new();
        private Random rand = new Random();

        public Ball StrikePins(int pinsLeft)
        {
            int roll = rand.Next(0, pinsLeft + 1);
            return new Ball(roll);
        }

        public Round MakeRound()
        {
            int pins = 10;
            Console.WriteLine($"Round: {currentRound}");



            Ball hit1 = StrikePins(pins);
            Console.WriteLine($"You hit {hit1.PinsStruck} pins");
            pins -= hit1.PinsStruck;

            Ball? hit2 = null;
            Ball? bonusBall = null;

            if (pins > 0)
            {


                hit2 = StrikePins(pins);
                pins -= hit2.PinsStruck;

                if (pins == 0)
                {
                    Console.WriteLine("You made a spare!");
                }
                else
                {
                    Console.WriteLine($"You hit {hit2.PinsStruck} pins");
                }
            }


            if (currentRound == 10 && (hit1.PinsStruck == 10 || (hit1.PinsStruck + (hit2?.PinsStruck ?? 0) == 10)))
            {

                bonusBall = StrikePins(10);
            }

            Round newRound = new Round(currentRound, hit1, hit2, bonusBall);

            totalScore += newRound.CalcScore(roundList, currentRound - 1);

            if (currentRound == 10)
            {
                isEnded = true;
            }
            else
            {
                currentRound++;
            }

            return newRound;
        }

        public void ShowScore()
        {
            Console.Clear();
            Console.WriteLine("🎳 Bowling Scoreboard 🎳\n");

            int runningTotal = 0;

            for (int i = 0; i < roundList.Count; i++)
            {
                Round round = roundList[i];


                int roundScore = round.CalcScore(roundList, i);
                runningTotal += roundScore;


                string hit1 = round.Hit1.PinsStruck == 10 ? "X" : round.Hit1.PinsStruck.ToString();
                string hit2 = round.Hit2 == null ? "-" : round.IsSpare ? "/" : round.Hit2.PinsStruck.ToString();
                if (round.IsStrike) hit2 = " ";

                Console.WriteLine($"Round {round.Id}:  {hit1} | {hit2}  --> Cumulative Score: {runningTotal}");
            }

            Console.WriteLine($"\nTotal Score: {runningTotal}");

        }

        public List<Round> NewGame()
        {
            roundList.Clear();
            totalScore = 0;
            currentRound = 1;
            isEnded = false;

            for (int i = 0; i < 10; i++)
            {
                Round newRound = MakeRound();
                roundList.Add(newRound);
                Console.WriteLine($"Round {newRound.Id} added");
            }

            Console.WriteLine($"THE COUNT OF ROUNDS IN THE LIST: {roundList.Count}");
            return roundList;
        }
    }
}