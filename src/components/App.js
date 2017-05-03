import React, {Component} from 'react';
import Search from './Search';
import CustomTabs from './Tabs';
import {saveState, loadState} from '../models/localStorage';
import {getCities, getCityGeometry, getCityForecast} from '../services';

export default class App extends Component {
    constructor(props) {
        //load Data from localStorage
        super(props);
        this.state = loadState() || {
                cities: [],
                searchCities: [],
                activeTabId: '',
                searchValue: ''
        };
    }

    componentDidMount() {
        //if localStorage is clear, show default Cities
        if (this.state.cities.length) return;

        let defaultCities = [
            {id: "ChIJBUVa4U7P1EAR_kYBF9IxSXY", name: "Kiev"},
            {id: "ChIJOwg_06VPwokRYv534QaPC8g", name: "New York"}
        ];

        let cities = defaultCities.map(city => getCityGeometry(city));

        Promise.all(cities).then(citiesWithGeometry => {
            let cities = citiesWithGeometry.map(item => getCityForecast(item));

            Promise.all(cities).then(citiesWithForecast => {
                this.setState({
                    cities: citiesWithForecast,
                    activeTabId: citiesWithForecast[0].id
                })
            })
        });

    }

    componentDidUpdate(prevProps, prevState) {
        //save state to localStorage
        if (prevState.activeTabId !== this.state.activeTabId ||
            prevState.cities !== this.state.cities) {
            saveState(this.state);
        }
    }

    addCity(id) {
        let city = this.state.searchCities.find(item => item.id === id);

        if (this.checkIfCityExist(id)) {
            return this.setState({
                activeTabId: id,
                searchValue: '',
                searchCities: []
            });
        }

        getCityGeometry(city).then(cityWithGeometry => {
            getCityForecast(cityWithGeometry).then((cityWithForecast) => {
                this.setState({
                    cities: [...this.state.cities, cityWithForecast],
                    searchCities: [],
                    activeTabId: cityWithForecast.id,
                    searchValue: ''
                })
            })
        })
    }

    removeCity(id) {
        this.setState({
            cities: this.state.cities.filter(city => city.id !== id),
            activeTabId: this.setActiveTabAfterCityRemove(id)
        })
    }

    changeSearchValue(cityName) {
        this.setState({searchValue: cityName});
        this.getCitiesToAutoComplete(cityName);
    }

    getCitiesToAutoComplete(cityName) {
        getCities(cityName).then(cities => {
            this.setState({
                searchCities: cities
            });
        });
    }

    selectTab(tab) {
        this.setState({activeTabId: tab})
    }

    setActiveTabAfterCityRemove(id) {
        let {activeTabId, cities} =  this.state;
        let cityIndex = cities.findIndex(item => item.id === id);

        if (this.state.cities.length === 1) return '';

        if (cityIndex === 0 && activeTabId === id) {
            return cities[cityIndex + 1].id;
        }

        if (activeTabId === id) {
            return cities[cityIndex - 1].id;
        }

        return activeTabId;
    }

    checkIfCityExist(id) {
        return this.state.cities.find(item => item.id === id);
    }

    render() {
        return (
            <div className="wrapper">
                <Search
                    changeSearchValue={this.changeSearchValue.bind(this)}
                    searchValue={this.state.searchValue}
                    addCity={this.addCity.bind(this)}
                    cities={this.state.searchCities}/>
                <CustomTabs cities={this.state.cities}
                            activeTabId={this.state.activeTabId}
                            removeCity={this.removeCity.bind(this)}
                            onTabSelect={this.selectTab.bind(this)}/>
            </div>
        )
    }
}