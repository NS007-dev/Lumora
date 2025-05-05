import React, { useEffect, useState } from "react";
import "./ConfidenceTree.css";

const ConfidenceTree = ({ progress }) => {
  const [treeGrowth, setTreeGrowth] = useState(0);

  useEffect(() => {
    setTreeGrowth(progress);
  }, [progress]);

  return (
    <div className="confidence-tree-container">
      <div className="tree">
        <div className="tree-trunk"></div>
        <div
          className="tree-leaves"
          style={{ height: `${treeGrowth}%`, opacity: 1 - treeGrowth / 100 }}
        ></div>
      </div>
      <div className="tree-label">
        <span>{treeGrowth}% Progress</span>
      </div>
    </div>
  );
};

export default ConfidenceTree;
