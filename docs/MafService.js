/**
 * Created by Jim on 2016/5/26.
 */
huaxiaModule.factory('MafService', ['Action',
	function (action) {
		return {
			//  登录服务接口，假设： SJC300001 表示登录交易
			doSJC300001: function (dc) {
				dc.addHeaderAttribute("transCode", "security_login");
				action.send({
					url: "/techcomp/security/inbound/securityIbd!commonMethod.action",
					dc: dc,
					// 上行报文
					requestMapping: {
						headTag: "head",
						bodyTag: "body",
						head: {
							"transCode": {
								"label": "  交易码 ",
								"type": "string"
							}
						},
						body: {
							"username": {
								"label": "  用户名 ",
								"type": "string"
							},
							"password": {
								"label": "  密码 ",
								"type": "string"
							},
							"verifycode": {
								"label": "  验证码 ",
								"type": "string"
							}
						}
					},
					// 下行报文
					responseMapping: {
						"returnCode": "#head.returnCode",
						"successCode": "000000",
						"systemExceptionCode": "999999",
						"exceptionMessage": "#head.exceptionMsg",
						headTag: "head",
						bodyTag: "body",
						head: {
							"transCode": {
								"label": "  交易码 ",
								"type": "string"
							},
							"returnCode": {
								"label": "  返回码 ",
								"type": "string"
							},
							"exceptionMsg": {
								"label": "  异常信息 ",
								"type": "string"
							}
						},
						body: {}
					},
					loadSuccessed: this.view.loginSuccess,
					loadFailed: this.view.loginError,
					token: false
				});
			},
			//  登出服务接口
			doSJC300002: function (dc, name) {
				//...
			},
			//  其他交易接口
		};
	}]);

huaxiaModule.factory('MafService.formValidation.doSJC300001', function () {
	var columns = {};
	columns.username = {
		"prompts": {
			"required": "  请输入用户名 ",
			"maxLength": "  最大长度不能超过 255  个字符。 ",
			"pattern": "  用户名必须以字母开始 "
		},
		"required": "required",
		"maxLength": 255,
		"pattern": /^[a-z]+.*$/i
	};
	columns.password = {};
	columns.verifycode = {
		"prompts": {
			"required": "请输入验证码",
			"pattern": "验证码只能包含数字和字母"
		},
		"required": true,
		"maxLength": 10,
		"minLength": 4,
		"pattern": /^[a-z]+.*$/i
	};
	return {
		getColumns: columns
	};
});
huaxiaModule.factory('MafService.formValidation.doSJC300002', function () {
	var columns = {};
	columns.password = {
		"prompts": {
			"required": "请输入hello",
			"maxLength": "最大长度不能超过 255个字符。",
			"pattern": "用户名必须以字母开始"
		},
		"required": "required",
		"maxLength": 255,
		"pattern": /^[a-z]+.*$/i
	};
	return {
		getColumns: columns
	};
});

huaxiaModule.directive('formValidation', ['MafService.formValidation.doSJC300001', 'ngToast',
	function (formValidation, ngToast) {
		return {
			restrict: 'A',
			link: function (scope, element, attributes, controller) {
				var columns = formValidation.getColumns;
				var result = true;
				for (column in columns) {
					//var columns[column] = columns[column];
					var ele = $(element).children().find('[name="' + column + '"]');

					ele.on('blur', function(evt){
						var target = $(evt.target);
						scope.$apply(function(){
							var value = $(target).val();
							var name = $(target).attr('name');
							var validationParams = columns[name];
							var prompt = '';
							for (param in validationParams) {
								switch (param) {
									case 'prompts':
										result = true;
										break;
									case 'required':
										if (!value) {
											result = false;
											prompt = validationParams['prompts']['required'];
											break;
										}
									case 'maxLength':
										if (value.length > validationParams['maxLength']) {
											result = false;
											prompt = validationParams['prompts']['maxLength'];
											break;
										}
									case 'pattern':
										if (!validationParams['pattern'].test(value)) {
											result = false;
											prompt = validationParams['prompts']['pattern'];
											break;
										}
								}

								if (!result) {
									ngToast.create({
										content: prompt,
										className: 'danger'
									});

									return false;
								}
							}
						});
					});
				}
			}
		};
	}]);