import React from 'react'
import {useState} from 'react';

const FilterItem = ({filterCategory, categories}) => {

  const [categoryInFilterItem, setCategoryInFilterItem] = useState('');

  const selectCategory = (e) => {
    setCategoryInFilterItem(filterCategory(e.target.value));
  }

  const categoryDropdown = categories.map(category => {
    return <option value={category}>{category}</option>
  });

  return (
    <div>
      <select value={categoryInFilterItem} onChange={selectCategory} >
        <option></option>
        <option value=''>All</option>
        {categoryDropdown}
      </select>
    </div>
  )
}

export default FilterItem