import PocketBase from 'pocketbase';
import { SECRET_EMAIL, SECRET_PASSWORD } from '$env/static/private';

export async function load({ params }) {
    const pb = new PocketBase("https://connected-animal.pockethost.io/");
    await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);

    const slug = params.slug.toLowerCase();

    // Capitalize the first letter of each word in the city name
    const cityName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    // Fetch the jobs for the specific city
    const jobRecords = await pb.collection('jobs').getFullList(200, {
        filter: `city="${cityName}"`,
        sort: '-created',
    });

    if (jobRecords.length === 0) {
        return {
            error: true,
            message: "City not found or no jobs available for this city",
        };
    }

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

    // Fetch all unique cities from the jobs collection
    const allCities = await pb.collection('jobs').getFullList(200, {
        fields: 'city',
    });
    const uniqueCities = [...new Set(allCities.map(job => job.city))];

    // Fetch all countries (assuming you still want to show country links)
    const countries = await pb.collection('countries').getFullList(200);

    return {
        city: cityName,
        country: jobRecords[0].country, // Assuming all jobs in a city are in the same country
        records: formattedJobRecords,
        cities: uniqueCities,
        countries: countries.map(c => c.country)
    };
}