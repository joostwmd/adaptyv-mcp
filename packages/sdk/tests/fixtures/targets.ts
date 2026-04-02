export const targetFixtures = {
  list: {
    query: {
      search: "EGFR",
      selfservice_only: true,
      limit: 10,
      offset: 0,
      filter: 'eq(name,"PD-L1")',
      sort: "desc(created_at)",
    },
    response: {
      items: [
        {
          id: "f3b2afd0-f70b-5191-a90a-ae1e0545c744",
          name: "Human PD-L1 / B7-H1 Protein",
          vendor_name: "ACRO Biosystems",
          catalog_number: "PD1-H5221",
          url: "https://targets.adaptyvbio.com/protein/f3b2afd0-f70b-5191-a90a-ae1e0545c744",
          uniprot_id: "Q9NZQ7",
        },
      ],
      total: 1,
      count: 1,
      offset: 0,
    },
  },
  get: {
    path: { target_id: "f3b2afd0-f70b-5191-a90a-ae1e0545c744" },
    response: {
      id: "f3b2afd0-f70b-5191-a90a-ae1e0545c744",
      name: "Human PD-L1 / B7-H1 Protein",
      vendor_name: "ACRO Biosystems",
      catalog_number: "PD1-H5221",
      url: "https://targets.adaptyvbio.com/protein/f3b2afd0-f70b-5191-a90a-ae1e0545c744",
      uniprot_id: "Q9NZQ7",
      details: null,
      pricing: null,
    },
  },
  listCustomRequests: {
    query: { limit: 20, offset: 0 },
    response: {
      items: [
        {
          id: "019a1111-1111-1111-1111-111111111111",
          name: "My Custom Antigen",
          product_id: "CUSTOM-001",
          status: "pending_review" as const,
          created_at: "2026-02-10T09:00:00Z",
        },
      ],
      total: 1,
      count: 1,
      offset: 0,
    },
  },
  getCustomRequest: {
    path: { request_id: "019a1111-1111-1111-1111-111111111111" },
    response: {
      id: "019a1111-1111-1111-1111-111111111111",
      name: "My Custom Antigen",
      product_id: "CUSTOM-001",
      status: "pending_review" as const,
      created_at: "2026-02-10T09:00:00Z",
      updated_at: "2026-02-10T09:00:00Z",
      sequence: "MVLSPADKTNVKAAWGKVGAHAGEYGAEALERMFLSFPTTKTYFPHFDLSH",
      pdb_id: null,
      pdb_file: null,
      molecular_weight: 15.5,
      note: "Expressed in HEK293 cells",
      product_url: "https://www.acrobiosystems.com/product/PD1",
      vendor: "ACRO Biosystems",
      material_id: null,
    },
  },
  requestCustom: {
    requestBody: {
      name: "My Custom Antigen",
      product_id: "CUSTOM-001",
      sequence: "MVLSPADKTNVKAAWGKVGAHAGEYGAEALERMFLSFPTTKTYFPHFDLSH",
      pdb_id: "1HHO",
      molecular_weight: 15.5,
      note: "Expressed in HEK293 cells",
      product_url: "https://www.acrobiosystems.com/product/PD1",
      vendor: "ACRO Biosystems",
    },
    response: {
      id: "019a1111-1111-1111-1111-111111111111",
      status: "pending_review" as const,
      created_at: "2026-02-10T09:00:00Z",
    },
  },
} as const;
