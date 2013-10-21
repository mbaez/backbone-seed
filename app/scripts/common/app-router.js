
/**
 * Define el mecanismo para manejar las multiples páginas.
 */
Backbone.AppRouter = Backbone.Router.extend({
    routes: {
        "*actions": "handler"
    },
    /**
     * Este atributo hace referencia al Page actual, su valor
     * inicial es null.
     */
    current : null,

    /**
     * Handler genérico de los paths de la url. Se encarga de
     * cargar el page correspondiente.
     * @param {Object}action el path de la url que se encuentra
     *          luego del #
     */
    handler : function(action){
        // referencia a si mismo
        var thiz = this;

        // Se cargar el page correspondiente
        require(['scripts/pages/' + action ],
            function(Page) {
                if(thiz.current != null){
                    //se cierra el page porque se cargará uno nuevo
                    thiz.current.close();
                }
                //se instancia el nuevo page
                thiz.current = new Page({el : $('#page-body')});
            }
        );
    }
});
