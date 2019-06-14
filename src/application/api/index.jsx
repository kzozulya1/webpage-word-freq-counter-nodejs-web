import axios from 'axios';
const apiPrefix = process.env.API_BASE_ENDPOINT;
const apiAddJobPrefix = process.env.API_ADD_JOB_ENDPOINT;


export default {
    /**
     * List all done jobs
     */
    listJobs() {
        return axios.get(`${apiPrefix}/jobs`);
    },
    /**
     * Delete job by id
     */
    deleteJob(jobId){
        return axios.delete(`${apiPrefix}/job/${jobId}`); 
    },
    /**
     * Delete job by id
     */
    addJob(data){
        return axios.post(`${apiAddJobPrefix}`,data,{headers:{"Content-Type": "application/json" }});
    }
}