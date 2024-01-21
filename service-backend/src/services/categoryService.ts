import { CategoryRepository } from '../repository';
import { Category } from '../entity';

export class CategoryService {
    async create(
        newCategories: Category[],
        categoryData: { categoryName: string; gender: string }[]
    ): Promise<Category[]> {
        try {
            for (let i = 0; i < categoryData.length; i = i + 1) {
                const newCategory = new Category();
                newCategory.categoryName = categoryData[i].categoryName;
                newCategory.gender = categoryData[i].gender;

                newCategories.push(newCategory);
            }

            return CategoryRepository.save(newCategories);
        } catch (e) {
            console.error('Error creating categories', e);
        }
    }

    async findCategories(
        categoryData: { categoryName: string; gender: string }[]
    ): Promise<Category[]> {
        try {
            const categories: Category[] = [];
            for (let i = 0; i < categoryData.length; i++) {
                const existingCategory = await CategoryRepository.findOneBy({
                    categoryName: categoryData[i].categoryName,
                    gender: categoryData[i].gender,
                });

                if (existingCategory) {
                    categories.push(existingCategory);
                    categoryData.splice(i, 1);
                    i--;
                }
            }
            return categories;
        } catch (e) {
            console.error(e);
        }
    }
}
