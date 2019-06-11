import { Injectable } from '@angular/core';

@Injectable()
export class CoreLocalizerService {

    private _lang: string = "ru-RU";
    protected _strings: { [language: string]: { [text: string]: string; } } = {};

    constructor() {
        this.CreateStrings();
        this.AddOrUpdateStrings();
    }

    public localize(text: string): string {
        if (localStorage.getItem("lang")) {
            this._lang = localStorage.getItem("lang");
        }
        if (!this._strings[this._lang])
            return text;
        if (!this._strings[this._lang][text])
            return text;

        return this._strings[this._lang][text];
    }

    public localizeWithValues(text: string, ...values: string[]): string {
        if (localStorage.getItem("lang")) {
            this._lang = localStorage.getItem("lang");
        }
        if (!this._strings[this._lang])
            return text;
        if (!this._strings[this._lang][text])
            return text;

        var text = this._strings[this._lang][text];
        values.forEach(function (value, index) { text = text.replace("{" + index + "}", value); });
        return text;
    }

    private CreateStrings() {
        this._strings["ru-RU"] = {};
        this._strings["en-US"] = {};

        this._strings["ru-RU"]["Yes"] = "Да";
        this._strings["en-US"]["Yes"] = "Yes";

        this._strings["ru-RU"]["No"] = "Нет";
        this._strings["en-US"]["No"] = "No";

        this._strings["ru-RU"]["Loading"] = "Загрузка...";
        this._strings["en-US"]["Loading"] = "Loading...";

        this._strings["ru-RU"]["Error"] = "Ошибка: {0}";
        this._strings["en-US"]["Error"] = "Error: {0}";

        this._strings["ru-RU"]["FieldRequired"] = "Поле обязательно";
        this._strings["en-US"]["FieldRequired"] = "Field required";

        this._strings["ru-RU"]["RequiredX"] = "Укажите {0}";
        this._strings["en-US"]["RequiredX"] = "{0} required";

        this._strings["ru-RU"]["ImportFileNull"] = "Файл импорта не выбран";        
        this._strings["en-US"]["ImportFileNull"] = "File to import not selected";

        this._strings["ru-RU"]["ImportSuccess"] = "Данные успешно импортированы";
        this._strings["en-US"]["ImportSuccess"] = "Data successfully imported";

        this._strings["ru-RU"]["PassResetSuccess"] = "Пароль успешно изменен";
        this._strings["en-US"]["PassResetSuccess"] = "Password successfully changed";

        this._strings["ru-RU"]["PassChangeSuccess"] = "Пароль успешно изменен";
        this._strings["en-US"]["PassChangeSuccess"] = "Password successfully changed";

        this._strings["ru-RU"]["EditSuccess"] = "Изменения успешно сохранены";
        this._strings["en-US"]["EditSuccess"] = "Data successfully saved";
        
        this._strings["ru-RU"]["PrevPage"] = "Предыдущая";
        this._strings["en-US"]["PrevPage"] = "Previous";

        this._strings["ru-RU"]["NextPage"] = "Следующая";
        this._strings["en-US"]["NextPage"] = "Next";

        this._strings["ru-RU"]["PageXofY"] = "Страница {0} из {1}";
        this._strings["en-US"]["PageXofY"] = "Page {0} of {1}";

        this._strings["ru-RU"]["ExcelExport"] = "Экспортировать все страници в Excel";
        this._strings["en-US"]["ExcelExport"] = "Export all pages to excel";

        this._strings["ru-RU"]["Id"] = "Id";
        this._strings["en-US"]["Id"] = "Id";

        this._strings["ru-RU"]["Edit"] = "Редактировать";
        this._strings["en-US"]["Edit"] = "Edit";

        this._strings["ru-RU"]["Delete"] = "Удалить";
        this._strings["en-US"]["Delete"] = "Delete";

        this._strings["ru-RU"]["Create"] = "Создать";
        this._strings["en-US"]["Create"] = "Create";

        this._strings["ru-RU"]["Save"] = "Сохранить";
        this._strings["en-US"]["Save"] = "Save";

        this._strings["ru-RU"]["Filter"] = "Фильтр";
        this._strings["en-US"]["Filter"] = "Filter";

        this._strings["ru-RU"]["Apply"] = "Применить";
        this._strings["en-US"]["Apply"] = "Apply";

        this._strings["ru-RU"]["Cancel"] = "Отменить";
        this._strings["en-US"]["Cancel"] = "Cancel";

        this._strings["ru-RU"]["BackToList"] = "Вернуться к списку";
        this._strings["en-US"]["BackToList"] = "Back to list";

        this._strings["ru-RU"]["SetNewPassButton"] = "Установить новый пароль";
        this._strings["en-US"]["SetNewPassButton"] = "Set new password";

        this._strings["ru-RU"]["ToggleNavButton"] = "Скрыть меню";
        this._strings["en-US"]["ToggleNavButton"] = "Toggle navigation";

        this._strings["ru-RU"]["ImportButton"] = "Импорт";
        this._strings["en-US"]["ImportButton"] = "Import";

        this._strings["ru-RU"]["ImportTemplate"] = "Шаблон импорта";
        this._strings["en-US"]["ImportTemplate"] = "Import template";

        this._strings["ru-RU"]["ImportSubmit"] = "Сохранить";
        this._strings["en-US"]["ImportSubmit"] = "Save";

        this._strings["ru-RU"]["OrderBy"] = "Сортировать по";
        this._strings["en-US"]["OrderBy"] = "Sort by";

        this._strings["ru-RU"]["OrderBy.AscendingX"] = "{0} (возрастанию)";
        this._strings["en-US"]["OrderBy.AscendingX"] = "{0} (ascending)";

        this._strings["ru-RU"]["OrderBy.DescendingX"] = "{0} (убыванию)";
        this._strings["en-US"]["OrderBy.DescendingX"] = "{0} (descending)";

        this._strings["ru-RU"]["Default"] = "По умолчанию";
        this._strings["en-US"]["Default"] = "Default";

        this._strings["ru-RU"]["DeleteSelected"] = "Удалить выбранные";
        this._strings["en-US"]["DeleteSelected"] = "Delete selected";

        this._strings["ru-RU"]["CheckAllButton"] = "Выбрать все";
        this._strings["en-US"]["CheckAllButton"] = "Check all";

        this._strings["ru-RU"]["LogInButton"] = "Войти";
        this._strings["en-US"]["LogInButton"] = "LogIn";

        this._strings["ru-RU"]["LogOutButton"] = "Выйти";
        this._strings["en-US"]["LogOutButton"] = "LogOut";

        this._strings["ru-RU"]["PasswordLabel"] = "Пароль";
        this._strings["en-US"]["PasswordLabel"] = "Password";        

        this._strings["ru-RU"]["CurrentPasswordLabel"] = "Текущий пароль";
        this._strings["en-US"]["CurrentPasswordLabel"] = "Current password";

        this._strings["ru-RU"]["NewPasswordLabel"] = "Новый пароль";
        this._strings["en-US"]["NewPasswordLabel"] = "New password";

        this._strings["ru-RU"]["LoginHeader"] = "Войти";
        this._strings["en-US"]["LoginHeader"] = "Login";

        this._strings["ru-RU"]["ChangePassButton"] = "Изменить пароль";
        this._strings["en-US"]["ChangePassButton"] = "Change password";

        this._strings["ru-RU"]["ChangePassHeader"] = "Смена пароля";
        this._strings["en-US"]["ChangePassHeader"] = "Change password";

        this._strings["ru-RU"]["LoginLabel"] = "Логин";
        this._strings["en-US"]["LoginLabel"] = "Login";

        this._strings["ru-RU"]["UserName"] = "Имя пользователя";
        this._strings["en-US"]["UserName"] = "User name";

        this._strings["ru-RU"]["Role"] = "Роль";
        this._strings["en-US"]["Role"] = "Role";

        this._strings["ru-RU"]["ClearFilter"] = "Очистить";
        this._strings["en-US"]["ClearFilter"] = "Clear";
    }

    protected AddOrUpdateStrings() {

    }
}