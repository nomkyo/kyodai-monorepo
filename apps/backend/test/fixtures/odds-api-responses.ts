export const newOddsResponse = () => ({
  id: 'fj939fuslkdsa',
  sport_key: 'americanfootball_nfl',
  sport_title: 'NFL',
  commence_time: '2023-10-11T23:11:00Z',
  home_team: 'Houston Texans',
  away_team: 'Kansas City Chiefs',
  bookmakers: [
    {
      key: 'draftkings',
      title: 'DraftKings',
      last_update: '2023-10-10T12:10:29Z',
      markets: [
        {
          key: 'spread',
          last_update: '2023-10-10T12:10:29Z',
          outcomes: [
            {
              name: 'Houston Texans',
              price: 2.23,
              point: -1.5,
            },
            {
              name: 'Kansas City Chiefs',
              price: 1.45,
              point: 1.5,
            },
          ],
        },
      ],
    },
  ],
});
