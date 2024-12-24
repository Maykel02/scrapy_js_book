const { chromium } = require('playwright');
const fs = require('fs/promises');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(
    'https://www.buscalibre.pe/libro-the-art-of-haikyu-endings-and-beginnings/9781974733538/p/54247360'
  );

  /* const name = await page.locator('h3').allTextContents(); */

  // recuperando el titulo
  const titleBook = await page.locator('.tituloProducto').first().textContent();

  //recuperando el ISBN
  const isbn = await page.locator('#metadata-isbn13').textContent();
  const isbnBook = isbn.trim();

  //recuperando el presetation
  const presBook = await page.locator('.ficha .box ').nth(1).textContent();

  //recuperando img
  const imgBoook = await page.locator('#imgPortada ').getAttribute('src');

  //recuperando el numero de paginas
  const nPage = await page.locator('.ficha .box').nth(11).textContent();
  const mumPage = nPage.trim();

  //recuperando dimencion
  const dimBook = await page.locator('.ficha .box').nth(15).textContent();
  const dimeBook = dimBook.trim();

  //recuperando gender
  const genBook = await page.$$eval('.ficha .box a', (anchors) => {
    return anchors.map((anchor) => anchor.textContent.trim());
  });

  /* const genderBook = genBook.trim(); */

  /* const nameJson = JSON.stringify(name, null, 2); */
  /* await fs.writeFile('./names.json', nameJson, 'utf-8'); */

  console.log(genBook);
  await browser.close();
})();
