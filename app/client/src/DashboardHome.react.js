import PropTypes from 'prop-types';
import React, { Component } from "react";
import {Container, Row, Col} from "react-bootstrap";
import {Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from 'recharts';

//import {totalHarvest} from './server/cropsController';
import { generateUrl } from './utility';

export default class DashboardHome extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            harvestResult: [],
            yieldResult: [],
            harvestError: '',
            yieldError: ''
        };
    }

    componentDidMount() {
        Promise.all([
            this.getTotalHarvest(),
            this.getTotalYield()
        ])
        .then(([harvestResult, yieldResult]) =>
            this.setState({
                harvestResult,
                yieldResult
            })
        )
        .catch(([harvestError, yieldError]) => 
            this.setState({
                harvestError,
                yieldError
            })
        )
    }

    getTotalHarvest = async () => {
        const response = await fetch('get_total_harvest_per_year');
        const body = await response.json();
        return body;
    };

    getTotalYield = async () => {
        const response = await fetch('get_total_yield_per_year');
        const body = response.json();
        return body;
    };

    static get propTypes() {
        return {
            children: PropTypes.node
        };
    }

    render() {
        const {harvestError, harvestResult, yieldError, yieldResult} = this.state;
        return ( 
            <>
                {harvestError || yieldError &&
                        <Row>{harvestError}{yieldError}</Row>}
                <Container fluid>
                    <Row className="dashboardHeader">
                        <Col>
                            <h2>{'Total Harvested Crop'}</h2>
                        </Col>
                        <Col>
                            <h2>{'Total Crop Yield'}</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="chartPosition">
                            <BarChart width={600} height={400} data={harvestResult} >
                                
                                <XAxis dataKey="year" height={70} tick={{fill: 'white'}}>
                                    <Label value="Years" offset={20} position="insideBottom" fill="white"/>
                                </XAxis>
                                <YAxis width={250} type="number" tick={{fill: "white"}}>
                                    <Label value="Harvested Crops" position="inside" angle={-90} fill="white"/>
                                </YAxis>

                                <Tooltip />
                                <Legend align="right" />
                                <Bar dataKey="total_harvested_acres" barSize={20} fill="#0000b3" />
                            </BarChart>
                        </Col>
                        <Col className="chartPosition">
                        <BarChart width={600} height={400} data={yieldResult} >
                            
                                <XAxis dataKey="year" height={70} tick={{fill: 'white'}}>
                                    <Label value="Years" offset={20} position="insideBottom" fill="white"/>
                                </XAxis>
                                <YAxis width={250} type="number" tick={{fill: 'white'}}>
                                    <Label value="Total Yield" position="inside" angle={-90} fill="white"/>
                                </YAxis>

                                <Tooltip />
                                <Legend align="right"/>
                                <Bar dataKey="total_yield" barSize={20} fill="green" />
                            </BarChart>
                        </Col>
                    </Row>
                        
                        {this.props.children}
                </Container>
            </>
        );
    }
}
