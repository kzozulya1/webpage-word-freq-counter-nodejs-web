import React, { Component } from 'react';
import './styles.scss';
import Helmet from "react-helmet";
import api from "../../../api";
import { Form, Message, Loader } from 'semantic-ui-react'

/**
 * Add new job component
 */
class JobAddComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pageurl: '',
            pageurlError: '',
            minfrequency: '',
            minfrequencyError: '',
            minlen: '',
            minlenError: '',
            excludelist: '',
            formError: false,
            showSuccessMsg: false,
            networkPostError: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    /**
     * Remove job from server
     */
    handleRemoveClick = (idx, jobId) => {
        if (confirm("Are you sure?")) api.deleteJob(jobId).then(({ data }) => {
            if (data.success) {
                this.setState({
                    jobs: this.state.jobs.filter((job, i) => i != idx)
                })
            } else {
                console.log("Error:", data.error)
            }
        })
    }

    /**
     * When change data from inputs
     */
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    /**
     * Show / hide loader
     * Without react state propogating
     */
    showLoader = (visible) => {
        if (visible) {
            document.getElementById('loader').classList.add('visible')
        } else {
            document.getElementById('loader').classList.remove('visible')
        }
    }

    /**
     * URL validate pattern
     */
    validateUrl = (value) => {
        return /^(?:(?:(?:https?):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
    }

    /**
     * Submit job to server
     */
    handleSubmit = (e) => {
        e.preventDefault()
        this.clearOldErrors()

        if (this.validate(e)) {
            let exclList = this.state.excludelist ? this.state.excludelist.split(',') : []
            exclList = exclList.map(item => item.trim())
            exclList = exclList.filter(v => v)

            var data = {
                url: this.state.pageurl,
                word_filter: {
                    exclude_list: exclList,
                    min_frequency: this.state.minfrequency ? parseInt(this.state.minfrequency, 10) : null,
                    min_len: this.state.minlen ? parseInt(this.state.minlen, 10) : null
                }

            }

            this.showLoader(true)
            //API call
            api.addJob(data)
                .then(data => {
                    this.setState({
                        formError: false,
                        showSuccessMsg: true
                    })
                    this.showLoader(false)
                })
                .catch(({ response }) => {
                    this.setState({
                        networkPostError: response.data,
                        formError: true,
                        showSuccessMsg: false
                    })
                    this.showLoader(false)
                })
        } else {
            this.setState({
                formError: true,
                showSuccessMsg: false
            })
        }
    }

    /**
     * Clear old validation errors
     */
    clearOldErrors = () => {
        this.setState({
            formError: false,
            networkPostError: '',
            pageurlError: '',
            minfrequencyError: '',
            minfrequencyError: '',
            showSuccessMsg: false
        })
    }

    /**
     * Validate controls
     * @param  e 
     */
    validate(e) {
        var error = false;
        //Validate page url
        if (!this.validateUrl(this.state.pageurl)) {
            this.setState({
                pageurlError: "`page URL` value is invalid"
            })
            error = true
        } else {
            this.setState({
                pageurlError: ""
            })
        }
        //Digits preg
        var digitsPreg = /^\d+$/

        //Validate page min freq
        if (this.state.minfrequency != '' && !digitsPreg.test(this.state.minfrequency)) {
            this.setState({
                minfrequencyError: "`minimal word match count` value is not a number"
            })
            error = true
        } else {
            this.setState({
                minfrequencyError: ""
            })
        }
        //Validate page min len
        if (this.state.minlen != '' && !digitsPreg.test(this.state.minlen)) {
            this.setState({
                minlenError: "`minimal word length` value is not a number"
            })
            error = true
        } else {
            this.setState({
                minlenError: ""
            })
        }
        return !error
    }

    /**
     * Prepare error desc if error present
     */
    prepareErrors = () => {
        var errorDesc = ""
        if (this.state.formError) {
            let errorArray = [this.state.pageurlError, this.state.minfrequencyError, this.state.minlenError, this.state.networkPostError]
            //remove empty ones
            errorArray = errorArray.filter(v => v)
            errorDesc = errorArray.join(', ');
        }
        return errorDesc
    }

    /*
    *  Render component
    */
    render() {
        //Prepare error desc
        var errorDesc = this.prepareErrors()
        return (
            <div className="new-job-wrapper">
                <Helmet>
                    <title>New job</title>
                    <meta name="description" content="jobs" />
                </Helmet>

                <div className="page-title">
                    <h2>Add new job</h2><br />
                </div>
                <div className="a-job">
                    <Form error={this.state.formError}>
                        {/*Inputs block*/}
                        <Form.Input
                            label="Page URL"
                            name="pageurl"
                            value={this.state.pageurl}
                            onChange={this.onInputChange}
                        >
                        </Form.Input>
                        <Form.Group>
                            <Form.Input
                                label="Minimal word match count"
                                name="minfrequency"
                                value={this.state.minfrequency}
                                onChange={this.onInputChange}
                            />
                            <Form.Input
                                label="Minimal word length"
                                name="minlen"
                                value={this.state.minlen}
                                onChange={this.onInputChange}
                            />
                            <div className="loader" id="loader">
                                <span>Checking URL availablility, please wait...</span>
                            </div>
                        </Form.Group>
                        <Form.TextArea
                            label='Word exclude list'
                            name="excludelist"
                            onChange={this.onInputChange}
                            placeholder='Comma separated word exclude list'
                        />
                        <Form.Button
                            fluid
                            color="green"
                            onClick={(e) => this.handleSubmit(e)}
                            disabled={!this.state.pageurl}
                        >Add job&nbsp;&nbsp;&nbsp;
                        </Form.Button>
                        {/*Messages block*/}
                        <Message
                            error
                            header="Form validation error"
                            content={`${errorDesc}`}
                        />
                        <Message
                            color="green"
                            hidden={!this.state.showSuccessMsg}
                            header="Success"
                            content={"Job has been accepted"}
                        />

                    </Form>
                </div>
            </div>
        );
    }
}
export default JobAddComponent