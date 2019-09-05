Aurora.Printer = function(){
    var num = 0;    
    var reload_ds = [];    

    var findGridColumn = function(dom,cols){
        var dom = Ext.fly(dom),r = {};
        Ext.each(cols,function(c){
            var name = dom.getAttributeNS("","dataindex");
            if(c.name && c.name.toLowerCase() === name.toLowerCase()){
                r = c;
                return false;
            }
        });
        return r;
    }
    
    var processTextArea = function(textArea){
        Ext.DomHelper.insertBefore(textArea.wrap,'<span class="prt">'+textArea.wrap.dom.value+'</span>');
        textArea.wrap.addClass('prt_h');
    
    }
    var processRadio = function(radio){
        var cw = radio.wrap.child('div.item-radio-img-c');
        if(cw){
            var label = cw.parent().child('label.item-radio-lb').dom.innerHTML;
            Ext.DomHelper.insertBefore(radio.wrap,'<span class="prt">'+label.substr(1,label.length)+'</span>');
        }
        radio.wrap.addClass('prt_h');
    }
    
    var processCheckBox = function(cb){
        var cw = cb.wrap.child('div.item-ckb-c');
        if(cw){
            var label = cw.parent().child('label').dom.innerHTML;
            Ext.DomHelper.insertBefore(cb.wrap,'<span class="prt">'+label+'</span>');
        }
        cb.wrap.addClass('prt_h');
    }
    
    var proceeGridCell = function(dom){
        var c = Ext.fly(dom).child("div.grid-ckb")||Ext.fly(dom).child("div.table-ckb");
        if(c){
            return c.hasClass('item-ckb-c') ? '√' : '';
        } else{
            var cell = Ext.fly(dom).child("div.grid-cell")||Ext.fly(dom).child("div.table-cell")
            return cell ? cell.dom.innerHTML : ''
        } 
    }
    var convertGridToTable = function(grid,isClear){
        if(isClear!=false)grid.un('render',convertGridToTable);
        var heads = Ext.DomQuery.select('td[atype=grid.head]',grid.wrap.dom),style='width:100%;border-collapse:collapse;';
        
        var htmls = ['<table style="'+style+'" border="1" cellSpacing="0" cellPadding="0"><tbody><tr>'];
        
        for(var i=0;i<heads.length;i++){
            var c = findGridColumn(heads[i],grid.columns);
            if(c.printable!=='false'){
                htmls.push('<th style="text-align:center;padding:3px;font-weight:bold">');
                htmls.push(heads[i].innerHTML);
                htmls.push('</th>');
            }
        }
        htmls.push('</tr>');
        var lb = grid.wrap.child('.grid-lb'),ub = grid.wrap.child('.grid-ub');
        if(ub){
            var urows = Ext.DomQuery.select('tr',ub.dom);
            if(urows){
                var lrows = lb ? Ext.DomQuery.select('tr',lb.dom) : [];
                for(var i=1;i<urows.length;i++){
                    htmls.push('<tr>');
                    if(lrows.length>0){
                        var ltr = lrows[i], tds = Ext.DomQuery.select('td',ltr);
                        for(var k=0;k<tds.length;k++){
                            var type = grid.columns[k].type;
                            if(type=='rowcheck'||type=='rowradio') continue;
                            var c = findGridColumn(tds[k],grid.columns);
                            if(c.printable!=='false'){
                                htmls.push('<td class="prt-cell"');
                                htmls.push('style="text-align:'+Ext.fly(tds[k]).getStyle('text-align')+'">');
                                htmls.push(proceeGridCell(tds[k]));
                                htmls.push('</td>');
                            }
                        }
                       
                    }
                    var utr = urows[i],tds = Ext.DomQuery.select('td',utr);
                    for(var k=0;k<tds.length;k++){
                        var c = findGridColumn(tds[k],grid.columns);
                        if(c.printable!=='false'){
                            htmls.push('<td class="prt-cell"');
                            htmls.push('style="text-align:'+Ext.fly(tds[k]).getStyle('text-align')+'">');
                            htmls.push(proceeGridCell(tds[k]));
                            htmls.push('</td>');
                        }
                    }
                    
                }
            }
        }
        htmls.push('</tbody></table>');        
        Ext.DomHelper.insertBefore(grid.wb,'<span class="prt">'+htmls.join('')+'</span>');
        grid.wb.addClass('prt_h');
        if(isClear!=false)num--;
    }
    
    var convertTableToTable = function(grid,isClear){
        if(isClear!=false)grid.un('render',convertTableToTable);
        var heads = Ext.DomQuery.select('td.table-hc',grid.wrap.dom),style='width:100%;border-collapse:collapse;';
        
        var htmls = ['<table style="'+style+'" border="1" cellSpacing="0" cellPadding="0"><tbody><tr>'];
        for(var i=0;i<heads.length;i++){
            var c = findGridColumn(heads[i],grid.columns);
            if(c.printable!=='false'){
                htmls.push('<th style="text-align:center;padding:3px;font-weight:bold">');
                htmls.push(heads[i].innerHTML);
                htmls.push('</th>');
            }
        }
        htmls.push('</tr>');
        var bodys = Ext.DomQuery.select('tbody',grid.wrap.dom)[0]
        if(bodys){
            for(var i=0;i<bodys.childNodes.length;i++){
                htmls.push('<tr>');
                var utr = bodys.childNodes[i],tds = Ext.DomQuery.select('td',utr);
                for(var k=0;k<tds.length;k++){
                    var c = findGridColumn(tds[k],grid.columns);
                    if(c.printable!=='false'){
                        htmls.push('<td class="prt-cell"');
                        htmls.push('style="text-align:'+Ext.fly(tds[k]).getStyle('text-align')+'">');
                        htmls.push(proceeGridCell(tds[k]));
                        htmls.push('</td>');
                    }
                }
                
            }
        }
        htmls.push('</tbody></table>');        
        Ext.DomHelper.insertBefore(grid.wrap,'<span class="prt">'+htmls.join('')+'</span>');
        grid.wrap.addClass('prt_h');
        if(isClear!=false)num--;
    }
    
    var processGrid = function(grid,callback){
       var ds = grid.dataset;
       if(ds.queryurl!=''){
           reload_ds.push(ds)
           ds.fetchall = true;
           ds.autocount = false;
           num++;
           grid.on('render',callback)
           ds.query();
       }else {
            callback(grid,false);
       }
    }
    
    
    var processButton = function(btn){
        btn.wrap.addClass('prt_h');
    }
    
    return {
         doPrint : function(){
            var screenWidth = $A.getViewportWidth(),screenHeight = $A.getViewportHeight();
            var p = '<div class="prt-win" style="POSITION: absolute;top:0px;left:0px;Z-INDEX: 10000;background-color:#fff;width:100%;height:100%"><DIV class="prt-ct" style="border:1px solid #ccc;Z-INDEX: 10000; width: 300px;line-height:150px;; POSITION: absolute;text-align:center;-webkit-box-shadow:1px 1px 7px 1px rgba(128,128,128,0.3);box-shadow:1px 1px 7px 1px rgba(128,128,128,0.3);" >正在处理打印请求...</DIV></DIV>'
            this.pwin = Ext.get(Ext.DomHelper.insertFirst(Ext.getBody(),p));
            
            var sl = document[Ext.isStrict?'documentElement':'body'].scrollLeft,st = document[Ext.isStrict?'documentElement':'body'].scrollTop;
            var x = sl+Math.max((screenWidth - 300)/2,0) ,y = st+Math.max((screenHeight -150)/2,0);
            Ext.fly(this.pwin).child('.prt-ct').moveTo(x,y)
            
            
            //process form
            var af = Ext.DomQuery.select(".layout-form");
            if(af.length >0){
                for(var i=0;i<af.length;i++){
                    var form = af[i];
                    form.border="1";
                    var tBodies = form.tBodies[0];
                    if(tBodies && tBodies.childNodes.length >0){
                        var first = tBodies.childNodes[0],last = tBodies.childNodes[tBodies.childNodes.length-1];
                        if(first) Ext.fly(first).addClass('prt_h');
                        if(last) Ext.fly(last).addClass('prt_h');
                    }
                }
            }
            
            
            var cache = $A.CmpManager.cache;
            if(cache){
                for(var key in cache){
                    var cmp = cache[key];
                    if($A.Grid &&　cmp instanceof $A.Grid){
                        processGrid(cmp,convertGridToTable)
                    }else if($A.Table &&　cmp instanceof $A.Table){
                        processGrid(cmp,convertTableToTable)
                    }else if(cmp instanceof $A.Radio){
                        processRadio(cmp)
                    }else if(cmp instanceof $A.CheckBox){
                        processCheckBox(cmp)
                    }else if(cmp instanceof $A.Button){
                        processButton(cmp)
                    }else if(cmp instanceof $A.TextArea){
                        processTextArea(cmp)
                    }
                }
            }
            var sf = this;
            var intervalId = setInterval(function(){
                if(num!=0){
                    
                    return;
                }
                clearInterval(intervalId);
                Ext.fly(sf.pwin).child('.prt-ct').update('<a href="javascript:Aurora.Printer.unPrint()" style="font-size:18px;text-decoration:underline ">完成打印</a>');
                window.print();
            },10);
        },        
        unPrint : function(){
            for(var i=0;i<reload_ds.length;i++){
               var ds = reload_ds[i]
               ds.fetchall = false;
               ds.autocount = true;
               ds.query();
            }
            
            
            this.pwin.remove();
            var ap = Ext.DomQuery.select(".prt");
            if(ap.length >0){
                for(var i=0;i<ap.length;i++){
                    var p = ap[i];
                    Ext.fly(p).remove();
                }
            }
            
            var ap = Ext.DomQuery.select(".prt_h");
            if(ap.length >0){
                for(var i=0;i<ap.length;i++){
                    var p = ap[i];
                    Ext.fly(p).removeClass('prt_h');
                }
            }
            
            var af = Ext.DomQuery.select(".layout-form");
            if(af.length >0){
                for(var i=0;i<af.length;i++){
                    var form = af[i];
                    form.border="0";
                }
            }
        }
    }
    
}()

