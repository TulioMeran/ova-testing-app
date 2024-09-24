import { test } from '@playwright/test';
import { OvaLocators } from "../../constants/ovaLocators";
import { OvaPage } from "../ovaPage";

export const ovaBasic = async (page, vuContext, events, test) => {
    const ovaPage = new OvaPage(page);
   
     //output current metrics
     events.emit("counter", `user.${vuContext.scenario.name}.counter`, 1)

    await test.step("LOGIN", async () => {
        await ovaPage.loadPage("https://ova.arssenasa.gob.do");
        await ovaPage.typeInLocator(OvaLocators.Login.InputNoDocumento, process.env.USUARIO as string);
        await ovaPage.typeInLocator(OvaLocators.Login.InputClave, process.env.CLAVE as string);
        await ovaPage.clicOnByText("Ingresar");
        await ovaPage.waitForPage("https://ova.arssenasa.gob.do/");
        await ovaPage.clicOnByLocator(OvaLocators.home.BtnClosePopup);
        await ovaPage.checkWelcomeInPage();
    })


    await test.step("CHECK PROFILE", async () => {
        await ovaPage.clicOnByLocator(OvaLocators.home.BtnLogoPerfilUsuario);
        await ovaPage.clicOnByText("Ver perfil");
        await ovaPage.waitForPage("https://ova.arssenasa.gob.do/profile"); 
    
        await ovaPage.checkElementInPage("Datos personales");
        await ovaPage.checkElementInPage("Datos de afiliación");
        await ovaPage.checkElementInPage("Datos de contacto y localización");
    })
   
}