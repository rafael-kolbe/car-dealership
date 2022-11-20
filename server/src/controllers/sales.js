import { PrismaClient } from '@prisma/client';
import { ZodError } from 'zod';
import { format } from 'date-fns';
import { SaleData, SaleId } from '../validations/saleInput.js';
const prisma = new PrismaClient();

export const getSales = async (req, res) => {
    const saleList = await prisma.sales.findMany({
        where: {
            deleted: false,
        },
        orderBy: {
            sold_at: 'desc',
        },
    });

    return res.json(saleList);
};

export const getSaleById = async (req, res) => {
    const { id } = req.params;

    try {
        const saleId = SaleId.parse(id);
        const sale = await prisma.sales.findUnique({
            where: {
                id: saleId,
            },
        });

        if (!sale) {
            return res.status(404).json({ message: 'Sale not found.' });
        }

        return res.json(sale);
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: error.flatten().fieldErrors });
        }

        return res.status(500).json({ message: 'Internal server error.' });
    }
};

export const createSale = async (req, res) => {
    try {
        const saleData = SaleData.parse({ ...req.body });
        const seller = await prisma.sellers.findUnique({
            where: {
                name: saleData.sellerName,
            },
        });
        const car = await prisma.cars.findUnique({
            where: {
                car_model: saleData.carModel,
            },
        });

        if (!seller) {
            return res.status(404).json({ message: 'Seller not found.' });
        }
        if (!car) {
            return res.status(404).json({ message: 'Car not found.' });
        }

        const date = format(Date.now(), 'y-LL-dd HH:mm:ss.SSS');

        await prisma.sales.create({
            data: {
                seller_id: seller.id,
                car_id: car.id,
                sold_for: saleData.soldFor,
                sold_at: date,
            },
        });

        return res.status(201).json({ message: 'Sale created.' });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: error.flatten().fieldErrors });
        }

        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const editSale = async (req, res) => {
    const { id } = req.params;

    try {
        const saleId = SaleId.parse(id);
        const saleData = SaleData.parse({ ...req.body });
        const seller = await prisma.sellers.findUnique({
            where: {
                id: saleData.sellerId,
            },
        });
        const car = await prisma.cars.findUnique({
            where: {
                id: saleData.carId,
            },
        });

        if (seller) {
            saleData?.sellerId &&
                (await prisma.sales.update({
                    where: {
                        id: saleId,
                    },
                    data: {
                        seller_id: saleData.sellerId,
                    },
                }));
        }

        if (car) {
            saleData?.carId &&
                (await prisma.sales.update({
                    where: {
                        id: saleId,
                    },
                    data: {
                        car_id: saleData.carId,
                    },
                }));
        }

        if (saleData.soldFor) {
            saleData?.soldFor &&
                (await prisma.sales.update({
                    where: {
                        id: saleId,
                    },
                    data: {
                        sold_for: saleData.soldFor,
                    },
                }));
        }

        return res.json({ message: 'Sale updated.' });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: error.flatten().fieldErrors });
        }

        return res.status(404).json({ message: 'Sale not found.' });
    }
};

export const deleteSale = async (req, res) => {
    const { id } = req.params;

    try {
        const saleId = SaleId.parse(id);
        await prisma.sales.update({
            where: {
                id: saleId,
            },
            data: {
                deleted: true,
            },
        });

        return res.json({ message: 'Sale deleted' });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: error.flatten().fieldErrors });
        }

        return res.status(404).json({ message: 'Sale not found.' });
    }
};
