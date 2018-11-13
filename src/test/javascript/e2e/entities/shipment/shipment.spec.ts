/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ShipmentComponentsPage, ShipmentDeleteDialog, ShipmentUpdatePage } from './shipment.page-object';

const expect = chai.expect;

describe('Shipment e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let shipmentUpdatePage: ShipmentUpdatePage;
    let shipmentComponentsPage: ShipmentComponentsPage;
    /*let shipmentDeleteDialog: ShipmentDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Shipments', async () => {
        await navBarPage.goToEntity('shipment');
        shipmentComponentsPage = new ShipmentComponentsPage();
        expect(await shipmentComponentsPage.getTitle()).to.eq('appApp.shipment.home.title');
    });

    it('should load create Shipment page', async () => {
        await shipmentComponentsPage.clickOnCreateButton();
        shipmentUpdatePage = new ShipmentUpdatePage();
        expect(await shipmentUpdatePage.getPageTitle()).to.eq('appApp.shipment.home.createOrEditLabel');
        await shipmentUpdatePage.cancel();
    });

    /* it('should create and save Shipments', async () => {
        const nbButtonsBeforeCreate = await shipmentComponentsPage.countDeleteButtons();

        await shipmentComponentsPage.clickOnCreateButton();
        await promise.all([
            shipmentUpdatePage.setTrackingCodeInput('trackingCode'),
            shipmentUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            shipmentUpdatePage.setDetailsInput('details'),
            shipmentUpdatePage.invoiceSelectLastOption(),
        ]);
        expect(await shipmentUpdatePage.getTrackingCodeInput()).to.eq('trackingCode');
        expect(await shipmentUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
        expect(await shipmentUpdatePage.getDetailsInput()).to.eq('details');
        await shipmentUpdatePage.save();
        expect(await shipmentUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await shipmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last Shipment', async () => {
        const nbButtonsBeforeDelete = await shipmentComponentsPage.countDeleteButtons();
        await shipmentComponentsPage.clickOnLastDeleteButton();

        shipmentDeleteDialog = new ShipmentDeleteDialog();
        expect(await shipmentDeleteDialog.getDialogTitle())
            .to.eq('appApp.shipment.delete.question');
        await shipmentDeleteDialog.clickOnConfirmButton();

        expect(await shipmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
