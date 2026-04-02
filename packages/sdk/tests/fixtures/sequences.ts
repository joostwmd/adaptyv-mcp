export const sequenceFixtures = {
  list: {
    query: { limit: 25, offset: 0 },
    response: {
      items: [
        {
          id: "019e1111-0000-0000-0000-000000000002",
          length: 120,
          experiment_id: "019d4a2b-0000-0000-0000-000000000001",
          experiment_code: "EXP-2026-001",
          is_control: false,
          created_at: "2026-02-02T10:00:00Z",
          aa_preview: "EVQLVESGGGLVQPGGSLRLSCAASGFTFS",
          name: "mAb1",
        },
      ],
      total: 1,
      count: 1,
      offset: 0,
    },
  },
  get: {
    path: { sequence_id: "019e1111-0000-0000-0000-000000000002" },
    response: {
      id: "019e1111-0000-0000-0000-000000000002",
      length: 120,
      is_control: false,
      created_at: "2026-02-02T10:00:00Z",
      aa_string: "EVQLVESGGGLVQPGGSLRLSCAASGFTFS",
      metadata: null,
      experiment: {
        experiment_id: "019d4a2b-0000-0000-0000-000000000001",
        experiment_code: "EXP-2026-001",
        experiment_status: "draft",
      },
    },
  },
  add: {
    requestBody: {
      experiment_code: "EXP-2026-001",
      sequences: [
        {
          name: "mAb1",
          aa_string: "EVQLVESGGGLVQPGGSLRLSCAASGFTFS",
          control: false,
        },
      ],
    },
    response: {
      added_count: 1,
      experiment_id: "019d4a2b-0000-0000-0000-000000000001",
      experiment_code: "EXP-2026-001",
      sequence_ids: ["019e1111-0000-0000-0000-000000000002"],
    },
  },
  listForExperiment: {
    input: {
      experiment_id: "019d4a2b-0000-0000-0000-000000000001",
      limit: 50,
      offset: 0,
    },
    response: {
      items: [
        {
          id: "019e1111-0000-0000-0000-000000000002",
          length: 120,
          experiment_id: "019d4a2b-0000-0000-0000-000000000001",
          experiment_code: "EXP-2026-001",
          is_control: false,
          created_at: "2026-02-02T10:00:00Z",
          aa_preview: "EVQLVESGGGLVQPGGSLRLSCAASGFTFS",
          name: "mAb1",
        },
      ],
      total: 1,
      count: 1,
      offset: 0,
    },
  },
} as const;
