import React, { Component } from 'react';
import './styles.scss';
import Helmet from "react-helmet";
import api from "../../api";
import { Accordion, Icon, Table, Label, Checkbox, Button } from 'semantic-ui-react'

/**
 * Jobs component
 */
class JobsComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            accordionActiveIndex: -1,
            autoRefresh: true,
            jobs: []
        }
        this.getJobs = this.getJobs.bind(this)
    }

    /**
     * Accordion click
     */
    handleAccordeonClick = (e, titleProps) => {
        const { index } = titleProps
        const { accordionActiveIndex } = this.state
        const newIndex = accordionActiveIndex === index ? -1 : index
        this.setState({ accordionActiveIndex: newIndex })
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
     * Handle when auto refresh clicked
     */
    handleAutoRefreshCbClick = () => {
        this.setState({
            autoRefresh: !this.state.autoRefresh
        })
    }

    /**
     * Get jobs from Mongo
     */
    getJobs(force = false) {
        if (this.state.autoRefresh || force) {
            api.listJobs().then(({ data }) => {
                if (data.success) {
                    this.setState({
                        jobs: data.data
                    })
                } else {
                    console.log("Error:", data.error)
                }
            })
        }
    }

    /**
     *  After component is mount
     */
    componentDidMount() {
        this.getJobs()
        setInterval(this.getJobs, 1000);
    }
    /**
     * Convert UnixTimestamp To Date
     * 
     * @param {*} ts 
     */
    convertUnixTimestampToDate(ts) {
        return new Date(ts * 1000).toISOString().slice(0, 19).replace('T', ' ')
    }


    /*
    *  Render component
    */
    render() {
        const { accordionActiveIndex } = this.state

        return (
            <div className="jobs-wrapper">
                <Helmet>
                    <title>Done jobs</title>
                    <meta name="description" content="jobs" />
                </Helmet>

                <div className="page-title">
                    <h2>Done jobs</h2><br />
                </div>

                <div className="refresh-action-wrapper">
                    <Checkbox defaultChecked label='Auto refresh' className="cb-auto-refresh" onClick={() => this.handleAutoRefreshCbClick()} />
                    <Button icon labelPosition='left' disabled={this.state.autoRefresh} onClick={() => this.getJobs(true)}>
                        <Icon name='refresh' color="green" />Refresh
                    </Button>
                </div>

                {this.state.jobs.length > 0 && this.state.jobs.map((job, i) =>
                    <div className="a-job">

                        {/* Show title */}
                        {job.pagetitle &&
                            <a className="page-title" href={job.pageurl}>{job.pagetitle}</a>
                            ||
                            <a className="page-title" href={job.pageurl}>{job.pageurl}</a>
                        }

                        <a href="#" className="remove-action" onClick={() => this.handleRemoveClick(i, job._id)} >Remove</a>

                        <span className="url-legend">{job.pageurl}</span>

                        {/* Show words statistic */}
                        {job.words ?
                            <Accordion>
                                <Accordion.Title active={accordionActiveIndex === i} index={i} onClick={this.handleAccordeonClick}>
                                    <Icon name='dropdown' />
                                    <span>Words</span> (<span className="word-counter">{job.words.length}</span>)
                                    {/* Show applied filters, if exist */}
                                    {((job.appliedfilter && job.appliedfilter.minfrequency && job.appliedfilter.minfrequency != 0)) ?
                                        <Label>
                                            <Icon name='clone outline' /><span>Min word quantity</span> {job.appliedfilter.minfrequency}
                                        </Label>
                                        : ""
                                    }

                                    {(job.appliedfilter && job.appliedfilter.minlen && job.appliedfilter.minlen != 0) ?
                                        <Label>
                                            <Icon name='text width' /><span>Min word length</span> {job.appliedfilter.minlen}
                                        </Label>
                                        : ""
                                    }

                                    <span className="updated-at">{this.convertUnixTimestampToDate(job.updatedat)}</span>

                                </Accordion.Title>
                                <Accordion.Content active={accordionActiveIndex === i}>
                                    <div className="limited-v-scroll">
                                        {job.appliedfilter.excludelist &&
                                            <div className="exclude-list">
                                                <span className="excl-kw-label">Excluded keywords</span>
                                                {job.appliedfilter.excludelist.map(exclItem =>
                                                    <Label className="label-excl-list"><Icon name='tag' /><span>{exclItem}</span></Label>
                                                )}

                                            </div>

                                        }
                                        <Table striped celled fixed size="small">
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell>Keyword</Table.HeaderCell>
                                                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body>
                                                {job.words.map(word => (
                                                    <Table.Row key={word.value}>
                                                        <Table.Cell>{word.value}</Table.Cell>
                                                        <Table.Cell>{word.count}</Table.Cell>
                                                    </Table.Row>
                                                ))}
                                            </Table.Body>
                                        </Table>
                                    </div>
                                </Accordion.Content>
                            </Accordion>
                            : null

                        }
                    </div>
                )}
                {!this.state.jobs.length &&
                    <div className="no-jobs">
                        <h2>No jobs found</h2>
                    </div>
                }
            </div>
        );
    }
}

export default JobsComponent