function changeCookie(){
    browser.tabs.query({ currentWindow: true, active: true }, function(tabs){
        updateProperties = new Object();
        updateProperties.code = 'if(document.cookie.indexOf("XDEBUG_PROFILE") > -1) document.cookie = "XDEBUG_PROFILE=; expires=Thu, 01 Jan 1970 00:00:00 UTC"; else document.cookie = "XDEBUG_PROFILE=1";';
        browser.tabs.executeScript(tabs[0].id, updateProperties, function() {
            
        });  
    });
    window.close();
};

browser.browserAction.onClicked.addListener(changeCookie());