import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreLocalizerService } from '../../Core/Localization/localizer.service';

@Injectable()
export class LocalizerService extends CoreLocalizerService {

    protected AddOrUpdateStrings() {

        this._strings["ru-RU"]["RequiredX"] = "Поле {0} обязательно";
        this._strings["en-US"]["RequiredX"] = "{0} required";

        this._strings["ru-RU"]["Users"] = "Пользователи";
        this._strings["en-US"]["Users"] = "Users";
    }
}