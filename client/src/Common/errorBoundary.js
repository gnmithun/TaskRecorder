import React, { Component } from 'react';

class ErrorBoundary extends Component {
    static errorDetails = ""
    constructor(props) {
        super(props);
        this.state = { hasError: false }
        this.state = { errorDetails : "" }
    }

    static getDerivedStateFromError(error){
        ErrorBoundary.errorDetails = error
        return { hasError : true }
    }

    render() {
        if(this.state.hasError){
            return <h1> {ErrorBoundary.errorDetails} </h1>
        }
        return this.props.children 
    }
}

export default ErrorBoundary;