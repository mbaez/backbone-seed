/**
 * Inicializador de la página
 * @class
 * @author
 * @name PageTemplate
 */
define(['backbone',
        //se carga el template del page
        "text!pages/home.html",
        //se cargan los models y collections
        //se cargan los views y templates
        'scripts/views/common/navbar-view',
        'scripts/views/group1/table-view',
        ],
    function (Backbone, template,
            //se cargan los models y collections
            // se incluyen los views y los templates
            NavbarView, TableView) {
    "use strict";
    return  Backbone.Page.extend({
        /**
         * Tempalte de la página actual.
         * @type String
         * @field
         * @name template
         */
        template : _.template(template,{}),

        /**
         * Este metodo se encarga de inicializar el page
         * @function
         *
         * @public
         * @name #initialize
         * @author
         */
        initialize: function(options){
            this.$el.html(this.template);
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
            var view = new NavbarView({el : $("#page-header")});
            var view = new TableView({el : $("#user-table")});
            // se retorna el json que contiene los metodos de los eventos
            return this;
        }
    });
});
