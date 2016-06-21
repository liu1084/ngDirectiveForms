/**
 * Created by neusoft on 2016/4/7.
 */

var BASEURL = 'http://localhost:8080/framework';
var _serviceToken = '';
var huaxiaModule = angular.module('huaxia', ['ngToast']);
huaxiaModule.config(['ngToastProvider', function(ngToast) {
		ngToast.configure({
			verticalPosition: 'top',
			horizontalPosition: 'center'
		});
	}]);
// serviceToken变量（交易请求）
var _getServiceToken = function (arr) {
	if (!arr && arr.length == 0) {
		return;
	}
	var path = BASEURL + "/techcomp/ria/tokenProcessor!commonMethod.action";
	var baseArgs = {
		url: path,
		success: function (dc) {
			//var dataCenter = new DataCenter(dc);
			//_serviceToken = dataCenter.getParameter('_token');// 设置tokenValue为全局的变量
		},
		error: function (xhr) {
			_serviceToken = "";
		}
	};
	var dc = new DataCenter();
	dc.setParameter("serviceIds", arr.join(','));
	jQuery.ajax(
			jQuery.extend(baseArgs, {
				sync: true
			}), dc, false);
};

huaxiaModule.constant('BASEURL', 'http://localhost:8080/framework');
huaxiaModule.constant('LOGINURL', '/techcomp/security/inbound/securityIbd!commonMethod.action');
huaxiaModule.constant('SIGNATUREURL', '/techcomp/ria/signatureProcessor!commonMethod.action');
huaxiaModule.constant('TIMEOUT', 120000);
huaxiaModule.constant('PUBLICKEY', '8527a1b98d6791b63a82367737c35afe3b506d83e7252883f0979b801a59b0393dbe17e44ee66167cae2c04fa1aa47c50051591340a8d45c3d4c8e39e6da27589a6cef86d289bbc119a66c2753be796980e5a97afcb8dd1728ca34551dd6109c7df384d54b0bbeedfa34c7fa6fe74684a4af374b3ed03ebbf63a838588d35f13');
huaxiaModule.constant('TOKEN_PROCESSOR', '/techcomp/ria/tokenProcessor!commonMethod.action');
huaxiaModule.constant('TOKEN_SERVICES', ['SJC300002']);
huaxiaModule.constant('MULTIPLE_TOKEN_SERVICES', ['SJC300000']);
huaxiaModule.run(function(TOKEN_SERVICES){
	_getServiceToken(TOKEN_SERVICES);
});