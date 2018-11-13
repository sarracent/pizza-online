/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PizzaOrderComponentsPage, PizzaOrderDeleteDialog, PizzaOrderUpdatePage } from './pizza-order.page-object';

const expect = chai.expect;

describe('PizzaOrder e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let pizzaOrderUpdatePage: PizzaOrderUpdatePage;
    let pizzaOrderComponentsPage: PizzaOrderComponentsPage;
    /*let pizzaOrderDeleteDialog: PizzaOrderDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load PizzaOrders', async () => {
        await navBarPage.goToEntity('pizza-order');
        pizzaOrderComponentsPage = new PizzaOrderComponentsPage();
        expect(await pizzaOrderComponentsPage.getTitle()).to.eq('appApp.pizzaOrder.home.title');
    });

    it('should load create PizzaOrder page', async () => {
        await pizzaOrderComponentsPage.clickOnCreateButton();
        pizzaOrderUpdatePage = new PizzaOrderUpdatePage();
        expect(await pizzaOrderUpdatePage.getPageTitle()).to.eq('appApp.pizzaOrder.home.createOrEditLabel');
        await pizzaOrderUpdatePage.cancel();
    });

    /* it('should create and save PizzaOrders', async () => {
        const nbButtonsBeforeCreate = await pizzaOrderComponentsPage.countDeleteButtons();

        await pizzaOrderComponentsPage.clickOnCreateButton();
        await promise.all([
            pizzaOrderUpdatePage.setPlacedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            pizzaOrderUpdatePage.statusSelectLastOption(),
            pizzaOrderUpdatePage.setCodeInput('code'),
            pizzaOrderUpdatePage.customerSelectLastOption(),
        ]);
        expect(await pizzaOrderUpdatePage.getPlacedDateInput()).to.contain('2001-01-01T02:30');
        expect(await pizzaOrderUpdatePage.getCodeInput()).to.eq('code');
        await pizzaOrderUpdatePage.save();
        expect(await pizzaOrderUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await pizzaOrderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last PizzaOrder', async () => {
        const nbButtonsBeforeDelete = await pizzaOrderComponentsPage.countDeleteButtons();
        await pizzaOrderComponentsPage.clickOnLastDeleteButton();

        pizzaOrderDeleteDialog = new PizzaOrderDeleteDialog();
        expect(await pizzaOrderDeleteDialog.getDialogTitle())
            .to.eq('appApp.pizzaOrder.delete.question');
        await pizzaOrderDeleteDialog.clickOnConfirmButton();

        expect(await pizzaOrderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
