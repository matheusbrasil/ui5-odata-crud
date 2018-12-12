/*global history */
sap.ui.define([
	"ovly/odata/crud/controller/BaseController",
	"ovly/odata/crud/model/formatter"
], function (BaseController, formatter) {
	"use strict";

	return BaseController.extend("ovly.odata.crud.controller.Categorias", {

		formatter: formatter,

		onInit: function () {

		},

		onItemPress: function (oEvent) {
			var oListItem = oEvent.getParameters().listItem;
			var oContext = oListItem.getBindingContext();
			var oCategory = oContext.getObject();

			this.getRouter().navTo("categoriaDetalhe", {
				idCategoria: oCategory.ID
			});
		},

		onAdd: function (oEvent) {
			this.getRouter().navTo("categoriaCadastroNova");
		},

		onEdit: function (oEvent) {
			var oContext = oEvent.getSource().getBindingContext();
			var sIdCategoria = oContext.getProperty("ID");
			
			this.getRouter().navTo("categoriaCadastroEditar", {
				idCategoria: sIdCategoria
			});
		}

	});
});