import express from 'express';

export const router = express.Router();

export const getTFTPlayerData = async (name: string, tag: string, apiKey: string) => {
    if (!apiKey) {
        throw new Error('No API key provided');
    }

    try {
        // Først henter vi account info for å få PUUID
        const accountResponse = await fetch(
            `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}`,
            {
                headers: {
                    'X-Riot-Token': apiKey
                }
            }
        );
        
        if (!accountResponse.ok) {
            throw new Error(`Failed to fetch player data: ${accountResponse.statusText}`);
        }
        
        const accountData = await accountResponse.json();
        
        // Så bruker vi PUUID for å hente TFT match history
        const matchesResponse = await fetch(
            `https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/${accountData.puuid}/ids?count=20`,
            {
                headers: {
                    'X-Riot-Token': apiKey
                }
            }
        );

        if (!matchesResponse.ok) {
            throw new Error(`Failed to fetch match data: ${matchesResponse.statusText}`);
        }

        const matches = await matchesResponse.json();
        
        return {
            account: accountData,
            matches: matches
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch data: ${error.message}`);
        }
        throw error;
    }
}; 

// Add some routes to your router if needed
router.get('/example', (req, res) => {
    res.send('TFT router works!');
}); 