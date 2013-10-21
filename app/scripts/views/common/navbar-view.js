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
        "text!templates/common/navbar-tmpl.html"],
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
                this.render();
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
    }
);
