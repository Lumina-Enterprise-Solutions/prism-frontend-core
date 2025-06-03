export type MetricData = {
    id: string;
    name: string;
    category: string;
    product_id: string;
    type: string;
    price: number;
    previousValue: number;
    change: number;
    status: string;
    lastUpdated: string | Date;
    trend: number[];
    quantity: number;
};