import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const API = 'https://api.openligadb.de';
const LEAGUE = 'bl1';
const SEASON = 2026;

type OpenLigaGoal = {
  scoreTeam1?: number;
  scoreTeam2?: number;
  matchMinute?: number;
  goalGetterName?: string;
  isOwnGoal?: boolean;
  isPenalty?: boolean;
};

type OpenLigaResult = {
  pointsTeam1?: number;
  pointsTeam2?: number;
  resultOrderID?: number;
};

type OpenLigaMatch = {
  matchID: number;
  matchDateTime?: string;
  matchDateTimeUTC?: string;
  matchIsFinished?: boolean;
  team1?: { teamId?: number; teamName?: string; shortName?: string; teamIconUrl?: string };
  team2?: { teamId?: number; teamName?: string; shortName?: string; teamIconUrl?: string };
  goals?: OpenLigaGoal[];
  matchResults?: OpenLigaResult[];
  group?: { groupName?: string; groupOrderID?: number };
};

function currentScore(match: OpenLigaMatch) {
  const goals = Array.isArray(match.goals) ? match.goals : [];
  const lastGoal = goals.at(-1);
  if (lastGoal && Number.isFinite(lastGoal.scoreTeam1) && Number.isFinite(lastGoal.scoreTeam2)) {
    return { home: lastGoal.scoreTeam1 ?? 0, away: lastGoal.scoreTeam2 ?? 0 };
  }

  const results = Array.isArray(match.matchResults) ? [...match.matchResults] : [];
  results.sort((a, b) => (a.resultOrderID ?? 0) - (b.resultOrderID ?? 0));
  const latest = results.at(-1);
  return {
    home: latest?.pointsTeam1 ?? 0,
    away: latest?.pointsTeam2 ?? 0,
  };
}

function statusFor(match: OpenLigaMatch) {
  if (match.matchIsFinished) return 'FT';
  const start = new Date(match.matchDateTimeUTC || match.matchDateTime || '').getTime();
  const now = Date.now();
  if (Number.isFinite(start) && start <= now && now - start < 4 * 60 * 60 * 1000) return 'LIVE';
  return 'SCHEDULED';
}

export async function GET() {
  try {
    const groupResponse = await fetch(`${API}/getcurrentgroup/${LEAGUE}`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    if (!groupResponse.ok) throw new Error(`current group ${groupResponse.status}`);
    const group = await groupResponse.json();
    const groupOrderId = Number(group?.groupOrderID ?? group?.groupOrderId ?? 1);

    const matchesResponse = await fetch(`${API}/getmatchdata/${LEAGUE}/${SEASON}/${groupOrderId}`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    if (!matchesResponse.ok) throw new Error(`match data ${matchesResponse.status}`);
    const raw = (await matchesResponse.json()) as OpenLigaMatch[];

    const fixtures = (Array.isArray(raw) ? raw : []).map((match) => {
      const score = currentScore(match);
      const goals = Array.isArray(match.goals) ? match.goals : [];
      return {
        id: match.matchID,
        kickoff: match.matchDateTimeUTC || match.matchDateTime,
        status: statusFor(match),
        finished: Boolean(match.matchIsFinished),
        matchday: match.group?.groupOrderID ?? groupOrderId,
        home: {
          id: match.team1?.teamId,
          name: match.team1?.teamName || 'Heim',
          short: match.team1?.shortName || match.team1?.teamName || 'Heim',
          crest: match.team1?.teamIconUrl || null,
        },
        away: {
          id: match.team2?.teamId,
          name: match.team2?.teamName || 'Gast',
          short: match.team2?.shortName || match.team2?.teamName || 'Gast',
          crest: match.team2?.teamIconUrl || null,
        },
        score,
        goals: goals.map((goal, index) => ({
          id: `${match.matchID}-${index}`,
          minute: goal.matchMinute ?? null,
          scorer: goal.goalGetterName || 'Tor',
          scoreHome: goal.scoreTeam1 ?? null,
          scoreAway: goal.scoreTeam2 ?? null,
          ownGoal: Boolean(goal.isOwnGoal),
          penalty: Boolean(goal.isPenalty),
        })),
      };
    });

    return NextResponse.json(
      {
        provider: 'OpenLigaDB',
        league: 'Bundesliga',
        season: '2026/27',
        matchday: groupOrderId,
        updatedAt: new Date().toISOString(),
        fixtures,
      },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } },
    );
  } catch (error) {
    return NextResponse.json(
      {
        provider: 'OpenLigaDB',
        league: 'Bundesliga',
        season: '2026/27',
        updatedAt: new Date().toISOString(),
        fixtures: [],
        error: error instanceof Error ? error.message : 'Live feed unavailable',
      },
      { status: 503, headers: { 'Cache-Control': 'no-store, max-age=0' } },
    );
  }
}
