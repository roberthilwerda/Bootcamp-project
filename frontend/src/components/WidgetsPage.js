import "./WidgetsPage.css";
import StatsByGenre from "../widgets/StatsByGenre";
import StatsByParam from "../widgets/StatsByParam";

const WidgetsPage = () => {
  return (
    <div className="widgetspage__wrapper">
      <div className="widgetspage__col">
      <div style={{'fontSize': 30}} className="widgetspage__title">Statistics by genre</div>
        <StatsByGenre genre={'jazz'} filter={`some genre`} />
        <StatsByGenre genre={'pop'} filter={`some genre`} />
        <StatsByGenre genre={'jazz'} filter={`some genre`} />
      </div>
      <div className="widgetspage__col">
      <div style={{'fontSize': 30}} className="widgetspage__title">Statistics by variable</div>
        <StatsByParam param={'views'} filter={`some parameters`} />
        <StatsByParam param={'chart'} filter={`some parameters`} />
        <StatsByParam param={'chart'} filter={`some parameters`} />
      </div>
    </div>
  );
};

export default WidgetsPage;
