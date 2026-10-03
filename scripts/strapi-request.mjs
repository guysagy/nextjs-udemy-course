import { writeFileSync } from 'node:fs';
import qs from 'qs';

const url = 'http://localhost:1337/api/reviews' + '?' + qs.stringify({
    fields: ['slug', 'title', 'subtitle', 'publishedAt', ],
    populate: { image: { fields: ['url'] } },
    sort: ['publishedAt:desc'],
    pagination: { pageSize: 2 },
}, { encodeValuesOnly: true });

const response = await fetch(url);
const body = await response.json();
const formattedBody = JSON.stringify(body, null, 2);
console.log(formattedBody);
writeFileSync('strapi-response.json', formattedBody, 'utf8');