import React, { useState } from "react";
import "./App.css";
//core styles
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { Table, TableCell, TableRow } from "@material-ui/core";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import TableDetails from "./TableDetails";
import SliderMarks from "./Slidermarks";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

const PrettoSlider = withStyles({
  root: {
    color: "#a2df77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

function App() {
  const [pAmount, setpAmount] = useState(2755000);
  const [interest, setInterest] = useState(7);
  const [duration, setDuration] = useState(147);
  const [sliderType, setSliderType] = useState("MONTH");
  const maxValue = 600000;
  const intMax = 20;
  const maxMonthDuration = 360;
  const maxYearDuration = 20;


  //Calculation formula
  const intr = interest / 1200;
  const emi = duration
    ? Math.round((pAmount * intr) / (1 - Math.pow(1 / (1 + intr), duration)))
    : 0;
  const totalAmt = duration * emi;
  var TotalAmountOfCredit = Math.round(
    (emi / intr) * (1 - Math.pow(1 + intr, -duration))
  );
  const TotalAmountOfInterest = Math.round(totalAmt - TotalAmountOfCredit);

  const handleChangeLoanAmount = (event) => {
    setpAmount(event.target.value);
  };

  const handleChangeInterestAmount = (event) => {
    setInterest(event.target.value);
  };

  const handleChangeLoanTenure = (event) => {
    setDuration(event.target.value);
  };

  //handle click to select month and year
  const handleChangeSliderType = (type) => {
     setSliderType(type);
  };

  return (
    <div className="App">
      <div className="CalApp">
        <h2 className="CalHeading">
          <u>Loan Interest Calculator</u>
        </h2>
        <div>
          <Typography gutterBottom>
            <strong>Loan Amount ₹</strong>
          </Typography>
          <span>
            <TextField
              id="filled-basic"
              label="Enter Loan amount ₹"
              variant="outlined"
              onChange={handleChangeLoanAmount}
            />
          </span>
          {/* <p>Slide here to get the info</p> */}
          <PrettoSlider
            value={pAmount}
            marks={SliderMarks.marksAmt}
            onChange={(event, vAmount) => {
              setpAmount(vAmount);
            }}
            defaultValue={pAmount}
            max={maxValue}
          />
        </div>

        <div>
          <Typography gutterBottom>
            <strong>Interest Rate %</strong>
          </Typography>
          <span>
            <TextField
              id="filled-basic"
              label="Enter Interest Rate %"
              variant="outlined"
              onChange={handleChangeInterestAmount}
            />
          </span>
          <PrettoSlider
            value={interest}
            marks={SliderMarks.marksInt}
            onChange={(event, vInt) => {
              setInterest(vInt);
            }}
            defaultValue={interest}
            max={intMax}
          />
        </div>

        <div>
          <Typography gutterBottom>
            <strong>Loan Tenure</strong>
          </Typography>
          <span>
            <TextField
              id="filled-basic"
              label="Enter Loan Tenure"
              variant="outlined"
              onChange={handleChangeLoanTenure}
            />
            &nbsp;&nbsp;&nbsp;
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button color="primary" onClick={() => handleChangeSliderType("MONTH")}>
                Month
              </Button>
              <Button onClick={() => handleChangeSliderType("YEAR")}>Year</Button>
            </ButtonGroup>
          </span>
          <PrettoSlider
             value={duration}
             marks={
              sliderType === "MONTH"
                ? SliderMarks.marksTenure
                : SliderMarks.marksTenureYear
            }
            onChange={(event, vDur) => {
              setDuration(vDur);
            }}
            defaultValue={duration}
            max={sliderType === "MONTH"
            ? maxMonthDuration
            : maxYearDuration}
           />
        </div>

        <div>
          <Table>
            <TableRow>
              <TableCell>
                <TableDetails
                  pAmount={pAmount}
                  interest={interest}
                  duration={duration}
                  emi={emi}
                  TotalAmountOfCredit={TotalAmountOfCredit}
                  TotalAmountOfInterest={TotalAmountOfInterest}
                  totalAmt={totalAmt}
                />
              </TableCell>
              <TableCell>
                <Pie
                  data={{
                    labels: ["Total Amount", "Total Interest"],
                    datasets: [
                      {
                        data: [TotalAmountOfInterest, pAmount],
                        backgroundColor: [
                          "rgb(238, 238, 98)",
                          "rgb(166, 166, 17)",
                        ],
                      },
                    ],
                  }}
                  width={200}
                  height={200}
                />
              </TableCell>
            </TableRow>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default App;
