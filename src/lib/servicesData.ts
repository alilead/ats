export type ServiceItem = {
  id: string;
  title: string;
  description?: string;
};

export type AudienceServices = {
  key: 'residential' | 'commercial';
  label: string;
  categories: Array<{
    id: string;
    title: string;
    items: ServiceItem[];
  }>;
};

// Services derived from the provided English PDF and existing site content.
export const servicesData: AudienceServices[] = [
  {
    key: 'residential',
    label: 'Residential',
    categories: [
      {
        id: 'res-construction',
        title: 'Construction & Renovation',
        items: [
          { id: 'r-1', title: 'Interior renovation' },
          { id: 'r-2', title: 'Plastering and drywall' },
          { id: 'r-3', title: 'Flooring & tiling' },
          { id: 'r-4', title: 'Painting & coatings' },
          { id: 'r-5', title: 'Bathroom & kitchen refit' }
        ]
      },
      {
        id: 'res-garden',
        title: 'Garden & Landscaping',
        items: [
          { id: 'r-6', title: 'Landscape design' },
          { id: 'r-7', title: 'Planting & turf' },
          { id: 'r-8', title: 'Patios & terraces' },
          { id: 'r-9', title: 'Irrigation systems' },
          { id: 'r-10', title: 'Seasonal maintenance' }
        ]
      },
      {
        id: 'res-maintenance',
        title: 'Home Maintenance',
        items: [
          { id: 'r-11', title: 'Plumbing & electrics' },
          { id: 'r-12', title: 'Preventive maintenance' },
          { id: 'r-13', title: 'Emergency repairs' }
        ]
      }
    ]
  },
  {
    key: 'commercial',
    label: 'Commercial',
    categories: [
      {
        id: 'com-fitout',
        title: 'Fit-out & Interior Works',
        items: [
          { id: 'c-1', title: 'Shop & office fit-out' },
          { id: 'c-2', title: 'Partitioning & ceilings' },
          { id: 'c-3', title: 'Acoustic treatment' },
          { id: 'c-4', title: 'Commercial flooring' }
        ]
      },
      {
        id: 'com-civil',
        title: 'Civil & Site Works',
        items: [
          { id: 'c-5', title: 'Minor structural works' },
          { id: 'c-6', title: 'Facade repairs' },
          { id: 'c-7', title: 'External hardscapes' }
        ]
      },
      {
        id: 'com-services',
        title: 'Facilities & Maintenance',
        items: [
          { id: 'c-8', title: 'Scheduled building maintenance' },
          { id: 'c-9', title: 'Property management support' },
          { id: 'c-10', title: 'Emergency response & repairs' }
        ]
      }
    ]
  }
];

export default servicesData;
