import React from 'react'
import './LoadingPage.css'

const LoadingPage = () => {
    return (
        <div className="container w-screen h-screen">
            <div className="loader">
                <div className="crystal"></div>
                <div className="crystal"></div>
                <div className="crystal"></div>
                <div className="crystal"></div>
                <div className="crystal"></div>
                <div className="crystal"></div>
            </div>
        </div>
    )
}

export default LoadingPage