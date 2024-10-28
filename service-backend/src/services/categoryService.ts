import { CategoryRepository } from "../repository";
import { Category } from "../entity";

export class CategoryService {
  async create(categoryData: Category[]) {
    const newCategories: Category[] = [];
    for (let i = 0; i < categoryData.length; i = i + 1) {
      const newCategory = new Category();
      newCategory.category = categoryData[i].category;
      newCategory.gender = categoryData[i].gender;

      newCategories.push(newCategory);
    }
    return newCategories;
  }

  async findCategories(categoryData: Category[]) {
    const categories: Category[] = [];
    for (let i = 0; i < categoryData.length; i++) {
      const existingCategory = await CategoryRepository.findOneBy({
        category: categoryData[i].category,
        gender: categoryData[i].gender,
      });

      if (existingCategory) {
        categories.push(existingCategory);
        categoryData.splice(i, 1);
        i--;
      }
    }
    return categories;
  }
}
