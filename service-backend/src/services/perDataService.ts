import { PerDataRepository } from '../repository/perData.repository';
import { PersonalData } from '../entity';
import { UserService } from '.';

export class PerDataService {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async create(
        perData: PersonalData,
        userId: number
    ): Promise<PersonalData | undefined> {
        try {
            const user = await this.userService.findById(userId);
            if (user) {
                perData.user = user;
                return await PerDataRepository.save(perData);
            }
            console.log("Personal Data couldn't be created");
        } catch (err) {
            console.error('Error al crear Personal Data', err);
        }
    }
}
