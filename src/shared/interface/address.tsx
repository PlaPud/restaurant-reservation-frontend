export interface Province {
  id: number;
  name_th: string;
  name_en: string;
  geography_id: number;
}

export interface District {
  id: number;
  name_th: string;
  name_en: string;
  province_id: number;
}

export interface SubDistrict {
  id: number;
  zip_code: number;
  name_th: string;
  name_en: string;
  amphure_id: number;
}
