import { FoodTruck } from "./schemas/foodTruck";

export function convertFoodTruckData({
  locationid,
  FoodItems,
  ...data
}: Record<string, string>): FoodTruck {
  return {
    locationId: locationid,
    foodItems: FoodItems?.split?.(":") ?? [],
    otherData: JSON.stringify(data),
  };
}
