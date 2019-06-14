import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { JOBS_ROUTE, JOB_ADD_ROUTE } from '../../routes';
import './styles.scss';

/**
 * Menu component
 */
class MenuComponent extends Component {

  /*
  *  Render component
  */
  render() {
    return (
      <div className="menuWrapper">
        <div className='menu'>
          <ul>
            <li className='jobs'>
              {location.pathname == JOBS_ROUTE ? <span className="selectedMenu">JOBS</span>
                : <NavLink to={JOBS_ROUTE}>{'Jobs'}</NavLink>
              }
            </li>
            <li className='add-job'>
              {location.pathname == JOB_ADD_ROUTE ? <span>ADD JOB</span>
                : <NavLink to={JOB_ADD_ROUTE}>{'Add Job'}</NavLink>
              }
            </li>
          </ul>

        </div>
      </div>
    );
  }
}

export default MenuComponent