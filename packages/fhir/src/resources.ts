import { z } from "zod";

export const IdSchema = z.string().min(1);
export const ReferenceSchema = z.object({
  reference: z.string(),
  display: z.string().optional(),
});

export const PatientSchema = z.object({
  resourceType: z.literal("Patient"),
  id: IdSchema.optional(),
  active: z.boolean().optional(),
  name: z
    .array(
      z.object({
        use: z.string().optional(),
        family: z.string().optional(),
        given: z.array(z.string()).optional(),
      })
    )
    .optional(),
  gender: z.string().optional(),
  birthDate: z.string().optional(),
  telecom: z
    .array(
      z.object({
        system: z.string().optional(),
        value: z.string().optional(),
        use: z.string().optional(),
      })
    )
    .optional(),
  address: z
    .array(
      z.object({
        line: z.array(z.string()).optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        postalCode: z.string().optional(),
        country: z.string().optional(),
      })
    )
    .optional(),
});

export const CoverageSchema = z.object({
  resourceType: z.literal("Coverage"),
  id: IdSchema.optional(),
  status: z.string().optional(),
  subscriberId: z.string().optional(),
  payor: z.array(ReferenceSchema).optional(),
  class: z
    .array(
      z.object({
        type: z.object({ code: z.string().optional(), display: z.string().optional() }).optional(),
        value: z.string().optional(),
        name: z.string().optional(),
      })
    )
    .optional(),
});

export const ClaimSchema = z.object({
  resourceType: z.literal("Claim"),
  id: IdSchema.optional(),
  status: z.string().optional(),
  type: z.object({ coding: z.array(z.object({ code: z.string(), system: z.string().optional() })).optional() }).optional(),
  patient: ReferenceSchema.optional(),
  provider: ReferenceSchema.optional(),
  billablePeriod: z
    .object({
      start: z.string().optional(),
      end: z.string().optional(),
    })
    .optional(),
});

export const DocumentReferenceSchema = z.object({
  resourceType: z.literal("DocumentReference"),
  id: IdSchema.optional(),
  status: z.string().optional(),
  type: z.object({ text: z.string().optional() }).optional(),
  subject: ReferenceSchema.optional(),
  date: z.string().optional(),
  content: z
    .array(
      z.object({
        attachment: z.object({
          contentType: z.string().optional(),
          url: z.string().optional(),
          title: z.string().optional(),
        }),
      })
    )
    .optional(),
});

export const FhirResourceSchemas = {
  Patient: PatientSchema,
  Coverage: CoverageSchema,
  Claim: ClaimSchema,
  DocumentReference: DocumentReferenceSchema,
};

export type Patient = z.infer<typeof PatientSchema>;
export type Coverage = z.infer<typeof CoverageSchema>;
export type Claim = z.infer<typeof ClaimSchema>;
export type DocumentReference = z.infer<typeof DocumentReferenceSchema>;
export type FhirResource = Patient | Coverage | Claim | DocumentReference;

export function validateResource(resource: FhirResource) {
  const schema = (FhirResourceSchemas as Record<string, z.ZodSchema>).get?.(resource.resourceType);
  const resolved = schema ?? (FhirResourceSchemas as Record<string, z.ZodSchema>)[resource.resourceType];
  if (!resolved) {
    throw new Error(`Unsupported resource type: ${resource.resourceType}`);
  }
  return resolved.parse(resource);
}

export function isClinicalResource(resourceType: string) {
  return ["Patient", "DocumentReference"].includes(resourceType);
}

export function isBillingResource(resourceType: string) {
  return ["Coverage", "Claim"].includes(resourceType);
}
