import * as st from "../Utils/functions";
import Node from "./Node";
import { useState, useEffect } from "react";

let treeRoot = st.Tree([
  1, 2, 4, 6, 8, 10, 14, 26, 29, 33, 42, 45, 46, 98, 99, 105, 109, 203, 77, 64,
  62, 87, 92, 82, 74, 79, 99, 109,
]);

let treeHeight = treeRoot.height();
console.log(treeHeight);
treeRoot.prettyPrint();
console.log("level order at 3");
console.log(treeRoot.levelOrder(3).nodeArr);

function Tree() {
  const [nodeVis, setNodeVis] = useState(0);
  //   console.log({ treeRoot });
  useEffect(() => {
    setInterval(() => {
      setNodeVis((prev) => prev + 1);
    }, 500);
  });

  return (
    <div>
      {Array.from(Array(treeHeight + 1)).map((el, index) => {
        // return (
        console.log("levelOrder at " + index + " ");
        console.log(treeRoot.levelOrder(index));
        let nodeArr = treeRoot.levelOrder(index).nodeArr;
        return (
          <div key={"row" + index}>
            <div
              className="z-10  w-screen grid grid-cols grid-rows-1"
              style={{
                // marginTop: Math.floor(100 / Math.sqrt(nodeArr.length)),
                // height: Math.floor(80 / Math.sqrt(nodeArr.length)),
                gridTemplateColumns: `repeat(${nodeArr.length}, minmax(0, 1fr))`,
              }}
            >
              {nodeArr.map((el, k) => {
                if (index !== 0)
                  return (
                    <div
                      key={"separator" + index + k}
                      className={"w-full grid  " + (k % 2 === 0 && " ")}
                    >
                      <div
                        className={
                          "w-1/2 h-4 self-start " +
                          (nodeArr[k] !== null && " border-t-2  ") +
                          (nodeArr[k] !== null &&
                            k % 2 === 0 &&
                            "place-self-end border-l-2  ") +
                          (nodeArr[k] !== null &&
                            k % 2 !== 0 &&
                            " place-self-start border-r-2  ")
                        }
                      ></div>
                    </div>
                  );
                return "";
              })}
            </div>
            <div
              style={{
                height: Math.floor(90 / Math.sqrt(nodeArr.length)),
                gridTemplateColumns: `repeat(${nodeArr.length}, minmax(0, 1fr))`,
              }}
              className="z-50 text-2xl  text-blue-500 font-bold h-24 grid grid-rows-1 w-screen "
            >
              {nodeArr.map((node, j) => {
                return (
                  <Node
                    nodeVis={nodeVis}
                    key={"node" + index + j}
                    node={node}
                    nodeArr={nodeArr}
                    index={index + j}
                  />
                  //   <div
                  //     className="b"
                  //     style={{
                  //       fontSize:
                  //         Math.floor(40 / Math.sqrt(nodeArr.length)) + "pt",
                  //     }}
                  //     key={"node" + index + j}
                  //   >
                  //     <div className="flex justify-center items-center">
                  //       <div
                  //         className={
                  //           "rounded-full p-2 z-50 underline  flex items-center place-self-center text-center" +
                  //           (node !== null && " border-2 ")
                  //         }
                  //       >
                  //         {node !== null && <div>{node.thisNode}</div>}
                  //       </div>
                  //     </div>
                  //   </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Tree;
