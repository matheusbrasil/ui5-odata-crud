sap.ui.define([
	"ovly/odata/crud/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"ovly/odata/crud/model/formatter"
], function (BaseController, JSONModel, formatter) {
	"use strict";

	return BaseController.extend("ovly.odata.crud.controller.Empty", {

		formatter: formatter,

		onInit: function () {
			this._oFuncaoModel = new JSONModel([]);
			this.setModel(this._oFuncaoModel, "funcao");
		},

		onChange: function (oEvent) {
			var oParameters = oEvent.getParameters();
			var value = oParameters.value;

			var oModel = this.getModel();
			var sFunction = "/GetProductsByRating";
			var oSettings = {
				method: "GET",
				urlParameters: {
					rating: value
				},
				success: function (oResponse) {
					this._oFuncaoModel.setProperty("/", oResponse);
				}.bind(this),
				error: function (oError) {

				}.bind(this)
			};

			// chamar function import
			oModel.callFunction(sFunction, oSettings);

		}
	});

});