import React from "react";
import Card from "../card/Card";
import styles from "./InfoBox.module.scss";

const InfoBox = ({ cardClass, title, count, icon }) => {
  return (
    <div className={styles["info-box"]}>
      <Card cardClass={cardClass}>
        <h4 className="text-2xl">{title}</h4>
        <span className="text-2xl">
          <h3>{count}</h3>
          {icon}
        </span>
      </Card>
    </div>
  );
};

export default InfoBox;
