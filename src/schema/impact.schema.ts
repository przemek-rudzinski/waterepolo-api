import { object, number, string, TypeOf, boolean } from "zod";

const payload = {
  body: object({
    playerMatchId: string({
      required_error: "playerMatchId is required",
    }),
    sprint: number().optional(),
  assist: number().optional(),
  penalty: number().optional(),
  exclusion: number().optional(),
  }),
};

const updatePayload = {
  sprint: number().optional(),
  assist: number().optional(),
  penalty: number().optional(),
  exclusion: number().optional(),
  
};

const params = {
  params: object({
    impactId: string({
      required_error: "impactId is required",
    }),
  }),
};

export const createImpactSchema = object({
  ...payload,
});

export const updateImpactSchema = object({
  ...params,
  ...updatePayload,
});

export const deleteImpactSchema = object({
  ...params,
});

export const getImpactSchema = object({
  ...params,
});

export type CreateImpactInput = TypeOf<typeof createImpactSchema>;
export type UpdateImpactInput = TypeOf<typeof updateImpactSchema>;
export type ReadImpactInput = TypeOf<typeof getImpactSchema>;
export type DeleteImpactInput = TypeOf<typeof deleteImpactSchema>;
