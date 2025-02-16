namespace server;

public class Round
{
    public int Id { get; set; }
    public Ball Hit1 { get; set; }
    public Ball? Hit2 { get; set; }
    public Ball? BonusBall { get; set; }
    public int RoundScore { get; private set; } = 0;

    public bool IsStrike => Hit1.PinsStruck == 10;
    public bool IsSpare => !IsStrike && Hit1.PinsStruck + (Hit2?.PinsStruck ?? 0) == 10;

    public Round(int id, Ball hit1, Ball? hit2 = null, Ball? bonusBall = null)
    {
        Id = id;
        Hit1 = hit1;
        Hit2 = hit2;
        BonusBall = bonusBall;
    }

    public int CalcScore(List<Round> rounds, int currentRoundIndex)
    {
        int score = Hit1.PinsStruck + (Hit2?.PinsStruck ?? 0);


        if (IsStrike)
        {
            if (currentRoundIndex < rounds.Count - 1)
            {
                Round nextRound = rounds[currentRoundIndex + 1];
                score += nextRound.Hit1.PinsStruck;

                if (nextRound.IsStrike && currentRoundIndex < rounds.Count - 2)
                {
                    score += rounds[currentRoundIndex + 2].Hit1.PinsStruck;
                }
                else
                {
                    score += nextRound.Hit2?.PinsStruck ?? 0;
                }
            }
        }

        else if (IsSpare)
        {
            if (currentRoundIndex < rounds.Count - 1)
            {
                score += rounds[currentRoundIndex + 1].Hit1.PinsStruck;
            }
        }


        if (Id == 10 && BonusBall != null)
        {
            score += BonusBall.PinsStruck;
        }

        RoundScore = score;
        return score;
    }
}