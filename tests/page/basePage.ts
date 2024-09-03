import {Page} from '@playwright/test'
export class BasePage {
    private readonly _page: Page;

    constructor(page: Page) {
        this._page = page;
    }

    loadPage = async (url: string) => {
        await this._page.goto(url);
    }

    typeInLocator = async (location: string, value: string) => {
        await this._page.locator(location).fill(value);
    }

    typeByPlaceHolder = async (placeholder: string, value: string) => {
        await this._page.getByPlaceholder(placeholder).fill(value);
    }

    clicOnByLocator = async (location: string) => {
        await this._page.locator(location).click();
    }

    clicOnByText = async (text: string) => {
        await this._page.getByText(text).click();
    }

    waitForPage = async (url: string) => {
        await this._page.waitForURL(url);
    }


}