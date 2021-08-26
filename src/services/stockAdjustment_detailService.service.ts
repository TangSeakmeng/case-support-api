import { StockAdjustment_detail } from "../entity/StockAdjustment_detail.entity";

export class StockAdjustment_detailService {

    public getAllStockAdjustment_details= async () => {
      const stockAdjustment_details = await StockAdjustment_detail.find({ relations: ["stockAdjustment", "product"] });
      return stockAdjustment_details;
    }
  
  }