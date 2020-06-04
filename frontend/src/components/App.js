import React, { Component } from "react";
import { render } from "react-dom";
import List from "./List";
import TheForm from "./TheForm";

import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading",
            packageToSave: {},
            enableForm: false,
            formMode: ''
        };
        this.deletePackage = this.deletePackage.bind(this);
        this.turnOnEdit = this.turnOnEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.turnOnCreate = this.turnOnCreate.bind(this);
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

    handleChange(e) {
        this.setState({
            packageToSave: {
                ...this.state.packageToSave,
                [e.target.name]: e.target.value
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        if (this.state.packageToSave.id) {
            return this.updatePackage()
        }
        return this.createPackage()
    }

    createPackage() {
        const newPackage = this.state.packageToSave;
        const csrftoken = this.getCookie('csrftoken');
        const request = new Request('/api/packages/', {
            headers: {
                'X-CSRFToken': csrftoken,
                'Content-Type': 'application/json'
            }
        });
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(newPackage)
        };
        fetch(request, requestOptions)
            .then(response => {
                if (response.status == 201) {
                    response.json().then(returnedPackage => {
                        const currentData = this.state.data;
                        this.setState({
                            data: currentData.concat(returnedPackage)
                        })
                    })
                    this.setState({
                        enableForm: false
                    })
                }
            })
            .catch(error => console.log('error', error));
    }

    updatePackage() {
        const packageToUpdate = this.state.packageToSave;
        const csrftoken = this.getCookie('csrftoken');
        const request = new Request('/api/packages/' + packageToUpdate.id + '/', {
            headers: {
                'X-CSRFToken': csrftoken,
                'Content-Type': 'application/json'
            }
        });
        const requestOptions = {
            method: 'PATCH',
            body: JSON.stringify(packageToUpdate)
        };
        fetch(request, requestOptions)
            .then(response => {
                if (response.status == 200) {
                    this.setState({
                        data: this.state.data.map(hPack => {
                            if (hPack.id == packageToUpdate.id) {
                                return packageToUpdate;
                            }
                            return hPack;
                        })
                    })
                    this.setState({
                        enableForm: false
                    })
                }
            })
            .catch(error => console.log('error', error));
    }

    deletePackage(id) {
        var csrftoken = this.getCookie('csrftoken');
        var request = new Request(
            '/api/packages/'+id+'/', {
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
            .then(response => {
                if (response.status == 204) {
                    const newData = this.state.data.filter(hPack => {
                        return hPack.id != id
                    })
                    this.setState({
                        data: newData
                    })
                }
            })
            .catch(error => console.log('error', error));
    }

    turnOnCreate() {
        this.setState({
            enableForm: true,
            formMode: 'create',
            packageToSave: {
                hotel_name: "",
                price: "",
                duration: "",
                validity_duration: "",
                description: ""
            }
        })
    }

    turnOnEdit(id) {
        const packageToSave = this.state.data.find(hPack => {
            return hPack.id == id
        })
        this.setState({
            packageToSave: packageToSave,
            enableForm: true,
            formMode: 'edit'
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

    render() {
        return (
            <Container>
                <List
                    packages={this.state.data}
                    deletePackage={this.deletePackage}
                    turnOnEdit={this.turnOnEdit}
                    turnOnCreate={this.turnOnCreate} />
                <TheForm
                    packages={this.state.data}
                    formMode={this.state.formMode}
                    enableForm={this.state.enableForm}
                    packageToSave={this.state.packageToSave}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit} />
            </Container>
        );
    }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);