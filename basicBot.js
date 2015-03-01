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
            chatLink: "https://rawgit.com/Yemasthui/basicBot/master/lang/en.json",
            songstats: true,
        },
        
        eventDjadvance: function (obj) {
        	if (obj == null) return; // no dj
        	
        	var str = "";
        	var currentDJ = obj.dj;
        	str += currentDJ.username;
        	        	  
        	str += " || " + obj.media.author + " || " + obj.media.title;
        	 
        	API.sendChat(str);
        },
        
        connectAPI: function () {
            this.proxy = {
                eventDjadvance: $.proxy(this.eventDjadvance, this)
            };
            API.on(API.ADVANCE, this.proxy.eventDjadvance);
        },
        
        disconnectAPI: function () {
            API.off(API.ADVANCE, this.proxy.eventDjadvance);
        },
        
        startup: function () {
            Function.prototype.toString = function () {
                return 'Function.'
            };
            basicBot.connectAPI();
            window.bot = basicBot;

            API.sendChat("Bot loaded successfully");
        }
    };

    loadChat(basicBot.startup);
    
}).call(this);
