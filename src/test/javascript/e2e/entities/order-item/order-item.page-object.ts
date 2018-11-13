import { element, by, ElementFinder } from 'protractor';

export class OrderItemComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-order-item div table .btn-danger'));
    title = element.all(by.css('jhi-order-item div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class OrderItemUpdatePage {
    pageTitle = element(by.id('jhi-order-item-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    quantityInput = element(by.id('field_quantity'));
    totalPriceInput = element(by.id('field_totalPrice'));
    statusSelect = element(by.id('field_status'));
    pizzaSelect = element(by.id('field_pizza'));
    orderSelect = element(by.id('field_order'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setQuantityInput(quantity) {
        await this.quantityInput.sendKeys(quantity);
    }

    async getQuantityInput() {
        return this.quantityInput.getAttribute('value');
    }

    async setTotalPriceInput(totalPrice) {
        await this.totalPriceInput.sendKeys(totalPrice);
    }

    async getTotalPriceInput() {
        return this.totalPriceInput.getAttribute('value');
    }

    async setStatusSelect(status) {
        await this.statusSelect.sendKeys(status);
    }

    async getStatusSelect() {
        return this.statusSelect.element(by.css('option:checked')).getText();
    }

    async statusSelectLastOption() {
        await this.statusSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async pizzaSelectLastOption() {
        await this.pizzaSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async pizzaSelectOption(option) {
        await this.pizzaSelect.sendKeys(option);
    }

    getPizzaSelect(): ElementFinder {
        return this.pizzaSelect;
    }

    async getPizzaSelectedOption() {
        return this.pizzaSelect.element(by.css('option:checked')).getText();
    }

    async orderSelectLastOption() {
        await this.orderSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async orderSelectOption(option) {
        await this.orderSelect.sendKeys(option);
    }

    getOrderSelect(): ElementFinder {
        return this.orderSelect;
    }

    async getOrderSelectedOption() {
        return this.orderSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class OrderItemDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-orderItem-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-orderItem'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
