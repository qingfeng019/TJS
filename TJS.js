
(function(win, undefined){
	var TJS=function(selector,context) {
		return new TJS.fn.init(selector,context);
	};
	
	//=======================================
	TJS.fn=TJS.prototype={
		constructor:TJS,
		init:function(selector,context) {
			context=context||document;
			var id1=selector+'';
			if(id1.indexOf('#')>-1) {
				this[0]=document.getElementById(selector.slice(1));
				try{ this.length=1; }catch(e){ }
			}
			this.context=context;
			this.selector=selector;
			return this;
		},
		push:[].push,
		sort:[].sort,
		splice:[].splice		
	};
	
	
	//=======================================
	TJS.extend=TJS.fn.extend=function() {
		var i=1, len=arguments.length, target=arguments[0], j;
		if(i===len) { target=this; i--; }
		for(; i<len; i++) { for(j in arguments[i]) { target[j]=arguments[i][j]; } } //参数合并到target
		return target;
	};
	
	//=======================================
	//对象函数 $(#'id').Hide();
	TJS.fn.extend({
		css:function(key,val) { if(this[0]) this[0].style[TJS.hump(key)]=val; },
		style:function(val) { if(this[0]) this[0].style.cssText=val; },
		Html:function(str) { if(this[0]) this[0].innerHTML=str; },
		html:function() { if(this[0]) return this[0].innerHTML; else return ''; },
		attr:function(key) { if(this[0]) return this[0].getAttribute(key); },
		Attr:function(key,val) { if(this[0]) this[0].setAttribute(key,val); }
	})
	
	//=======================================
	//静态函数 $.Host();
	TJS.extend({
		sp:function() { return String.prototype; },
		ap:function() { return Array.prototype; },
		GetId:function(id) { if(id.indexOf('#')>-1) id=id.RightStr('#'); return document.getElementById(id); },
		Show:function(obj) { if(typeof(obj)=='string') obj=T.GetId(obj); obj.style.display='block'; },
		Hide:function(obj) { if(typeof(obj)=='string') obj=T.GetId(obj); obj.style.display='none'; },
		IsHide:function(obj) { if(obj.style.display=='none') return true; else return false; },
		ShowHide:function(obj) { if(obj.style.display=='none') obj.style.display='block'; else obj.style.display='none'; },
		evx:function() { return window.event.clientX; },
		evy:function() { return window.event.clientY; },
		evf:function() { window.event.returnValue=false; window.event.cancelBubble=true; },
		hump:function(str) { return str.replace(/\-(\w)/g, function(all,letter){ return letter.toUpperCase();}); },
		IsObj:function(obj) { if(typeof(obj)=='undefined') return false; else return true; },
		Del:function(obj) { if(obj) obj.parentNode.removeChild(obj); },
		DelId:function(id) { T.Del(T.GetId(id)); },
		IsFunc:function(fname) { var bRet=false; try { if(typeof(fname) == 'function') bRet=true; } catch(e) { bRet=false; } return bRet; },
		IsPhone:function() { var sys1=navigator.platform.toLowerCase(); if(sys1.indexOf('win')>-1) return false; else return true; },
		Host:function() { var host=window.location.href; host=host.RightStr('://'); host=host.LeftStr('/'); return host; },
		DocH:function() { var hgt1=document.documentElement.clientHeight; var hgt2=document.body.clientHeight; if(hgt2>hgt1) hgt1=hgt2; return hgt1; },
		DocW:function() { var wid1=document.documentElement.clientWidth; var wid2=document.body.clientWidth; if(wid2>wid1) wid1=wid2; return wid1;  },
		Cdiv:function(id,css1) { if(T.GetId(id)) return T.GetId(id); var div1=document.createElement('div'); document.body.appendChild(div1); div1.setAttribute('id',id); div1.style.cssText=T.css(css1); return div1; },
		Size:function(obj,w,h) { if(!obj) return; if(w>-1) obj.style.width=w+'px'; if(h>-1) obj.style.height=h+'px'; },
		RndN:function(n) { return Math.round(Math.random()*n); },
		RndId:function() { return 'id_'+T.RndN(9999); },
		Browser:function() { var bl=navigator.userAgent; if(bl.Inc('MSIE 7.0') || bl.Inc('MSIE 8.0') || bl.Inc('MSIE 9.0')) return 'IE9'; return 'GL'; },
		log:function(s) { if(T.Browser()!='IE9') console.log('001:'+s); },
		test:function() { var s1='aabbcc'; alert(s1.RightN(3)); }		
	})
	
	
	//=======================================
	//时间函数
	TJS.extend({
		DataFmt:function(date,fmStr) {
			if(fmStr=='') fmStr='yyyy-MM-dd hh:mm:ss';
			var ret=fmStr;
			var z1=['yyyy','MM','dd','hh','mm','ss'];
			var z2=[date.getFullYear(),date.getMonth()+1,date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds()];
			for(var i=0;i<z1.length;i++) ret=ret.replace(z1[i],z2[i]);
			return ret;
		},
		Now:function() { return T.DataFmt(new Date(),''); },
		NowI:function() { var d=new Date(); return parseInt(d.getTime() / 1000); },
		NowIM:function() { var d=new Date(); return d.getTime(); },
		NowL:function() { return T.DataFmt(new Date(),'yyyyMMddhhmmss'); },
		NowH:function() { return T.DataFmt(new Date(),'hh:mm:ss'); }
	})
	
	//=======================================
	//AJAX
	TJS.extend({
		XMLHttp:function() {
			var http1;
			if(!http1 && typeof XMLHttpRequest!='undefined') { try{ http1=new XMLHttpRequest(); }catch(e){ http1=false; alert('xmlhttp err'); }}
			else{ http1=new ActiveXObject('Microsoft.XMLHTTP'); }
			return http1;
		},
		Ajax:function(url,callback) {
			var http2=T.XMLHttp();
			http2.open('GET',url,true);
			http2.onreadystatechange=function(){ if(http2.readyState==4) { callback(http2.responseText); } }
			http2.send('');
		},	
		LoadJs:function(src,callback) {		//动态加载JS
			var script1=document.createElement('script');
			var head=document.getElementsByTagName('head')[0];
			script1.type='text/javascript';
			script1.charset='UTF-8';
			script1.src=src;
			if(script1.addEventListener) { script1.addEventListener('load',function() { callback(); },false); }
			else if(script1.attachEvent) { script1.attachEvent('onreadystatechange',function() { var target=window.event.srcElement; if(target.readyState=='loaded') callback(); }); }
			head.appendChild(script1);
		}
	})
	
	
	//=======================================
	//CSS字符串
	var m1='filter: progid:DXImageTransform.Microsoft';
	TJS.extend({
		css:function(val) {
			if(val.indexOf('style:')>-1) return val.RightStr('style:');
			if(val.indexOf('css:')>-1) val=val.RightStr('css:');
			var css1='';
			var cs1=['po','bd','w','h','ag','rd','bg','cl','ov','zi','cu','fn','sc','lh','sw','jb','bgi','tfx']; 
			var cs2=['position:','border:','width:','height:','text-align:','border-radius:','background-color:','color:','overflow:','z-index:','cursor:','font-size:','scroll:','line-height:','','','',''];
			var cs3=['a=absolute','1=1px solid #999999|0=0px','%=100%|+px','%=100%|+px','c=center|r=right','+px','1=#FFFFFF','1=#000080|2=#FFFFFF','h=hidden|a=auto','','p=pointer|m=move|+-resize','+pt','a=auto|n=no','+px','csn','csn','csn','csn'];
			var css1='',len1=cs1.length;
			for(var i=0;i<len1;i++) {
				var v1=val.v1(cs1[i]);
				if(v1!='') {
					if(cs3[i]!='') {
						var cs31=cs3[i].split('|');
						for(var j=0;j<cs31.length;j++) {
							if(cs31[j].indexOf('=')>-1) { var cs3l=cs31[j].LeftStr('='); var cs3r=cs31[j].RightStr('='); if(v1==cs3l) { v1=cs3r; break; } }
							if(cs31[j].indexOf('+')>-1) { if(v1.indexOf('%')==-1) { v1+=cs31[j].RightStr('+'); } }
							if(cs31[j].indexOf('csn')>-1) { v1=T.csn(v1,val); }
						}
					}
					css1+=cs2[i]+v1+';';
				}
			}
			return css1;
		},
		csx:function(c,val) {
			if(!val) val='';
			var wh='w:100%,h:100%,',td='bd:1,rd:3,cl:1,bg:1,cu:p,jb:';
			var dv0='ag:c,ov:h,cu:p,lh:100%,cl:';
			var w0='po:a,w:80%,h:85%,bg:#3CB0F7,ov:h,sw:sw1,jb:jb1';
			var c1=['w0','d0','td1','td2','d1','d2','ifm'];
			var v1=[w0,wh+'ov:h',td+'jb2,w:25,h:16',td+'jb3,w:30,h:16',wh+dv0+'1',wh+dv0+'2',wh+'bd:0,sc:n'];
			for(var i=0;i<c1.length;i++) { if(c==c1[i]) return v1[i]; }
			return val;
		},
		csn:function(c,val) {
			var jb=['#8BD0FA|#3CB0F7|y','#FFFFFF|#E1F3FF|y','#D84D4B|#C12D28|y','#00FFFF|#0080FF|y'];
			for(var i=0;i<jb.length;i++) { if(c=='jb'+(i+1)) return T.csjb1(jb[i]); }
			if(c=='sw1') return T.shad();
			if(c=='tfx') return 'table-layout:fixed; word-break: break-all; word-wrap: break-word;';
			if(c=='bg1') return T.bgimg(c,val);
		},
		bgimg:function(c,val) {
			var val1=val.v2('c','no-repeat|center|null');  var bg2=val1.split('|'),b='background-'; 
			var img2=bg2[2]; if(img2=='null') img2=val.v1('bgimg'); 
			return b+'repeat:'+bg2[0]+'; '+b+'position:'+bg2[1]+'; '+b+'image:url('+img2+');'
		},
		shad:function(val) {
			var s1='box-shadow:0 1px 6px rgba(0,0,0,0.5);';
			var ms=m1+'.Shadow(Strength=4, Direction=135, Color=#000000);';
			var ret='border:1px solid #FFFFFF; border-radius:5px;';
			ret+=s1; ret+='-moz-'+s1; ret+='-webkit-'+s1; ret+=ms; ret+='-ms-'+ms; return ret;
		},
		cssjb:function(cl1,cl2,fx) { //css渐变
			var ret='';
			var blw=['webkit','moz','ms','o'];
			var fx0='bottom', fx1='top', fx2='0% 100%', fx3='0';
			if(fx=='x') { fx0='right'; fx1='left'; fx2='100% 0%', fx3='1'; }
			ret+='background:linear-gradient(to '+fx0+','+cl1+','+cl2+');';
			for(var i=0;i<4;i++) ret+='background:-'+blw[i]+'-linear-gradient('+fx1+','+cl1+','+cl2+');';
			ret+='background:-webkit-gradient(linear,0% 0%,'+fx2+',from('+cl1+'), to('+cl2+'));'
			ret+=m1+'.Gradient(gradientType='+fx3+',startColorStr='+cl1+',endColorStr='+cl2+');'
			return ret;
		},
		csjb1:function(val) { var jbs=val.split('|'), ret=''; ret+=T.cssjb(jbs[0],jbs[1],jbs[2]); return ret; }
	})	

	
	//=======================================
	//窗口拖动及移动事件
	var mobj=null;
	TJS.extend({
		objx:function() { this.obj=null; this.exc=''; this.x=null; this.y=null; this.w=null; this.h=null; this.l=null; this.t=null; },
		mup1:function() { mobj=null; mexc=''; },
		mdown:function(obj,exc) {
			mobj=new T.objx();
			mobj.obj=obj; mobj.exc=exc; mobj.x=T.evx(); mobj.y=T.evy();
			mobj.w=obj.offsetWidth; mobj.h=obj.offsetHeight;
			mobj.l=obj.offsetLeft; mobj.t=obj.offsetTop; T.evf();
		},
		move1:function() {
			if(mobj) {
				if(mobj.exc=='move') { mobj.obj.style.left=T.evx()-(mobj.x-mobj.l); mobj.obj.style.top=T.evy()-(mobj.y-mobj.t); T.evf(); return; }
				var fx=mobj.exc.RightStr('_'),m=30, cz=4; if(T.Browser()=='IE9') cz=0;
				if(fx.indexOf('s')>-1) { if((T.evy()-mobj.t)<(mobj.h-m)) { mobj.obj.style.top=T.evy(); mobj.obj.style.height=mobj.h+(mobj.t-T.evy()); }}
				if(fx.indexOf('x')>-1) { if((T.evy()-mobj.t)>m) { mobj.obj.style.height=T.evy()-mobj.t+cz; }}
				if(fx.indexOf('z')>-1) { if((mobj.w+mobj.l-T.evx())>m) { mobj.obj.style.left=T.evx(); mobj.obj.style.width=mobj.w+mobj.l-T.evx(); }}
				if(fx.indexOf('y')>-1) { if((T.evx()-mobj.l)>m) { mobj.obj.style.width=T.evx()-mobj.l+cz; }}
				T.evf();
			}
		},
		clk:function(id,val) {
			if(id.indexOf('_bctr')>-1) {
				var pid=id.LeftStr('_bctr'); pid=pid+'_01';
				var n=id.RightN(1), pobj=T.GetId(pid), frm1=val.v1('frm'), fobj=null;
				if(frm1!='') { fobj=T.GetId('ifm_'+frm1); }
				if(pobj) {
					if(n=='0') T.Hide(pobj);
					if(n=='1') alert('max/nor');
					if(n=='2') { T.Hide(pobj); if(fobj) { fobj.src=''; T.log('frmx');  } T.Del(pobj); }
				}
			}
			if(T.IsFunc('clickx')) clickx(id,val);
			T.log(id+'---'+val);
		},
		mdownx:function(id,val) {
			if(val.v1('mov')!='') { T.mdown(T.GetId(val.v1('mov')),'move'); }
			if(val.v1('siz')!='') { T.mdown(T.GetId(val.v1('siz')),val.v1('sif')); }
		}
	})
		
	
	//=======================================
	//UI基础库
	TJS.extend({
		Mid:function(obj,prt) {
			if(!prt) prt=document.body;
			var wid1=T.DocW(),hei1=T.DocH(),left1=0,top1=0;
			if(prt!=document.body) {  wid1=prt.offsetWidth; hei1=prt.offsetHeight; left1=prt.offsetLeft; top1=prt.offsetTop; }
			var wid2=obj.offsetWidth,hei2=obj.offsetHeight;
			if(wid2>wid1) wid2=wid1;
			if(hei2>hei1) hei2=hei1;
			var pad1=0,pads=obj.style.padding;
			if(pads.indexOf('px')>-1) pad1=(pads.LeftStr('px')).StoI();
			pad1*=2;
			var left2=(wid1-wid2)/2+left1-pad1,top2=(hei1-hei2)/2+top1-pad1;
			T.Loct(obj,left2,top2,wid2,hei2);
		},
		leftop:function(obj,s) {
			var l=obj.offsetLeft,t=obj.offsetTop,obj1=obj.offsetParent; 
			while(obj1!==null) { l+=obj1.offsetLeft; t+=obj1.offsetTop; obj1=obj1.offsetParent; } 
			if(s=='l') return l;
			else if(s=='t') return t;
			else return [l,t];
		},
		Loct:function(obj,x,y,w,h) { obj.style.left=x; obj.style.top=y; obj.style.width=w; obj.style.height=h; }
	})
	
	//=======================================
	//各类UI绘制及渲染
	TJS.extend({
		cwin:function(id,val) {
			if(!val) val='';
			var obj1=T.GetId(id+'_01'); if(obj1) { T.Show(obj1); return obj1; }
			var css1=T.csx('w0'); if(val!='') css1=val+','+css1;
			var rs1='resize',id1=id+'_01'; if(val.v1('type')=='no') rs1='no';
			var obj=T.Cdiv(id1,css1); 
			obj.innerHTML=T.tbr(id,'type:'+rs1);
			var obj2=T.GetId('dv_'+id); if(val.v1('w')=='') T.wsize(obj,1280,700);
			T.Mid(obj); return obj2;
		},
		dwin:function(id,title,val) {
			if(!val) val=''; if(!title) title='';
			var obj=T.cwin(id,val),id1=id+'_tle',td='ys:td,w:50%,md:e,mov:'+id+'_01';
			obj.innerHTML=T.tky(id,'30','');
			var tle1=T.htm(id1,'ys:tb,w:%,h:%,css:jb:jb1,cu:m')+'<tr>';
			tle1+=T.htm('tle_'+id,td)+T.title(title,'')+'</td>';
			tle1+=T.htm('ctr_'+id,td+',ag:r')+T.bctr(id,val)+T.tbf();
			T.GetId('dv_'+id+'1').innerHTML=tle1;
			return [T.GetId('dv_'+id+'2')];
		},
		Alert:function(str,title,val) {
			if(!val) val=''; if(!title) title='Message';
			var id1='alt_'+T.RndId(),ids=id1+'_01',sp='sp_'+id1,btn1=val.v2('btn1','Close');
			var obj=T.dwin(id1,title,'w:'+val.v2('w','400')+',h:'+val.v2('h','150')+',btn:2'); var objs=T.GetId(ids);
			var tb=T.htm(id1,'ys:tb,w:%,h:%,bd:0,cp:13')+'<tr><td>';
			tb+=T.htm(id1+'2','ys:tb,w:%,h:%,bd:0,cp:7')+'<tr><td id="td_'+id1+'"><span id="'+sp+'">'+str+'</span></td>';
			if(btn1!='null') { tb+='</tr><tr><td align="center">'+T.htm(id1+'_bctr2','ys:ip,ty:b,va:'+btn1+',ck:e,css:w:120,h:32')+'</td>'; }
			tb+='</tr></table>';  tb+=T.tbf(); obj[0].innerHTML=tb;
			if(T.GetId(sp).offsetHeight<25) T.GetId('td_'+id1).setAttribute('align','center');
			if(!val.Inc('w:')) T.fixs(objs,T.GetId('tb_'+id1),400,130,900,600);
			T.Mid(objs);
		},
		fixs:function(objw,objn,wmin,hmin,wmax,hmax) {
			var w1=objn.offsetWidth+8, h1=objn.offsetHeight;
			var wh=T.mjx(w1,h1,2.5); w1=wh[0]; h1=wh[1];
			if(w1<wmin) w1=wmin; if(h1<hmin) h1=hmin; if(w1>wmax) w1=wmax; if(h1>hmax) h1=hmax;
			T.Size(objw,w1,h1);
			var h2=objn.offsetHeight+40, ha=objw.offsetHeight;
			if(h2>ha) objw.style.height=h2+'px';
		},
		tbr:function(id,val) {
			if(!val) val='';
			var tb1=T.tbk(id,'css:bg:1,tfx:1')+'<tr>', id1=id+'_01', w=4;
			tb1+=T.tdr(id1,w,w,'se','zs',val)+T.tdr(id1,'',w,'s','s',val)+T.tdr(id1,w,w,'ne','ys',val)+'</tr><tr>';
			tb1+=T.tdr(id1,w,'','w','z',val);
			tb1+='<td bgcolor="white">'+T.htm(id,'ys:dv,css:w:%,h:%,ov:h')+'</div></td>';
			tb1+=T.tdr(id1,w,'','w','y',val)+'</tr><tr>';
			tb1+=T.tdr(id1,w,w,'ne','zx',val)+T.tdr(id1,'',w,'s','x',val)+T.tdr(id1,w,w,'se','yx',val);
			tb1+=T.tbf();
			return tb1;
		},
		ifm:function(id,url,val) {
			if(!val) val='';
			var sc=val.v2('sc','auto'), ful='allowfullscreen'; if(val.v1('ful')=='no') ful='';
			var css1=T.csx('ifm'); if(val.v1('css')!='')  css1=val+','+css1; var css2=T.css(css1);
			var ifm1='<iframe id="ifm_'+id+'" src="'+url+'" scrolling="'+sc+'" border=0 style="'+css2+'" '+ful+'></iframe>';
			return ifm1;
		},
		bctr:function(id,val) {
			if(!val) val=''; var id1=id+'_bctr0',id2=id+'_bctr1',id3=id+'_bctr2',btn=val.v1('btn'); if(btn=='') btn='012';
			var tb=T.htm(id1,'ys:tb,h:16,ag:r,cs:0')+'<tr>';
			var c1='ys:td,css:', c2='ys:dv,ck:e,css:'; if(val.v1('frm')!='') c2='ys:dv,ck:e,frm:'+val.v1('frm')+',css:';
			if(btn.Inc('0')) tb+=T.htm(id1,c1+T.csx('td1'))+T.htm(id1,c2+T.csx('d1'))+'－</div></td>';
			if(btn.Inc('1')) tb+=T.htm(id2,c1+T.csx('td1'))+T.htm(id2,c2+T.csx('d1'))+'□</div></td>';
			if(btn.Inc('2')) tb+=T.htm(id3,c1+T.csx('td2'))+T.htm(id3,c2+T.csx('d2'))+'×</div></td>'; 
			tb+='</tr></table>';
			return tb;
		},
		wsize:function(obj,w,h) {
			var wid1=obj.offsetWidth, hei1=obj.offsetHeight;
			if(wid1<w) wid1=w; if(hei1<h) hei1=h;
			if(wid1>T.DocW()) wid1=T.DocW()-30;
			if(hei1>T.DocH()) hei1=T.DocH()-30;
			T.Size(obj,wid1,hei1);
		},
		dvc:function(r,val) { if(!val) val=''; var jb1=val.v2('jb','jb4'); var str1=T.htm(T.RndId(),'ys:dv,css:bd:1,jb:'+jb1+',w:'+r+',h:'+r+',rd:'+(r/2+1)+','+val); return str1; },
		wfrm:function(id,url,title,val) { var obj=T.dwin(id,title,val+',type:no,frm:'+id); obj[0].innerHTML=T.ifm(id,url,''); },
		AlText:function(str,val) { T.Alert('<textarea id="tx_'+T.RndId()+'" style="width:100%;height:100%">'+str+'</textarea>','Message','w:600,h:300,btn1:null,'); },
		title:function(str,val) { if(!val) val=''; var c1=T.dvc(14,val); var tb1=T.tbk('id')+'<tr><td width="22">'+c1+'</td><td>'+str+T.tbf(); return tb1; },	
		objz:function(ids) {  var arr1=new Array(), idz=ids.split('|'); for(var i=0;i<idz.length;i++) { var objI=T.GetId(idz[i]); arr1.Add(objI); } return arr1; },		
		mjx:function(w,h,n) { var w1=w,h1=h,ht=h/10; if(h>w) ht=w/10; while(w1/h1<n) { w1+=ht; h1=(w*h)/w1; } return [w1,h1]; }
	})

	//=======================================
	//htm基础元素
	TJS.extend({
		htm:function(id,val) {
			if(!val) val=''; if(!id) id=T.RndId();
			var ys=['ys','w','h','bd','ag','vg','cs','cp','bg','wp','ty','sc','va','fu','sr','ck','dk','md','mv','mo','mt'];
			var st=['','width=','height=','border=','align=','valign=','cellspacing=','cellpadding=','bgcolor=','','type=','scrolling=','value=','','src=','onclick=','ondbclick=','onmousedown=','onmousemove=','onmouseover=','onmouseout='];
			var cs3=['tb=table|sp=span|dv=div|fm=iframe|ip=input|tx=textarea','%=100%','%=100%','','c=center|r=right','t=top|m=middle|b=bottom','','','1=#FFFFFF','n=nowrap','t=text|b=button|p=password','n=no|a=auto','','f=allowfullscreen','','e=T.clk(\''+id+'\',\''+val+'\')','e=T.dbclk(\''+id+'\',\''+val+'\')','e=T.mdownx(\''+id+'\',\''+val+'\')','e=T.movex(\''+id+'\',\''+val+'\')','e=T.moverx(\''+id+'\',\''+val+'\')','e=T.moutx(\''+id+'\',\''+val+'\')'];
			var css1=''; if(val.Inc('css:')) { css1=' style="'+T.css(val.RightStr('css:'))+'"'; val=val.LeftStr('css:'); }
			val=val.Trim();
			var id1='id="'+val.v1('ys')+'_'+id+'" ', ret='<', len1=ys.length;
			for(var i=0;i<len1;i++) {
				var v1=val.v1(ys[i]);
				if(v1!='') {
					if(cs3[i]!='') {
						var cs31=cs3[i].split('|');
						for(var j=0;j<cs31.length;j++) {
							if(cs31[j].indexOf('=')>-1) { var cs3l=cs31[j].LeftStr('='); var cs3r=cs31[j].RightStr('='); if(v1==cs3l) { v1=cs3r; break; } }
						}
					}
					if(st[i]!='') ret+=st[i]+'"'+v1+'" '; else ret+=v1+' ';
				}
				if(i==0) ret+=id1;
			}
			ret+=css1+'>';
			return ret;
		},
		tbk:function(id,val) { return T.htm(id,'ys:tb,w:%,h:%,bd:0,cs:0,cp:0',val); },  //框架table
		dvk:function(id,val) { return T.htm(id,'ys:dv,css:w:%,h:%,ov:h',val); },  //框架div
		tkx:function(id,w1,w2) { return T.tbk(id)+'<tr>'+T.htm(id+'1','ys:td,w:'+w1+',')+T.dvk(id+'1')+'</td>'+T.htm(id+'2','ys:td,w:'+w2+',')+T.dvk(id+'2')+T.tbf(); },
		tky:function(id,h1,h2) { return T.tbk(id)+'<tr>'+T.htm(id+'1','ys:td,h:'+h1+',')+T.dvk(id+'1')+'</td></tr><tr>'+T.htm(id+'2','ys:td,h:'+h2+',')+T.dvk(id+'2')+T.tbf(); },
		tdr:function(mid,w,h,c,f,val) { var td1='ys:td,h:'+h+',w:'+w+','; if(val.v1('type')!='no') td1+='md:e,siz:'+mid+',sif:size_'+f+',css:cu:'+c+','; return T.htm(T.RndId(),td1); },
		tbf:function() { return '</td></tr></table>'; }
	})
	
	//=======================================
	window.document.onmouseup=function() { T.mup1(); }
	window.document.onmousemove=function() { T.move1(); }
	
	TJS.fn.init.prototype=TJS.fn;
	window.TJS=window.T=TJS;
})(window);


