import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Dish[] {
    return PROMOTIONS;
  }

  getPromotion(id: string): Dish {
    return PROMOTIONS.filter((promo) => (promo.id === id))[0];
  }

  getFeaturedPromotion(): Dish {
    return PROMOTIONS.filter((promo) => promo.featured)[0];
  }
}
