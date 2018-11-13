/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PizzaComponentsPage, PizzaDeleteDialog, PizzaUpdatePage } from './pizza.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Pizza e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let pizzaUpdatePage: PizzaUpdatePage;
    let pizzaComponentsPage: PizzaComponentsPage;
    let pizzaDeleteDialog: PizzaDeleteDialog;
    const fileNameToUpload = 'logo-jhipster.png';
    const fileToUpload = '../../../../../main/webapp/content/images/' + fileNameToUpload;
    const absolutePath = path.resolve(__dirname, fileToUpload);

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Pizzas', async () => {
        await navBarPage.goToEntity('pizza');
        pizzaComponentsPage = new PizzaComponentsPage();
        expect(await pizzaComponentsPage.getTitle()).to.eq('appApp.pizza.home.title');
    });

    it('should load create Pizza page', async () => {
        await pizzaComponentsPage.clickOnCreateButton();
        pizzaUpdatePage = new PizzaUpdatePage();
        expect(await pizzaUpdatePage.getPageTitle()).to.eq('appApp.pizza.home.createOrEditLabel');
        await pizzaUpdatePage.cancel();
    });

    it('should create and save Pizzas', async () => {
        const nbButtonsBeforeCreate = await pizzaComponentsPage.countDeleteButtons();

        await pizzaComponentsPage.clickOnCreateButton();
        await promise.all([
            pizzaUpdatePage.setNameInput('name'),
            pizzaUpdatePage.setDescriptionInput('description'),
            pizzaUpdatePage.setPriceInput('5'),
            pizzaUpdatePage.pizzatypeSelectLastOption(),
            pizzaUpdatePage.setImageInput(absolutePath),
            pizzaUpdatePage.pizzaCategorySelectLastOption()
        ]);
        expect(await pizzaUpdatePage.getNameInput()).to.eq('name');
        expect(await pizzaUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await pizzaUpdatePage.getPriceInput()).to.eq('5');
        expect(await pizzaUpdatePage.getImageInput()).to.endsWith(fileNameToUpload);
        await pizzaUpdatePage.save();
        expect(await pizzaUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await pizzaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Pizza', async () => {
        const nbButtonsBeforeDelete = await pizzaComponentsPage.countDeleteButtons();
        await pizzaComponentsPage.clickOnLastDeleteButton();

        pizzaDeleteDialog = new PizzaDeleteDialog();
        expect(await pizzaDeleteDialog.getDialogTitle()).to.eq('appApp.pizza.delete.question');
        await pizzaDeleteDialog.clickOnConfirmButton();

        expect(await pizzaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
