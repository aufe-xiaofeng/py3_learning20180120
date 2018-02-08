 var PFS = PFS || {};
 var pfs = PFS;

 pfs.comm = {
 		
 	///////////////////////////////////////////////////////////////////////////////////////////
 	//以下关于公共变量和方法的定义//////////////////////////////////////////////////////////////////////
 	///////////////////////////////////////////////////////////////////////////////////////////
 	path:'',
 	basePath:'',
 	user:null,
 	org:null,
 	roles:null,
 	morg:null,
 	photo:'',
 	gwlb:'',
 	dzzw:'',
 	dzzwm:'',
 	groupList:[],
 	uaaapBasePath:'',
 	uaaapProperties:'',
 	ajaxSubmitForm:function(formselector, opts){//ajax提交表单
		
		 //使用ajax提交form
		var defaultOpts = {
	        type: "POST",
	        dataType:'json',
	        error: function (req, txtStatus) {
	        	pfs.comm.showDialog('保存失败');
	        }
		};
		var params = $.extend(true, {}, defaultOpts, opts);
		$(formselector).ajaxSubmit(params);
		
	},
	
	//加密
	encodeStr : function(code){ //对字符串进行加密      
		
			var c=String.fromCharCode(code.charCodeAt(0)+code.length);  
			for(var i=1;i<code.length;i++)  
			{        
			   c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));  
			 }     
			c = new Base64().encode(c)
			return new Base64().encode(escape(c));   
	}, 
	
	//解密
	//字符串进行解密   
	decodeStr : function(code){
		
		code=new Base64().decode(unescape(new Base64().decode(code)));        
		var c=String.fromCharCode(code.charCodeAt(0)-code.length);        
		for(var i=1;i<code.length;i++)  
		{        
		 c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));        
		}        
		return c;   
	 }, 


	//设置cookie
	setCookie : function(key, value, isLongTime){
		
		try {
			
			if(key){
				
				key += 'pfs';
				key = pfs.comm.encodeStr(key);
			}
			if(value){
				
				value += 'pfs';
				value = pfs.comm.encodeStr(value);
			}
			
			if(isLongTime == false){
				
				$.cookie(key, value, { expires: -1 });
			}else{
				
				//默认存一周
				$.cookie(key, value, { expires: 7 });
			}
		} catch (e) {
			
		}
	},

	//获取cookie
	getCookie : function(key){
		
		try {
			
			if(key){
				
				key += 'pfs';
				key = pfs.comm.encodeStr(key);
			}
			var rts = $.cookie(key);
			if(rts){
			
				rts = pfs.comm.decodeStr(rts);
				rts = rts.substring(0, rts.length - 3);
			}
			
			return rts;
		} catch (e) {
			return '';
		}
	},
	
 	getUniqueId:function(){

 		var myDate = new Date();
 		var r1 = Math.floor((Math.random()*10)*10)+1;
 		var r2 = Math.floor((Math.random()*10)*10)+2;
 		var r3 = Math.floor((Math.random()*10)*10)+3;
 		return myDate.getTime()+'_'+(r1*r2*3);
 	},
 	getHelloInfo:function(){//组装当前用户欢迎信息
 		
 		if(pfs.comm.user && pfs.comm.user.NAME){
 			
 			//欢迎信息
	 		var myDate = new Date();
	 		var hour = myDate.getHours();
	 		var a_p_m = '晚上好！';
	 		if(hour < 11){
	 		
	 			a_p_m = '上午好！';
	 		}else if(11 <= hour && hour < 13){
	 		
	 			a_p_m = '中午好！';
	 		}else if(13 <= hour && hour < 18){
	 		
	 			a_p_m = '下午好！';
	 		}
	 		var month = myDate.getMonth()+1;
	 		var day = myDate.getDate();
	 		var week = '';
	 		switch (myDate.getDay()){
	 			
	 			 case 1: week="星期一"; break;
	 			 case 2: week="星期二"; break;
	 			 case 3: week="星期三"; break;
	 			 case 4: week="星期四"; break;
	 			 case 5: week="星期五"; break;
	 			 case 6: week="星期六"; break;
	 			 default: week="星期日";
	 		}
	 		
	 		var cw = '';
	 		if(($.inArray('jzg', pfs.comm.groupList) > -1)){
	 		
	 			cw = '老师';
	 		}else if(($.inArray('bks', pfs.comm.groupList) > -1) || ($.inArray('yjs', pfs.comm.groupList) > -1)){
	 		
	 			cw = '同学';
	 		}
	 		
	 		var hello_info = '<h4>'+pfs.comm.user.NAME+cw+'，'+a_p_m+'</h4>';
	 			hello_info += '<h3>'+month+'月'+day+'日，'+week+'</h3>';
	 		return hello_info;
 		}else{
 			
 			return "";
 		}
 	},
 	uaaapIntegerate:function(){
 		
 		var myBasePath = pfs.comm.basePath;
 		if(!(myBasePath.indexOf(":808") > -1) && myBasePath.indexOf(":80") > -1){
 		
 			myBasePath = pfs.comm.basePath.substring(0, pfs.comm.basePath.lastIndexOf(":"));
 		}
 		return pfs.comm.uaaapBasePath+'cas/login?service='+myBasePath+'%2FPersonalApplications%2FviewPage%3Factive_nav_num%3D1&CTgtId='
 	},
 	
 	uaaaphallpage:function(APPID){
 		
 		var myBasePath = pfs.comm.basePath;
 		if(!(myBasePath.indexOf(":808") > -1) && myBasePath.indexOf(":80") > -1){
 		
 			myBasePath = pfs.comm.basePath.substring(0, pfs.comm.basePath.lastIndexOf(":"));
 		}
 		return pfs.comm.uaaapBasePath + "cas/login?service="+ encodeURIComponent(myBasePath+'/recommend/showAppDetail?appid='+APPID)+'&CTgtId=';

 	},
 	//过滤标签类型，防止脚本攻击
	filterHtmlTage : function(sHtml){

		if(sHtml){
			
			return sHtml.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];})+'';
		}else{
			
			return sHtml+'';
		}b
	}, 
 	getOperationSystem:function(){
 		
		var sUserAgent = navigator.userAgent;

		var isWin = (navigator.platform == "Win32")
				|| (navigator.platform == "Windows");
		var isMac = (navigator.platform == "Mac68K")
				|| (navigator.platform == "MacPPC")
				|| (navigator.platform == "Macintosh")
				|| (navigator.platform == "MacIntel");
		if (isMac)
			return "Mac";
		var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
		if (isUnix)
			return "Unix";
		var isLinux = (String(navigator.platform).indexOf("Linux") > -1);

		var bIsAndroid = sUserAgent.toLowerCase().match(/android/i) == "android";
		if (isLinux) {
			if (bIsAndroid)
				return "Android";
			else
				return "Linux";
		}
		if (isWin) {
			var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1
					|| sUserAgent.indexOf("Windows 2000") > -1;
			if (isWin2K)
				return "Win2000";
			var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1
					|| sUserAgent.indexOf("Windows XP") > -1;
			if (isWinXP)
				return "WinXP";
			var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1
					|| sUserAgent.indexOf("Windows 2003") > -1;
			if (isWin2003)
				return "Win2003";
			var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1
					|| sUserAgent.indexOf("Windows Vista") > -1;
			if (isWinVista)
				return "WinVista";
			var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1
					|| sUserAgent.indexOf("Windows 7") > -1;
			if (isWin7)
				return "Win7";
		}
		return "other";
	},
	isLowVersionBrowser:function(){
		
		if($.ua().isIe && $.ua().ie > 0 && ($.ua().isIe6 || $.ua().isIe7 || $.ua().isIe8)){
		
			return true;
		}else{
		
			return false;
		}
	},
 	zwGroupList:function(){//用户组的中文信息
 	
 		var rts = '';
 		if(pfs.comm.groupList){
 		
 			for(var i = 0, len = pfs.comm.groupList.length; i < len; i++){
 			
 				var jsxx = pfs.comm.groupList[i].toUpperCase();
 				switch(jsxx){
 					
 					case 'ADMINGROUP':
 					
 						rts += '管理员组,';
 						break;
 					
 					case 'XY':
 					
 						rts += '校友,';
 						break;
 					
 					case 'GUEST':
 					
 						rts += '游客,';
 						break;
 					
 					case 'BKS':
 					
 						rts += '本科生组,';
 						break;
 					
 					case 'CSRY':
 					
 						rts += '测试人员,';
 						break;
 					
 					case 'JZG':
 					
 						rts += '教职工,';
 						break;
 					
 					case 'LSRY':
 					
 						rts += '临时人员,';
 						break;
 					
 					case 'YJS':
 					
 						rts += '研究生组,';
 						break;
 					
 					case 'AM':
 					
 						rts += 'Accounting Managers,';
 						break;
 					
 					case 'HRM':
 					
 						rts += 'HR Managers,';
 						break;
 					
 					case 'PDM':
 					
 						rts += 'PD Managers,';
 						break;
 					
 					case 'QAM':
 					
 						rts += 'QA Managers,';
 						break;
 					
 					case 'OTHER':
 					
 						rts += '其他,';
 						break;
 				};
 			}
 			
 			if(rts.length > 1){
 			
 				rts = rts.substring(0, rts.length - 1);
 			}
 		}
 		return rts;
 	},
 	//弹出提示框
 	msg:function(msg, callBack){
 	
		swal({
			title: msg,
			imageUrl:'/resources/img/ts.png',
			confirmButtonText:'确定'
		},
		function(){
			
			if(callBack){
			
				callBack();
			}
		});
 	},
 	
 	//弹出错误提示框
 	error:function(msg, callBack){
 	
 		swal({
			title: msg,
			imageUrl:'/resources/img/ts.png',
			confirmButtonText:'确定'
		},
		function(){
			
			if(callBack){
			
				callBack();
			}
		});
 	},
 	
 	//弹出成功提示框
 	success:function(msg, callBack){
 	
 		swal({
			title: msg,
			imageUrl:'/resources/img/ts.png',
			confirmButtonText:'确定'
		},
		function(){
			
			if(callBack){
			
				callBack();
			}
		});
 	},
 	
 	//弹出确认框
 	confirm:function(msg, callBack){
 	
 		swal({
			title: msg,
			imageUrl:'/resources/img/ts.png',
			showCancelButton: true,
			confirmButtonColor: '#DD6B55',
			confirmButtonText:'确定',
			cancelButtonText:'取消',
			closeOnConfirm: true
		},
		function(){
			
			if(callBack){
			
				callBack();
			}
		});
 	},
 	
 	//弹出确认框,返回点击的按钮按钮，true确定，false取消
 	confirm2:function(msg, callBack){
 	
 		swal({
			title: msg,
			imageUrl:'/resources/img/ts.png',
			showCancelButton: true,
			confirmButtonColor: '#DD6B55',
			confirmButtonText:'确定',
			cancelButtonText:'取消',
			closeOnConfirm: true
		},
		function(confirm){
			
			if(callBack){
			
				callBack(confirm);
			}
		});
 	},
 	
 	//对话框
 	showDialog:function(msg, type, callBack){
 	
 		if(type){
 		
 			type = type.toUpperCase();
 		}
 		
 		switch(type){
 		
 			case 'INFO' :
 			
	 			pfs.comm.msg(msg, callBack);
	 			break;
 		
 			case 'ERROR' :
	 			
	 			pfs.comm.error(msg, callBack);
	 			break;
 		
 			case 'SUCCESS' :
	 			
	 			pfs.comm.success(msg, callBack);
	 			break;
 		
 			case 'CONFIRM' :
	 			
	 			pfs.comm.confirm(msg, callBack);
	 			break;
 		
 			case 'CONFIRM2' :
	 			
	 			pfs.comm.confirm2(msg, callBack);
	 			break;
	 		
	 		default:
	 			
	 			pfs.comm.msg(msg, callBack);
	 			break;
 		}	
 	}, 
 	
 	//弹出iframe窗口
 	showIframeWindow:function(option){
 	
 		if(option.content){
 			
			$.webox({
				height:option.height ? option.height : 300,
				width:option.width ? option.width : 600,
				bgvisibel:true,
				title:option.title ? option.title : ' ',
				iframe:option.content+'?'+Math.random
			});
 		}else{
 		
 			pfs.comm.showDialog('请传入URL');
 		}
 	},
 	
 	//弹出普通HTML窗口
 	showHtmlWindow:function(option){
 	
 		if(option.content){
			
			$.webox({
				height:option.height ? option.height : 300,
				width:option.width ? option.width : 600,
				bgvisibel:true,
				title:option.title ? option.title : ' ',
				html:option.content
			});
 		}else{
 		
 			pfs.comm.showDialog('请传入HTML内容');
 		}
 	},
 	
 	//弹出window窗口
 	showWin:function(option){
 	
 		if(option.type){
 		
 			if('IFRAME' == option.type.toUpperCase()){
 			
 				pfs.comm.showIframeWindow(option);
 			}else{
 			
 				pfs.comm.showHtmlWindow(option)
 			}
 		}else{
 		
 			pfs.comm.showDialog('请填写type参数')
 		}
 	},
 	
 	//没有权限的提示
 	alertNoRight:function(){
 		
 		pfs.comm.showDialog('您不能使用该应用!', 'error')
 	},
 	
 	//打开没有权限的页面
 	opetsoRight:function(){
 	
 		pfs.comm.openApp('', '', '123456789');
 	},
 	
 	//关闭弹出的webBox窗口
 	closeWebBox:function(){

 		$('.webox .span').click();
 	},

 	//弹出应用详情窗口
 	showAppDetailWin:function(appid, appname, isLogin, appicons, sfjs, afterLogin){//afterLogin表示登录后跳转的应用
 	
 		var cw = document.body.clientWidth;
		var ch = document.body.clientHeight;
		if(!cw){
		
			cw = 800;
		}else{
		
			cw = $('.container').width();
		}
		if(!ch){
		
			ch = 500;
		}else{
		
			ch = ch - 220;
		}
		
		var app_icons = pfs.comm.basePath+'portal/apps/homepage/img/icon/bddt.png';
		if(appicons && appicons != 'null'){
		
			app_icons = pfs.comm.basePath+'webFileRoot'+appicons;
		}
		
		var heights = "100%";
		if(ch > 1000){
		
			//IE8
			heights = "250px";
		}
		var start_show_win = function(tool_actions){
			
			pfs.comm.showWin({
			
				title:' ',
				type:'html',
				content:'<div class="appdetail_header">'+
		
								'<div>' +
										'<div class="pull-left col-md-7">'+
											'<p class="pull-right">'+appname+'</p>' +
											'<img class="pull-right" src="'+app_icons+'" alt="">'+
										'</div>' +
										'<div class="pull-right col-md-5">' +
											'<p class="pull-right">'+tool_actions+'</p>' +
										'</div>'+
										'<div class="clearfix"></div>'+
								'</div>'+
								
								'<div id="appdetail_content" class="appdetail_content">'+
									'<iframe src="'+pfs.comm.basePath+'AppDetail/viewPage?appid='+appid+'&rd='+Math.random()+'"  width="100%" height="'+heights+'" frameborder="0" name="appdetail_iframe"></iframe>'+
								'</div>'+
								
						'</div>',
				width:cw,
				height:ch
			});
			
			//点击弹出窗口之外的地方隐藏该窗口
			var isOutDiv = true;
			$('.appdetail_header').mouseover(function(){
			
				isOutDiv = false;
			});
			$('.appdetail_header').mouseout(function(){
			
				isOutDiv = true;
			});
			document.onmousedown=function(){

				if(isOutDiv){
		
			   		pfs.comm.closeWebBox();
			   }
			}
		}
		
		if((isLogin+'') == '0'){//不需要登录不需要检查权限
			
			var tool_actions = '<a href="javascript:void(0)" onclick="pfs.comm.closeWebBox(); pfs.comm.openAppByAuthority(\''+appid+'\', \''+isLogin+'\')" class="btn btn-raised btn-success btn-sn">使  用</a>';
			start_show_win(tool_actions);
		}else{
			
			if(pfs.comm.user){//已登录,检查权限
			
				var tool_actions = '<a href="javascript:void(0)" onclick="pfs.comm.closeWebBox(); pfs.comm.openAppByAuthority(\''+appid+'\', \''+isLogin+'\')" class="btn btn-raised btn-success btn-sn">使  用</a>';
				pfs.comm.checkAppAuthority(
											appid,
											function(){
												
												//如果是教职工，则需要做教师和职工的特殊角色判断
												if((sfjs == 0 || sfjs == 1) && pfs.comm.groupList && ($.inArray('jzg', pfs.comm.groupList) > -1) && sfjs != pfs.comm.gwlb){
													
													start_show_win('<span style="color:brown;">您没有该应用的使用权限...</span>');
												}else{
													
													start_show_win(tool_actions)
												}
											},
											'',
											'',
											function(){
												
												start_show_win('<span style="color:brown;">您没有该应用的使用权限...</span>');
											}
										  );
			}else{
				
				var tool_actions = '<a href="javascript:void(0)" onclick="pfs.comm.closeWebBox(); pfs.comm.openAppByAuthority(\''+appid+'\', \''+isLogin+'\')" class="btn btn-raised btn-success btn-sm">登  录</a>';
				if(afterLogin){
				
					tool_actions = '<a href="javascript:void(0)" onclick="pfs.comm.closeWebBox(); pfs.comm.openUrl(\''+afterLogin+'\', 1)" class="btn btn-raised btn-success btn-sm">登  录</a>';
				}
				start_show_win(tool_actions);
			}
		}
 	},
 	
 	//检测用户是否登录，未登录则跳转到登录页面
 	checkLogin:function(appid, url, opentype){
 	
 		//已登录则返回true
 		if(pfs.comm.user){
 		
 			return true;
 		}else if(url){
 		
 			//未登录，且需要跳转到应用中心，需要特殊处理，因为应用中心自己引入top,foot，不用container包含
 			if('appcenter/viewAppCenterContainerByAuthority' == url){
 				
 				pfs.comm.openUrl(url, opentype);
 				return false;
 			}else{
 				
 				//当需要正常跳转app，且已经传入url时，直接跳转
 				pfs.comm.openApp(url, opentype, appid);
 				return false;
 			}
 		}else if(appid){
 		
 			$.ajax({
	
			     data: {APPID:appid},
			     type: 'POST',
			     url: 'appcenter/queryAllApp',
			     dataType:'json',
			     success: function(response){
			     
			     	if(response[0]){
			     		
			     		//当需要正常跳转app，且已经传入appid,但未传入url时，先查询应用信息再跳转
			     		pfs.comm.openApp(response[0].URL, response[0].OPEN_TYPE, appid, response[0].LINK_TYPE);
			     	}
			     },
				 error:function(response){
				 
				 	pfs.comm.showDialog("应用查询失败",'error');
				 }
			});
			return false;
 		}else{
 		
 			//如果未登录且不传入任何参数，则表示直接打开登录页面，登录后跳转到首页
 			pfs.comm.openUrl('portal_main/toPortalPageByCheck', 1);
 			return false;
 		}
 	},
 	
 	//关闭当前页面
 	closeCurrentPage:function(){
			
			if (navigator.userAgent.indexOf("MSIE") > 0) {
				 
				  if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
					  
					   window.opener = null;
					   window.close();
				  } else {
					  
					   window.open('', '_top');
					   window.top.close();
				  }
			 }
			 else if (navigator.userAgent.indexOf("Firefox") > 0) {
				 
			  	window.location.href = 'about:blank ';
			 } else {
				 
				 window.location.href = 'about:blank ';
			 }
			 window.close();
	},

	//浏览器信息
	browser:{

			versions:function(){ 

				   var u = navigator.userAgent, app = navigator.appVersion; 

				   return {//移动终端浏览器版本信息 

						trident: u.indexOf('Trident') > -1, //IE内核

						presto: u.indexOf('Presto') > -1, //opera内核

						webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核

						gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核

						mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端

						ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端

						android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器

						iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器

						iPad: u.indexOf('iPad') > -1, //是否iPad

						webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部

					};

				 }(),
				 language:(navigator.browserLanguage || navigator.language).toLowerCase()

	} ,

 	//打开url地址
 	openUrl:function(url, openType, isValidUrl){
	
		//url没有包含pfs.comm.basePath
		if(!isValidUrl){

			url = pfs.comm.basePath+url;
		}
		//是否是移动端浏览器
		var	mobileBroser = pfs.comm.browser.versions.mobile;
		var ios = pfs.comm.browser.versions.ios;
		var android = pfs.comm.browser.versions.android;
		var iPhone = pfs.comm.browser.versions.iPhone;
		if(openType == 1 || (mobileBroser && (ios || android || iPhone) )){
			
			window.location.href = url;
		}else{
 
			var popUp = window.open(url);
			if (popUp == null || typeof(popUp)=='undefined') {  
				pfs.comm.showDialog("窗口已被浏览器拦截，请您先解除拦截。");
			} 
			else {  
			  popUp.focus();
			}
			/*var a = document.createElement('a');
            a.setAttribute('href', url);
            a.setAttribute('style', 'display:none');
            a.setAttribute('target', '_blank');
            a.setAttribute('id', '__OPENURLA__');
            $('#__OPENURLA__').remove();
            // 防止反复添加
            document.body.appendChild(a);
            a.click();
            $('#__OPENURLA__').remove();*/
		}
	},
	
	//打开一个应用或页面(需要登录（未登录后自动跳转到登录页面，登录后再继续执行操作），不传appid不验证用户权限,传appid表示需要验证当前用户是否有该应用的权限)
	openApp:function(url, openType, appid, linkType, isIframeLoad){
	
				
		url = pfs.comm.basePath+'app/component?appid='+appid+'&page='+new Base64().encode(url);
		if(isIframeLoad){
			
			url += '&isIframeLoad=true';
		}
		pfs.comm.openUrl(url, openType, true);
	},
	
	//打开一个应用或页面(不要验证登录，不验证用户权限)
	openAppNoCheckLogin:function(url, openType, linkType){
	
		
		
		url = pfs.comm.basePath+'app/component/viewPageNoCl?page='+new Base64().encode(url);
		pfs.comm.openUrl(url, openType, true);
	},
	
	//打开一个门户应用或页面不包含导航栏信息,含有material(不要验证登录，不验证用户权限)
	openOriginalPage:function(url, openType){
	
		url = pfs.comm.basePath+'app/component/viewOriginalPage?page='+new Base64().encode(url);
		pfs.comm.openUrl(url, openType, true);
	},
	
	//打开一个门户应用或页面包含导航栏信息,ifame引入
	viewPageByIframe:function(url, openType){
	
		url = pfs.comm.basePath+'app/component/viewPageByIframe?page='+new Base64().encode(url);
		pfs.comm.openUrl(url, openType, true);
	},
	
	checkSpecialAuthority:function(sfjs){

		//如果是教职工，则需要做教师和职工的特殊角色判断
		if((sfjs == 0 || sfjs == 1) && pfs.comm.groupList && ($.inArray('jzg', pfs.comm.groupList) > -1) && sfjs != pfs.comm.gwlb){
			
			//打开没有权限提示
			pfs.comm.alertNoRight();
			return false;
		}else{
			
			return true;
		}
	},
	
	//需要登录检查用户是否有该应用的权限
	checkAppAuthority:function(appid, successCallBack, url, opentype, failureCallBack){
	
		var _remoteVistor = function(){
			
			var index = 0;//计数器
			return {
				
				process : function(){
					
					index++;
					if(appid && pfs.comm.checkLogin(appid, url, opentype)){
						
						$.ajax({
							
						     data: {
						     
						     	USERID:pfs.comm.user.ID,
			     				USERGROUP:''+pfs.comm.groupList,
			     				USERORG:pfs.comm.org ? pfs.comm.org.ID+'' : '',
			     				APPID:appid
						     },
						     type: 'POST',
						     url: 'appcenter/queryAppByAuthority',
						     dataType:'json',
						     success: function(response){
						
						     	if(response[0]){
						     		
						     		if(successCallBack){
						     				
					     				successCallBack(response[0]);
						     		}
						     	}else{
						     	
						     		if(failureCallBack){
						     			
						     			failureCallBack();
						     		}else{
						     			
						     			//没有应用权限且没有传入相应的回调时，跳转到没有权限页面
		//				     			pfs.comm.opetsoRight();
						     			pfs.comm.alertNoRight();
						     		}
						     	}
						     },
							 error:function(response){
							 
							 	var s = new ServiceInfo();
								s.setParamDataFormat('xml');
								s.setServiceAddress(pfs.comm.uaaapProperties['uaaapBasePath'] + 'cas/ws/acpInfoManagerWS');
								s.setServiceSource('td');
								s.setServiceType('soap');
								s.setSoapInterface('getUserInfoByTgtId');
								s.addParams({'arg0':new Base64().decode($.cookie('usertgt')), 'arg1': pfs.comm.uaaapProperties['clientId'], 'arg2': pfs.comm.uaaapProperties['clientSecret']});
								s.callService({
									
									success : function(a,b,c){
										
										if(a.success){
											
											var data = a.data.getUserInfoByTgtIdResponse['return'];
											data.info.attributes.logitsame = data.info.id;
											$.ajax({
												type : "POST", 
										         async: false,
										         url : "appcenter/checkCasSession", 
										         dataType : "json",
										         data : data.info.attributes,
										         success : function(data){
										        	 
										        	 if(data.success){
										        		 
										        		 //$.cookie('JSESSIONID', data.sessionid, {path:'/'});
										        		 _remoteVistor.process();
										        		 return;
										        	 }else{
															
										        		 //调用认证系统，session也丢了
										        		 pfs.comm.showDialog("您的登陆已失效!请重新登陆!",'confirm2',function(rts){
														 		
													 		if(rts){
													 			
													 			 pfs.comm.openUrl('appcenter/toPortalPage', 1, false);
													 		}
													 	});
													 }
										         }
										     }); 
										}else{
											
											//调用认证系统服务失败，再试一次
											if(index < 2){//计数的形式
											
												_remoteVistor.process();
											}else{//认证系统调用失败第二次，弹出警告框
												
												pfs.comm.showDialog("您的登陆已失效!请重新登陆!",'confirm2',function(rts){
											 		
											 		if(rts){
											 			
											 			 pfs.comm.openUrl('appcenter/toPortalPage', 1, false);
											 		}
											 	});
											}
										}
									},
									error : function(){
										
										console.log('在调用认证登陆服务时异常终止...');
									}
								});	
							 }
						});
					}
				}
			}
		}();
		
		_remoteVistor.process();
	},
	
	//打开应用前检查权限
	openAppByAuthority:function(appid, isLogin, afterLogin){//afterLogin如果未登录则直接登录并调整到afterLogin

		if((isLogin+'') == '0'){//不需要登录就可以跳转
			
			pfs.comm.queryAllApp({APPID:appid}, function(datas){
			
				if(datas){
					
					var url = datas[0].URL;
		     		var opentype = datas[0].OPEN_TYPE;
		     		var linktype = datas[0].LINK_TYPE;
		     		var loadType = datas[0].LOAD_TYPE;
		     		if(loadType == 2){//通过iframe引入
		     			
		     			pfs.comm.viewPageByIframe(url, opentype);
		     		}else if(loadType == 3){//通过们div引入，不显示顶部导航栏和底部版权信息
		     			
		     			pfs.comm.openOriginalPage(url, opentype);
		     		}else if(loadType == 4){//直接打开地址
		     			
		     			if(url.indexOf('http') > -1){
		     				
		     				pfs.comm.openUrl(url, opentype, true);
		     			}else{
		     				
		     				pfs.comm.openUrl(url, opentype, false);
		     			}
		     		}else{//通过门户正常引入
		     			
		     			//跳转到应用应用页面
						pfs.comm.openAppNoCheckLogin(url, opentype, linktype);
		     		}
				}
			});
		}else{
			
			if(afterLogin && !pfs.comm.user){
				
				pfs.comm.checkLoginBeforeOpenUrl(afterLogin, 1);
				return;
			}

			//当用户已登录且拥有应用权限时才会进入回调,当未登录时先登录再验证用户权限，没有权限时跳转到无权限的提示页面，但始终不会进入回调
			pfs.comm.checkAppAuthority(appid, function(data){
			
				var id = data.ID;
				var url = data.URL;
			  
				if(data.TYPE&&data.TYPE=='2') //如果是内置应用
					{
						if(url.indexOf("?")>0){
							url = url + "&appid="+appid;
						}else{
							url = url + "?appid="+appid;
						}
					}
			
	     		var opentype = data.OPEN_TYPE;
	     		var linktype = data.LINK_TYPE;
	     		var loadType = data.LOAD_TYPE;
	     		
	     		if(!url || url=='this url is empty'){
	     			
	     			pfs.comm.showDialog("该应用正在建设中...");
	     			return;
	     		}
	     		
	     		//打开应用
	     		var to_open_app = function(){
	     			
	     			if(loadType == 2){//通过iframe引入,需要登录并且要通过iframe引入，最好使用这个方式引入，该方法没加noCheckLogin
		     			
	     				pfs.comm.openApp(url, opentype, id, linktype, true);
		     		}else if(loadType == 3){//通过们div引入，不显示顶部导航栏和底部版权信息
		     			
		     			pfs.comm.openOriginalPage(url, opentype);
		     		}else if(loadType == 4){//直接打开地址
		     			
		     			if(url.indexOf('http') > -1){
		     				
		     				pfs.comm.openUrl(url, opentype, true);
		     			}else{
		     				
		     				pfs.comm.openUrl(url, opentype, false);
		     			}
		     			
		     		}else{//通过门户正常引入
		     			
		     			//跳转到应用应用页面
						pfs.comm.openApp(url, opentype, id, linktype);
		     		}
	     		}
	     		
	     		if(pfs.comm.checkSpecialAuthority(data.SFJS)){
					
		     			//权限检查完毕可以打开应用
		     			//打开应用前有需要执行脚本
			     		var scripturl = data.SCRIPTURL;
			     		if(scripturl && !((scripturl+'').toUpperCase().indexOf('HTTP') > -1)){
			     		
			     			//引入脚本信息
			     			$.imports(scripturl, function(){
			     			
			     				//执行脚本中的pfs_beforeOpenApp_scripts方法,返回true则打开应用，否则什么也不做
			     				if(pfs_beforeOpenApp_scripts()){
			     				
			     					to_open_app();
			     				}
			     			});
			     		}else{
			     			
			     			to_open_app();
			     		}
				}
			});
		}
		
	},
	
	//未登录时提示登陆并返回首页，已登录则执行回调方法
	checkLoginBeforeOpenUrl:function(url, openType, type){
		
		if(pfs.comm.user){
			
			if('app' == type){
				
				pfs.comm.openApp(url, openType);
			}else{
				
				pfs.comm.openUrl(url, openType);
			}
		}else{
			
			pfs.comm.showDialog('您未登录!请先登录...', 'confirm2', function(rts){
				
				if(rts){
					
					pfs.comm.openUrl('portal_main/toPortalPage', 1);
				}
			});
		}
	},
	
	//分页查询应用信息
	queryApp:function(options, callBack){
		
		var params = {limit:20, page:1};
		params = $.extend(true,{}, params, options);
		$.ajax({
		
		     data: params,
		     type: 'GET',
		     url: 'app/query',
		     dataType:'json',
		     success: function(response){
		     
		     	if(response){
		     	
		     		var datas = response.data;
		     		if(callBack){
		     		
		     			callBack(datas);
		     		}
		     	}
		     },
			 error:function(response){
			 
//				 pfs.comm.showDialog("系统繁忙!请稍后重试!",'confirm2',function(rts){
//				 		
//			 		if(rts){
//			 			
//			 			 pfs.comm.openUrl('PersonalApplications/viewPage', 1, false);
//			 		}
//			 	});
			 }
		});
	},
	
	//不分页查询应用信息
	queryAllApp:function(options, callBack){
		
		var params = {};
		params = $.extend(true,{}, params, options);
		$.ajax({
		
		     data: params,
		     type: 'POST',
		     url: 'appcenter/queryAllApp',
		     dataType:'json',
		     success: function(response){
		     
		     	if(response){
		     	
		     		var datas = response;
		     		if(callBack){
		     		
		     			callBack(datas);
		     		}
		     	}
		     },
			 error:function(response){
			 
			 	pfs.comm.showDialog("应用查询失败",'error');
			 }
		});
	},
		
		
	///////////////////////////////////////////////////////////////////////////////////////////
 	//以下为关于字典的操作////////////////////////////////////////////////////////////////////////////
 	///////////////////////////////////////////////////////////////////////////////////////////
	//将所有职称评审所有字典缓存到本地
	all_dict:{},
	isLoadDict:null,
	
	//判断浏览器是否支持localStorage
	isSupportLocalStorage:function(){
	
		if(window.localStorage){
			
			return true;
		}else{
		
			return false;
		}
	},
	
	//将字典映射名存储到本地
	saveDictmap2localStorage:function(dictmapArray, type){
	
		if(pfs.comm.isSupportLocalStorage){
			
			//从总线服务取的字典
			var dictmap_name = 'pfs_dictmap_array';
			if(type == 2){
	
				//从门户取的字典信息
				dictmap_name = 'pfs_dictmap_array_pt';
			}
			var pfs_dictmap_array =  localStorage.getItem(dictmap_name);
			if(!pfs_dictmap_array){
				
				pfs_dictmap_array = {};
			}else{
			
				pfs_dictmap_array = eval('('+pfs_dictmap_array+')');
			}
			for(var i = 0, len = dictmapArray.length; i < len; i++){
			
				var dictmap = dictmapArray[i];
				pfs_dictmap_array[dictmap] = dictmap;
			}
			localStorage.setItem(dictmap_name, JSON.stringify(pfs_dictmap_array));
		}
	},
	
	//将本地缓存的字典映射名取出来
	getDictmapFromLocalStorage:function(type){
	
		var rts = {};
		if(pfs.comm.isSupportLocalStorage){
			
			//从总线服务取的字典
			var dictmap_name = 'pfs_dictmap_array';
			if(type == 2){
			
				//从门户取的字典信息
				dictmap_name = 'pfs_dictmap_array_pt';
			}
			rts = localStorage.getItem(dictmap_name);
			if(rts){
			
				rts = eval('('+rts+')');
			}else{
			
				rts = {};
			}
		}
		
		return rts;
	},
	
	//将字典从LocalStorage本地缓存移除
	removeDictmapFromLocalStorage:function(dictmapArray, type){
	
		if(pfs.comm.isSupportLocalStorage){
			
			var pfs_dictmap_array = pfs.comm.getDictmapFromLocalStorage(type);
			if(pfs_dictmap_array && dictmapArray){
			
				for(var i = 0, len = dictmapArray.length; i < len; i++){
				
					delete pfs_dictmap_array[dictmapArray[i]];
				}
			}
			
			//从总线服务取的字典
			var dictmap_name = 'pfs_dictmap_array';
			if(type == 2){
			
				dictmap_name = 'pfs_dictmap_array_pt';
			}
			localStorage.setItem(dictmap_name, JSON.stringify(pfs_dictmap_array));
		}
	},
	
	//将字典信息保存到本地缓存sessionStorage
	saveDictinfo2localStorage:function(){
	
		if(pfs.comm.isSupportLocalStorage){
			
			localStorage.setItem('all_dict', JSON.stringify(pfs.comm.all_dict));
		}
	},
	
	//将字典信息从本地缓存sessionStorage取出
	getDictinfoFromLocalStorage:function(){
	
		var rts = {};
		if(pfs.comm.isSupportLocalStorage){
			
			rts = localStorage.getItem('all_dict');
			if(rts){
			
				rts = eval('('+rts+')');
			}else{
			
				rts = {};
			}
		}
	
		return rts;
	},
	
	//加载字典
	load_dict:function(dictmapArray, div, p, callBack, controller){
	
		pfs.comm.all_dict = pfs.comm.getDictinfoFromLocalStorage();
	
		var tbcs = [];
		for(var i = 0, len = dictmapArray.length; i < len; i++){
			
			var exist = pfs.comm.all_dict[dictmapArray[i]];
			if(!exist || 'load_dict' == div){
			
				var conditions = {'cname':'refo', 'cvalue':dictmapArray[i]};
				if(tbcs.length > 0){
					
					conditions.lc = 'or';
				}
				
				tbcs.push(conditions);
			}
		}
		
	
		if(tbcs.length > 0){
			
			//更新字典
			var setNewDicts = function(items, callBacks){
			
				var isExist = false;
				if(items){
					
					$.each(items, function(i, item){
					
						var refo = item.refo;
						var dm = item.dm;
						var mc = item.mc;
		
						var exist = pfs.comm.all_dict[refo];
						if(!exist){
							
							exist = {};
						}
						exist[dm] = mc;
						pfs.comm.all_dict[refo] = exist;
						isExist = true;
					});
				}
	
				if(!isExist){
					
					//删除本地缓存关于该字典映射的信息
					pfs.comm.removeDictmapFromLocalStorage(dictmapArray);
				}else{
					
					//更新本地字典缓存信息
					pfs.comm.saveDictinfo2localStorage();
					//更新本地字典映射信息
					pfs.comm.saveDictmap2localStorage(dictmapArray);
				}
				
				if(callBacks){
				
					callBacks(div, p);
				}
			}
			
			
			if(!controller){
				
				//从总线服务取字典
				$.ajax({
					url : 'remote/service/process',
					method : 'post',
					type : 'json',
					data:{
						
						serviceInfo :JSON.stringify(	
						{
							"serviceAddress":"zhyyfw/ZhyyfwService",
							"serviceType":"soap",
							"serviceSource":"esb",
							"paramDataFormat":"xml",
							"httpMethod":"POST",
							"soapInterface":"invokes",
							"params":{"requst":{"clazz":'v_all_dict',"optType":"q"}},
							'namespace':'',
							'xml_json':{tbcolumns:tbcs},
							"cDataPath":[]
						}
						)
					},
					success : function(request){
						
						var items = request.data['return'].items;
						setNewDicts(items, callBack);
					},
					error : function(request, status){
						
						//删除本地缓存关于该字典映射的信息
						pfs.comm.removeDictmapFromLocalStorage(dictmapArray);
						//pfs.comm.showDialog("服务器内容",'error');
					}
				});
			}else{
			
				//从本地controller取字典
				$.ajax({
				 type:'POST',
			     data: {
			     
			     	dictmaparry:''+dictmapArray
			     },
			     url: 'InitAllDict/getDicts',
			     dataType:'json',
			     success: function(response){
			     
			     	if(response){
			     		
						pfs.comm.all_dict = pfs.comm.getDictinfoFromLocalStorage();
						pfs.comm.all_dict = $.extend(true, {}, pfs.comm.all_dict, response);
			     		pfs.comm.saveDictinfo2localStorage();
						pfs.comm.saveDictmap2localStorage(dictmapArray, 2);
						if(callBack){
				
							callBack(div, p);
						}
			     	}
			     },
				 error:function(response){
				 
					pfs.comm.removeDictmapFromLocalStorage(dictmapArray, 2);
				 	pfs.comm.showDialog("子弹加载失败",'error');
				 }
			});
			}
		}else{
	
			if(callBack){
					
				callBack(div, p);
			}
		}
	},
	
	initDict:function(){
		
		//初始化字典,每次只初始化一次
		if(pfs.comm.isSupportLocalStorage()){
		
			//未初始化字典
			if(pfs.comm.isLoadDict != 'DICT'){
		
				//将需要初始化的字典查出来（总线部分）
				var pfs_dictmap_array = pfs.comm.getDictmapFromLocalStorage();
				var dictmap_array = [];
				if(pfs_dictmap_array){
					
					for(var item in pfs_dictmap_array){
					
						dictmap_array.push(item);
					}
				}
				if(dictmap_array.length > 0){
		
					pfs.comm.load_dict(dictmap_array, 'load_dict');
				}
		
				//将需要初始化的字典查出来（门户部分）
				var pfs_dictmap_array2 = pfs.comm.getDictmapFromLocalStorage(2);
				var dictmap_array2 = [];
				if(pfs_dictmap_array2){
					
					for(var item in pfs_dictmap_array2){
					
						dictmap_array2.push(item);
					}
				}
			
				if(dictmap_array2.length > 0){
		
					pfs.comm.load_dict(dictmap_array2, 'load_dict', '', '', '2');
				}
			}
		}
	},
	
	//转换字典
	dict_key2value:function(dictmap, key){
		
		pfs.comm.all_dict = pfs.comm.getDictinfoFromLocalStorage();
		var exist = pfs.comm.all_dict[dictmap];
		if(exist){
			
			return exist[key];
		}else{
		
			return key;
		}
	},
	
	//获得某项字典
	dict_get:function(dictmap){
	
		pfs.comm.all_dict = pfs.comm.getDictinfoFromLocalStorage();
		var exist = pfs.comm.all_dict[dictmap];
		return exist;
	},
	
	///////////////////////////////////////////////////////////////////////////////////////////
 	//以下关于json转select的定义//////////////////////////////////////////////////////////////////////
 	///////////////////////////////////////////////////////////////////////////////////////////
	
	getSelectOptionFromJson:function(a,b,c){
		$("#" + a).html(pfs.comm.getSelectOptionStr(b, c));
	},
	
	getSelectOptionStr:function(e, d, a) {
		var b = "";
		if (d) {
			if (typeof d == "boolean" && d == true) {
				b = '<option value="">---请选择---</option>';
			} else {
				if (typeof d == "string") {
					b = '<option value="">' + d + "</option>";
				}
			}
		}
		for ( var c in e) {
			if (a && c == a) {
				b += '<option value="' + c + '" selected = "selected" >' + e[c]
						+ "</option>";
			} else {
				b += '<option value="' + c + '" >' + e[c] + "</option>";
			}
		}
		return b;
	},
	
	///////////////////////////////////////////////////////////////////////////////////////////
 	//以下关于json转收藏、评价、查看详情、办理、申请的定义//////////////////////////////////////////////////////////////////////
 	///////////////////////////////////////////////////////////////////////////////////////////
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	//收藏部分//////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////
	setMyCollection:function(appid,callback){
		$.ajax({
			data: {
				APPID:appid
			},	     
		    type: 'POST',
		    url: pfs.comm.basePath+'/myCollection/setMyCollection',
		    dataType:'json',
		    success:function(response){
		    	
		    	callback(response);
		    },
			error:function(response){
			    
		    	
			}
		});
	},
	
	 removeCollection:function(appid,callback){
	
					$.ajax({							
						data: {
		     				APPID:appid
					     },
					     type: 'POST',
					     url: pfs.comm.basePath+'/myCollection/deleteCollectionByAppid',
					     dataType:'json',
					     success:function(response){
					    	
					    	if(response.success){
					    		
					    		callback(response);
					    		
					    	}
					    	
					     },
						 error:function(response){
							
						 }
					});
	},
	
	
	isCollected:function(appid, callback){
		$.ajax({
			data: {
				APPID:appid
			},	     
		    type: 'POST',
		    url: pfs.comm.basePath+'/myCollection/isCollected',
		    dataType:'json',
		    success:function(response){
		    	 
		    		if(callback){
		    			
		    			callback(response);
		    		
		    	}
		    },
			error:function(response){
			    	
			}
		});
	},
	
	
	//评价
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	//工作流部分//////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////
	
	successFunc_need_show : function(request, status){

		var firstJoiner = "&";
		if(request.realFormPath.indexOf("?")<0){
			firstJoiner = "?";
		}
		if(pfs.bizId==null){
			pfs.openWinTab.location.href = path+request.realFormPath+firstJoiner+"TASK_ID_="+request.TASK_ID_+"&PROC_INST_ID_="+request.PROC_INST_ID_+"&b=null";
		}
		else{
			pfs.openWinTab.location.href = path+request.realFormPath+firstJoiner+"TASK_ID_="+pfs.task_id+"&PROC_INST_ID_="+pfs.proc_inst_id+"&b="+pfs.bizId;
		}
	},

	successFunc_no_need_show : function(request, status){
		if(pfs.openWinTab!=window){
			pfs.openWinTab.close();
		}
		pfs.comm.showDialog("流程启动成功，但由于该环节未配置表单地址，不能正常打开详细界面，请联系管理员！");
	},

	errorFunc : function(request, status){
		if(pfs.openWinTab!=window){
			pfs.openWinTab.close();
		}
		pfs.comm.showDialog("流程启动失败！");
	},
	//申请填报
	startFill : function(procKey,target){
		
		pfs.bizId = null;
		if("_self"==target){
			pfs.openWinTab = window;
		}
		else{
			pfs.openWinTab=window.open('about:blank');
		}
		
		_wfCommon.startProcessByKey(procKey,null,pfs.comm.successFunc_need_show,pfs.comm.successFunc_no_need_show, pfs.comm.errorFunc,false);
		
	},
	//流转审批
	lzsp : function(task_id,bizId,proc_inst_id,target){
		pfs.task_id = task_id;
		pfs.bizId = bizId;
		pfs.proc_inst_id = proc_inst_id;
		if("_self"==target){
			pfs.openWinTab = window;
		}
		else{
			pfs.openWinTab=window.open('about:blank');
		}
	 	_wfCommon.doTask(task_id,bizId,proc_inst_id,pfs.comm.successFunc_need_show,pfs.comm.successFunc_no_need_show, pfs.comm.errorFunc,false);
	},
	//申请查看
	sqck :function(proc_def_id_,bizId,proc_inst_id,task_id,target){
		if("_self"==target){
			pfs.openWinTab = window;
		}
		else{
			pfs.openWinTab=window.open('about:blank');
		}
	 	$.ajax({
			url : pfs.comm.basePath + '/dynamicDrawForm/querySqckUrl?random='+ Math.random(),
			type : 'post',
			dataType : 'json',
			data : {
				proc_def_id_:proc_def_id_
			},
			success : function(request){
				var firstJoiner = "&";
				if(request.realFormPath.indexOf("?")<0){
					firstJoiner = "?";
				}
				if(request.success){
					pfs.openWinTab.location.href = request.realFormPath+firstJoiner+"b="+bizId+"&PROC_INST_ID_="+proc_inst_id+"&TASK_ID_="+task_id;
				}else{
					if(pfs.openWinTab!=window){
						pfs.openWinTab.close();
					}
					pfs.comm.showDialog("错误", request.msg);
				}
			},
			error : function(request, status){
				if(pfs.openWinTab!=window){
					pfs.openWinTab.close();
				}
				pfs.comm.showDialog("错误", "获取查看流程信息表单地址失败！");
			}
		});
	 }
}