chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  },
  function (array_of_Tabs) {
    var tab = array_of_Tabs[0];
    //tab.url; - url of the active tab

    //chrome.tabs.executeScript(tab.id, {code: "chrome.runtime.sendMessage(document.getElementsByTagName('html')[0].innerHTML);"});
    chrome.tabs.executeScript(tab.id, {
      code: "chrome.runtime.sendMessage(document.querySelector('meta[name=buildinfo]').content);"
    });
  });

chrome.runtime.onMessage.addListener(function (request) {
  //document.getElementsByTagName('html')[0].innerHTML = request;
  //document.querySelectorAll("version")[0].text(request);
  var html = "";

  if (request && request.includes("|")) { // should the data be available, let's process it to present it
    var infoList = request.split("|");
    [].forEach.call(infoList, function (info) {
      var urlR = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
      var url= info.match(urlR);  
      
      if (info.indexOf("http") >= 0)
      {
        html += "<p><a href='" + info.replace(0, info.indexOf("http")) + "' target='_blank' alt='" + info + "'>" + info + "</a></p>";
      }
      else {
        html += "<p>" + info + "</p>";
      }
    });

    document.getElementsByClassName("version")[0].innerHTML = html;
  }
  else{
    document.getElementsByClassName("version")[0].innerHTML = "<p>no version on this page</p>";
  }
});