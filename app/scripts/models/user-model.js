/**
 * Modelo utlizado para obtener los datos del club personal.
 * Retorna la clase, no una instancia.
 *
 * @class
 * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
 * @name models.UserModel
 */
define(["backbone"], function (Backbone) {

    return Backbone.Model.extend({
        /**
         * Url de la cual se obtiene el recurso.
         * @function
         * @name models.UserModel#url
         * @retruns {String} Un cadena que representa la url del recurso
         */
        url : function () {
            return MyApp.RESTBaseUrl + MyApp.RESTVersion + '/user.json';
        }
    });
});
