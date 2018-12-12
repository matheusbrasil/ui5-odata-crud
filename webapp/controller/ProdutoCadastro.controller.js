sap.ui.define([
	"ovly/odata/crud/controller/BaseController",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (BaseController, MessageToast, MessageBox) {
	"use strict";

	return BaseController.extend("ovly.odata.crud.controller.ProdutoCadastro", {

		onInit: function () {
			this.getRouter().getRoute("produtoCadastro")
				.attachPatternMatched(this.onPatternMatched, this);
		},

		onNavBack: function () {
			this.getRouter().navTo("default");
		},

		onPatternMatched: function (oEvent) {
			var oParameters = oEvent.getParameters();
			var oArguments = oParameters.arguments;
			var sIdCategoria = oArguments.idCategoria;
			var oModel = this.getModel();

			this._idCategoria = sIdCategoria;

			var oPromiseMetadataLoaded = this.getModel().metadataLoaded();
			oPromiseMetadataLoaded.then(function () {

				// this._oContext = oModel.createEntry("/Products", {
				// 	Category: sIdCategoria
				// });

				// this.getView().setBindingContext(this._oContext);

			}.bind(this));
		},

		onSave: function () {

			function onSuccess(oNovaCategoria) {
				MessageToast.show("Produto cadastrado com sucesso", {
					closeOnBrowserNavigation: false
				});
				this._back();
			}

			function onError(oError) {
				MessageBox.error("Erro na criação da categoria");
			}

			// this.getModel().submitChanges({
			// 	success: onSuccess.bind(this),
			// 	error: onError.bind(this)
			// });
		},

		onCancel: function (oEvent) {
			// this.getModel().deleteCreatedEntry(this._oContext);
			this._back();
		},

		_back: function () {
			this.getRouter().navTo("categoriaDetalhe", {
				idCategoria: this._idCategoria
			});
		}
	});

});