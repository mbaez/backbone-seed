/**
 * Define el módulo Page que extiende de Backbone.View. Un Page
 * es un contenedor de alto nivel que contiene multiples views.
 * <br/>
 * Un page cuenta básicamente con 2 estados : <br/>
 * <ul><li>
 *  <b>Open<b> : Cuando el page esta activo y siendo utilizado
 *  todos los eventos se ecuentran asociados al page en este estado.
 * </li>
 * <li>
 *  <b>Close</b> : El page en este estado no cuenta con eventos
 *  asociados.
 * </li> </ul>
 * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
 */
Backbone.Page = Backbone.View.extend({});
_.extend(Backbone.Page.prototype, {


    /**
     * Este método se encarga de desasociar todos los eventos del
     * page actual.
     * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
     */
    close : function(){
        this.undelegateEvents();
        this.$el.removeData().unbind();
        this.$el.html("");
        //se abortan las petiones del page
        this.abort();
    },

    /**
     * Se encarga de, desasociar los eventos de los modelos y collections
     * que realizaron peticiones via fetch y save, y abortar todas las
     * peticiones xhr que aún se encuentran en curso.
     * @function
     * @public
     *
     * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
     */
    abort : function(){
        //se obtienen todas las referencias a los models y collections
        var collector =  Backbone.Cache.get('collector');
        if(typeof collector != "undefined"){
            for(var i =0; i< collector.length; i++){
                var modColl = collector[i];
                // remueve los handlers de los eventos
                modColl.off('ready');
                modColl.off('error');
            }
            //se eliminan las referencias al collector
            Backbone.Cache.remove('collector');
        }
        // se obtienen todas las peticiones xhr realizadas
        var peticionesXhr =  Backbone.Cache.get('xhr');
        if(typeof peticionesXhr != "undefined"){
            // se abortan todas las peticiones
            for(var i =0; i< peticionesXhr.length; i++){
                var xhr = peticionesXhr[i];
                //si la peticion no fue ready, se aborta
                if(xhr.readyState > 0 && xhr.readyState < 4){
                    xhr.abort();
                }
            }
            //se eliminan las peticiones xhr de la sesion
            Backbone.Cache.remove('xhr');
        }
    }
});
