import { FoodTruck } from "./schemas/foodTruck";

export function convertFoodTruckData({
  locationid,
  FoodItems,
  ...data
}: Record<string, string>): FoodTruck {
  return {
    locationId: locationid,
    foodItems: FoodItems?.split?.(":").map((s) => s.trim()) ?? [],
    otherData: JSON.stringify(data),
  };
}
