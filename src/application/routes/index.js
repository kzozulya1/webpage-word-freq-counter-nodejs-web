import JobsComponent from '../components/jobs';
import JobAddComponent from '../components/jobs/add';

export const JOBS_ROUTE = '/jobs';
export const JOB_ADD_ROUTE = '/jobs/add';

export default [
    {
        path: JOBS_ROUTE,
        component: JobsComponent,
        exact: true,
    },
    {
        path: JOB_ADD_ROUTE,
        component: JobAddComponent,
        exact: true,
    }
];
                              