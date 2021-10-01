import GitHubWrapper from "../Wrapper";
import React, { useState, useEffect } from 'react';
import Gist from "./Gist";
import { Redirect } from 'react-router-dom'
import '../styles/Main.css';

const Main = () => {
    const [list, setList] = useState([])
    const [redirect, setRedirect] = useState(false)
    const [userName, getUserName] = useState('')
    const wrapper = new GitHubWrapper()


    const handleDelete = (id) => {
        wrapper.deleteGist(id).then(()=> {
        setList(list.filter(gist => gist.id !== id));
        })
    };

    const getGists = (ids) => {
        ids.map(id => {
            wrapper.getGist(id).then(gist => {
                for(const [key,value] of Object.entries(gist.data.files)){
                    const downloadedGist = {
                        filename: value.filename,
                        content: value.content,
                        public: true,
                        description: gist.data.description,
                        id: gist.data.id
                    }
                    setList(previousList => [downloadedGist, ...previousList])
                }
                getUserName(gist.data.owner.login)
            })
        })
    }

    const fetchGistIds = async () => {
        await wrapper.getRequest('/gists').then(gist => {
            const ids = []
            for(const [key,value] of Object.entries(gist.data)){
                ids.push(value.id)
            }
            if(ids.length === gist.data.length){
                setList([])
                getGists(ids)
            }
        })
    }

    const RedirectToCreateGist = () => {
        setRedirect(true)
    }

    useEffect(() => {
        fetchGistIds();
    }, [])

    const showGists = list.map(gist => {
        return <Gist data={gist} key={gist.id} handleDelete={handleDelete}/>
    })
    return (
        <div className="Main">
            {redirect ? <Redirect to={{
                pathname: '/create_gist',
            }}/> :
            <div>
                <div className="Welcome">
                    <h1>Gisty użytkownika {userName}</h1>
                    <h2>Posiadasz następującą liczbę gistów: {list.length}</h2>
                <button onClick={RedirectToCreateGist}>Utwórz gista!</button>
                </div>
                {showGists}
            </div>}
        </div>
    )
}

export default Main