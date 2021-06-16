const facebookAccount = require("./facebookIds.js");

/**
 * @param {import("puppeteer").Page} page
 * `[aria-label="Créer une publication"][role="region"] div [role="button"][tabindex="0"] [class="a8c37x1j ni8dbmo4 stjgntxs l9j0dhe7"]`
 *
 * @returns {Promise<>}
 */
module.exports = async (page) => {
  return new Promise(async (resolve) => {
    await page.goto("https://facebook.com", {
      waitUntil: "networkidle2"
    });

    const loginInputSelector = 'input[type="text"]';
    const passwordInputSelector = 'input[type="password"]';
    await page.waitForSelector(loginInputSelector);
    await page.waitForSelector(passwordInputSelector);

    await page.evaluate(
      (login, password, loginInputSelector, passwordInputSelector) => {
        document.querySelector(loginInputSelector).value = login;
        document.querySelector(passwordInputSelector).value = password;
      },
      facebookAccount.login,
      facebookAccount.password,
      loginInputSelector,
      passwordInputSelector
    );


    await page.waitForTimeout(1000);
    const submitButtonSelector = '[type="submit"]';
    await page.waitForSelector(submitButtonSelector);
    await page.click(submitButtonSelector);

    await page.waitForTimeout(5000); 
    resolve(true);
  });
};
 