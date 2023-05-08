// import { RecordVideo } from "components/common";

import { start, stop } from "components/common";

function RecordTestPage() {
  return (
    <div>
      Hi, Its Over
      {/* <RecordVideo /> */}
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}

export default RecordTestPage;
