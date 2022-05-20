import React from "react";

const DemoComponent = () => {
    const [count, setCount] = React.useState();

    const clickHandler = () => {
        setCount(oldState => oldState + 1);

    };

    return (
        <div>
            <h1>Counter</h1>
            <span>{count}</span>
            <button onClick={clickHandler}>Increase Count</button>
        </div>
    )
};

export default DemoComponent;