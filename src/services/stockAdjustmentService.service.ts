import { StockAdjustment } from "../entity/StockAdjustment.entity";

export class StockAdjustmentService {

    public getAllStockAdjustments = async () => {
      const stockAdjustments = await StockAdjustment.find({ relations: [ "createdBy", "updatedBy"] });
      return stockAdjustments;
    }
  
  }