import React from 'react';
import {FormControl} from 'react-bootstrap';
import AutoComplete from './AutoComplete';

const Search = ({searchValue, changeSearchValue, cities, addCity}) => (
    <div className="search">
        <FormControl onChange={(e) => changeSearchValue(e.target.value)}
                     value={searchValue}
                     className="town-input"
                     type="text"
                     placeholder="Enter city"/>
        <AutoComplete addCity={(id) => {
            addCity(id)
        }} cities={cities}/>
    </div>
);


export default Search;