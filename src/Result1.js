import React, { useState } from 'react';
import './App.css';

function Result1() {
    const [rollNo, setRollNo] = useState('');
    const [name, setName] = useState('');
    const [sub1, setSub1] = useState('');
    const [sub2, setSub2] = useState('');
    const [sub3, setSub3] = useState('');
    const [sub4, setSub4] = useState('');
    const [sub5, setSub5] = useState('');
    const [results, setResults] = useState([]);
    const [getresults, getsetResults] = useState([]);


    const submitBtn = () => {
        const newResult = {
            rollNo:rollNo,
            name:name,
            sub1:sub1,
            sub2:sub2,
            sub3:sub3,
            sub4:sub4,
            sub5:sub5,
        };

        

        const marksArray = [sub1, sub2, sub3, sub4, sub5].map(Number);
        const totalMarks = marksArray.reduce((acc, mark) => acc + mark, 0);
        // const percentage = (totalMarks / (marksArray.length * 100)) * 100;

        // Check if any subject has less than 35 marks (i.e., the student failed)
        if (sub1 < 35 || sub2 < 35 || sub3 < 35 || sub4 < 35 || sub5 < 35) {
            newResult.percentage = 0;
        } else {
            newResult.percentage = parseFloat(((totalMarks / (marksArray.length * 100)) * 100).toFixed(2));
        }

        let grade;
        if (newResult.percentage >= 90) {
            grade = 'A+';
        } else if (newResult.percentage >= 80) {
            grade = 'A';
        } else if (newResult.percentage >= 70) {
            grade = 'B';
        } else if (newResult.percentage >= 60) {
            grade = 'C';
        } else if (newResult.percentage >= 50) {
            grade = 'D';
        } else {
            grade = 'F';
        }

        let result;
        if (sub1 >= 35 && sub2 >= 35 && sub3 >= 35 && sub4 >= 35 && sub5 >= 35) {
            result = 'Pass';
        } else if ((sub1 < 35 ? 1 : 0) + (sub2 < 35 ? 1 : 0) + (sub3 < 35 ? 1 : 0) + (sub4 < 35 ? 1 : 0) +(sub5 < 35 ? 1 : 0) > 2){
            result = 'ATKT';
        } else {
            result = 'Fail';
        }

        const minMark = Math.min(...marksArray);
        const maxMark = Math.max(...marksArray);
        newResult.totalMarks = totalMarks;
        // newResult.percentage = percentage;
        newResult.grade = grade;
        newResult.result = result;

        newResult.minMark = minMark;
        newResult.maxMark = maxMark;

        setResults([...results, newResult]);
        getsetResults([...getresults, newResult]);

        setRollNo('');
        setName('');
        setSub1('');
        setSub2('');
        setSub3('');
        setSub4('');
        setSub5('');

        

    };
    const perfilter=(e)=>{
        var data=parseInt(e.target.value);
        if(data==0){
            var per=getresults.filter((ele,item)=>{
                return ele.percentage==data;
            })
        }else{
            var per=getresults.filter((ele,item)=>{
               return ele.percentage>=data;
            })
        }
        setResults(per);
    }

    const resultfilter = (e) => {
        const filterCategory = e.target.value.toLowerCase(); 
    
        const filteredResults = getresults.filter((result) => {
            const resultLowerCase = result.result.toLowerCase();
            return resultLowerCase.includes(filterCategory);
        });
    
        setResults(filteredResults);
    };

    const sort = () => {
        const sortedResults = [...getresults];
        sortedResults.sort((a, b) => a.percentage - b.percentage);
        setResults(sortedResults);
    };


    return (
        <>
            <center>
                <table border={1}>
                    <tr>
                        <td>ROLL NO :</td>
                        <td>
                            <input type="text" value={rollNo} onChange={(e) => setRollNo(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>NAME :</td>
                        <td>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>SUBJECT 1 :</td>
                        <td>
                            <input type="text" value={sub1} onChange={(e) => setSub1(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>SUBJECT 2 :</td>
                        <td>
                            <input type="text" value={sub2} onChange={(e) => setSub2(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>SUBJECT 3 :</td>
                        <td>
                            <input type="text" value={sub3} onChange={(e) => setSub3(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>SUBJECT 4 :</td>
                        <td>
                            <input type="text" value={sub4} onChange={(e) => setSub4(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>SUBJECT 5 :</td>
                        <td>
                            <input type="text" value={sub5} onChange={(e) => setSub5(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <button onClick={submitBtn}>SUBMIT</button>
                        </td>
                    </tr>
                </table>
                
                percentage<select  onChange={perfilter}>
                    <option value={''}>select</option>
                    <option value="0">00</option>
                    <option value="90">90</option>
                    <option value="80">80</option>
                    <option value="70">70</option>
                    <option value="60">60</option>
                    <option value="50">50</option>
                </select><br/>
                result<select onChange={resultfilter}>
                    <option value={''}>select</option>
                    <option value="pass">Pass</option>
                    <option value="fail">Fail</option>
                    <option value="ATKT">ATKT</option>
                </select><br/>
                <button onClick={sort}>Sort by Percentage</button>


                {
                    results.length > 0 && (
                        <table border={1}>
                            <thead>
                                <tr>
                                    <th>ROLL NO</th>
                                    <th>NAME</th>
                                    <th>SUBJECT 1</th>
                                    <th>SUBJECT 2</th>
                                    <th>SUBJECT 3</th>
                                    <th>SUBJECT 4</th>
                                    <th>SUBJECT 5</th>
                                    <th>Min </th>
                                    <th>MAX</th>
                                    <th>TOTAL MARKS</th>
                                    <th>PERCENTAGE</th>
                                    <th>GRADE</th>
                                    <th>RESULT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    results.map((result, index) => (
                                        <tr key={index} style={{backgroundColor : result.result==="Pass" ? "green":result.result==="ATKT"?"blue":"red"}}>
                                            <td>{result.rollNo}</td>
                                            <td>{result.name}</td>
                                            <td>{result.sub1}</td>
                                            <td>{result.sub2}</td>
                                            <td>{result.sub3}</td>
                                            <td>{result.sub4}</td>
                                            <td>{result.sub5}</td>
                                            <td>{result.minMark}</td>
                                            <td>{result.maxMark}</td>
                                            <td>{result.totalMarks}</td>
                                            <td>{result.percentage}</td>
                                            <td>{result.grade}</td>
                                            <td>{result.result}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    )
                }
            </center>
        </>
    );
}

export default Result1;
    