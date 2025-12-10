import { describe, expect, it } from "vitest";
import { validateResource, PatientSchema, CoverageSchema } from "../src/resources";

describe("FHIR validation", () => {
  it("validates patient", () => {
    const patient = { resourceType: "Patient", active: true, name: [{ family: "Doe", given: ["Jane"] }] };
    expect(validateResource(patient as any)).toMatchObject({ active: true });
  });

  it("validates coverage", () => {
    const coverage = { resourceType: "Coverage", status: "active", subscriberId: "123" };
    expect(CoverageSchema.parse(coverage)).toMatchObject({ subscriberId: "123" });
  });
});
