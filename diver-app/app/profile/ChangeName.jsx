'use client';

import React from 'react'

const ChangeName = (props) => {

    const session = props.session;

    function handleSubmit(event){
        event.preventDefault();
        
        const formData = new FormData(event.target);

        console.log('You like to change to:', formData.get('changeName'));

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor='changeName'>input name </label>
                <input type='text' id='changeName' name='changeName'></input>

                <button type='submit'>Change</button>
            </form>
        </>
  )
}

export default ChangeName