import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import dotenv from 'dotenv';
dotenv.config();

export const login = (req, res) => {
    return res.json({ token: req.userToken });
};

export const verifyAuthentication = async (req, res) => {
    const { authorization } = req.headers;

    try {
        const token = authorization.split(' ')[1];
        const tokenPayload = jwt.verify(token, process.env.TOKEN_SECRET);

        const admin = await prisma.admin.findUnique({
            where: {
                id: tokenPayload.adminId,
            },
        });

        if (!admin) {
            return res.status(403).json({ message: 'Access denied.' });
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(440).json({ message: 'Session expired.' });
    }
};
