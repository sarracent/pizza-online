/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PizzaCategoryComponentsPage, PizzaCategoryDeleteDialog, PizzaCategoryUpdatePage } from './pizza-category.page-object';

const expect = chai.expect;

describe('PizzaCategory e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let pizzaCategoryUpdatePage: PizzaCategoryUpdatePage;
    let pizzaCategoryComponentsPage: PizzaCategoryComponentsPage;
    let pizzaCategoryDeleteDialog: PizzaCategoryDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load PizzaCategories', async () => {
        await navBarPage.goToEntity('pizza-category');
        pizzaCategoryComponentsPage = new PizzaCategoryComponentsPage();
        expect(await pizzaCategoryComponentsPage.getTitle()).to.eq('appApp.pizzaCategory.home.title');
    });

    it('should load create PizzaCategory page', async () => {
        await pizzaCategoryComponentsPage.clickOnCreateButton();
        pizzaCategoryUpdatePage = new PizzaCategoryUpdatePage();
        expect(await pizzaCategoryUpdatePage.getPageTitle()).to.eq('appApp.pizzaCategory.home.createOrEditLabel');
        await pizzaCategoryUpdatePage.cancel();
    });

    it('should create and save PizzaCategories', async () => {
        const nbButtonsBeforeCreate = await pizzaCategoryComponentsPage.countDeleteButtons();

        await pizzaCategoryComponentsPage.clickOnCreateButton();
        await promise.all([pizzaCategoryUpdatePage.setNameInput('name'), pizzaCategoryUpdatePage.setDescriptionInput('description')]);
        expect(await pizzaCategoryUpdatePage.getNameInput()).to.eq('name');
        expect(await pizzaCategoryUpdatePage.getDescriptionInput()).to.eq('description');
        await pizzaCategoryUpdatePage.save();
        expect(await pizzaCategoryUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await pizzaCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last PizzaCategory', async () => {
        const nbButtonsBeforeDelete = await pizzaCategoryComponentsPage.countDeleteButtons();
        await pizzaCategoryComponentsPage.clickOnLastDeleteButton();

        pizzaCategoryDeleteDialog = new PizzaCategoryDeleteDialog();
        expect(await pizzaCategoryDeleteDialog.getDialogTitle()).to.eq('appApp.pizzaCategory.delete.question');
        await pizzaCategoryDeleteDialog.clickOnConfirmButton();

        expect(await pizzaCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
