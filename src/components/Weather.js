import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchWeatherData } from '../actions/ActionCreators';
import { Spinner, Alert, Button, ListGroup, ListGroupItem } from 'reactstrap';

class Weather extends Component {
    componentDidMount() {
        this.props.fetchWeatherData();
    }

    render() {
        if(this.props.errorMessage) {
          return <ErrorIndicator errorMessage={this.props.errorMessage} />
        }

        return (
            <div>
                {getWeatherDataList(this.props)}
                
                <div>
                  <Button color="primary" onClick={() => this.props.fetchWeatherData()}>Refresh</Button>
                </div>
                <LoadingIndicator isLoading={this.props.isLoading} />

            </div>
        );
    }
}

const getWeatherDataList = (props) => {
    if(props.weatherData) {
        const json = JSON.parse(props.weatherData).current;
        return (
          <ListGroup>
              <ListGroupItem>{json.city._attributes.name}</ListGroupItem>
              <ListGroupItem>Current Temperature: {json.temperature._attributes.value}</ListGroupItem>
              <ListGroupItem>High: {json.temperature._attributes.min}</ListGroupItem>
              <ListGroupItem>Low: {json.temperature._attributes.max}</ListGroupItem>
              <ListGroupItem>Humidity: {json.humidity._attributes.value}</ListGroupItem>
              <ListGroupItem>Pressure: {json.pressure._attributes.value}</ListGroupItem>
          </ListGroup>
        )
    } 
    return (<div></div>)
}

const LoadingIndicator = (props) => {
    if(props.isLoading) {
        return(
            <Spinner color="primary" />
        )
    }

    return (<div></div>)
}

const ErrorIndicator = (props) => {
    if(props.errorMessage) {
        return(
            <Alert color="danger">
                {props.errorMessage}
            </Alert>
        )
    }

    return (<div></div>)
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading,
        weatherData: state.weatherData,
        errorMessage: state.errorMessage
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchWeatherData: () => { dispatch(fetchWeatherData()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
