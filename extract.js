const fs = require('fs');

const rawHtml = fs.readFileSync('downloaded.html', 'utf-8');

const bodyMatch = rawHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/);
let bodyContent = bodyMatch ? bodyMatch[1] : '';

// We should remove the scripts at the bottom since they are already in Layout.astro
bodyContent = bodyContent.split('<script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery')[0];

// Handle braces in HTML to prevent Astro JSX parsing errors
bodyContent = bodyContent.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');

const pageAstro = `---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Harrison - Webflow Ecommerce website template">
${bodyContent}
</Layout>
`;

fs.writeFileSync('src/pages/index.astro', pageAstro);
console.log('Successfully generated src/pages/index.astro');
