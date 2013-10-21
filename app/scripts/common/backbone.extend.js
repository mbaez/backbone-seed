
/**
 * Handler base de los
 * <a href="http://backbonejs.org/#Collection-fetch">collection</a> y
 * <a href ="http://backbonejs.org/#Model-fetch">models de backbone</a>,
 * se utiliza para implementar el patron ready de backbone.
 *
 *
 * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
 */
Backbone.Callback = {
    /**
     * Handler del success de una petición, dispara el evento `ready` para
     * que sea manejado por el objeto de origen.
     *
     * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
     */
    success : function(target,response,options){
        var params ={};
        params.target =  target;
        params.response = response;
        params.options = options;
        //se cachean los datos
        if(this.cache != false){
            Backbone.Cache.set(target.url(), params);
        }
        //~ Se dispara el evento ready
        target.trigger('ready',params);
    },

    /**
     * Handler del error de una petición, dispara el evento `error` para
     * que sea manejado por el objeto de origen.
     *
     * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
     */
    error : function(target, xhr, options){
        var resp = {}
        resp.target = target;
        resp.xhr = xhr;
        resp.options = options;
        //~ Se dispara el evento error
        target.trigger('error', resp);
    }
}


/**
 * Se encarga de constuir un alert configurable para el view.
 * @function
 * @public
 *
 * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
 */
Backbone.View.prototype.alert = function(options){
    var titleType = {
        error : "Error",
        success : "Operaci\u00f3n exitosa",
        warning: "Atenci\u00f3n",
        info : "Aviso"
    };
    //se construye el alert
    $.pnotify({
        title: titleType[options.type],
        text: options.mensaje,
        type : options.type,
        sticker: false,
        closer_hover: false,
        shadow : false,
        history: false,
        animation: {
            effect_in: 'show',
            effect_out: 'show'
        }
    });
};

/**
 * Se encarga de desplegar el mensaje de error del view.
 * @function
 * @public
 *
 * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
 */
Backbone.View.prototype.error = function(data){
    var mensaje = "Error genérico";
    //se construye el alert
    this.alert({
        mensaje : mensaje,
        type : "error"
    });
};

/**
 * Sobreescribe el metodo fetch para que dispare el evento fetch
 * @function
 * @public
 *
 * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
 */
// Patch Model and Collection.
_.each(["Model", "Collection"], function(name) {
    // Cache Backbone constructor.
    var clazz = Backbone[name];
    // Cache original fetch.
    var super_fetch = clazz.prototype.fetch;
    var super_save = clazz.prototype.save;

    // Override the fetch method to emit a fetch event.
    clazz.prototype.fetch = function() {
        var key = this.url();
        // Trigger the fetch event on the instance.
        this.trigger("fetch", this);
        if(this.cache != false && Backbone.Cache.contains(key)){
            //se obtiene el valor de memoria
            var cacheData = Backbone.Cache.get(key);
            //se setan los atributos la objeto actual
            if(typeof this.models != "undefined"){
                this.add(cacheData.data.toJSON());
            }else{
                this.set(cacheData.data.toJSON());
            }
            var thiz = this;
            //se añade un timeout para que se pueda hacer bind de los
            //handlers
            setTimeout(function(){
                //se dispara el evento ready
                thiz.trigger('ready', cacheData);
            }, 200);
            return;
        }
        // Pass through to original fetch.
        var xhr = super_fetch.apply(this, arguments);
        //se encarga de recolectar datos del objeto para utilizarlos en
        //el abort de page
        Backbone.Cache.append('xhr', xhr);
        Backbone.Cache.append('collector', this);
        return xhr;
    };
});

/**
 * Se encarga de implementar los fetch por páginas para los collections
 * de backbone.
 * @function
 * @public
 *
 * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
 */
Backbone.Collection.prototype.pagination = function() {

    if(typeof this.pagerBaseUrl == "undefined"){
        this.pagerBaseUrl = this.url();
    }

    if(typeof this.pagina == "undefined"){
        this.pagina = 1;
    }

    if(typeof this.registros == "undefined"){
        this.registros = 10;
    }
    var baseUrl = this.pagerBaseUrl;
    //se sobrescribe la url para obtner la página solicitada
    this.inicio = (this.pagina - 1) * this.registros;
    this.url = function(){
        var and = "?";
        if(baseUrl.indexOf("?") >= 0 ){
            and = "&";
        }
        return baseUrl+ and +"registros="+this.registros +"&inicio="+this.inicio;
    }
    //se realiza el fetch a la url actualizada
    return this.fetch(Backbone.Callback);
};

