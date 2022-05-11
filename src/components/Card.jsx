import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Card = () => {
    const {resource, id} = useParams();
    const [swObj, setSWObj] = useState({});
    const [homeworld, setHomeworld] = useState();
    const history = useHistory();

    // useEffect runs once when component is mounted, then runs again whenever the dependencies (i.e. elements in array) are changed
    // if you have a return statement inside your useEffect, that runs any time component is unmounted
    useEffect (() => {
        console.log("Luke I am your father");
        // console.log(resource, id)
        axios.get(`https://swapi.dev/api/${resource}/${id}`)
        .then(response => {
                console.log("this is the response", response.data)
                setSWObj(response.data)
            })
        .catch(err => {
            console.log(err)
            history.push('/error')
        })

    }, [resource, id]);

    useEffect (() => {
        console.log("there's no place like homeworld")
        // if statement here to prevent second axios.get() from running before swObj.homeworld has been defined
        // i.e. axios.get() is asynchronous, so if you didn't have this if statement, second API call would run immediately when component is mounted, and return an undefined bc swObj.homeworld doesn't exist yet
        // tie this to first API call by making swObj.homeworld a dependency of second useEffect
        if(swObj.homeworld) {
            axios.get(swObj.homeworld)
        .then(response => {
            console.log(response)
            setHomeworld(response.data)})
        .catch(err => {
            console.log(err);
            })
        }
    }, [swObj.homeworld]);

    if (resource === 'people') {
        return (
            <>
            <h2>{swObj.name}</h2>
            <p><strong>Height: {swObj.height}</strong></p>
            <p><strong>Mass: {swObj.mass}</strong></p>
            <p><strong>Hair Color: {swObj.hair_color}</strong></p>
            <p><strong>Homeworld: {homeworld.name}</strong></p>
            <p><strong>Birth Year: {swObj.birth_year}</strong></p>
            </>
        )
    }

    else if (resource === 'planets'){
        return (
            <>
            <h2>{swObj.name}</h2>
            <p><strong>Terrain: {swObj.terrain}</strong></p>
            <p><strong>Climate: {swObj.climate}</strong></p>
            <p><strong>Population: {swObj.population}</strong></p>
            <p><strong>Gravity: {swObj.gravity}</strong></p>
            </>
        )
    }

    else if (resource === 'species') {
        return(
        <>
        <h2>{swObj.name}</h2>
        <p><strong>Classification: {swObj.classification}</strong></p>
        <p><strong>Designation: {swObj.designation}</strong></p>
        <p><strong>Average Height: {swObj.average_height}</strong></p>
        <p><strong>Language {swObj.language}</strong></p>
        </>
        )
    }



}

export default Card;