//字符串函数
T.sp().RightN=function(n) { return this.substring(this.length-n,this.length); }
T.sp().LeftN=function(n) { return this.substring(0,n); }
T.sp().IsNum=function() { if(this=='' || this==null) return false; if(!isNaN(this)) return true; else return false; }
T.sp().StoI=function() { if(this.IsNum()) return parseInt(this); else return 0; }
T.sp().Trim=function() { return this.replace(/(^\s*)|(\s*$)/g, ''); }
T.sp().RightStr=function(fgStr) { var i=this.indexOf(fgStr); if(i>-1) return this.substring(i+fgStr.length,this.length); else return ''; }
T.sp().LeftStr=function(fgStr) { var i=this.indexOf(fgStr); if(i>-1) return this.substring(0,i); else return ''; }
T.sp().DelLeft=function(n) { return this.substring(n,this.length); }
T.sp().DelRight=function(n) { return this.substring(0,this.length-n); }
T.sp().MidStr=function(bgstr,endstr) { var strRgt=this.RightStr(bgstr); return strRgt.LeftStr(endstr); }
T.sp().GetVal=function(key1) { var key2='['+key1+']'; return this.MidStr(key2+'{','}'); }
T.sp().v1=function(key1) { var str1=','+this+','; var key2=','+key1+':'; return str1.MidStr(key2,','); }
T.sp().v2=function(key1,def) { var s=this.v1(key1); if(s=='') s=def; return s; }
T.sp().Inc=function(find) { if(this.indexOf(find)>-1) return true; else return false; }
T.sp().In=function(s) { if(s.indexOf(this)>-1) return true; else return false; }

//数组函数
T.ap().clear=function() { this.length=0; }
T.ap().InsertAt=function(i,obj) { this.splice(i,0,obj); }
T.ap().RemoveAt=function (i) { this.splice(i,1); }
T.ap().Remove=function(obj) { var i=this.indexOf(obj); if(i>0) this.RemoveAt(i); }
T.ap().Add=function(obj) { this.push(obj); }


