import PocketBase from 'pocketbase';
import {SECRET_EMAIL,SECRET_PASSWORD} from '$env/static/private';
import { createEmail } from '$lib/server/EmailHandler';


export async function load(){
    const pb = new PocketBase("https://connected-animal.pockethost.io/");
    await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);
    const records = await pb.collection('posts').getFullList(200 /* batch size */, {
        expand: 'field',
        sort: '-created',
    });

    const results = records.map((record) => {
        const createdDate = new Date(record.created);
        const formattedDate = createdDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

        const author = record.expand?.field;

        return {
            title: record.title,
            introduction: record.introduction,
            article: record.article,
            thumbnail: record.thumbnail,
            field: author,
            id: record.id,
            created: formattedDate, 
        };
    });

    return{
        records: results
    }
}

export const actions = {
    createmail: async ({ request }) => {
      try {
        const result = await createEmail(request);
        return { success: true, data: result };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
  };




  async function fetchArticles() {
    const pb = new PocketBase('https://connected-animal.pockethost.io/');
    await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);
    
    try {
      const records = await pb.collection('articles').getFullList({
        fields: 'title,article'
      });
      console.log('Raw articles from PocketBase:', records);
      
      if (!Array.isArray(records)) {
        console.error('Fetched articles data is not an array:', records);
        return [];
      }
      
      const articles = records.map(record => ({
        title: record.title,
        article: record.article
      }));
      
      console.log('Processed articles:', articles);
      return articles;
    } catch (error) {
      console.error('Error fetching articles:', error);
      // For testing purposes, return a hardcoded article if the fetch fails
      return [{
        title: "Employer's Guide to Sponsoring and Relocating International Employees to {Country}",
        article: "<p>In today's globalized economy, attracting and retaining top international talent can give your company a significant competitive edge. This comprehensive guide will walk you through the process of sponsoring and relocating foreign employees to {Country}, ensuring a smooth transition for both your organization and your new international hires.</p>\r\n" +
          // ... (rest of the article HTML)
          '<p>Remember to leverage resources like RelocateForWork.com to connect with qualified international candidates seeking visa sponsorship opportunities. With the right approach, your company can build a truly global workforce and thrive in the international market.</p>'
      }];
    }
  }
  
  async function fetchCountries() {
    const pb = new PocketBase('https://connected-animal.pockethost.io/');
    await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);
    
    try {
      const records = await pb.collection('countries').getFullList({
        fields: 'country,flag'
      });
      console.log('Raw records from PocketBase:', records);
      
      if (!Array.isArray(records)) {
        console.error('Fetched data is not an array:', records);
        return [];
      }
      
      const countries = records.map(record => ({
        country: record.country,
        flag: record.flag,
      }));
      
      console.log('Processed countries:', countries);
      return countries;
    } catch (error) {
      console.error('Error fetching countries:', error);
      return [];
    }
  }


  function generateArticles(articles, countries) {
    if (!Array.isArray(articles) || !Array.isArray(countries)) {
      throw new Error('Invalid input: articles and countries must be arrays');
    }
  
    const generatedArticles = [];
  
    for (const country of countries) {
      if (typeof country !== 'object' || !country.country || !country.flag) {
        console.warn('Invalid country object:', country);
        continue;
      }
  
      for (const articleTemplate of articles) {
        if (typeof articleTemplate !== 'object' || !articleTemplate.title || !articleTemplate.article) {
          console.warn('Invalid article template:', articleTemplate);
          continue;
        }
  
        const title = articleTemplate.title.replace(/{Country}/g, country.country);
        const article = articleTemplate.article.replace(/{Country}/g, country.country);
  
        generatedArticles.push({
          country: country.country,
          flag: country.flag,
          title: title,
          article: article,
        });
      }
    }
  
    return generatedArticles;
  }

  async function generateAllArticles() {
    try {
      const articles = await fetchArticles();
      console.log('Fetched articles:', articles);
  
      const countries = await fetchCountries();
      console.log('Fetched countries:', countries);
  
      if (!Array.isArray(articles) || articles.length === 0) {
        throw new Error('Articles is not an array or is empty');
      }
  
      if (!Array.isArray(countries) || countries.length === 0) {
        throw new Error('Countries is not an array or is empty');
      }
  
      const generatedArticles = generateArticles(articles, countries);
      
      console.log('Generated Articles:', generatedArticles);
      // You can now use the generatedArticles array for further processing or storage
      
    } catch (error) {
      console.error('Error generating articles:', error);
      console.error('Error details:', error.stack);
    }
  }

  generateAllArticles();