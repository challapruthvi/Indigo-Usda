import PropTypes from 'prop-types';
import React, { Component } from "react";
import {Container, Row, Col} from "react-bootstrap";
import { withRouter } from 'react-router';
import {Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from 'recharts';
import _ from 'lodash';
//import {totalHarvest} from './server/cropsController';
import { generateUrl } from './utility';

class CropPerCounty extends Component {
    constructor(props) {
        super(props);
        
        const {location} = this.props;

        this.state = {
            year: (location && location.query && location.query.year) || 2015,
            stateCode: (location && location.query && location.query.state) || 'AL',
            county: (location && location.query && location.query.county) || 'AUTAUGA',
            crops: [],
            cropsError: ''
        };
    }

    getUpdatedList = (query) => {
        this.getCropPerCounty(query)
        .then(result =>
            this.setState({
                crops: result
            })
        )
        .catch(resultError => 
            this.setState({
                cropsError: resultError
            })
        )
    };

    componentDidMount() {
        const query = {year: this.state.year, state: this.state.stateCode, county: this.state.county};
        this.getUpdatedList(query);
    }

    getCropPerCounty = async (query) => {
        const url = generateUrl('get_individual_crops_harvest_per_county', query);
        const response = await fetch(url);
        const body = await response.json();
        return body;
    };

    static get propTypes() {
        return {
            children: PropTypes.node,
            localtion: PropTypes.shape({
                year: PropTypes.number,
                state: PropTypes.string,
                county: PropTypes.string
            })
        };
    }

    render() {
        const {crops, cropsError} = this.state;
        return ( 
            <>
                {cropsError &&
                        <Row>{cropsError}</Row>}
                <Container fluid>
                    <Row className="perCountyHeader">
                        <Col>
                            <h2>{`${this.state.year} - Total Harvest of Crops in ${this.state.county} (${this.state.stateCode})`}</h2>
                        </Col>
                    </Row>
                    <Row className="perCountyGraph">
                        <Col>
                    {!_.isArray(crops) ? <Row>{crops.message}</Row> :
                            <BarChart width={750} height={400} data={crops} >
                                
                                <XAxis dataKey="crop" height={70} tick={{fill: 'white'}}>
                                    <Label value="Crops" offset={20} position="insideBottom" fill="white"/>
                                </XAxis>
                                <YAxis width={250} type="number" tick={{fill: 'white'}}>
                                    <Label value="Total Harvested Acres" position="inside" angle={-90} fill="white"/>
                                </YAxis>

                                <Tooltip />
                                <Legend align="right"/>
                                <Bar dataKey="total_harvested_acres" barSize={20} fill="#0000b3" />
                            </BarChart>
                    }
                    </Col>
                    </Row>
                        
                        {this.props.children}
                </Container>
            </>
        );
    }
}

export default withRouter(CropPerCounty);
