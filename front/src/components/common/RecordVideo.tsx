import $ from "jquery";
import { WebRtcPeer } from "kurento-utils";

// function RecordVideo() {
// var ws = new WebSocket(`wss://k8a305.p.ssafy.io:8443/recording`);
// 그럼 이게 spring으로 연결되어야 한다는 건가요??
var ws = new WebSocket(`wss://k8a305.p.ssafy.io/recording`);
ws.onerror = function (error) {
  console.log("WebSocket error: ", error);
};

ws.onclose = function (event) {
  console.log("WebSocket closed: ", event);
};

ws.onopen = function (event) {
  console.log("WebSocket opened: ", event);
};

var videoInput: HTMLElement | null;
var videoOutput: HTMLElement | null;
var myWebRtcPeer: any;
var state: number | null;

const NO_CALL = 0;
const IN_CALL = 1;
const POST_CALL = 2;
const DISABLED = 3;
const IN_PLAY = 4;

window.onload = function () {
  console.log("Page loaded ...");
  videoInput = document.getElementById("videoInput");
  videoOutput = document.getElementById("videoOutput");
  setState(NO_CALL);
};

window.onbeforeunload = function () {
  ws.close();
};

function setState(nextState: number) {
  switch (nextState) {
    case NO_CALL:
      $("#start").prop("disabled", false);
      $("#stop").prop("disabled", true);
      $("#play").prop("disabled", true);
      break;
    case DISABLED:
      $("#start").prop("disabled", true);
      $("#stop").prop("disabled", true);
      $("#play").prop("disabled", true);
      break;
    case IN_CALL:
      $("#start").prop("disabled", true);
      $("#stop").prop("disabled", false);
      $("#play").prop("disabled", true);
      break;
    case POST_CALL:
      $("#start").prop("disabled", false);
      $("#stop").prop("disabled", true);
      $("#play").prop("disabled", false);
      break;
    case IN_PLAY:
      $("#start").prop("disabled", true);
      $("#stop").prop("disabled", false);
      $("#play").prop("disabled", true);
      break;
    default:
      onError("Unknown state " + nextState);
      return;
  }
  state = nextState;
}

ws.onmessage = function (message) {
  var parsedMessage = JSON.parse(message.data);
  if (parsedMessage.id !== "iceCandidate") {
    console.log(parsedMessage.id);
    console.info("Received message: " + message.data);
  }

  switch (parsedMessage.id) {
    case "startResponse":
      startResponse(parsedMessage);
      break;
    case "playResponse":
      playResponse(parsedMessage);
      break;
    case "playEnd":
      playEnd();
      break;
    case "error":
      setState(NO_CALL);
      onError("Error message from server: " + parsedMessage.message);
      break;
    case "iceCandidate":
      myWebRtcPeer.addIceCandidate(parsedMessage.candidate, (error: JSON) => {
        if (error) return console.error("Error adding candidate: " + error);
      });
      break;
    case "stopped":
      break;
    case "paused":
      break;
    case "recording":
      break;
    default:
      setState(NO_CALL);
      onError("Unrecognized message" + parsedMessage);
  }
};

function start() {
  console.log("Starting video call ...");

  // Disable start button
  setState(DISABLED);
  // showSpinner(videoInput, videoOutput);
  console.log("Creating WebRtcPeer and generating local sdp offer ...");

  var options = {
    localVideo: videoInput,
    remoteVideo: videoOutput,
    mediaConstraints: getConstraints(),
    onicecandidate: onIceCandidate,
  };

  myWebRtcPeer = WebRtcPeer.WebRtcPeerSendonly(
    options,
    (error: string | undefined) => {
      if (error) return console.error(error);
      myWebRtcPeer.generateOffer(onOffer);
    }
  );
}

function onOffer(error: string, offerSdp: {}) {
  if (error) return console.error("Error generating the offer");
  console.log(
    "Invoking SDP offer callback function " + "k8a305.p.ssafy.io:8030"
  );
  const userEmail = localStorage.getItem("userEmail");
  const startDate = new Date().toISOString;
  var message = {
    id: "start",
    sdpOffer: offerSdp,
    mode: $('input[name="mode"]:checked').val(),
    userEmail: userEmail ? userEmail + "_" + startDate : "",
  };
  sendMessage(message);
}

function onError(error: string) {
  console.error(error);
}

function onIceCandidate(candidate: string) {
  // console.log("Local candidate" + JSON.stringify(candidate));

  var message = {
    id: "onIceCandidate",
    candidate: candidate,
  };
  sendMessage(message);
}

function startResponse(message: { sdpAnswer: {} }) {
  setState(IN_CALL);
  console.log("SDP answer received from server. Processing ...");

  myWebRtcPeer.processAnswer(message.sdpAnswer, (error: string) => {
    if (error) return console.error(error);
  });
}

function stop() {
  // var stopMessageId = state === IN_CALL ? "stop" : "stopPlay";
  console.log("Stopping video while in " + state + "...");
  setState(POST_CALL);
  if (myWebRtcPeer) {
    myWebRtcPeer.dispose();
    myWebRtcPeer = null;

    var message = {
      id: "stop",
    };
    sendMessage(message);
  }
  // hideSpinner(videoInput, videoOutput);
}

function getConstraints() {
  var mode = $('input[name="mode"]:checked').val();
  var constraints = {
    audio: true,
    video: true,
  };

  if (mode === "video-only") {
    constraints.audio = false;
  } else if (mode === "audio-only") {
    constraints.video = false;
  }

  return constraints;
}

function playResponse(message: { sdpAnswer: {} }) {
  setState(IN_PLAY);
  myWebRtcPeer.processAnswer(message.sdpAnswer, (error: string) => {
    if (error) return console.error(error);
  });
}

function playEnd() {
  setState(POST_CALL);
  //   // hideSpinner(videoInput, videoOutput);
}

function sendMessage(message: { id: string } | null) {
  if (message?.id === "start") console.log("Send Start Message Successfuly");
  var jsonMessage = JSON.stringify(message);
  // console.log("Sending message: " + jsonMessage);
  ws.send(jsonMessage);
}

// return (
//   <div>
//     <button id='start' onClick={start}>
//       Start
//     </button>
//     <button id='stop' onClick={stop}>
//       Stop
//     </button>
//   </div>
// );
// }

export { start, stop };
// export default RecordVideo;
