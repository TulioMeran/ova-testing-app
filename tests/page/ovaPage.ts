import { Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class OvaPage extends BasePage {
    private readonly _ovaPage: Page;
    constructor(page: Page){
        super(page);
        this._ovaPage = page;
    }

    checkWelcomeInPage = async () => {
     expect(await this._ovaPage.getByText(/Bienvenido,/)).toBeVisible();
    }

    checkElementInPage = async (text: string) => {
        await this._ovaPage.getByText(text).waitFor();
        expect(this._ovaPage.getByText(text)).toBeTruthy();
    }
    
}