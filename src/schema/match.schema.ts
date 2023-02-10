import { object, number, string, TypeOf } from "zod";

const payload = {
  body: object({
    guestTeam: string({
      required_error: "guestTeam is required",
    }),
    homeTeam: string({
      required_error: "homeTeam is required",
    }),
    description: string().optional(),
    place: string().optional(),
    date: string().optional(),
    homeScore: number().optional(),
    guestScore: number().optional(),
  }).refine(
    (data) => {
      if (!data.date) {
        return true;
      }
      let isValidDate = Date.parse(data.date);
      console.log(isValidDate);
      return !isNaN(isValidDate);
    },
    {
      message: "Date string must be date format",
      path: ["match creation"],
    }
  ),
};

const updatePayload = {
  body: object({
    guestTeam: string().optional(),
    homeTeam: string().optional(),
    description: string().optional(),
    place: string().optional(),
    date: string().optional(),
    homeScore: number().optional(),
    guestScore: number().optional(),
  }).refine(
    (data) => {
      if (!data.date) {
        return true;
      }
      let isValidDate = Date.parse(data.date);
      console.log(isValidDate);
      return !isNaN(isValidDate);
    },
    {
      message: "Date string must be date format",
      path: ["match creation"],
    }
  ),
};

const params = {
  params: object({
    matchId: string({
      required_error: "matchId is required",
    }),
  }),
};

export const createMatchSchema = object({
  ...payload,
});

export const updateMatchSchema = object({
  ...params,
  ...updatePayload,
});

export const deleteMatchSchema = object({
  ...params,
});

export const getMatchSchema = object({
  ...params,
});

export type CreateMatchInput = TypeOf<typeof createMatchSchema>;
export type UpdateMatchInput = TypeOf<typeof updateMatchSchema>;
export type ReadMatchInput = TypeOf<typeof getMatchSchema>;
export type DeleteMatchInput = TypeOf<typeof deleteMatchSchema>;
