import react from "react";
import { Component } from "react";
import CardList from "../Components/CardList";
import { robots } from "../Robots";
import SearchBox from "../Components/SearchBox";
import Scroll from "../Components/Scroll";
import ErrorBoundry from "../Components/ErrorBoundry";
import "../Containers/App.css";
class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      SearchValue: "",
    };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ robots: users }));
  }

  onsearchchange = (event) => {
    this.setState({ SearchValue: event.target.value });
  };
  render() {
    const filteredRobot = this.state.robots.filter((robot) => {
      return robot.name
        .toLowerCase()
        .includes(this.state.SearchValue.toLowerCase());
    });
    if (this.state.robots.length === 0) {
      return <h1>Loading Please Wait...</h1>;
    } else {
      return (
        <div>
          <h1 className="h1">Robo Friend</h1>
          <SearchBox searchchange={this.onsearchchange} />
          <Scroll>
            <ErrorBoundry>
              <CardList robots={filteredRobot} />
            </ErrorBoundry>
          </Scroll>
        </div>
      );
    }
  }
}

export default App;
