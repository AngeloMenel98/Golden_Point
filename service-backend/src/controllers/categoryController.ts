import { CategoryService } from '../services';
import { Category } from '../entity';

export class CategoryController {
    private categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

    /*async getAll() {
        const response = await this.categoryService.getAll();

        if (!response) {
            return {
                response: 'Clubs not Found',
                status: 404,
            };
        }

        return { response, status: 201 };
    }*/
}

export default new CategoryController();
