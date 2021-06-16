 
/**
 * @param {import("puppeteer").Page} page
 * `[aria-label="Créer une publication"][role="region"] div [role="button"][tabindex="0"] [class="a8c37x1j ni8dbmo4 stjgntxs l9j0dhe7"]`
 *
 * @returns {Promise<>}
 */
module.exports = async (page,url ,post) => {
  return new Promise(async (resolve) => {
    
    await page.goto(url {
      waitUntil: "networkidle2"
    });
 
    divAreaPost = '[role="button"][tabindex="0"][class="_4g34 _6ber _78cq _7cdk _5i2i _52we"] div'
    await page.waitForSelector(divAreaPost);
    await page.click(divAreaPost);


 
 
    await page.waitForTimeout(3000);

    const textarea = "textarea"
    await page.waitForSelector(textarea);

    await page.evaluate(
      (link, textarea) => {
        document.querySelector(textarea).value = link;
      },
      post, textarea
    );


    await page.waitForTimeout(10000);



    const subPost = 'button[type="submit"][value="Publier"]';
    console.log('we click on ------>  subPost:')

    const rect = await page.evaluate((subPost) => {
      const element = document.querySelectorAll(subPost)[1];
      if (!element) {
        return null;
      }
      const {
        x,
        y
      } = element.getBoundingClientRect();
      return {
        x,
        y
      };
    }, subPost);

    if (rect) {
      await page.mouse.click(rect.x, rect.y, {
        clickCount: 3
      });
    } else {
      console.error("Element Not Found");
    }


    resolve(true);
  });
};
 