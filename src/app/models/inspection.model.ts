export interface Inspection {
  camis: string;
  dba: string;
  boro: string;
  building: string;
  street: string;
  zipcode: string;
  phone: string;
  cuisine_description?: string;
  inspection_date: string;
  critical_flag: string;
  record_date: string;
  latitude: string;
  longitude: string;
  community_board: string;
  council_district: string;
  census_tract: string;
  bin: string;
  bbl: string;
  nta: string;
  grade?: string;
  score?: string;
  violation_description?: string;
  action?: string;
  violation_code?: string;
  inspection_type?: string;
}

export interface InspectionFilters {
  limit: number;
  offset: number;
  borough: string;
  q: string;
  cuisine_description: string;
}
