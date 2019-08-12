import { Component, OnInit } from '@angular/core';

@Component({
})
export class CoreLanguageComponent implements OnInit {
    
    _message: string = null;
    _lang: string = "ru-RU";

    constructor()
    {        
    }

    public ngOnInit() {
        if (localStorage.getItem("lang")) {
            this._lang = localStorage.getItem("lang");
        }
    }

    public changeLanguage() {
        this._message = null;
        try {
            localStorage.setItem('lang', this._lang);
        }
        catch (e) {
            this._message = e.error;
        }
    }    
}