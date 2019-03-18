export interface Hotel {
    id: string;
    name: string;
    description: string;
    distance_to_venue: number;
    rating: number;
    price_category: PriceCategory;
    amenities: Array<string>;
    images: Array<string>;
}

export enum PriceCategory {
    High = 'high',
    Medium = 'medium',
    Low = 'low',
}
