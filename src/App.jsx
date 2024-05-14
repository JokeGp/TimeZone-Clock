import React, { useEffect, useState } from 'react';

function App() {
  const [date, setDate] = useState(new Date());
  const [dayOfYear, setDayOfYear] = useState(0);

  useEffect(() => {
    const worker = new Worker(URL.createObjectURL(new Blob([`
      setInterval(() => {
        postMessage(new Date().toISOString());
      }, 1000);
    `], { type: 'text/javascript' })));

    worker.onmessage = (event) => {
      setDate(new Date(event.data));
    };

    return () => {
      worker.terminate();
    };
  }, []);

  useEffect(() => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    setDayOfYear(Math.floor(diff / oneDay));
  }, [date]);

  const hour = date.getHours();

  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  return (
    <section className='main' style={{ backgroundColor: hour < 6 || hour > 18 ? 'black' : 'white', color: hour < 6 || hour > 18 ? 'white' : 'black' }}>
      <h1 className='main-title'>Reloj según IP</h1>
      <div className="main-hora">
      <p className='hora-sub-title'>Son las</p>
      <p className='hora-time'>{date.toLocaleTimeString()}</p>
      </div>
      <div className="main-fecha">
      <p className='fecha-title'>Fecha</p>
      <p className='fecha-fecha'>{date.toLocaleDateString()}</p>
      <p className='fecha-sub-title'>Día de la semana</p>
      <p className='fecha-dayOfWeek'>{days[date.getDay()]}</p>
      </div>
    </section>
  );
}

export default App;



