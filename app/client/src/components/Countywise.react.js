import PropTypes from 'prop-types';
import React, { Component } from "react";
import _ from 'lodash';
import {Container, Row, Col, DropdownButton, Dropdown} from "react-bootstrap";
import {Bar, ComposedChart, XAxis, YAxis, Tooltip, Legend} from 'recharts';
import {generateUrl, getStateList} from '../utility';

import {withRouter} from 'react-router';

class Countywise extends Component {
    constructor(props) {
        super(props);
        
        const {location} = this.props;

        this.state = {
            year: (location && location.query && location.query.year) || 2015,
            stateCode: (location && location.query && location.query.state) || 'AL',
            countyHarvest: [],
            countyHarvestError: '',
        };
    }

    getUpdatedStats = (query) => {
        this.getTotalHarvestForState(query)
            .then((countyHarvest) =>
                this.setState({
                    countyHarvest
                })
            )
            .catch((countyHarvestError) => 
                this.setState({
                    countyHarvestError
                }
            )
        )
    };

    componentDidMount() {
        const query = {year: this.state.year, state: this.state.stateCode};
        this.getUpdatedStats(query);
    }

    getTotalHarvestForState = async (query) => {
        const url = generateUrl('get_harvest_for_all_counties_in_state', query);
        const response = await fetch(url);
        const body = await response.json();
        return body;
    };

    handleSelect = (e) => {
        this.setState({year: e}, this.callbackForYear);
    };

    handleChangeStateCode = (e) => {
        this.setState({stateCode: e}, this.callbackForState);
    };

    callbackForState = () => {
        const query = {year: this.state.year, state: this.state.stateCode};
        this.getUpdatedStats(query);
    };

    callbackForYear = () => {
        const query = {year: this.state.year, state: this.state.stateCode};
        this.getUpdatedStats(query);
    };

    testing = (e) => {
        console.log(e);
        this.props.router.push({
            pathname: '/CropPerCounty',
            query: {
                year: this.state.year,
                state: this.state.stateCode,
                county: e.county_name
            }
        })
    };

    static get propTypes() {
        return {
            children: PropTypes.node,
            localtion: PropTypes.shape({
                year: PropTypes.number,
                state: PropTypes.string
            })
        };
    }

    render() {
        const {countyHarvest, countyHarvestError} = this.state;
        return ( 
            <>
                {countyHarvestError &&
                        <Row>{countyHarvestError}</Row>}
                <Container fluid>
                    <Row>
                        <Col md={8} className="statesHeader">
                            <h2>{`${this.state.year} - Total Harvest Stats for ${this.state.stateCode}`}</h2>
                        </Col>
                        <Col className="filters">
                        <h4>{'Year: '}</h4>
                        <DropdownButton 
                            id="dropdown-basic-button" 
                            title={this.state.year}
                            key="Info"
                            variant="info" 
                            onSelect={this.handleSelect}>
                            <Dropdown.Item eventKey="2014">2014</Dropdown.Item>
                            <Dropdown.Item eventKey="2015">2015</Dropdown.Item>
                            <Dropdown.Item eventKey="2016">2016</Dropdown.Item>
                            <Dropdown.Item eventKey="2017">2017</Dropdown.Item>
                            <Dropdown.Item eventKey="2018">2018</Dropdown.Item>
                        </DropdownButton>
                        </Col>
                        <Col className="filters">
                        <h4>{'State: '}</h4>
                        <DropdownButton 
                            id="dropdown-basic-button2" 
                            title={this.state.stateCode} 
                            key="Info"
                            variant="info"
                            onSelect={this.handleChangeStateCode}>
                                {getStateList()}
                        </DropdownButton>
                        </Col>
                    </Row>
                    <Row className="titlesHeader">
                        <Col>
                            <h2>{'Total Harvested Crop'}</h2>
                        </Col>
                    </Row>
                    <Row>
                        
                        {!_.isArray(countyHarvest) ? <Row>{countyHarvest.message}</Row> :
                
                <ComposedChart layout="vertical" width={600} height={1000} data={countyHarvest}>
                    
                    <XAxis width={200} type="number" tick={{fill: 'white'}}/>
                    <YAxis width={250} dataKey="county_name" interval={0} 
                            minTickGap={25} type="category" tick={{fill: 'white'}}/>
                    <Tooltip />
                    <Legend />

                    <Bar dataKey="total_harvested_acres" barSize={20} fill="#0000b3" onClick={this.testing}/>
                </ComposedChart>
                }
                        
                    </Row>
                        
                        {this.props.children}
                </Container>
            </>
        );
    }
}

export default withRouter(Countywise);
