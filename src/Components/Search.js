import React, { useState } from 'react';
import Form from './Form';

const Search = () => {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleToggle = () => {
        setShowAdvanced(!showAdvanced);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '30px' }}>
            <button className="btn btn-primary" onClick={handleToggle}>
                {showAdvanced ? 'Hide Advanced Search' : 'Show Advanced Search'}
            </button>
            {showAdvanced && <Form />}
        </div>
    );
};

export default Search;