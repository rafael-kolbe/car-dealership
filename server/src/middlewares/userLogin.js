import UserInput from '../validations/userLogin.js';
import { ZodError } from 'zod';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import dotenv from 'dotenv';
dotenv.config();

export const verifyCredentials = async (req, res, next) => {
    try {
        const userInput = UserInput.parse({ ...req.body });

        const adminId = await prisma.admin.findFirst({
            where: {
                username: userInput.username,
                AND: {
                    password: userInput.password,
                },
            },
        });

        if (!adminId) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const token = jwt.sign({ adminId: adminId.id }, process.env.TOKEN_SECRET, { expiresIn: '8h' });

        req.userToken = token;

        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: error.flatten().fieldErrors });
        }

        return res.status(500).json({ message: 'Internal server error.' });
    }
};

export const isLoggedIn = async (req, res, next) => {
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
    } catch (error) {
        return res.status(440).json({ message: 'Session expired.' });
    }

    next();
};
