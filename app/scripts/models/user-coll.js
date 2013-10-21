/**
 * Collection de lineas asociadas al cliente
 * Retorna la clase, no una instancia.
 *
 * @class
 * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
 * @name models.UserColl
 */
define(["backbone",
        "scripts/models/user-model"],
    function (Backbone,Model) {

    return Backbone.Collection.extend({
        model : Model,
        /**
         * Url de la cual se obtiene el recurso.
         * @function
         * @name models.UserColl#url
         * @retruns {String} Un cadena que representa la url del recurso
         */
        url : function () {
            return MyApp.RESTBaseUrl + MyApp.RESTVersion + '/user-demo.json';
        }

    });
});
