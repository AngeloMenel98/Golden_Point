import { AppDataSource } from "../data-source";
import { Tour } from "../entity";

const CHARACTERS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const CODE_LENGTH = 8;
const MAX_RETRIES = 3;

const generateSecureRandomCode = (length: number): string => {
    const randomValues = new Uint32Array(length);
    require("crypto").getRandomValues(randomValues);
    
    let result = "";
    for (let i = 0; i < length; i++) {
        result += CHARACTERS.charAt(randomValues[i] % CHARACTERS.length);
    }
    return result;
};

const generateTourCode = async (): Promise<string> => {
    const tourRepository = AppDataSource.getRepository(Tour);
    let lastGeneratedCode: string = "";

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        const code = generateSecureRandomCode(CODE_LENGTH);
        lastGeneratedCode = code;

        try {
            const existingTour = await tourRepository.findOne({
                where: { tourCode: code },
            });

            if (!existingTour) {
                return code;
            }

            if (attempt === MAX_RETRIES) {
                console.warn(
                    `Tour code collision after ${MAX_RETRIES} retries`
                );
                return code;
            }
        } catch (error) {
            throw new Error("tourCode collision check failed");
        }
    }

    return lastGeneratedCode;
};

export { generateTourCode };
