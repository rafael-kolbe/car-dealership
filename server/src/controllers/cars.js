import { PrismaClient } from '@prisma/client';
import { ZodError } from 'zod';
import { CarData, CarPrice, CarId } from '../validations/carInput.js';
const prisma = new PrismaClient();

export const getCars = async (req, res) => {
    const carList = await prisma.cars.findMany({
        where: {
            deleted: false,
        },
    });

    return res.json(carList);
};

export const getCarById = async (req, res) => {
    const { id } = req.params;

    try {
        const carId = CarId.parse(id);
        const car = await prisma.cars.findUnique({
            where: {
                id: carId,
            },
        });

        if (!car) {
            return res.status(404).json({ message: 'Car not found.' });
        }

        return res.json(car);
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: error.flatten().fieldErrors });
        }

        return res.status(500).json({ message: 'Internal server error.' });
    }
};

export const createCar = async (req, res) => {
    try {
        const carData = CarData.parse({ ...req.body });
        await prisma.cars.create({
            data: {
                car_model: carData.carModel,
                price: carData.price,
            },
        });

        return res.status(201).json({ message: 'Car created.' });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: error.flatten().fieldErrors });
        }

        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const editCar = async (req, res) => {
    const { id } = req.params;

    try {
        const carId = CarId.parse(id);
        const carPrice = CarPrice.parse({ ...req.body });
        await prisma.cars.update({
            where: {
                id: carId,
            },
            data: {
                price: carPrice.price,
            },
        });

        return res.json({ message: 'Car updated.' });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: error.flatten().fieldErrors });
        }

        return res.status(404).json({ message: 'Car not found.' });
    }
};

export const deleteCar = async (req, res) => {
    const { id } = req.params;

    try {
        const carId = CarId.parse(id);
        await prisma.cars.update({
            where: {
                id: carId,
            },
            data: {
                deleted: true,
            },
        });

        return res.json({ message: 'Car deleted' });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: error.flatten().fieldErrors });
        }

        return res.status(404).json({ message: 'Car not found.' });
    }
};
