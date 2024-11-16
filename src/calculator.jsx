import './calculator-css.css';
import { useState } from 'react';
import { evaluate } from 'mathjs';

export function Calculator() {
  const [keypad, setKeypad] = useState('');
  const [checkOn, setCheckOn] = useState(false);
  const [checkKeypad, setCheckKeypad] = useState(true);
  const [res, setRes] = useState('');

  // Switch on/off the calculator
  function switchOn(e) {
    if (e.target.checked) {
      setKeypad('0');
      setCheckOn(true);
      setCheckKeypad(false);
    } else {
      setKeypad('');
      setCheckOn(false);
      setCheckKeypad(true);
    }
  }

  // Handle keypad button click
  const handleKeypad = (e) => {
    if (checkOn) {
      e.preventDefault();
      const num = e.target.name;
      setKeypad((prevKeypad) => prevKeypad + num);
    } else {
      setKeypad('');
    }
  };

  // Calculate the result
  function result(e) {
    e.preventDefault();
    try {
      const resValue = evaluate(keypad);
      setRes(resValue); 
      setKeypad(resValue);
    } catch (err) {
      setRes('Error');
    }
  }

  // Delete the last character
  function delPad(e) {
    e.preventDefault();
    if(res !== ""){
      setKeypad(res.toString());
      setRes("");
    }else{
      setKeypad((prevKeypad) => prevKeypad.slice(0, -1));

    }
  }

  // Clear the input
  function allClearPad(e) {
    e.preventDefault();
    setKeypad('');
  }

  return (
    <div className="container">
      <div className='calculator'>
        <form>
          <div className='form-switch d-flex justify-content-end mt-4'>
            <input onChange={switchOn} type='checkbox' className='form-check-input' />
          </div>
          <div>
            <input id='display' readOnly style={{ pointerEvents: 'none' }} placeholder={keypad} value={keypad} />
          </div>
          <div id='buttons'>
            <div>
              <button disabled={checkKeypad} onClick={allClearPad} className="btn btn-danger">AC</button>
              <button disabled={checkKeypad} onClick={delPad} className="btn btn-warning">DEL</button>
              <button disabled={checkKeypad} onClick={handleKeypad} name='%' className="btn btn-secondary">%</button>
              <button disabled={checkKeypad} onClick={handleKeypad} name='+' className="btn btn-secondary">+</button>
            </div>
            <div>
              <button disabled={checkKeypad} onClick={handleKeypad} name='1' className="btn btn-primary">1</button>
              <button disabled={checkKeypad} onClick={handleKeypad} name='2' className="btn btn-primary">2</button>
              <button disabled={checkKeypad} onClick={handleKeypad} name='3' className="btn btn-primary">3</button>
              <button disabled={checkKeypad} onClick={handleKeypad} name='-' className="btn btn-secondary">-</button>
            </div>
            <div>
              <button disabled={checkKeypad} onClick={handleKeypad} name='4' className="btn btn-primary">4</button>
              <button disabled={checkKeypad} onClick={handleKeypad} name='5' className="btn btn-primary">5</button>
              <button disabled={checkKeypad} onClick={handleKeypad} name='6' className="btn btn-primary">6</button>
              <button disabled={checkKeypad} onClick={handleKeypad} name='*' className="btn btn-secondary">*</button>
            </div>
            <div>
              <button disabled={checkKeypad} onClick={handleKeypad} name='7' className="btn btn-primary">7</button>
              <button disabled={checkKeypad} onClick={handleKeypad} name='8' className="btn btn-primary">8</button>
              <button disabled={checkKeypad} onClick={handleKeypad} name='9' className="btn btn-primary">9</button>
              <button disabled={checkKeypad} onClick={handleKeypad} name='/' className="btn btn-secondary">/</button>
            </div>
            <div>
              <button disabled={checkKeypad} onClick={handleKeypad} name='.' className="btn btn-primary">.</button>
              <button disabled={checkKeypad} onClick={handleKeypad} name='0' className="btn btn-primary">0</button>
              <button disabled={checkKeypad} onClick={result} className="equal" style={{ width: '46%' }}>=</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
