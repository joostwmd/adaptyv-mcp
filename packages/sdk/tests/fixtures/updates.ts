const updateItem = {
  id: "019f0000-0000-0000-0000-000000000001",
  experiment_id: "019d4a2b-0000-0000-0000-000000000001",
  experiment_code: "EXP-2026-001",
  name: "Experiment submitted",
  timestamp: "2026-02-15T14:30:00Z",
} as const;

export const updateFixtures = {
  list: {
    query: { limit: 50, offset: 0 },
    response: {
      items: [updateItem],
      total: 1,
      count: 1,
      offset: 0,
    },
  },
  listForExperiment: {
    input: {
      experiment_id: "019d4a2b-0000-0000-0000-000000000001",
      limit: 50,
      offset: 0,
    },
    response: {
      items: [updateItem],
      total: 1,
      count: 1,
      offset: 0,
    },
  },
} as const;
