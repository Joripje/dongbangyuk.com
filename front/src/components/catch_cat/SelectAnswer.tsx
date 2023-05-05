import { useEffect, useState } from "react";
import choco from "assets/images/catch/choco.jpg";

function SelectAnswer() {
  const [catColor, setCatColor] = useState<number>(0); // 0: red, 1: blue

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCatColor((prevCatColor) => prevCatColor + 1);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div>
        {catColor === 0 ? "파란" : "빨강"}칸의 고양이는 생쥐를 찾았을까요?
      </div>
      <div>정답이라 생각하는 방향으로 확신하는 만큼 표시해주세요.</div>
    </div>
  );
}

export default SelectAnswer;
