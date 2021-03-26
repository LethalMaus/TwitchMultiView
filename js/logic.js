var url = new URL(window.location.href);
var channels = url.searchParams.get("channels").split(",");

function startPlayers() {
	channels = [];
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
        document.getElementById("main").style.display = "none";
        if (channels.length >= 1) {
            new Twitch.Embed("player1", { width: "100%", height: "100%", channel: channels[0], layout: "video", parent: ["lethalmaus.github.io"] });
        }
        if (channels.length >= 2) {
            new Twitch.Embed("player2", { width: "100%", height: "100%", channel: channels[1], layout: "video", parent: ["lethalmaus.github.io"] });
        }
        if (channels.length >= 3) {
            new Twitch.Embed("player3", { width: "100%", height: "100%", channel: channels[2], layout: "video", parent: ["lethalmaus.github.io"] });
        }
        if (channels.length >= 4) {
            new Twitch.Embed("player4", { width: "100%", height: "100%", channel: channels[3], layout: "video", parent: ["lethalmaus.github.io"] });
        }
        resizePlayers();
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

window.ondeviceorientation = function(event) { 
    resizePlayers();
};

function setFocus(event, elementId) {
    if (event.keyCode === 13) {
        document.getElementById(elementId).focus();
    }
}

createPlayers();