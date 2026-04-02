export const experimentFixtures = {
  list: {
    query: {
      limit: 50,
      offset: 0,
      search: "PD-L1",
      filter: "eq(status,draft)",
      sort: "desc(created_at)",
    },
    response: {
      items: [
        {
          id: "019d4a2b-0000-0000-0000-000000000001",
          code: "EXP-2026-001",
          status: "draft" as const,
          experiment_type: "screening" as const,
          created_at: "2026-02-01T12:00:00Z",
          results_status: "none" as const,
          experiment_url:
            "https://foundry.adaptyvbio.com/experiments/019d4a2b-0000-0000-0000-000000000001",
          name: "PD-L1 affinity panel",
          stripe_invoice_url: null,
          stripe_quote_url: null,
        },
      ],
      total: 1,
      count: 1,
      offset: 0,
    },
  },
  create: {
    requestBody: {
      name: "PD-L1 affinity panel",
      experiment_spec: {
        experiment_type: "screening" as const,
        method: "bli" as const,
        target_id: "c383cc1d-fe22-5dbf-953c-378bc073019d",
        sequences: {
          mAb1: "EVQLVESGGGLVQPGGSLRLSCAASGFTFS",
          mAb2: "MKTLVLLALLVGAALA",
        },
        n_replicates: 3,
      },
      webhook_url: "https://example.com/webhook",
      skip_draft: false,
      auto_accept_quote: false,
    },
    response: {
      experiment_id: "019d4a2b-0000-0000-0000-000000000001",
      error: null,
      stripe_hosted_invoice_url: null,
      stripe_invoice_id: null,
    },
  },
  get: {
    path: { experiment_id: "019d4a2b-0000-0000-0000-000000000001" },
    response: {
      id: "019d4a2b-0000-0000-0000-000000000001",
      code: "EXP-2026-001",
      status: "draft" as const,
      experiment_spec: {
        experiment_type: "screening" as const,
        method: "bli" as const,
        target_id: "c383cc1d-fe22-5dbf-953c-378bc073019d",
        sequences: {
          mAb1: "EVQLVESGGGLVQPGGSLRLSCAASGFTFS",
        },
        n_replicates: 3,
      },
      created_at: "2026-02-01T12:00:00Z",
      results_status: "none" as const,
      experiment_url:
        "https://foundry.adaptyvbio.com/experiments/019d4a2b-0000-0000-0000-000000000001",
      name: "PD-L1 affinity panel",
      costs: null,
      stripe_invoice_url: null,
      stripe_quote_url: null,
    },
  },
  update: {
    input: {
      experiment_id: "019d4a2b-0000-0000-0000-000000000001",
      name: "PD-L1 panel (rev 2)",
      webhook_url: "https://example.com/hooks/v2",
    },
    response: {
      id: "019d4a2b-0000-0000-0000-000000000001",
      updated: true,
      message: null,
    },
  },
  submit: {
    path: { experiment_id: "019d4a2b-0000-0000-0000-000000000001" },
    response: {
      experiment_id: "019d4a2b-0000-0000-0000-000000000001",
      previous_status: "draft" as const,
      status: "waiting_for_confirmation" as const,
      confirmed_at: "2026-02-15T14:30:00Z",
      stripe_invoice_url: null,
    },
  },
  estimateCost: {
    requestBody: {
      experiment_spec: {
        experiment_type: "screening" as const,
        method: "bli" as const,
        target_id: "c383cc1d-fe22-5dbf-953c-378bc073019d",
        sequences: {
          seq1: "EVQLVESGGGLVQPGGSLRLSCAASGFTFS",
          seq2: "MKTLVLLALLVGAALA",
        },
        n_replicates: 3,
      },
    },
    response: {
      breakdown: {
        currency: "usd",
        total_cents: 500000,
      },
      incomplete: null,
      warnings: [],
    },
  },
  getInvoice: {
    path: { experiment_id: "019d4a2b-0000-0000-0000-000000000001" },
    response: {
      experiment_id: "019d4a2b-0000-0000-0000-000000000001",
      status: "open" as const,
      stripe_invoice_url: "https://invoice.stripe.com/i/acct_1234/test_5678",
    },
  },
  getQuote: {
    path: { experiment_id: "019d4a2b-0000-0000-0000-000000000001" },
    response: {
      experiment_id: "019d4a2b-0000-0000-0000-000000000001",
      stripe_quote_url: "https://billing.example.com/quotes/qt_1234567890",
      amount_total: 500000,
      amount_subtotal: 500000,
      currency: "usd",
      status: "open" as const,
      expires_at: "2026-03-15T23:59:59Z",
      updated_at: "2026-02-15T14:30:00Z",
    },
  },
  confirmQuote: {
    input: {
      experiment_id: "019d4a2b-0000-0000-0000-000000000001",
      purchase_order_number: "PO-2026-00142",
      notes: "Please expedite processing",
    },
    response: {
      id: "qt_01abcdef",
      status: "accepted" as const,
      hosted_invoice_url: "https://invoice.stripe.com/i/acct_1234/test_5678",
      invoice_id: "in_01abcdef",
    },
  },
  getQuotePdf: {
    path: { experiment_id: "019d4a2b-0000-0000-0000-000000000001" },
    bytes: [37, 80, 68, 70, 45, 49, 46, 52] as const,
  },
} as const;
