import { Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator';
import validationMsg from '../constants/validationMessages';
import { teamController } from '../controllers';

const router = Router();

router.post(
    '/team/create',
    [
        check('teamName')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('teamName')),
        check('userId')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('userId')),
    ],
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { teamName, userId } = req.body;
            const { resp, status } = await teamController.create(
                teamName,
                userId
            );
            res.status(status).json(resp);
        } catch (err) {
            console.error('Error creating team:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

router.post(
    '/team/join',
    [
        check('teamId')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('teamId')),
        check('usersId')
            .not()
            .isEmpty()
            .withMessage(validationMsg.VALUE_IS_REQUIRED('usersId')),
    ],
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { usersId, teamId } = req.body;
            const { response, status } = await teamController.addUsers(
                teamId,
                usersId
            );
            res.status(status).json(response);
        } catch (err) {
            console.error('Error adding users to team:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

router.get('/team/:id', async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const teamId = req.params.id;
        const { response, status } = await teamController.getTeam(teamId);
        res.status(status).json(response);
    } catch (err) {
        console.error('Error creating team:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
