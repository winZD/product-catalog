export interface Product {
  id?: number;
  title: string; // Required
  thumbnail: string; // Required
  price: number; // Required
  description: string; // Required
  category?: string;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  tags?: string[];
  brand?: string;
  sku?: string;
  weight?: number;
  dimensions?: Dimensions;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: Review[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: MetaData;
  images?: string[];
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string; // ISO 8601 format string
  reviewerName: string;
  reviewerEmail: string;
}

export interface MetaData {
  createdAt: string; // ISO 8601 format string
  updatedAt: string; // ISO 8601 format string
  barcode: string;
  qrCode: string; // URL as string
}
