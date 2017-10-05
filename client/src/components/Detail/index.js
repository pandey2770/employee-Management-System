import React from 'react';
import {Container} from 'flux/utils';
import AppStore from '../../store';
import './styles.css';

const Detail = ({ employees }) => <div className="center">
  <h1>Details page</h1>
  {employees && employees.map(emp => <span key={emp.id}>{emp.name}</span>)}
</div>;

function getStores() {
  return [
    AppStore
  ];
}

function getState() {
  return {
    employees: AppStore.getState(),
  };
}

export default Container.createFunctional(Detail, getStores, getState);