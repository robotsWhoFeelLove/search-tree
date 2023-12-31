function Node({ node, index, nodeArr, nodeVis }) {
  return (
    <div
      className={(index + 1) * 500}
      style={{
        fontSize: Math.floor(40 / Math.sqrt(nodeArr.length)) + "pt",
      }}
    >
      <div className="flex justify-center items-center">
        {nodeVis > index && (
          <div
            className={
              "rounded-full p-2 z-50 underline  flex items-center place-self-center text-center animate-jump-in animate-once animate-duration-[400ms] " +
              (node !== null && " border-2 ")
            }
          >
            {node !== null && <div>{node.thisNode}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Node;
