import { object, number, string, TypeOf, boolean } from "zod";

const payload = {
  body: object({
    matchId: string({
      required_error: "matchId is required",
    }),
    playerId: string({
      required_error: "playerId is required",
    }),
    playerNumber: number().optional(),
    playingTime: number().positive().optional(),
    onField: boolean().optional(),
  }),
};

const params = {
  params: object({
    playerMatchId: string({
      required_error: "matchId is required",
    }),
  }),
};

export const createPlayerMatchSchema = object({
  ...payload,
});

export type CreatePlayerMatchInput = TypeOf<typeof createPlayerMatchSchema>;
