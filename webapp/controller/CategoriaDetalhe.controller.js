/*global location */
sap.ui.define([
	"ovly/odata/crud/controller/BaseController",
	"ovly/odata/crud/model/formatter"
], function (BaseController, formatter) {
	"use strict";
	return BaseController.extend("ovly.odata.crud.controller.CategoriaDetalhe", {

		formatter: formatter,

		onInit: function () {
			this.getRouter().getRoute("categoriaDetalhe")
				.attachPatternMatched(this.onPatternMatched, this);
		},

		onNavBack: function () {
			this.getRouter().navTo("default");
		},

		onAdd: function (oEvent) {
			this.getRouter().navTo("produtoCadastro", {
				idCategoria: this._idCategoria
			});
		},

		onDelete: function (oEvent) {

		},

		onPatternMatched: function (oEvent) {
			var oParameters = oEvent.getParameters();
			var oArguments = oParameters.arguments;
			var sIdCategoria = oArguments.idCategoria;
			this._idCategoria = sIdCategoria;

			var oPromiseMetadataLoaded = this.getModel().metadataLoaded();
			oPromiseMetadataLoaded.then(function () {

				var sKey = this.getModel().createKey("Categories", {
					ID: sIdCategoria
				});

				this.getView().bindElement({
					path: "/" + sKey
				});

			}.bind(this));
		}

	});
});