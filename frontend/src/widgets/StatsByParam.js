import "./StatsByParam.css";

const paramObj = {
  views: {
    image: require("../components/images/viewsicon.png"),
    tag: 'Most Viewed',
  },
  chart: {
    image: require("../components/images/chart.png"),
    tag: 'Highest Growth',
  },
};

const StatsByParam = (props) => {
  const param = paramObj[props.param];
  return (
    <div className="param__item">

      <div className="param__image-wrapper">
        <img alt="" className="param__image" src={param.image}></img>
      </div>

      <div className="param__title">
        <div style={{ fontSize: 20}}>{param.tag} </div>
      </div>

    </div>
  );
};

export default StatsByParam;
