import React, { useState } from 'react';
import './Adminform.css';

const AdminForm = () => {
  const [vitals, setVitals] = useState({
    height: '',
    weight: '',
    bp: '',
    temp: '',
    spo2: '',
    resRate: '',
    pulseRate: '',
    bloodSugar: '',
    allergy1: '',
    allergy2: '',
  });

  const [majorComplaints, setMajorComplaints] = useState('');
  const [familyHistory, setFamilyHistory] = useState(['Diabetes', 'Sugar']);
  const [birthHistory, setBirthHistory] = useState(['Diabetes', 'Sugar']);
  const [surgicalHistory, setSurgicalHistory] = useState(['Diabetes', 'Sugar']);
  const [otherHistory, setOtherHistory] = useState(['Diabetes', 'Sugar']);
  
  const [examination, setExamination] = useState({
    conscious: false,
    oriented: false,
    febrile: false,
    pallor: false,
    hydration: false,
    s1s2: false,
    blae: false,
    ecg: false,
  });

  const onexamination = ['conscious', 'oriented', 'febrile', 'pallor', 'hydration'];
  const systematic = ['s1s2', 'blae'];
  const availableTests = ['X-Ray', 'MRI', 'Blood Test', 'Urine Test'];

  // Manage dynamic addition of items
  const [isTestListVisible, setIsTestListVisible] = useState(false);
  const [isOnExamListVisible, setIsOnExamListVisible] = useState(false);
  const [isSystematicListVisible, setIsSystematicListVisible] = useState(false);

  const [dynamicOnExaminations, setDynamicOnExaminations] = useState([]);
  const [dynamicSystematic, setDynamicSystematic] = useState([]);
  const [additionalTests, setAdditionalTests] = useState([]); // For "Test to Take"

  const [prescription, setPrescription] = useState([]);
  const [medicine, setMedicine] = useState('');
  const [dosage, setDosage] = useState('');
  const [timing, setTiming] = useState('');
  const [duration, setDuration] = useState('');

  const handleVitalsChange = (e) => {
    const { name, value } = e.target;
    setVitals((prevVitals) => ({ ...prevVitals, [name]: value }));
  };

  const handleExaminationChange = (e) => {
    const { name, checked } = e.target;
    setExamination((prevExamination) => ({ ...prevExamination, [name]: checked }));
  };

  const handleDeleteHistory = (history, setHistory, item) => {
    setHistory(history.filter((entry) => entry !== item));
  };

  const handleAddPrescription = () => {
    setPrescription([...prescription, { medicine, dosage, timing, duration }]);
    setMedicine('');
    setDosage('');
    setTiming('');
    setDuration('');
  };

  const handleAddItem = (item, setDynamicList, dynamicList) => {
    // Add item if it's not already added
    if (!dynamicList.includes(item)) {
      setDynamicList([...dynamicList, item]);
    }
  };

  const handleSubmit = () => {
    const formData = {
      vitals,
      majorComplaints,
      familyHistory,
      birthHistory,
      surgicalHistory,
      otherHistory,
      examination,
      additionalTests, // Include additional tests in submission
      dynamicOnExaminations,
      dynamicSystematic,
    };
    console.log(formData);
  };

  return (
    <div className="scrollable-container">
      <h5 className="title">Vitals - Doctor/Nurse</h5>
      <div className="vitals-container">
        <div className="vitals-column">
          <p><span className="label">Height</span> <input type="number" name="height" value={vitals.height} onChange={handleVitalsChange} /></p>
          <p><span className="label">Weight</span> <input type="number" name="weight" value={vitals.weight} onChange={handleVitalsChange} /></p>
          <p><span className="label">BP</span> <input type="text" name="bp" value={vitals.bp} onChange={handleVitalsChange} /></p>
          <p><span className="label">Temp</span> <input type="number" name="temp" value={vitals.temp} onChange={handleVitalsChange} /></p>
          <p><span className="label">SPO2</span> <input type="number" name="spo2" value={vitals.spo2} onChange={handleVitalsChange} /></p>
        </div>
        <div className="vitals-column">
          <p><span className="label">Res rate</span> <input type="number" name="resRate" value={vitals.resRate} onChange={handleVitalsChange} /></p>
          <p><span className="label">Pulse rate</span> <input type="number" name="pulseRate" value={vitals.pulseRate} onChange={handleVitalsChange} /></p>
          <p><span className="label">Blood Sugar</span> <input type="number" name="bloodSugar" value={vitals.bloodSugar} onChange={handleVitalsChange} /></p>
          <p><span className="label">Allergy 1</span> <input type="text" name="allergy1" value={vitals.allergy1} onChange={handleVitalsChange} /></p>
          <p><span className="label">Allergy 2</span> <input type="text" name="allergy2" value={vitals.allergy2} onChange={handleVitalsChange} /></p>
        </div>
      </div>

      <div className="vitals-container">
        {/* Existing Vitals fields */}
        <div>
          <h5 className="title">Family History</h5>
          <table>
            <tbody>
              {familyHistory.map((item, index) => (
                <tr key={index}>
                  <td>{item}</td>
                  <td><button onClick={() => handleDeleteHistory(familyHistory, setFamilyHistory, item)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h5>Birth History</h5>
          <table>
            <tbody>
              {birthHistory.map((item, index) => (
                <tr key={index}>
                  <td>{item}</td>
                  <td><button onClick={() => handleDeleteHistory(birthHistory, setBirthHistory, item)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h5>Surgical history</h5>
          <table>
            <tbody>
              {surgicalHistory.map((item, index) => (
                <tr key={index}>
                  <td>{item}</td>
                  <td><button onClick={() => handleDeleteHistory(surgicalHistory, setSurgicalHistory, item)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h5>Any Other History</h5>
          <table>
            <tbody>
              {otherHistory.map((item, index) => (
                <tr key={index}>
                  <td>{item}</td>
                  <td><button onClick={() => handleDeleteHistory(otherHistory, setOtherHistory, item)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h5 className="title">Major complaints</h5>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <textarea value={majorComplaints} onChange={(e) => setMajorComplaints(e.target.value)} placeholder="Type..." style={{ width: '300px', height: '100px' }} />
        <button onClick={handleSubmit}>Forward to Doctor</button>
      </div>

      <div className="vitals-container">
        <div>
          <h5>On Examination</h5>
          {onexamination.map((field) => (
            <div key={field}>
              <input type="checkbox" name={field} checked={examination[field]} onChange={handleExaminationChange} />
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            </div>
          ))}
          {dynamicOnExaminations.map((field, index) => (
            <div key={index}>
              <input
                type="checkbox"
                name={field.toLowerCase().replace(/\s+/g, '')}
                checked={examination[field.toLowerCase().replace(/\s+/g, '')] || false}
                onChange={handleExaminationChange}
              />
              <label>{field}</label>
            </div>
          ))}
          <a href="#" onClick={() => setIsOnExamListVisible(!isOnExamListVisible)}>+</a>
          {isOnExamListVisible && (
            <ul>
              {['New On Examination 1', 'New On Examination 2'].map((item, index) => (
                <li key={index} onClick={() => handleAddItem(item, setDynamicOnExaminations, dynamicOnExaminations)}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h5>Systemic Examination</h5>
          {systematic.map((field) => (
            <div key={field}>
              <input type="checkbox" name={field} checked={examination[field]} onChange={handleExaminationChange} />
              <label>{field.toUpperCase()}</label>
            </div>
          ))}
          {dynamicSystematic.map((field, index) => (
            <div key={index}>
              <input
                type="checkbox"
                name={field.toLowerCase().replace(/\s+/g, '')}
                checked={examination[field.toLowerCase().replace(/\s+/g, '')] || false}
                onChange={handleExaminationChange}
              />
              <label>{field}</label>
            </div>
          ))}
          <a href="#" onClick={() => setIsSystematicListVisible(!isSystematicListVisible)}>+</a>
          {isSystematicListVisible && (
            <ul>
              {['New Systemic 1', 'New Systemic 2'].map((item, index) => (
                <li key={index} onClick={() => handleAddItem(item, setDynamicSystematic, dynamicSystematic)}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h5>Test to Take</h5>
          <div>
            <input type="checkbox" name="ecg" checked={examination.ecg} onChange={handleExaminationChange} />
            <label>ECG</label>
          </div>
          {additionalTests.map((test, index) => (
            <div key={index}>
              <input
                type="checkbox"
                name={test.toLowerCase().replace(/\s+/g, '')}
                checked={examination[test.toLowerCase().replace(/\s+/g, '')] || false}
                onChange={handleExaminationChange}
              />
              <label>{test}</label>
            </div>
          ))}
          <a href="#" onClick={() => setIsTestListVisible(!isTestListVisible)}>+</a>
          {isTestListVisible && (
            <ul>
              {availableTests.map((test, index) => (
                <li key={index} onClick={() => handleAddItem(test, setAdditionalTests, additionalTests)}>
                  {test}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div>
        <h5>Prescription</h5>
        <table>
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Dosage</th>
              <th>Timing</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {prescription.map((item, index) => (
              <tr key={index}>
                <td>{item.medicine}</td>
                <td>{item.dosage}</td>
                <td>{item.timing}</td>
                <td>{item.duration}</td>
              </tr>
            ))}   
          </tbody>
        </table>
        <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <input type="text" placeholder="Medicine" value={medicine} onChange={(e) => setMedicine(e.target.value)} required />
          <input type="text" placeholder="Dosage" value={dosage} onChange={(e) => setDosage(e.target.value)} required />
          <input type="text" placeholder="Timing" value={timing} onChange={(e) => setTiming(e.target.value)} required />
          <input type="text" placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} required />
        </div>
          <button onClick={handleAddPrescription}>Add Prescription</button>
        </div>
      </div>
      <div className='title'>
        <button>Generate prescription</button>


        <button>Test Report Requirement</button>
      </div>
    </div>
  );
};

export default AdminForm;
