import { CategoryService } from '../services';
import { Category } from '../entity';
import { Request, Response } from "express";
import { ApiResponse, success, failure } from "../types/response/api-response";
import {
  isNotFoundError,
  isValidationError,
  isInternalError,
} from "../types/error/error-guards";
import { ErrorType } from "../types/error/error-type";

export class CategoryController {
    private categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

    /*async getAll(req: Request, res: Response): Promise<void> {
        try {
            const response = await this.categoryService.getAll();

            if (!response) {
                const errorResponse: ApiResponse<never> = failure({
                    type: "NOT_FOUND",
                    entity: "Category",
                    id: "all",
                });
                res.status(404).json(errorResponse);
                return;
            }

            const apiResponse: ApiResponse<Category[]> = success(response);
            res.status(201).json(apiResponse);
        } catch (e) {
            const errorResponse: ApiResponse<never> = failure(this.handleError(e));
            res.status(this.getErrorStatus(e)).json(errorResponse);
        }
    }*/

    private handleError(e: unknown): ErrorType {
        if (isNotFoundError(e)) return e;
        if (isValidationError(e)) return e;
        if (isInternalError(e)) return e;
        return { type: "INTERNAL", message: "Internal server error" };
    }

    private getErrorStatus(e: unknown): number {
        if (isNotFoundError(e)) return 404;
        if (isValidationError(e)) return 400;
        return 500;
    }
}

export default new CategoryController();
