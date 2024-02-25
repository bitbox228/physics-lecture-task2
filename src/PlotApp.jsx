import React, {useState} from 'react';
import Plot from 'react-plotly.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from 'react-bootstrap';

const PlotApp = () => {
    const mu_0 = 4 * Math.PI * Math.pow(10, -7);
    const [n, setN] = useState('');
    const [i, setI] = useState('');
    const [r, setR] = useState('');
    const [xData, setXData] = useState([]);
    const [yData, setYData] = useState([]);

    const handleNChange = (e) => {
        setN(e.target.value);
    };

    const handleIChange = (e) => {
        setI(e.target.value);
    };

    const handleRChange = (e) => {
        setR(e.target.value);
    };

    const handlePlotUpdate = () => {
        if (n === '') {
            alert('Введите число витков');
            return;
        }
        if (i === '') {
            alert('Введите величину тока');
            return;
        }
        if (r === '') {
            alert('Введите радиус');
            return;
        }
        if (n <= 0) {
            alert('Числов витков в катушках должно быть положительным');
            return;
        }
        if (r <= 0) {
            alert('Радиус катушек должен быть положительным.');
            return;
        }

        let step = r / 1000

        const newXData = Array.from(
            {length: Math.ceil((20 * r + 1) / step)},
            (_, index) => -10 * r + index * step
        );

        const newYData = newXData.map(x =>
            mu_0 * n * i * Math.pow(r, 2) / (2 * Math.pow(Math.pow(r, 2) + Math.pow(x, 2), 3 / 2))
        );

        setXData(newXData);
        setYData(newYData)
    };

    return (
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
            <div style={{display: 'flex', flexDirection: 'column', marginLeft: '20px', marginTop: '140px'}}>
                <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px'}}>
                    <div style={{display: 'flex', flexDirection: 'column', marginRight: '20px'}}>
                        <div style={{marginTop: '5px', marginBottom: '16px'}}>
                            <Form.Label htmlFor='nInput'>Число витков в катушках (n):</Form.Label>
                        </div>
                        <div style={{marginBottom: '16px'}}>
                            <Form.Label htmlFor='iInput'>Величина тока (I, А):</Form.Label>
                        </div>
                        <div>
                            <Form.Label htmlFor='rInput'>Радиус катушек (R, м):</Form.Label>
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div style={{marginBottom: '10px'}}>
                            <Form.Control id='nInput' type='number' value={n} onChange={handleNChange}/>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <Form.Control id='iInput' type='number' value={i} onChange={handleIChange}/>
                        </div>
                        <div>
                            <Form.Control id='rInput' type='number' value={r} onChange={handleRChange}/>
                        </div>
                    </div>
                </div>
                <Button
                    onClick={handlePlotUpdate}
                    style={{
                        backgroundColor: 'red',
                        color: 'white',
                        border: 'none',
                        padding: '20px 40px',
                        fontSize: '24px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        outline: 'none',
                    }}
                >
                    Построить график
                </Button>
            </div>
            <div style={{height: '400px', width: '600px'}}>
                <Plot
                    data={[
                        {
                            x: xData,
                            y: yData,
                            type: 'scatter',
                            mode: 'lines+points',
                            marker: {color: 'red'},
                        },
                    ]}
                    layout={{
                        title: 'Магнитная индукция поля',
                        xaxis: {title: 'Расстояние по оси катушек (x, м)'},
                        yaxis: {title: 'Магнитная индукция (B(x), Тл)'}
                    }}
                />
            </div>
        </div>
    );

};

export default PlotApp;