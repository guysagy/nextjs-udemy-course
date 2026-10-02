import { writeFileSync } from 'node:fs';

const url = 'http://localhost:1337/api/reviews?populate=*';
const response = await fetch(url);
const body = await response.json();
const formattedBody = JSON.stringify(body, null, 2);
console.log(formattedBody);
writeFileSync('strapi-response.json', formattedBody, 'utf8');