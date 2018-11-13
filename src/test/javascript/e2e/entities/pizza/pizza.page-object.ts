import { element, by, ElementFinder } from 'protractor';

export class PizzaComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-pizza div table .btn-danger'));
    title = element.all(by.css('jhi-pizza div h2#page-heading span')).first();

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

export class PizzaUpdatePage {
    pageTitle = element(by.id('jhi-pizza-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    descriptionInput = element(by.id('field_description'));
    priceInput = element(by.id('field_price'));
    pizzatypeSelect = element(by.id('field_pizzatype'));
    imageInput = element(by.id('file_image'));
    pizzaCategorySelect = element(by.id('field_pizzaCategory'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setPriceInput(price) {
        await this.priceInput.sendKeys(price);
    }

    async getPriceInput() {
        return this.priceInput.getAttribute('value');
    }

    async setPizzatypeSelect(pizzatype) {
        await this.pizzatypeSelect.sendKeys(pizzatype);
    }

    async getPizzatypeSelect() {
        return this.pizzatypeSelect.element(by.css('option:checked')).getText();
    }

    async pizzatypeSelectLastOption() {
        await this.pizzatypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setImageInput(image) {
        await this.imageInput.sendKeys(image);
    }

    async getImageInput() {
        return this.imageInput.getAttribute('value');
    }

    async pizzaCategorySelectLastOption() {
        await this.pizzaCategorySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async pizzaCategorySelectOption(option) {
        await this.pizzaCategorySelect.sendKeys(option);
    }

    getPizzaCategorySelect(): ElementFinder {
        return this.pizzaCategorySelect;
    }

    async getPizzaCategorySelectedOption() {
        return this.pizzaCategorySelect.element(by.css('option:checked')).getText();
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

export class PizzaDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-pizza-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-pizza'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
