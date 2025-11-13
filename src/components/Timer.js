import { Component } from "react";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: 0,
      minut: 1,
      second: 5,
      isStart: false,
    };

    this.interval = null;
  }

  toggleStart = () => {
    const { isStart } = this.state;

    if (!isStart) {
      // START bosilganda intervalni ishga tushuramiz
      this.interval = setInterval(() => {
        this.setState((prev) => {
          let { hour, minut, second } = prev;

          if (hour === 0 && minut === 0 && second === 0) {
            clearInterval(this.interval);
            return { isStart: false };
          }

          if (second === 0) {
            second = 59;
            if (minut === 0) {
              minut = 59;
              hour = hour - 1;
            } else {
              minut = minut - 1;
            }
          } else {
            second = second - 1;
          }

          return { hour, minut, second };
        });
      }, 1000);
    } else {
      // STOP bosilganda intervalni to‘xtatamiz
      clearInterval(this.interval);
    }

    this.setState({ isStart: !isStart });
  };

  reset = () => {
    clearInterval(this.interval);
    this.setState({
      hour: 0,
      minut: 1,
      second: 5,
      isStart: false,
    });
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { hour, minut, second, isStart } = this.state;

    return (
      <>
        <div className="container py-3 d-flex flex-column align-items-center justify-content-between">
          <h1 className="text-center fw-bold display-1">Timer</h1>

          <div className="d-flex align-items-center gap-3">
            <h2>{hour < 10 ? "0" + hour : hour}</h2>:
            <h2>{minut < 10 ? "0" + minut : minut}</h2>:
            <h2>{second < 10 ? "0" + second : second}</h2>
          </div>

          <br />

          <div className="buttons d-flex gap-3">
            <button className="btn btn-dark" onClick={this.toggleStart}>
              {!isStart ? "Start" : "Stop"}
            </button>
            <button className="btn btn-dark" onClick={this.reset}>
              Reset
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Timer;
