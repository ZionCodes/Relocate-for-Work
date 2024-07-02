import PocketBase from 'pocketbase';
import { SECRET_EMAIL, SECRET_PASSWORD } from '$env/static/private';

export async function load() {
    const pb = new PocketBase("https://connected-animal.pockethost.io/");
    await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);

    // Fetch all jobs
    const jobRecords = await pb.collection('jobs').getFullList(200, {
        sort: '-created',
    });

    // Fetch all countries
    const countryRecords = await pb.collection('countries').getFullList(200, {
        sort: 'country',
    });

    // Sort job records
    const sortedJobRecords = jobRecords.sort((a, b) => {
        if (a.tier_1 && a.tier_2 && (!b.tier_1 || !b.tier_2)) return -1;
        if ((!a.tier_1 || !a.tier_2) && b.tier_1 && b.tier_2) return 1;
        if (a.tier_2 && !b.tier_2) return -1;
        if (!a.tier_2 && b.tier_2) return 1;
        return new Date(b.created) - new Date(a.created);
    });

    const formattedJobRecords = sortedJobRecords.map((record) => {
        const createdDate = new Date(record.created);
        const formattedDate = createdDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
        return {
            title: record.title,
            tag: record.tag,
            description: record.description,
            picture: record.picture,
            companyname: record.company_name,
            city: record.city,
            country: record.country,
            id: record.id,
            filename: record.fileName,
            tier_1: record.tier_1,
            tier_2: record.tier_2,
            tier_3: record.tier_3,
            url: record.url,
            created: formattedDate
        };
    });

    const formattedCountryRecords = countryRecords.map((record) => record.country);

    return {
        records: formattedJobRecords,
        countries: formattedCountryRecords
    };
}
