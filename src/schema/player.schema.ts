import { object, number, string, TypeOf, boolean } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    number: number({
      required_error: "Number is required",
    }),
    isGoalkeeper: boolean({
      required_error: "isGoalkeeper is required",
    }),
  }),
};

const updatePayload = {
  name: string().optional(),
  number: number().optional(),
  isGoalkeeper: boolean().optional(),
};

const params = {
  params: object({
    playerId: string({
      required_error: "playerId is required",
    }),
  }),
};

export const createPlayerSchema = object({
  ...payload,
});

export const updatePlayerSchema = object({
  ...params,
  ...updatePayload,
});

export const deletePlayerSchema = object({
  ...params,
});

export const getPlayerSchema = object({
  ...params,
});

export type CreatePlayerInput = TypeOf<typeof createPlayerSchema>;
export type UpdatePlayerInput = TypeOf<typeof updatePlayerSchema>;
export type ReadPlayerInput = TypeOf<typeof getPlayerSchema>;
export type DeletePlayerInput = TypeOf<typeof deletePlayerSchema>;
