sap.ui.define([
	"ovly/odata/crud/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (BaseController, JSONModel, MessageToast, MessageBox) {
	"use strict";

	return BaseController.extend("ovly.odata.crud.controller.CategoriaCadastro", {

		onInit: function () {
			this._oViewModel = new JSONModel({
				editMode: false
			});
			this.setModel(this._oViewModel, "view");

			this.getRouter().getRoute("categoriaCadastroNova")
				.attachPatternMatched(this.onPatternMatchedNew, this);

			this.getRouter().getRoute("categoriaCadastroEditar")
				.attachPatternMatched(this.onPatternMatchedEdit, this);
		},

		onPatternMatchedNew: function (oEvent) {
			this._oViewModel.setProperty("/editMode", false);
			this._clearForm();
			this._idCategoria = null;
		},

		onPatternMatchedEdit: function (oEvent) {
			var oParameters = oEvent.getParameters();
			var oArguments = oParameters.arguments;
			var sIdCategoria = oArguments.idCategoria;
			// this._idCategoria = sIdCategoria;

			this._oViewModel.setProperty("/editMode", true);
			this._clearForm();

			// this.getModel().metadataLoaded().then(function () {

			// 	var sKey = this.getModel().createKey("Categories", {
			// 		ID: sIdCategoria
			// 	});

			// 	this.getView().bindElement({
			// 		path: "/" + sKey
			// 	});

			// }.bind(this));
		},

		onSave: function (oEvent) {
			var bEditMode = this._oViewModel.getProperty("/editMode");
			if (bEditMode) {
				this._update();
			} else {
				this._create();
			}
		},

		onCancel: function () {
			this._back();
		},

		_back: function () {
			this.getRouter().navTo("default");
		},

		_create: function () {
			function onSuccess(oNovaCategoria) {
				MessageToast.show("Categoria cadastrada com sucesso", {
					closeOnBrowserNavigation: false
				});
				this.getRouter().navTo("categoriaDetalhe", {
					idCategoria: oNovaCategoria.ID
				});
			}

			function onError(oError) {
				MessageBox.error("Erro na criação da categoria");
			}

			var mParameters = {
				success: onSuccess.bind(this),
				error: onError.bind(this)
			}

			var oCategoriaNova = this._getCategoriaUsingIds();

			// this.getModel().create(
			// 	"/Categories",
			// 	oCategoriaNova,
			// 	mParameters);
		},

		_update: function () {
			this.getModel().metadataLoaded().then(function () {

				var sPath = this.getModel().createKey("Categories", {
					ID: this._idCategoria
				});

				function onSuccess(oResult) {
					MessageToast.show("Categoria atualizada com sucesso", {
						closeOnBrowserNavigation: false
					});
					this.getRouter().navTo("categoriaDetalhe", {
						idCategoria: this._idCategoria
					});
				}

				function onError(oError) {
					MessageBox.error("Erro na criação da categoria");
				}

				var mParameters = {
					success: onSuccess.bind(this),
					error: onError.bind(this)
				}

				var oCategoria = this._getCategoriaUsingIds();

				// this.getModel().update(
				// 	"/" + sPath,
				// 	oCategoria,
				// 	mParameters);

			}.bind(this));
		},

		_getCategoriaUsingIds: function () {
			var oCategoria = {};
			oCategoria.ID = this.byId("id").getValue();
			oCategoria.Name = this.byId("name").getValue();

			return oCategoria;
		},

		_clearForm: function () {
			this.byId("id").setValue();
			this.byId("name").setValue();
		}

	});

});