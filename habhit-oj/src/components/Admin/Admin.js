import React, { useState } from 'react';

const Admin = () => {

    const [added, setAdded] = useState(false);

    const handleAddProblem = (event) => {
        const proceed = window.confirm('Are you sure, you want to add this Problem?');

        if (proceed) {
            event.preventDefault();
            const problemName = event.target.probName.value;
            const time = "1s";
            const memory = "512mb";
            const description = event.target.description.value;
            const input = event.target.aboutInput.value;
            const output = event.target.aboutOutput.value;
            const sample = {
                input: String(event.target.sampleInput.value),
                output: String(event.target.sampleOutput.value)
            };
            const hidden = {
                input: String(event.target.hiddenInput.value),
                output: String(event.target.hiddenOutput.value)
            };

            const newProblem = {
                problemName,
                time,
                memory,
                description,
                input,
                output,
                sample,
                hidden
            };

            fetch('http://localhost:5000/problems', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newProblem)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data.insertedId);
                    setAdded(true);
                });
        }

    }

    return (
        <div className='my-5'>
            {
                added && <p className='text-success'>Problem has been added successfully!</p>
            }
            <h2>Add New Problem</h2>
            <form onSubmit={handleAddProblem} className='w-50 mx-auto'>
                <input
                    className='w-100 p-1 mb-2'
                    type="text" name="probName"
                    placeholder="Enter Problem Name" required />

                <textarea
                    rows={10}
                    className='w-100 p-1 mb-2'
                    type="text" name="description"
                    placeholder="Write description about this problem" required />

                <textarea
                    className='w-100 p-1 mb-2'
                    type="text" name="aboutInput"
                    placeholder="Enter input details" required />
                <textarea
                    className='w-100 p-1 mb-2'
                    type="text" name="aboutOutput"
                    placeholder="Enter output details" required />

                <textarea
                    className='w-100 p-1 mb-2'
                    type="text" name="sampleInput"
                    placeholder="Enter sample input" required />
                <textarea
                    className='w-100 p-1 mb-2'
                    type="text" name="sampleOutput"
                    placeholder="Enter sample output" required />

                <textarea
                    className='w-100 p-1 mb-2'
                    type="text" name="hiddenInput"
                    placeholder="Enter hidden input" required />
                <textarea
                    className='w-100 p-1 mb-2'
                    type="text" name="hiddenOutput"
                    placeholder="Enter hidden output" required />


                <input
                    className='text-white w-100 mt-4 p-1 bg-primary border-0 rounded'
                    type="submit"
                    value="Add Problem" />

            </form>
        </div>
    );
};

export default Admin;