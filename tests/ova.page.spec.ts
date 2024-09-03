import { test, expect } from '@playwright/test';
import { OvaPage } from './page/ovaPage';
import { OvaLocators } from './constants/ovaLocators';

test.describe('OVA WEB', async () => {

  
  test('OVA Basics TEST', async ({page}) => {
    const ovaPage = new OvaPage(page);

    await test.step('Log in User', async () => {
      await ovaPage.loadPage("https://ova.arssenasa.gob.do/login");
      await ovaPage.typeInLocator(OvaLocators.Login.InputNoDocumento, process.env.USUARIO as string);
      await ovaPage.typeInLocator(OvaLocators.Login.InputClave, process.env.CLAVE as string);
      await ovaPage.clicOnByText("Ingresar");
      await ovaPage.waitForPage("https://ova.arssenasa.gob.do/");
      await ovaPage.clicOnByLocator(OvaLocators.home.BtnClosePopup);
    })

    await test.step('Check welcome screen', async () => {
      await ovaPage.checkWelcomeInPage();
    })

    await test.step('Navigate to profile', async () => {
      await ovaPage.clicOnByLocator(OvaLocators.home.BtnLogoPerfilUsuario);
      await ovaPage.clicOnByText("Ver perfil");
      await ovaPage.waitForPage("https://ova.arssenasa.gob.do/profile"); 
    })

    await test.step('Checking titles in profile page', async () => {
      await ovaPage.checkElementInPage("Datos personales");
      await ovaPage.checkElementInPage("Datos de afiliación");
      await ovaPage.checkElementInPage("Datos de contacto y localización");
    })

  })

  test('OVA AUTH TEST', async ({page}) => {
    test.skip();
    const ovaPage = new OvaPage(page);

    await test.step('Clic on forget password', async () => {
      await ovaPage.loadPage("https://ova.arssenasa.gob.do/login");
      await ovaPage.clicOnByText("¿Olvidaste tu contraseña?");
      await page.locator('form').filter({has: page.locator("input[name='noDocumento']")}).fill(process.env.USUARIO as string)
      //await ovaPage.typeInLocator("html/body/div[2]/div[3]/div/div/form/div/div[3]/div/input", );
      await ovaPage.typeByPlaceHolder("Correo electrónico", process.env.CORREO as string);
      await ovaPage.clicOnByText("Enviar");
      await page.pause();
    })
  })

})