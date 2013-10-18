
/**
 * Se configuran las dependencias de los módulo con requierejs
 */
requirejs.config({
    baseUrl: '/mimundo/',
    paths: {
        'text' : 'libs/backbone/text',
        'jquery' : 'libs/jquery/jquery',
        'pnotify' : 'libs/jquery/jquery.pnotify.min',
        'backbone' : 'libs/backbone/backbone',
        'underscore' : 'libs/backbone/underscore',
        'backbone.extend' : 'scripts/common/backbone.extend'
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

        'backbone.extend': {
            deps: ['jquery','backbone','pnotify'],
            exports: 'BackboneExtend'
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

require(["underscore",
         'backbone',
         'backbone.extend'
    ],
    function(_, Backbone, BackboneExtend){
        Setup.sync();
        //se instancia el router de la aplicación.
        // se inicializa el historial
        Backbone.history.start();
    }
);

