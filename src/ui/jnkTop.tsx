import * as React from 'react';
import logo from '../images/logo.png';
import { setting } from 'appConfig';

export const jnkTop = <div className="d-flex align-items-center">
    <img className="h-3c position-absolute" src={logo} alt="jnk" />
    <div className="h3 flex-fill text-center">
        <span className="text-primary mr-3">销售助手</span>
    </div>
</div>;