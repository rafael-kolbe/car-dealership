import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const UserInput = z
    .object({
        username: z.string(),
        password: z.string(),
    })
    .strict();

export default UserInput;
