import { Tooltip } from "@material-ui/core";
import React, { Fragment } from "react";
import Chart from "react-google-charts";
import "./CustomTabs.css";


function SuddenAccelerationAndHarshBraking(props) {

    const data = [
        [
            { type: "number", label: "breaking" },
            { type: "number", label: "Acceleration" },
            { id: "i0", type: "number", role: "interval" },
            { id: "i1", type: "number", role: "interval" },
            { id: "i2", type: "number", role: "interval" },
            { id: "i2", type: "number", role: "interval" },
            { id: "i2", type: "number", role: "interval" },
            { id: "i2", type: "number", role: "interval" },
        ],
        [10, 100, 90, 110, 85, 96, 104, 120],
        [20, 120, 95, 130, 90, 113, 124, 140],
        [30, 130, 105, 140, 100, 117, 133, 139],
        [40, 90, 85, 95, 85, 88, 92, 95],
        [50, 70, 74, 63, 67, 69, 70, 72],
        [60, 30, 39, 22, 21, 28, 34, 40],
        [70, 80, 77, 83, 70, 77, 85, 90],
        [80, 100, 90, 110, 85, 95, 102, 110],
    ];

    const options = {
        title: "Sudden Acceleration And Harsh Braking",
        curveType: "function",
        intervals: { style: "sticks" },
        hAxis: {
            title: "Acceleration (m/s2)",
        },
        vAxis: {
            title: "Time in minutes",
        },
        legend: "none"
    };

    return (
        <Fragment>
            <div className="sudden-acceleration-and-harsh-braking-container">
                <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    data={data}
                    options={options}
                />
            </div>
            <div className="sudden-acceleration-and-harsh-braking-details-divs">
                <div className="sudden-acceleration-and-harsh-braking-details-divs-row-one">
                    <Tooltip placement="top" title="Total active vehicles">
                        <div className="sudden-acceleration-and-harsh-braking-details-div">
                            <div className="sudden-acceleration-and-harsh-braking-details-list-text">
                                Total Trip time
                            </div>
                            <div>1 hour</div>
                        </div>
                    </Tooltip>
                    <Tooltip placement="top" title="Sudden Acceleration">
                        <div className="sudden-acceleration-and-harsh-braking-details-div">
                            <div className="sudden-acceleration-and-harsh-braking-details-list-text">
                                Sudden Acceleration
                            </div>
                            <div>
                                6 times
                            </div>
                        </div>
                    </Tooltip>
                    <Tooltip placement="top" title="Hash braking">
                        <div className="sudden-acceleration-and-harsh-braking-details-div">
                            <div className="sudden-acceleration-and-harsh-braking-details-list-text">
                                Harsh braking
                            </div>
                            <div>
                                3 times
                            </div>
                        </div>
                    </Tooltip>
                </div>
            </div>
        </Fragment>
    );

}


export default SuddenAccelerationAndHarshBraking;