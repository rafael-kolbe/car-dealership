import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import dotenv from 'dotenv';
dotenv.config();

async function main() {
    const admin = await prisma.admin.create({
        data: {
            username: process.env.ADMIN_USERNAME,
            password: process.env.ADMIN_PASSWORD,
        },
    });

    const sellers = await prisma.sellers.createMany({
        data: [
            { id: 'clanhv29r0000vbcogn8cp1ev', name: 'John' },
            { id: 'clanhzrct0000vbac23ebk8el', name: 'Carl' },
            { id: 'clanjprjg0000vbbkb9n0dbf8', name: 'Jenny' },
            { id: 'clanjps0y0002vbbk678tl2hg', name: 'Floid' },
            { id: 'clanjpscv0004vbbkvwccpyu8', name: 'Chris' },
        ],
    });

    const cars = await prisma.cars.createMany({
        data: [
            { id: 'clanhv5p40002vbcoezzxfzvq', car_model: 'Toyota Yaris', price: 7987000 },
            { id: 'clanjs8bp000evbbka9ivphgo', car_model: 'Hyundai Hb20s', price: 6947000 },
            { id: 'clanjsauj000gvbbkmw23iicq', car_model: 'Volkswagen Polo', price: 7997000 },
            { id: 'clanjscd1000ivbbkhvakhn57', car_model: 'Hyundai Hb20', price: 5497000 },
            { id: 'clanjsdr5000kvbbkyexit021', car_model: 'Nissan Sentra', price: 6287000 },
            { id: 'clanjsezp000mvbbkgvr8equm', car_model: 'Volkswagen Virtus', price: 8737000 },
            { id: 'clanjsh92000ovbbkmzg71yj0', car_model: 'Honda City', price: 9297000 },
            { id: 'clanjsitv000qvbbkaflfigrq', car_model: 'Chevrolet Cruze', price: 6487000 },
            { id: 'clanjsl4w000svbbkwf6znscz', car_model: 'Chevrolet Onix', price: 8637000 },
            { id: 'clanjsn6g000uvbbk8ssmrph0', car_model: 'Ford Ka', price: 5097000 },
        ],
    });

    const sales = await prisma.sales.createMany({
        data: [
            {
                seller_id: 'clanhv29r0000vbcogn8cp1ev',
                car_id: 'clanhv5p40002vbcoezzxfzvq',
                sold_for: 7987000,
                sold_at: '2022-10-28 10:26:16.000',
            },
            {
                seller_id: 'clanhv29r0000vbcogn8cp1ev',
                car_id: 'clanhv5p40002vbcoezzxfzvq',
                sold_for: 7987000,
                sold_at: '2022-10-26 15:14:58.000',
            },
            {
                seller_id: 'clanhv29r0000vbcogn8cp1ev',
                car_id: 'clanhv5p40002vbcoezzxfzvq',
                sold_for: 7987000,
                sold_at: '2022-09-10 09:45:51.000',
            },
            {
                seller_id: 'clanhv29r0000vbcogn8cp1ev',
                car_id: 'clanhv5p40002vbcoezzxfzvq',
                sold_for: 7987000,
                sold_at: '2022-10-09 22:11:24.000',
            },
            {
                seller_id: 'clanhv29r0000vbcogn8cp1ev',
                car_id: 'clanhv5p40002vbcoezzxfzvq',
                sold_for: 7987000,
                sold_at: '2022-10-28 07:50:22.000',
            },
            {
                seller_id: 'clanhzrct0000vbac23ebk8el',
                car_id: 'clanjs8bp000evbbka9ivphgo',
                sold_for: 6947000,
                sold_at: '2022-09-15 09:08:17.000',
            },
            {
                seller_id: 'clanhzrct0000vbac23ebk8el',
                car_id: 'clanjs8bp000evbbka9ivphgo',
                sold_for: 6947000,
                sold_at: '2022-10-14 23:40:34.000',
            },
            {
                seller_id: 'clanhzrct0000vbac23ebk8el',
                car_id: 'clanjs8bp000evbbka9ivphgo',
                sold_for: 6947000,
                sold_at: '2022-09-02 16:28:06.000',
            },
            {
                seller_id: 'clanhzrct0000vbac23ebk8el',
                car_id: 'clanjsauj000gvbbkmw23iicq',
                sold_for: 7997000,
                sold_at: '2022-09-21 18:09:25.000',
            },
            {
                seller_id: 'clanhzrct0000vbac23ebk8el',
                car_id: 'clanjsauj000gvbbkmw23iicq',
                sold_for: 7997000,
                sold_at: '2022-08-18 03:02:54.000',
            },
            {
                seller_id: 'clanhzrct0000vbac23ebk8el',
                car_id: 'clanjsauj000gvbbkmw23iicq',
                sold_for: 7997000,
                sold_at: '2022-08-06 15:20:59.000',
            },
            {
                seller_id: 'clanhzrct0000vbac23ebk8el',
                car_id: 'clanjsauj000gvbbkmw23iicq',
                sold_for: 7997000,
                sold_at: '2022-11-13 16:30:00.000',
            },
            {
                seller_id: 'clanjprjg0000vbbkb9n0dbf8',
                car_id: 'clanjscd1000ivbbkhvakhn57',
                sold_for: 5497000,
                sold_at: '2022-10-07 05:10:48.000',
            },
            {
                seller_id: 'clanjprjg0000vbbkb9n0dbf8',
                car_id: 'clanjscd1000ivbbkhvakhn57',
                sold_for: 5497000,
                sold_at: '2022-10-19 00:30:21.000',
            },
            {
                seller_id: 'clanjprjg0000vbbkb9n0dbf8',
                car_id: 'clanjscd1000ivbbkhvakhn57',
                sold_for: 5497000,
                sold_at: '2022-10-07 03:27:58.000',
            },
            {
                seller_id: 'clanjprjg0000vbbkb9n0dbf8',
                car_id: 'clanjscd1000ivbbkhvakhn57',
                sold_for: 5497000,
                sold_at: '2022-10-29 15:20:50.000',
            },
            {
                seller_id: 'clanjprjg0000vbbkb9n0dbf8',
                car_id: 'clanjscd1000ivbbkhvakhn57',
                sold_for: 5497000,
                sold_at: '2022-09-24 15:39:30.000',
            },
            {
                seller_id: 'clanjprjg0000vbbkb9n0dbf8',
                car_id: 'clanjscd1000ivbbkhvakhn57',
                sold_for: 5497000,
                sold_at: '2022-11-01 15:17:48.000',
            },
            {
                seller_id: 'clanjprjg0000vbbkb9n0dbf8',
                car_id: 'clanjsdr5000kvbbkyexit021',
                sold_for: 6287000,
                sold_at: '2022-11-17 12:05:18.000',
            },
            {
                seller_id: 'clanjprjg0000vbbkb9n0dbf8',
                car_id: 'clanjsdr5000kvbbkyexit021',
                sold_for: 6287000,
                sold_at: '2022-10-07 17:40:19.000',
            },
            {
                seller_id: 'clanjprjg0000vbbkb9n0dbf8',
                car_id: 'clanjsezp000mvbbkgvr8equm',
                sold_for: 8737000,
                sold_at: '2022-08-15 13:15:27.000',
            },
            {
                seller_id: 'clanjprjg0000vbbkb9n0dbf8',
                car_id: 'clanjsezp000mvbbkgvr8equm',
                sold_for: 8737000,
                sold_at: '2022-10-20 04:41:57.000',
            },
            {
                seller_id: 'clanjprjg0000vbbkb9n0dbf8',
                car_id: 'clanjsezp000mvbbkgvr8equm',
                sold_for: 8737000,
                sold_at: '2022-09-02 07:33:43.000',
            },
            {
                seller_id: 'clanjprjg0000vbbkb9n0dbf8',
                car_id: 'clanjsh92000ovbbkmzg71yj0',
                sold_for: 9297000,
                sold_at: '2022-08-24 14:53:51.000',
            },
            {
                seller_id: 'clanjprjg0000vbbkb9n0dbf8',
                car_id: 'clanjsh92000ovbbkmzg71yj0',
                sold_for: 9297000,
                sold_at: '2022-11-16 16:44:22.000',
            },
            {
                seller_id: 'clanjps0y0002vbbk678tl2hg',
                car_id: 'clanjsh92000ovbbkmzg71yj0',
                sold_for: 9297000,
                sold_at: '2022-10-29 01:29:39.000',
            },
            {
                seller_id: 'clanjps0y0002vbbk678tl2hg',
                car_id: 'clanjsh92000ovbbkmzg71yj0',
                sold_for: 9297000,
                sold_at: '2022-09-17 09:49:57.000',
            },
            {
                seller_id: 'clanjps0y0002vbbk678tl2hg',
                car_id: 'clanjsitv000qvbbkaflfigrq',
                sold_for: 6487000,
                sold_at: '2022-10-30 22:47:43.000',
            },
            {
                seller_id: 'clanjps0y0002vbbk678tl2hg',
                car_id: 'clanjsitv000qvbbkaflfigrq',
                sold_for: 6487000,
                sold_at: '2022-09-07 14:48:45.000',
            },
            {
                seller_id: 'clanjps0y0002vbbk678tl2hg',
                car_id: 'clanjsitv000qvbbkaflfigrq',
                sold_for: 6487000,
                sold_at: '2022-11-18 00:23:36.000',
            },
            {
                seller_id: 'clanjps0y0002vbbk678tl2hg',
                car_id: 'clanjsl4w000svbbkwf6znscz',
                sold_for: 8637000,
                sold_at: '2022-09-18 05:35:48.000',
            },
            {
                seller_id: 'clanjpscv0004vbbkvwccpyu8',
                car_id: 'clanjsl4w000svbbkwf6znscz',
                sold_for: 8637000,
                sold_at: '2022-09-18 03:49:31.000',
            },
            {
                seller_id: 'clanjpscv0004vbbkvwccpyu8',
                car_id: 'clanjsl4w000svbbkwf6znscz',
                sold_for: 8637000,
                sold_at: '2022-09-07 02:53:31.000',
            },
            {
                seller_id: 'clanjpscv0004vbbkvwccpyu8',
                car_id: 'clanjsn6g000uvbbk8ssmrph0',
                sold_for: 5097000,
                sold_at: '2022-08-01 08:30:22.000',
            },
            {
                seller_id: 'clanjpscv0004vbbkvwccpyu8',
                car_id: 'clanjsn6g000uvbbk8ssmrph0',
                sold_for: 5097000,
                sold_at: '2022-10-03 16:42:39.000',
            },
            {
                seller_id: 'clanjpscv0004vbbkvwccpyu8',
                car_id: 'clanjsn6g000uvbbk8ssmrph0',
                sold_for: 5097000,
                sold_at: '2022-10-28 17:26:43.000',
            },
            {
                seller_id: 'clanjpscv0004vbbkvwccpyu8',
                car_id: 'clanjsn6g000uvbbk8ssmrph0',
                sold_for: 5097000,
                sold_at: '2022-11-09 19:47:16.000',
            },
            {
                seller_id: 'clanjpscv0004vbbkvwccpyu8',
                car_id: 'clanjsn6g000uvbbk8ssmrph0',
                sold_for: 5097000,
                sold_at: '2022-09-02 17:11:39.000',
            },
            {
                seller_id: 'clanjpscv0004vbbkvwccpyu8',
                car_id: 'clanjsn6g000uvbbk8ssmrph0',
                sold_for: 5097000,
                sold_at: '2022-10-15 21:01:51.000',
            },
            {
                seller_id: 'clanjpscv0004vbbkvwccpyu8',
                car_id: 'clanjsn6g000uvbbk8ssmrph0',
                sold_for: 5097000,
                sold_at: '2022-09-17 09:16:54.000',
            },
        ],
    });

    console.log(admin, sellers, cars, sales);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
