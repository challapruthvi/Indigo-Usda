import PropTypes from 'prop-types';
import React, { Component } from "react";
import _ from 'lodash';
import {Container, Row, Col, Dropdown, DropdownButton, ButtonGroup, ToggleButton} from "react-bootstrap";
import {ComposedChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from 'recharts';
import {withRouter} from "react-router";
import Countywise from './Countywise.react';
import { generateUrl } from './utility';

class UsStates extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            harvest: [],
            avgYield: [],
            harvestError: '',
            avgYieldError: '',
            defaultYr: 2015,
            crops: 'All'
        };
    }

    getLatestStats = (harvestQuery, yieldQuery) => {
        Promise.all([
            this.getHarvestForUsStates(harvestQuery),
            this.getAvgYieldForUsStates(yieldQuery)
        ])
        .then(([harvest, avgYield]) => {
            this.setState({
                harvest,
                avgYield
            })
        })
        .catch(([harvestError, avgYieldError]) => {
            this.setState({
                harvestError,
                avgYieldError
            })
        })
    };

    componentDidMount() {
        const harvestQuery = {year: this.state.defaultYr, crop: this.state.crops};
        const yieldQuery = {year: this.state.defaultYr, crop: this.state.crops};
        this.getLatestStats(harvestQuery, yieldQuery);
    }

    getHarvestForUsStates = async (query) => {
        const url = generateUrl('get_harvest_for_all_states', query);
        const response = await fetch(url);
        const body = await response.json();
        return body;
    };

    getAvgYieldForUsStates = async (query) => {
        const url = generateUrl('get_avg_yield_for_all_states', query);
        const response = await fetch(url);
        const body = response.json();
        return body;
    };

    handleSelect = (event) => {
        this.setState({defaultYr: event}, this.getUpdatedYearData);
    };

    getUpdatedYearData = () => {
        const {defaultYr, crops} = this.state;
        this.getLatestStats({year: defaultYr, crop: crops}, {year: defaultYr, crop: crops});
    };

    testing = (e) => {
        console.log(e);
        this.props.router.push({pathname: '/Countywise', query: {year: this.state.defaultYr, state: e.state_code}});
    };

    handleCropSelect = (e) => {
        this.setState({crops: e}, this.getUpdatedCropData);
    };

    getUpdatedCropData = () => {
        this.getLatestStats(
            {year: this.state.defaultYr, crop: this.state.crops}, 
            {year: this.state.defaultYr, crop: this.state.crops}
        );
    };

    static get propTypes() {
        return {
            children: PropTypes.node
        };
    }

    render() {
        const {harvest, harvestError, avgYield, avgYieldError, defaultYr, crops} = this.state;
        return ( 
            <>
                {harvestError || avgYieldError && <Row>{harvestError}{avgYieldError}</Row>}
                <Container fluid>
                    <Row>
                        <Col md={8} className="statesHeader">
                            <h2>{`${defaultYr} Stats for All U.S States`}</h2>
                        </Col>
                        <Col className="filters">
                        <h4>{'Year: '}</h4>
                        <DropdownButton 
                            id="dropdown-basic-button" 
                            title={defaultYr} 
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
                        <h4>{'Crops: '}</h4>
                        <DropdownButton 
                            id="dropdown-basic-button2" 
                            title={crops} 
                            key="Info"
                            variant="info"
                            onSelect={this.handleCropSelect}>
                            <Dropdown.Item eventKey="CORN">CORN</Dropdown.Item>
                            <Dropdown.Item eventKey="SOYBEANS">SOYBEANS</Dropdown.Item>
                            <Dropdown.Item eventKey="WHEAT">WHEAT</Dropdown.Item>
                            <Dropdown.Item eventKey="COTTON">COTTON</Dropdown.Item>
                            <Dropdown.Item eventKey="RICE">RICE</Dropdown.Item>
                        </DropdownButton>
                        </Col>
                    </Row>
                    <Row className="titlesHeader">
                        <Col>
                            <h2>{'Total Harvested Crop'}</h2>
                        </Col>
                        <Col>
                            <h2>{'Avg Yield'}</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="chartLine">
                        {!_.isArray(harvest) ? <Row>{harvest.message}</Row> :
                
                        <ComposedChart layout="vertical" width={600} height={950} data={harvest}
                                    margin={{ top: 20, right: 20, bottom: 20, left: 20}}>
                            
                            <XAxis type="number" tick={{fill: 'white'}}/>
                            <YAxis dataKey="state_code" type="category" interval={0} tick={{fill: 'white'}}/>
                            <Tooltip />
                            <Legend />
        
                            <Bar dataKey="total_harvested_acres" barSize={20} fill="#0000b3" onClick={this.testing}/>
                        </ComposedChart>
                        }
                        </Col>
                        <Col>
                        {!_.isArray(avgYield) ? <Row>{avgYield.message}</Row> :
                        <ComposedChart layout="vertical" width={600} height={950} data={avgYield}
                                    margin={{ top: 20, right: 20, bottom: 20, left: 20}}>
                            
                            <XAxis type="number" tick={{fill: 'white'}}/>
                            <YAxis dataKey="state_code" type="category" interval={0} tick={{fill: 'white'}}/>
                            <Tooltip />
                            <Legend />
        
                            <Bar dataKey="total_yield" barSize={20} fill="green" />
                        </ComposedChart>
                        }   
                        </Col>
                    </Row>
                        
                        {this.props.children}
                </Container>
            </>
        );
    }
}

export default withRouter(UsStates);
