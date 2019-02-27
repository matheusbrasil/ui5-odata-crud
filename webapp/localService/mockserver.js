sap.ui.define([
	"sap/ui/core/util/MockServer"
], function (MockServer) {
	"use strict";

	return {

		init: function () {

			var oMockServer = new MockServer({
				rootUri: "/ODATA_SAMPLE/V2/(S(matheus))/OData/OData.svc/"
			});

			oMockServer.simulate("localService/metadata.xml", {
				sMockdataBaseUrl: "localService/mockdata",
				bGenerateMissingMockData: true
			});

			oMockServer.start();

			jQuery.sap.log.info("Running the app with mock data");
		}

	};

});