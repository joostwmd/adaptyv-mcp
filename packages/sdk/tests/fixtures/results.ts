const resultItem = {
  id: "019e1111-0000-0000-0000-000000000003",
  title: "Affinity summary",
  experiment_id: "019d4a2b-0000-0000-0000-000000000001",
  result_type: "affinity",
  created_at: "2026-02-20T16:00:00Z",
  summary: [] as const,
  metadata: {},
  data_package_url: "https://data.adaptyvbio.com/pkg/019e1111",
} as const;

export const resultFixtures = {
  list: {
    query: { limit: 10, offset: 0 },
    response: {
      items: [resultItem],
      total: 1,
      count: 1,
      offset: 0,
    },
  },
  get: {
    path: { result_id: "019e1111-0000-0000-0000-000000000003" },
    response: resultItem,
  },
  listForExperiment: {
    input: {
      experiment_id: "019d4a2b-0000-0000-0000-000000000001",
      limit: 20,
      offset: 0,
    },
    response: {
      items: [resultItem],
      total: 1,
      count: 1,
      offset: 0,
    },
  },
} as const;
