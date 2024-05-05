export interface IUnitCreateDto {
  governorate: number;
  floor: number;
  plot: number;
  zone: number;
  district: number;
  name: string;
  short_description: string;
  price: number;
  uniteType: number;
  area: number;
  direction: number;
  bedroom_count: number;
  bathroom_count: number;
  finishingType: number;
  is_installment: boolean;
  have_garden: boolean;
  garden_area: number;
  full_description: string;
  have_furniture: boolean;
  receivingType: number;
  commonFeatures: number[];
  commonContact: number[];
  main_image: string;
  images: string[];
  publish: boolean;
}
