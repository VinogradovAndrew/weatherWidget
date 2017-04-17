import React from 'react';
import {Tab, Nav, Col, NavItem, Row} from 'react-bootstrap';
import City from './City';

const CustomTabs = ({cities, onTabSelect, activeTabId, removeCity}) => (
    <Tab.Container activeKey={activeTabId} onSelect={(eventKey) => onTabSelect(eventKey)} id="cities">
        <Row className="clearfix">
            <Col sm={12} className="page-tabs">
                <Nav bsStyle="pills">
                    {cities.map((item, index) => (
                        <NavItem key={item.id} eventKey={item.id}>
                            {item.name}
                            <span onClick={(e) => {
                                e.stopPropagation();
                                removeCity(item.id)
                            }}>  X</span>
                        </NavItem>
                    ))}

                </Nav>
            </Col>
            <Col sm={12}>
                <Tab.Content animation>
                    {cities.map((item, index) => (
                        <Tab.Pane key={item.id} eventKey={item.id}>
                            <City city={item}/>
                        </Tab.Pane>
                    ))}
                </Tab.Content>
            </Col>
        </Row>
    </Tab.Container>
);

export default CustomTabs;