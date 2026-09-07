const fs = require('fs');

const urls = [
  'https://www.naikfoods.co.in/in/products/little-millet-noodles',
  'https://www.naikfoods.co.in/in/products/jowar-palak-khakhra',
  'https://www.naikfoods.co.in/in/products/shevga-soup',
  'https://www.naikfoods.co.in/in/products/aaswad-mitha-paan',
  'https://www.naikfoods.co.in/in/products/shree-moongbhaji-atta',
  'https://www.naikfoods.co.in/in/products/sawai-kolhapuri-misal-rassa-masala',
  'https://www.naikfoods.co.in/in/products/prakash-masale-kolhapuri-paneer-maratha-masala',
  'https://www.naikfoods.co.in/in/products/jaylaxmi-misal-farsan',
  'https://www.naikfoods.co.in/in/products/hillers-hakka-noodles',
  'https://www.naikfoods.co.in/in/products/red-joy-schezwan-coin-khakhra'
];

async function run() {
  const results = [];
  for (const url of urls) {
    try {
      const res = await fetch(url);
      const text = await res.text();

      // Extract title
      const titleMatch = text.match(/<title>([^<]+)<\/title>/);
      const title = titleMatch ? titleMatch[1].replace(/ \| Naik Foods.*$/, '').trim() : '';

      // Extract price if available
      const priceMatch = text.match(/₹\s*([0-9]+(?:\.[0-9]+)?)/);
      const price = priceMatch ? parseFloat(priceMatch[1]) : 0;

      // Extract image URL
      let imageUrl = null;
      const encodedMatch = text.match(/https%3A%2F%2Fres\.cloudinary\.com%2F[a-zA-Z0-9\/_.-]+(?:\.jpg|\.png|\.jpeg|\.webp)/i);
      if (encodedMatch) {
        imageUrl = decodeURIComponent(encodedMatch[0]);
      } else {
        const directMatch = text.match(/https:\/\/res\.cloudinary\.com\/[a-zA-Z0-9\/_.-]+(?:\.jpg|\.png|\.jpeg|\.webp)/i);
        if (directMatch) {
          imageUrl = directMatch[0];
        }
      }

      results.push({ url, title, price, image: imageUrl });
      console.log(`Found: [${title}] -> ${imageUrl}`);
    } catch (err) {
      console.error(`Error fetching ${url}:`, err.message);
    }
  }

  fs.writeFileSync('extracted_products.json', JSON.stringify(results, null, 2));
  console.log('Saved to extracted_products.json');
}

run();
