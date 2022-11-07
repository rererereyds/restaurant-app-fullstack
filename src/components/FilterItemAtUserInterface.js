import React from 'react'
import {useState} from 'react';

const FilterItemAtUserInterface = ({filterCategoryAtUI, categoriesAtUI}) => {

  const [categoryInFilterItem, setCategoryInFilterItem] = useState('');

  const selectCategory = (e) => {
    setCategoryInFilterItem(filterCategoryAtUI(e.target.value));
  }

  const categoryDropdown = categoriesAtUI.map(category => {
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

export default FilterItemAtUserInterface