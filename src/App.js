import React from 'react';
import PlotApp from "./PlotApp";

const App = () => {
    return (
        <div>
            <h1 style={{marginLeft: '10px'}}>Магнитное поле катушек Гельмгольца. Визуализация графика B(x)</h1>
            <PlotApp/>
        </div>
    );
};

export default App;