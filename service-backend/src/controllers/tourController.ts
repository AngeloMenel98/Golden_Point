import { Request, Response } from 'express';
import { Tour } from '../entity';
import { TourService } from '../services/tourService';
import { generateCode } from '../helpers/generateTourCode.helper';
import { UserService } from '../services/userService';
import { UserRole } from '../entity/User';

export class TourController {
    private tourService: TourService;
    private userService: UserService;

    constructor() {
        this.tourService = new TourService();
        this.userService = new UserService();
    }
    async create(req: Request, res: Response) {
        try {
            const { title, userId } = req.body;

            const user = await this.userService.findById(userId);
            console;
            if (user.role == UserRole.SUPERADMIN) {
                const newTour = new Tour();
                newTour.title = title;
                newTour.tourCode = generateCode(6);
                newTour.users = [user];

                const savedTour = await this.tourService.create(newTour);
                return res.status(201).json(savedTour);
            }
            console.log('No se creo tour porque el usuario no es SUPERADMIN');
        } catch (err) {
            console.error('Error al crear nuevo Tour', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new TourController();
