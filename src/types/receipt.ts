export interface Item {
    shortDescription: string;
    price: string;
  }
  
  export interface Receipt {
    retailer: string;
    purchaseDate: string; // format: YYYY-MM-DD
    purchaseTime: string; // format: HH:mm
    total: string;
    items: Item[];
    points?: number;
  }
  