export class OddsLeagueResponse {
  key: string;
  active: boolean;
  group: string;
  description: string;
  title: string;
}

export interface OddsResponse {
  id: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: {
    markets: {
      outcomes: {
        name: string;
        point: number;
      }[];
    }[];
  }[];
  // bookmakers: [
  //   {
  //     markets: [
  //       {
  //         outcomes: [
  //           {
  //             name: string;
  //             point: number;
  //           },
  //         ];
  //       },
  //     ];
  //   },
  // ];
}
