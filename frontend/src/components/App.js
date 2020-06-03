import React, { Component } from "react";
import { render } from "react-dom";
import List from "./List";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        };
        this.deletePackage = this.deletePackage.bind(this);
    }

    componentDidMount() {
        fetch("api/packages")
            .then(response => {
                if (response.status > 400) {
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!" };
                    });
                }
                return response.json();
            })
            .then(data => {
                this.setState(() => {
                    return {
                        data,
                        loaded: true
                    };
                });
            });
    }

    getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }    

    deletePackage(id) {
        var csrftoken = this.getCookie('csrftoken');
        var request = new Request(
            'http://127.0.0.1:8000/api/packages/'+id+'/', {
            headers: {
                'X-CSRFToken': csrftoken
            }
        });
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow',
            mode: 'same-origin'
        };

        fetch(request, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    render() {
        return (
            <div>
                <List packages={this.state.data} deletePackage={this.deletePackage} />
            </div>
        );
    }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);