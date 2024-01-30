import React, { useState } from 'react';
import { useEffect } from 'react';

const Problem1 = () => {

    const [show, setShow] = useState('all');
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [displayData, setDisplayData] = useState([]);
    const [allData, setAllData] = useState([]);
    // const [Current, setAllData] = useState([]);

    const capitalizeFirstLetter = (inputString) => {
        return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
    };

    const getHightValue = (statusConverter) => {
        const highestValue = Math.max(...Object.values(statusConverter));
        console.log(highestValue);
        return highestValue;
    }

    const statusConverter = {
        "active": 1,
        "completed": 2
    };

    const StatusToNumber = (status) => {
        const lower_status = status.toLowerCase()
        if (!statusConverter.hasOwnProperty(lower_status)) {
            console.log("dont know status, Now adding status of " + lower_status);
            const highestValue = getHightValue(statusConverter);
            statusConverter[lower_status] = highestValue + 1;
        }

        return statusConverter[lower_status];
    };

    useEffect(() => {
        if (show !== 'all') {
            const copyAllData = [...allData];
            const filteredData = copyAllData.filter(data => data.status.toLowerCase() === show.toLowerCase());
            setDisplayData(filteredData);

        } else {
            // setDisplayData(allData);
            const copyAllData = [...allData];
            const sortedData = copyAllData.slice().sort((data1, data2) => {
                return StatusToNumber(data1.status) - StatusToNumber(data2.status);
            });
            console.log(sortedData);
            console.log(statusConverter);

            setDisplayData(sortedData);



        }
        // console.log(displayData);
    }, [allData, show]);

    const handleClick = (val) => {
        setShow(val);

    }
    const handleSubmitClick = (event) => {
        event.preventDefault();
        const newSingleData = {
            "name": capitalizeFirstLetter(name),
            "status": capitalizeFirstLetter(status),
        };
        // console.log(newSingleData);
        const AllNewData = [...allData, newSingleData]
        setAllData(AllNewData);
        // console.log(allData);
    }

    const handleNameChange = (event) => {

        setName(event.target.value);
    };
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={handleSubmitClick}>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Name" onChange={handleNameChange} />
                        </div>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Status" onChange={handleStatusChange} />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary" >Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'active' && 'active'}`} type="button" onClick={() => handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'completed' && 'active'}`} type="button" onClick={() => handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                displayData.map((data, idx) => (
                                    <tr key={idx}>
                                        <td>{data.name}</td>
                                        <td>{data.status}</td>

                                    </tr>

                                )
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;