/**
 * @namespace Contiene los metodos utilizados en la aplicación.
 */
var MyApp = {};


MyApp.baseURL = "";
MyApp.RESTBaseUrl = '/backbone-seed/';
MyApp.RESTVersion = "";


/**
 * Se configuran las dependencias de los módulo con requierejs
 */
requirejs.config({
    baseUrl: '/backbone-seed/',
    paths: {
        'text' : 'libs/require/text',
        //~ jquery y sus plugins
        'jquery' : 'libs/jquery/jquery',
        'pnotify' : 'libs/jquery/jquery.pnotify.min',
        //~ backbone y sus plugins
        'backbone' : 'libs/backbone/backbone',
        'underscore' : 'libs/backbone/underscore',
        //~ bootstrap y sus plugins
        'bootstrap' : 'libs/bootstrap/bootstrap.min'
    },
    waitSeconds: 15,
    shim: {
        'underscore': {
            exports: '_'
        },

        'jquery': {
            exports: '$'
        },

        'pnotify': {
            deps: ['jquery'],
            exports: 'Pnotify'
        },

        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },

        'bootstrap': {
            deps: ['jquery'],
            exports: 'Bootstrap'
        },

        'scripts/common/backbone.extend': {
            deps: ['jquery','backbone','pnotify',
                'scripts/common/backbone.cache'],
            exports: 'BackboneExtend'
        },

        'scripts/common/backbone.page': {
            deps: ['scripts/common/backbone.extend'],
            exports: 'BackbonePage'
        },

        'scripts/common/backbone.cache': {
            deps: ['backbone'],
            exports: 'BackboneCache'
        },

        'scripts/common/app-router': {
            deps: ['scripts/common/backbone.extend',
                'scripts/common/backbone.page' ],
            exports: 'AppRouter'
        }
    }
});

/**
 * Se añade el handler de error de requierejs. Se ivoca a este método
 * cuando no se pudo cargar una dependencia.
 *
 * @author <a href="mxbg.py@gmail.com">Maximiliano Báez</a>
 */
requirejs.onError = function (err) {
    console.error(err);
};

require(['scripts/common/app-router', 'bootstrap'], function(){
        Setup.sync();
        //se instancia el router de la aplicación.
        var router = new Backbone.AppRouter();
        // se inicializa el historial
        Backbone.history.start();
    }
);

