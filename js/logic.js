var url = new URL(window.location.href);
var channels = url.searchParams.get("channels").split(",");
var lurk = url.searchParams.get("lurk");
var token = url.searchParams.get("token");

function startPlayers() {
    var channel1 = document.getElementById("channel1").value;
    var channel2 = document.getElementById("channel2").value;
    var channel3 = document.getElementById("channel3").value;
    var channel4 = document.getElementById("channel4").value;
    if (channel1.length > 0) {
        channels.push(channel1.replace(/\s/g, ""));
    }
    if (channel2.length > 0) {
        channels.push(channel2.replace(/\s/g, ""));
    }
    if (channel3.length > 0) {
        channels.push(channel3.replace(/\s/g, ""));
    }
    if (channel4.length > 0) {
        channels.push(channel4.replace(/\s/g, ""));
    }
    createPlayers();
}

function createPlayers() {
    if (channels.length > 0) {
        if (lurk) {
            document.getElementById("main").innerHTML = "";
            for (var i = 0; i < channels.length; i++) {
                var audio_stream = '<video autoplay muted src="' + getLurkUrl(channels[i]) + '"></video>'
                document.getElementById("main").innerHTML += audio_stream;
            }
        } else {
            document.getElementById("main").style.display = "none";
            if (channels.length >= 1) {
                this.player = new Twitch.Player("player1", { width: "100%", height: "100%", channel: channels[0] });
            }
            if (channels.length >= 2) {
                new Twitch.Player("player2", { width: "100%", height: "100%", channel: channels[1] });
            }
            if (channels.length >= 3) {
                new Twitch.Player("player3", { width: "100%", height: "100%", channel: channels[2] });
            }
            if (channels.length >= 4) {
                new Twitch.Player("player4", { width: "100%", height: "100%", channel: channels[3] });
            }
            resizePlayers();
        }
    } else {
        document.getElementById("main").style.display = "block";
    }
}

function resizePlayers() {
    if (channels.length > 0) {
        if (channels.length == 1) {
            document.getElementById("player1").className = "full";
        } else if (channels.length == 2) {
            if (window.innerWidth > window.innerHeight) {
                document.getElementById("player1").className = "half-horizontal";
                document.getElementById("player2").className = "half-horizontal";
            } else {
                document.getElementById("player1").className = "half-vertical";
                document.getElementById("player2").className = "half-vertical";
            }
        } else if (channels.length == 3) {
            if (window.innerWidth > window.innerHeight) {
                document.getElementById("player1").className = "half-horizontal";
                document.getElementById("player2").className = "quarter";
                document.getElementById("player3").className = "quarter";
            } else {
                document.getElementById("player1").className = "third-outer";
                document.getElementById("player2").className = "third-inner";
                document.getElementById("player3").className = "third-outer";
            }
        } else if (channels.length == 4) {
            document.getElementById("player1").className = "quarter";
            document.getElementById("player2").className = "quarter";
            document.getElementById("player3").className = "quarter";
            document.getElementById("player4").className = "quarter";
        }
    }
}

function getLurkUrl(channel) {
    var getSig = new XMLHttpRequest();
    getSig.onreadystatechange = function() { 
        if (getSig.readyState == 4 && getSig.status == 200) {
            var response = JSON.parse(getSig.responseText);
            var getM3U8 = new XMLHttpRequest();
            getM3U8.onreadystatechange = function() { 
                if (getM3U8.readyState == 4 && getM3U8.status == 200) {
                   var audio_stream = getM3U8.responseText.substring(getM3U8.responseText.indexOf('VIDEO="audio_only"')+18);
                   console.log(audio_stream);
                   return audio_stream;
                }
            }
            getM3U8.open("GET", "https://usher.ttvnw.net/api/channel/hls/" + channel + ".m3u8?allow_source=true&allow_audio_only=true&baking_bread=true&baking_brownies=true&baking_brownies_timeout=1050&fast_bread=true&p=9293905&player_backend=mediaplayer&playlist_include_framerate=true&reassignments_supported=true&sig=" + response.sig + "&token=" + encodeURI(response.token), true); 
            getM3U8.send();
        }
    }
    getSig.open("GET", "https://api.twitch.tv/api/channels/" + channel + "/access_token?need_https=true&oauth_token=" + token + "&platform=web&player_backend=mediaplayer&player_type=embed", true);
    getSig.setRequestHeader("Access-Control-Allow-Origin", "*");
    getSig.send();
}

window.ondeviceorientation = function(event) { 
    resizePlayers();
};

function setFocus(event, elementId) {
    if (event.keyCode === 13) {
        document.getElementById(elementId).focus();
    }
}

createPlayers();