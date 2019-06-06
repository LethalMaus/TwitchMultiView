//?channels=x,y,z&quality=low
var parameters = location.search.substring(1).split("&");
var channels = [];
var quality;

parameters.forEach(parameter => {
    if (parameter.includes("channels=")) {
        channels = parameter.substring(parameter.lastIndexOf("channels=")+9).split(",");
    } else if (parameter.includes("quality=")) {
        quality = parameter.substring(parameter.lastIndexOf("quality=")+8);
    }
});

if (channels.length > 0) {
    if (channels.length == 1) {
        new Twitch.Player("player1", { width: "100%", height: "100%", channel: channels[0] });
        document.getElementById("player1").className += " full";
    }
    if (channels.length == 2) {
        if (window.innerWidth > window.innerHeight) {
            document.getElementById("player1").className += " half-horizontal";
            document.getElementById("player2").className += " half-horizontal";
        } else {
            document.getElementById("player1").className += " half-vertical";
            document.getElementById("player2").className += " half-vertical";
        }
        new Twitch.Player("player1", { width: "100%", height: "100%", channel: channels[0] });
        new Twitch.Player("player2", { width: "100%", height: "100%", channel: channels[1] });
    }
    if (channels.length == 3) {
        if (window.innerWidth > window.innerHeight) {
            document.getElementById("player1").className += " half-horizontal";
            document.getElementById("player2").className += " quarter";
            document.getElementById("player3").className += " quarter";
        } else {
            document.getElementById("player1").className += " third-outer";
            document.getElementById("player2").className += " third-inner";
            document.getElementById("player3").className += " third-outer";
        }
        new Twitch.Player("player1", { width: "100%", height: "100%", channel: channels[0] });
        new Twitch.Player("player2", { width: "100%", height: "100%", channel: channels[1] });
        new Twitch.Player("player3", { width: "100%", height: "100%", channel: channels[2] });
    }
    if (channels.length == 4) {
        document.getElementById("player1").className += " quarter";
        document.getElementById("player2").className += " quarter";
        document.getElementById("player3").className += " quarter";
        document.getElementById("player4").className += " quarter";
        new Twitch.Player("player1", { width: "100%", height: "100%", channel: channels[0] });
        new Twitch.Player("player2", { width: "100%", height: "100%", channel: channels[1] });
        new Twitch.Player("player3", { width: "100%", height: "100%", channel: channels[2] });
        new Twitch.Player("player4", { width: "100%", height: "100%", channel: channels[3] });
    }
}