////////////////////////////////////////////////////////////////////////////////

// http://stackoverflow.com/questions/1634748/how-can-i-delete-a-query-string-parameter-in-javascript
function removeURLParameter(url, parameter) {
    var urlparts= url.split('?');   
    if (urlparts.length>=2) {

        var prefix= encodeURIComponent(parameter)+'=';
        var pars= urlparts[1].split(/[&;]/g);

        for (var i= pars.length; i-- > 0;) {    
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {  
                pars.splice(i, 1);
            }
        }
        url= urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
        return url;
    } else {
        return url;
    }
}
//http://stackoverflow.com/questions/6953944/how-to-add-parameters-to-a-url-that-already-contains-other-parameters-and-maybe
function addParam(url, param, value) {
   var a = document.createElement('a'), regex = /(?:\?|&amp;|&)+([^=]+)(?:=([^&]*))*/g;
   var match, str = []; a.href = url; param = encodeURIComponent(param);
   while (match = regex.exec(a.search))
       if (param != match[1]) str.push(match[1]+(match[2]?"="+match[2]:""));
   str.push(param+(value?"="+ encodeURIComponent(value):""));
   a.search = str.join("&");
   return a.href;
}

////////////////////////////////////////////////////////////////////////////////


function changeUrl(){
    browser.tabs.query({ currentWindow: true, active: true }, function(tabs){
        var url = tabs[0].url;
        if(url.indexOf("XDEBUG_PROFILE") > -1) {
            var newUrl = removeURLParameter(url,"XDEBUG_PROFILE");
        }
        else {
            var newUrl = addParam(url,"XDEBUG_PROFILE","1");
        } 

        updateProperties = new Object();
        updateProperties.url = newUrl;
        browser.tabs.update(tabs[0].id, updateProperties, function() {
            // Anything else you want to do after the tab has been updated.
        });     
    });
    window.close();
};

// Event binding.
browser.browserAction.onClicked.addListener(changeUrl());