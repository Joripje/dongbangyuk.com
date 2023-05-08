import { getAbilityData } from "api/statistics";
import { useState, useEffect } from "react";

const AbilityChart = () => {
  const [judgment, setJudgment] = useState<number>(0);
  const [accuracy, setaccuracy] = useState<number>(0);
  const [stability, setStability] = useState<number>(0);
  const [endurance, setEndurance] = useState<number>(0);
  const [resilience, setResilience] = useState<number>(0);
  const [gameAbility, setGameAbility] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAbilityData({
          gameid: 1,
        });

        setJudgment(response.judgment);
        setaccuracy(response.accuracy);
        setStability(response.stability);
        setEndurance(response.endurance);
        setResilience(response.resilience);
        setGameAbility(response.gameAbility);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return <div>1</div>;
};
export default AbilityChart;
