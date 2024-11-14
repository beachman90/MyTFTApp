import type { TFTRankEntry } from '../types/tft';

export async function fetchAccount(gamename: string, tagline: string) {
  const apiKey = process.env.RIOT_API_KEY;
  if (!apiKey) throw new Error('API key not found');
  
  const accountUrl = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gamename)}/${encodeURIComponent(tagline)}`;
  
  const response = await fetch(accountUrl, {
    headers: { 'X-Riot-Token': apiKey }
  });
  
  if (!response.ok) {
    throw new Error(`Account API returned ${response.status}`);
  }
  
  return response.json();
}

export async function fetchSummoner(puuid: string) {
  const apiKey = process.env.RIOT_API_KEY;
  if (!apiKey) throw new Error('API key not found');
  
  const summonerUrl = `https://euw1.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${puuid}`;
  
  const response = await fetch(summonerUrl, {
    headers: { 'X-Riot-Token': apiKey }
  });
  
  if (!response.ok) {
    throw new Error(`Summoner API returned ${response.status}`);
  }
  
  return response.json();
}

export async function fetchTFTRank(id: string): Promise<TFTRankEntry | null> {
  const apiKey = process.env.RIOT_API_KEY;
  if (!apiKey) throw new Error('API key not found');
  
  const rankUrl = `https://euw1.api.riotgames.com/tft/league/v1/entries/by-summoner/${id}`;
  
  const response = await fetch(rankUrl, {
    headers: { 'X-Riot-Token': apiKey }
  });
  
  if (!response.ok) {
    throw new Error(`Rank API returned ${response.status}`);
  }
  
  const ranks = await response.json();
  return ranks.find((rank: TFTRankEntry) => rank.queueType === 'RANKED_TFT') || null;
}

export async function fetchMatches(puuid: string) {
  const apiKey = process.env.RIOT_API_KEY;
  if (!apiKey) throw new Error('API key not found');
  
  const matchesUrl = `https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?count=20`;
  
  const response = await fetch(matchesUrl, {
    headers: { 'X-Riot-Token': apiKey }
  });
  
  if (!response.ok) {
    throw new Error(`Matches API returned ${response.status}`);
  }
  
  return response.json();
} 