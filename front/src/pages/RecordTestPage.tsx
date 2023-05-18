// import { RecordVideo } from "components/common";

import { start, stop } from "components/common";
import { closeWebSocket, openWebSocket } from "components/common/RecordVideo";

function RecordTestPage() {
  const onOpenHandler = () => {
    console.log("HIHIIHI");
    openWebSocket();
  };
  return (
    <div>
      Hi, Its Over
      {/* <RecordVideo /> */}
      <button onClick={onOpenHandler}>Open WebSocket</button>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={closeWebSocket}>Close WebSocket</button>
    </div>
  );
}

export default RecordTestPage;
