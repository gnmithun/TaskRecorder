import React from 'react';

function CategoryList(props) {
    return (
        <div>
            <ul> 
            { 
                props.data.map((category) => 
                    <ol key={category.id}> {category.type } </ol>
                )
            }
            </ul>
        </div>
    );
}

export default CategoryList;