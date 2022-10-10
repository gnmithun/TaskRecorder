import React from 'react';

function CategoryList(props) {
    return (
        <div>
            <label> Categories
            <select name="category" id="Categories">
                {
                    props.data.map((category) => <option key={category.id} value={category.type}>{category.type} </option>)
                }
            </select>
            </label>
        </div>
    );
}

export default CategoryList;