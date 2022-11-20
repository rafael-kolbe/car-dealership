import { PrismaClient } from '@prisma/client';
import { ZodError } from 'zod';
import { SellerData, SellerId } from '../validations/sellerInput.js';
const prisma = new PrismaClient();

export const getSellers = async (req, res) => {
    const sellerList = await prisma.sellers.findMany({
        where: {
            deleted: false,
        },
    });

    return res.json(sellerList);
};

export const getSellerById = async (req, res) => {
    const { id } = req.params;

    try {
        const sellerId = SellerId.parse(id);
        const seller = await prisma.sellers.findUnique({
            where: {
                id: sellerId,
            },
        });

        if (!seller) {
            return res.status(404).json({ message: 'Seller not found.' });
        }

        return res.json(seller);
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: error.flatten().fieldErrors });
        }

        return res.status(500).json({ message: 'Internal server error.' });
    }
};

export const createSeller = async (req, res) => {
    try {
        const sellerData = SellerData.parse({ ...req.body });
        await prisma.sellers.create({
            data: {
                name: sellerData.name,
            },
        });

        return res.status(201).json({ message: 'Seller created.' });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: error.flatten().fieldErrors });
        }

        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const editSeller = async (req, res) => {
    const { id } = req.params;

    try {
        const sellerId = SellerId.parse(id);
        const sellerData = SellerData.parse({ ...req.body });
        await prisma.sellers.update({
            where: {
                id: sellerId,
            },
            data: {
                name: sellerData.name,
            },
        });

        return res.json({ message: 'Seller updated.' });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: error.flatten().fieldErrors });
        }

        return res.status(404).json({ message: 'Seller not found.' });
    }
};

export const deleteSeller = async (req, res) => {
    const { id } = req.params;

    try {
        const sellerId = SellerId.parse(id);
        await prisma.sellers.update({
            where: {
                id: sellerId,
            },
            data: {
                deleted: true,
            },
        });

        return res.json({ message: 'Seller deleted' });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: error.flatten().fieldErrors });
        }

        return res.status(404).json({ message: 'Seller not found.' });
    }
};
