import React from "react";
import GitHubWrapper from "../Wrapper";
import '../styles/CreateGist.css';
import { Redirect } from 'react-router-dom'

export default class CreateGist extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            description: '',
            public: true,
            filename: '',
            content: '',
            redirect: false
        }
    }

    onSubmit = () => {
        let wrapper = new GitHubWrapper();
        if(this.state.filename.includes('.')){
            wrapper.createGist(this.makeJson()).then(response => {
                console.log(response)
                this.setState({ redirect: true })
            })
        }
        if(!this.state.filename.includes('.')){
            alert('Plik powinien zawierać rozszerzenie')
        }
    }

    goBack = () => {
        this.setState({ redirect: true })
    }

    makeJson(){
        const json = {
            description: this.state.description,
            public: this.state.public,
            "files": {
                [this.state.filename]: {
                    content: this.state.content,
                }
            }
        };
        return JSON.stringify(json);
    }

    handleDescription = (event) => {
        this.setState({ description: event.target.value });
    }
    handleFilename = (event) => {
        this.setState({ filename: event.target.value });
    }
    handleCodeInput = (event) => {
        this.setState({ content: event.target.value });
    }


    render(){
        if(this.state.redirect === true) {
            return <Redirect to='/' />
        }
        return (
            <div className = "CreationTable">
                <h1>Utwórz nowego gista</h1>
                <div className="form_container">
                    <form tabIndex="0" id="create_form">
                        <fieldset>
                            <div>
                                <input type="text" placeholder="Opis gista" onChange={this.handleDescription} />
                                <input type="text" placeholder="Nazwa i rozszerzenie gista" onChange={this.handleFilename} />
                            </div>
                            <textarea tabIndex="0" rows="5" cols="60" placeholder="Treść gista" onChange={this.handleCodeInput}></textarea>
                        </fieldset>
                        <button type="button" onClick={this.onSubmit}>Zatwierdź</button>
                        <button type="button" onClick={this.goBack}>Powrót</button>
                    </form>
                </div>
            </div>
        )
    }
}