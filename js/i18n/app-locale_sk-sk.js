"use strict";angular.module("appLocale",[],["$provide",function(E){E.value("locale",{MESSAGES:{ALCOHOL_CALCULATOR:"Alkohol kalkula\u010dka",DRINK_PRESETS:"Predvo\u013eby drinkov",SETTINGS:"Nastavenia",ABOUT:"O aplikacii",ABOUT_MSG:"Some text in slovak...",ALCOHOL_CONTENT:"Obsah alkoholu",SOBER_AT:"Triezvy o",SOBER_FOR:"Triezvy",NO_DRINKS:"\u017diadne drinky",NO_DRINKS_THIS_MONTH:"\u017diadne drinky za posledn\xfd mesiac",LOAD_MORE_RECORDS:"Na\u010d\xedta\u0165 da\u013e\u0161ie",START_ADDING_THEM_NOW:"Za\u010dnite s ich prid\xe1van\xedm",ADD_NEW_DRINK:"Vytvorenie nov\xe9ho drinku",EDIT_DRINK:"Upravi\u0165 drink",ADD_DRINK:"Prida\u0165 drink",UPDATE:"Zmeni\u0165",DONE:"Hotovo",TIME:"\u010cas",DATE:"D\xe1tum",DRINK_OPTIONS:"Vo\u013eby drinku",SELECT_PRESET:"Zvo\u013ete predvo\u013ebu drinku",DRINK_NAME:"N\xe1zov drinku",VOLUME_ML:"Objem (ml)",ALCOHOL_CONTENT_PERCENT:"Obsah alkoholu (%)",SAVE_AS_PRESET:"Ulo\u017ei\u0165 ako predvo\u013ebu",DELETE:"Odstr\xe1ni\u0165",SELECT_DRINK:"Zvo\u013ete drink",CANCEL:"Zru\u0161i\u0165",ADD_PRESET:"Prida\u0165 predvo\u013ebu",EDIT_PRESET:"Upravi\u0165 predvo\u013ebu",NO_DRINK_PRESETS:"\u017diadne predvo\u013eby drinkov",ADD_NEW_DRINK_PRESET:"Vytvorenie novej predo\u013eby drinku",WEIGHT:"Hmotnos\u0165",WEIGHT_KG:"Hmotnos\u0165 (kg)",GENER:"Pohlavie",MAN:"Mu\u017e",WOMAN:"\u017dena",DRINK_PRESET_WAS_CREATED:"Predvo\u013eba drinku bola vytvoren\xe1",DRINK_PRESET_WITH_NAME_EXISTS:"U\u017e existuje predvo\u013eba drinku s rovnm\xfdm n\xe1zvom",AND:"a",INSTALL:"In\u0161talova\u0165",INSTALL_SUCCESS:"In\u0161tal\xe1cia bola \xfaspe\u010dn\xe1",INSTALL_FAILED:"In\u0161tal\xe1cia zlyhala"},PLURALS:{DAY_ONE:"de\u0148",DAY_FEW:"dni",DAY_MANY:"dn\xed",HOUR_ONE:"hodinu",HOUR_FEW:"hodiny",HOUR_MANY:"hod\xedn",MINUTE_ONE:"min\xfatu",MINUTE_FEW:"min\xfaty",MINUTE_MANY:"min\xfat"},getPlural:function(E,_){var o;return 1===E&&(o="_ONE"),E>1&&3>=E&&(o="_FEW"),(E>3||0===E)&&(o="_MANY"),this.PLURALS[_+o]}})}]);