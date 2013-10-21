/**
 * View para
 * @class
 * @author
 * @name ViewTemplate
 */
define(["jquery",
        "underscore",
        "backbone",
        //el template del view.
        "text!templates/Tmpl.html"],
    function($,_,Backbone,tmpl) {
    return Backbone.View.extend({

        /**
         * Constructor de la clase
         * @function
         *
         * @name #initialize
         * @param options {Object}
         */
        initialize : function(options) {
            //si tiene permitido cargar este view
            this.on('allowed', this.allowed, this);
            this.setup(options);
        },
        /**
         * Json que mapea los eventos a los handlers
         * @field
         * @type Object
         * @name #events
         */
        events:{},
        /**
         * Si posee los permisos para cargar el view, se configuran
         * los eventos y se realizan las peticiones para obtener los
         * datos.
         * @function
         *
         * @name #allowed
         * @param options {Object}
         */
        allowed : function(options) {
            this.data = options;
            /**
            this.collection.on('ready', this.render, this);
            this.collection.on('error', this.error, this);
            this.collection.on('fetch', this.loading, this);
            this.collection.fetch(Backbone.Callback);
            */
            //si son models
            /**
            this.model.on('ready', this.render, this);
            this.model.on('error', this.error, this);
            this.model.on('fetch', this.loading, this);
            this.model.fetch(Backbone.Callback);
            */
        },

        /**
         * Este metodo se encarga de renderizar el view
         * @function
         *
         * @public
         * @name #render
         * @author
         */
        render: function () {
            var compTmpl = _.template(tmpl,{});
            this.$el.html(compTmpl);
            return this;
        }
    });
});