/**
 * Se encarga de verificar si existe el $el correspondiente al view.
 * Su objetivo es evitar que se los collection/models realicen un
 * fetch si es que no existe el `$el` correspondiente. Si el `$el`
 * existe dispara el evento `allowed`, en caso contrario dispara el
 * evento `forbidden`
 * @function
 * @public
 *
 * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
 */
Backbone.View.prototype.setup = function(options){
    var event = 'forbidden';
    //si posee el elemento
    if(this.$el.length > 0){
        event = 'allowed';
    }
    //se dispara el evento
    this.trigger(event, options);
};
/**
 * Este método se encarga de desasociar todos los eventos del
 * view actual.
 * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
 */
Backbone.View.prototype.close = function(options){
    this.undelegateEvents();
    this.$el.removeData().unbind();
};

/**
 * Namespace que contiene los métodos para configurar la aplicación.
 * @namespace
 */
Setup = {
    /**
     *Método utilizado para obtener el valor de un objeto de Backbone como
     * una función o una propiedad.
     * @function
     * @private
     */
    getValue : function(object, prop) {
      if (!(object && object[prop])) return null;
      return _.isFunction(object[prop]) ? object[prop]() : object[prop];
    },

    /**
     * Dispara una excepción cuando se requiere la URL y no fue establecida.
     * Es aplicable a los models y collections de backbone.
     * @function
     * @private
     */
    urlError : function() {
        throw new Error('Debe proveer una URL');
    },

    /**
     * Se encarga de construir el json que contiene los headers base que la
     * aplicación necesita.
     * @function
     * @private
     *
     * @return {Object} Un objeto con los headers correspondientes.
     */
    getBaseHeaders : function(){
        var headers = {};
        return headers;
    },

    /**
     * Sobre-escribir el método de comunicación al servidor de manera a introducir
     * en la cabecera datos de la sesión.
     * @function
     * @public
     *
     * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
     */
    sync : function(){
        Backbone.sync = function(method, model, options) {
            // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
            var methodMap = {
                'create': 'POST',
                'update': 'PUT',
                'delete': 'DELETE',
                'read':   'GET'
            };
            //se obtiene el tipo de petición a realizar
            var type = methodMap[method];

            // Default options, unless specified.
            options || (options = {});

            // Default JSON-request options.
            var params = {type: type, dataType: 'json'};

            // Ensure that we have a URL.
            if (!options.url) {
              params.url = Setup.getValue(model, 'url') || Setup.urlError();
            }

            // Ensure that we have the appropriate request data.
            if (!options.data && model && (method == 'create' || method == 'update')) {
              params.contentType = 'application/json';
              params.data = JSON.stringify(model.toJSON());
            }

            // For older servers, emulate JSON by encoding the request into an HTML-form.
            if (Backbone.emulateJSON) {
              params.contentType = 'application/x-www-form-urlencoded';
              params.data = params.data ? {model: params.data} : {};
            }

            // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
            // And an `X-HTTP-Method-Override` header.
            if (Backbone.emulateHTTP) {
              if (type === 'PUT' || type === 'DELETE') {
                if (Backbone.emulateJSON) {
                    params.data._method = type;
                }

                params.type = 'POST';
                params.beforeSend = function(xhr) {
                    xhr.setRequestHeader('X-HTTP-Method-Override', type);
                };
              }
            }

            // Don't process data on a non-GET request.
            if (params.type !== 'GET' && !Backbone.emulateJSON) {
              params.processData = false;
            }

            params.headers = Setup.getBaseHeaders();
            /*
             * Se añade el parametro para que no se cacheen las peticiones
             * ajax.
             */
            params.cache = false;
            // Make the request, allowing the user to override any Ajax options.
            return $.ajax(_.extend(params, options));
        };
    }
}
