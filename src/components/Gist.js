import React from "react";
import { Redirect } from "react-router";
import '../styles/Gist.css';
import GitHubWrapper from "../Wrapper";

export default class Gist extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            filename: '',
            description: '',
            id: '',
            redirect: false
        }
    }

    componentDidMount(){
        this.setState({ 
            filename: this.props.data.filename,
            description: this.props.data.description,
            id: this.props.data.id
        })
    }

    deleteGist = () => {
        const GistID = this.state.id
        this.props.handleDelete(GistID)
    }

    editGist = () => {
        this.setState({ redirect: true });
    }

    starGist = () => {
        const wrapper = new GitHubWrapper()
        wrapper.putRequest(`/gists/` + this.state.id + `/star`)
    }

    render(){
        if(this.state.redirect){
            return <Redirect 
                to={{
                    pathname: '/edit_gist',
                    state: { id: this.state.id }
                }}/>
        }
        return (
        <div className="Gist" key={this.state.id}>
            <p>Nazwa i rozszerzenie gista: <code>{this.state.filename}</code> <br/>
            Opis: <code>{this.state.description}</code> <br/>
            </p>
            <button className="delete-button" onClick={this.deleteGist.bind(this)}>Usuń</button>
            <button className="edit-button" onClick={this.editGist.bind(this)}>Edytuj</button>
            <button className="star-button" onClick={this.starGist.bind(this)}>Star</button>
        </div>
        )
    }
}