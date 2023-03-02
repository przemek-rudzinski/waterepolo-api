import { object, number, string, TypeOf, boolean, array } from "zod";

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
      required_error: "playerMatchId is required",
    }),
  }),
};

const updatePayload = {
  body: object({
    playerNumber: number().optional(),
    playingTime: number().positive().optional(),
    onField: boolean().optional(),
    entryTime: array(string()).optional(),
    exitTime: array(string()).optional(),
  }),
};

const searchQuery = {
  query: object({
    matchId: string().optional(),
    playerId: string().optional(),
    onField: string()
      .optional()
      .transform((value: string | undefined) => {
        if (value === "true" || value === "1") {
          return true;
        }
        if (value === "false" || value === "0") {
          return false;
        }
        throw new Error("Invalid value for onField");
      }),
  }),
};

export const searchManyPlayerMatchSchema = object({ ...searchQuery });
export const createPlayerMatchSchema = object({
  ...payload,
});

export const updatePlayerMatchSchema = object({
  ...updatePayload,
  ...params,
});
export const deletePlayerMatchSchema = object({
  ...params,
});

export const getPlayerMatchSchema = object({
  ...params,
});

export type CreatePlayerMatchInput = TypeOf<typeof createPlayerMatchSchema>;
export type UpdatePlayerMatchInput = TypeOf<typeof updatePlayerMatchSchema>;
export type ReadPlayerMatchInput = TypeOf<typeof getPlayerMatchSchema>;
export type DeletePlayerMatchInput = TypeOf<typeof deletePlayerMatchSchema>;
export type SearchPlayerMatchInput = TypeOf<typeof searchManyPlayerMatchSchema>;
