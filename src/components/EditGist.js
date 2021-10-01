import React from 'react';
import { Redirect } from 'react-router-dom'
import '../styles/EditGist.css';
import GitHubWrapper from '../Wrapper'

export default class EditGist extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filename: '',
            content: '',
            description: '',
            public: true,
            redirect: false,
            id: this.props.location.state.id
        }
        this.wrapper = new GitHubWrapper()
    }

    componentDidMount(){
        this.wrapper.getGist(this.state.id).then(response => {
            this.setState({ description: response.data.description })
                for(const [key, value] of Object.entries(response.data.files)){
                    this.setState({
                        filename: value.filename,
                        content: value.content,
                    })
               }
            }
        )
    }

    onSubmit = () => {
        this.wrapper.editGist(this.state.id, this.makeJson()).then(() => {
            this.setState({ redirect: true })
        })
    }

    goBack = () => {
        this.setState({ redirect: true })
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

    makeJson = () => {
        const json = {
            description: this.state.description,
            public: true,
            "files": {
                [this.state.filename]: {
                    content: this.state.content,
                }
            }
        };
        return JSON.stringify(json);
    }
 
    render(){
        if(this.state.redirect === true) {
            return <Redirect to='/' />
        }
        if(this.state.redirect === false){
            return(
                <div>
                    <h1>Edytowany gist: <b>'{this.state.filename}'</b></h1>
                    <div>
                        <form tabIndex="0">
                            <fieldset>
                                <div>
                                    <input type="text" placeholder="Opis gista" defaultValue={this.state.description} onChange={this.handleDescription} />
                                    <input readOnly="true" type="text" placeholder="Nazwa i rozszerzenie gista" defaultValue={this.state.filename} onChange={this.handleFilename} />
                                </div>
                                <textarea tabIndex="0" rows="5" cols="60" placeholder="Treść gista" defaultValue={this.state.content} onChange={this.handleCodeInput}></textarea>
                            </fieldset>
                            <button type="button" onClick={this.onSubmit}>Zatwierdź</button>
                            <button type="button" onClick={this.goBack}>Powrót</button>
                        </form>
                    </div>
                </div>
            )
        }
    }
}