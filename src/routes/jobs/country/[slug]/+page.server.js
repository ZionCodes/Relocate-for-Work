import PocketBase from 'pocketbase';
import { SECRET_EMAIL, SECRET_PASSWORD } from '$env/static/private';

export async function load({ params }) {
    const pb = new PocketBase("https://connected-animal.pockethost.io/");
    await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);

    // Fetch the countries and extract country names
    const countries = await pb.collection('countries').getFullList(200);
    console.log(countries);

    const slug = params.slug.toLowerCase();

    // Filter the countrySlugs to find the matching country name
    const countryName = countries.find(country => country.country.toLowerCase() === slug)?.country;
    console.log(countryName);

    if (!countryName) {
        return {
            error: true,
            message: "Country not found",
        };
    }

    // Fetch the jobs for the specific country
    const jobRecords = await pb.collection('jobs').getFullList(200, {
        filter: `country="${countryName}"`,
        sort: '-created',
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

    return {
        country: countryName,
        records: formattedJobRecords,
        countries: countries.map(c => c.country)
    };
}
