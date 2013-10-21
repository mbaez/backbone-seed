
/**
 * Se encarga de manejar el alamacenamiento de datos en de forma global
 * en la sesión.
 *
 * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
 */
Backbone.Cache = {
    /**
     * Variable que almacena datos en memoria
     * @type Object
     * @field
     */
    memory : {},

    /**
     * Se encarga de añadir un elemento.
     * @function
     *
     * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
     * @param {String}key el identificador del elemento.
     * @param {Object}value el valor a añadir.
     */
    set: function(key, value){
        this.memory[key] = value;
    },

    /**
     * Se encarga de eliminar un elemento de la variable de memoria.
     * @function
     *
     * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
     * @param {String}key el identificador del elemento.
     */
    remove : function(key){
        this.memory[key] = null;
        this.memory[key] = undefined;
    },

    /**
     * Se encarga de verificar si el elmento ya se encuentra en la
     * variable de memoria.
     * @function
     *
     * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
     * @param {String}key el identificador del elemento.
     * @return {Boolean} True si el elemento ya existe. En caso contrario
     * retorna False.
     */
    contains : function(key){
        return (typeof this.memory[key] != 'undefined');
    },

    /**
     * Se encarga de obtener el valor de un elemento de la variable de memoria.
     * @function
     *
     * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
     * @param {String}key el identificador del elemento.
     * @return {Object} el value de asociado al key.
     */
    get : function(key){
        return this.memory[key];
    },

    /**
     * Se encarga de añadir un elemento en un array. Si el atributo ya
     * existe y no es un array se encarga de crear un array y añadir el
     * elemento ya existente al array, si no existe el atrributo lo crea
     * y añade el elemnto al array.
     * @function
     *
     * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
     * @param {String}key el identificador del elemento.
     * @param {Object}value el valor a añadir.
     */
    append : function (key, value){
        //si no existe el atrributo lo crea
        if(typeof this.memory[key] == "undefined"){
            this.memory[key] = [];
        }

        //si el atributo no es un array se encarga de crear un array
        // y añadir el elemento ya existente al array.
        if(! this.memory[key] instanceof Array){
            var tmp = this.memory[key];
            this.memory[key] = [tmp];
        }
        //añade el value al array
        this.memory[key].push(value);
    },
    /**
     * Se encarga de eliminar todos los atributos de la variable de memoria.
     * Aplica un remove a todos los elementos.
     * @function
     *
     * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
     */
    clear : function(){
        this.memory = null;
        for(var key in this.memory){
            this.remove(key);
        }
        this.memory = {};
    }
}
