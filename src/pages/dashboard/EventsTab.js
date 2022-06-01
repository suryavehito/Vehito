import React, { Fragment, useEffect, useState } from "react";
import "./CustomTabs.css";
import { Typography } from "@material-ui/core";
import { Chart } from "react-google-charts";
import EventsProgress from "../../components/progress/EventsProgress";
import EventsDataTable from "../../components/events/EventsDataTable";
import { getEvents } from "../../api/assets.api";

function EventsTab(props) {
  const [data, setData] = useState({
    OSP: 0,
    SAC: 0,
    HBR: 0,
    EID: 0,
    OLD: 0,
    PNC: 0,
    BLW: 0,
    BKW: 0,
    HRT: 0,
    HLT: 0,
    WKS: 0
  })
  const events = [{
    label: 'Over Speeding',
    code: 'OSP',
    color: '#800000'
  },
  {
    label: 'Sudden Acceleration',
    code: "SAC",
    color: '#FF0000'
  },
  {
    label: 'Harsh Breaking',
    code: "HBR",
    color: '#800080'
  },
  {
    label: 'Excessive Idling',
    code: "EID",
    color: '#FF00FF'
  },
  {
    label: 'Over Load',
    code: "OLD",
    color: '#008000'
  },
  {
    label: 'Panic On',
    code: "PNC",
    color: '#00FF00'
  },
  {
    label: 'Main Battery Low',
    code: "BLW",
    color: '#808000'
  },
  {
    label: 'Backup Battery Low',
    code: "BKW",
    color: '#FFFF00'
  },
  {
    label: 'Harsh Right Tilt',
    code: "HRT",
    color: '#000080'
  },
  {
    label: 'Harsh Left Tilt',
    code: "HLT",
    color: '#0000FF'
  },
  {
    label: 'Week Signal',
    code: "WKS",
    color: '#008080'
  }];

  useEffect(() => {
    getEvents('02205eb6-0ff2-400d-bfbd-b53122b06108').then(response => {
      const tmpData = { ...data };
      response.map(res => {
        res.eventDetailList.map(eve => {
          tmpData[eve.eventCode] = tmpData[eve.eventCode] ? tmpData[eve.eventCode] + 1 : 1;
        })
      })
      setData(tmpData);
    });
  }, [])
  return (
    <Fragment>
      <div className="events-container">
        <div className="events-header-div">
          <div className="evnets-title events-header-text">
            <Typography variant="body1">
              Events - {props.selectedVehicleCategory}
            </Typography>
          </div>
          <div className="totalVehicleCount events-header-text">
            <Typography variant="body1">
              Total Selected Vehicles {props.vehicles.length}
            </Typography>
          </div>
        </div>
        <div className="events-count-text">
          <div className="events-chart-title-div">
            <Typography style={{ fontWeight: "bold" }} variant="body1">
              Events Count Trend
            </Typography>
          </div>
          <div className="progress-bars-div">
            <div className="progress-bars-title">
              <Typography style={{ fontWeight: "bold" }} variant="body1">
                Most Common Events
              </Typography>
            </div>
            <div className="events-count">
              <Typography style={{ fontWeight: "bold" }} variant="body1">
                336
              </Typography>
            </div>
          </div>
        </div>
        <div className="events-chart-and-progress-div">
          <div className="events-chart-div">
            <Chart
              width={"675px"}
              height={"300px"}
              chartType="Line"
              loader={<div>Loading Chart</div>}
              data={[
                ["Day", "Advisory", "Caution", "Warning"],
                ["01.03.21 16:00", 37.8, 80.8, 41.8],
                ["01.03.21 20:00", 30.9, 69.5, 32.4],
                ["02.03.21 00:00", 25.4, 57, 25.7],
                ["01.03.21 04:00", 11.7, 18.8, 10.5],
                ["01.03.21 08:00", 11.9, 17.6, 10.4],
                ["01.03.21 12:00", 8.8, 13.6, 7.7],
              ]}
            />
          </div>
          <div className="events-details-progress-bars-div">
            {events.map((event) => {
              return (
                <>
                  <div className="progress-bars-title-and-value-div">
                    <div>
                      <p>{event.label}</p>
                    </div>
                    <div>
                      <p>
                        {data[event.code]}
                      </p>
                    </div>
                  </div>
                  <div className="progress speeding-progress">
                    <EventsProgress
                      color={event.color}
                      value={data[event.code]
                      }
                    />
                  </div>
                </>
              )
            })}
          </div>
        </div>
        <div className="events-details-data-table-div">
          <div>
            <Typography style={{ fontWeight: "bold" }} variant="body1">
              Events Table
            </Typography>
          </div>
          <div className="events-details-data-table">
            <EventsDataTable vehicles={props.vehicles} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EventsTab;
