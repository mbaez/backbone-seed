/**
 * Inicializador de la página
 * @class
 * @author
 * @name PageTemplate
 */
define(['libs/jquery',
        'libs/underscore',
        'libs/backbone',
        'libs/security',
        //se carga el template del page
        "text!pages/page.html",
        //se cargan los models y collections
        //se cargan los views y templates
        'scripts/views/common/ViewSidebar'
        ],
    function ($,_,Backbone,SecurityJS, template,
            //se cargan los models y collections
            // se incluyen los views y los templates
            ViewSidebar) {
    "use strict";
    return  Backbone.Page.extend({
        /**
         * Tempalte de la página actual.
         * @type String
         * @field
         * @name template
         */
        template : template,

        /**
         * Este metodo se encarga de inicializar el page
         * @function
         *
         * @public
         * @name #initialize
         * @author
         */
        initialize: function(options){
            this.open();
            this.render();
        },

        /**
         * Este metodo se encarga de renderizar los views del page
         * @function
         *
         * @public
         * @name #render
         * @author
         */
        render : function(){
            ////Se verifica el contexto de la aplicación
            var sjs = new SecurityJS();
            var sidebar = new ViewSidebar({el : $("#float-sidebar")});
            // se retorna el json que contiene los metodos de los eventos
            return this;
        }
    });
});
