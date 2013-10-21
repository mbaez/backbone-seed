/**
 * View para
 * @class
 * @author
 * @name ViewTemplate
 */
define(["jquery",
        "underscore",
        "backbone",
        //~ models y collections
        'scripts/models/user-coll',
        //el template del view.
        "text!templates/group1/table-tmpl.html"],
    function($,_,Backbone,
        //~ models y collections
        UserColl,
        //~ template
        tmpl) {
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
        events:{
            "click a#buscar-datos" : "onBuscarDatos"
        },
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
            this.collection =  new UserColl();
            this.collection.on('ready', this.render, this);
            this.collection.on('error', this.error, this);
            this.collection.on('fetch', this.loading, this);
            this.collection.fetch(Backbone.Callback);
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
            var data = {};
            data.collection = this.collection.toJSON();
            var compTmpl = _.template(tmpl,{data : data});
            this.$el.html(compTmpl);
            return this;
        },

        /**
         * Handler del evento click del boton de busqueda.
         * @function
         *
         * @public
         * @name #onBuscarDatos
         * @author
         */
        onBuscarDatos : function(){
            this.alert({
                mensaje : "Buscar Datos!!",
                type : 'info'
            });

        }
    });
});
