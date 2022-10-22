
import React, { useState } from 'react';

import NavBar from "../../../navigation/navbar";

import { useHistory, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import routes from '../../../routes';
import { createComponent } from '../componentSlice';
import ConfirmComponentCreate from './ConfirmComponentCreate';
import ComponentTypeSelection from './ComponentTypeSelection';
import RDSComponentCreation from './rds/RDSComponentCreation';
import EC2ComponentCreation from './ec2/EC2ComponentCreation';
import OpenVpComponentCreation from './openvpn/OpenVpnComponentCreation';


export default function CreateComponentPage() {
  const [componentType, setComponentType] = useState<string>('')
  const [attributes, setAttributes] = useState<any>({})
  const [error, setError] = useState(false)
  const [name, setName] = useState('')
  const [formFilledOut, setFormFilledOut] = useState(false)

  const history = useHistory();
  const dispatch = useAppDispatch();

  const navigateToProductHome = () => {
    history.push(routes.PRODUCTDETAILS.path.replace(':name', params.name));
  }

  const finishForm = () => {
    setFormFilledOut(true);
  }
  const params = useParams<{ name: string }>();

  const dispatchCreateComponent = (productName: string, name: string, technology: string, attributes: any) => {
    console.log(productName, name, technology, attributes);

    dispatch(createComponent({
      productName,
      name,
      technology,
      attributes
    }))
      .then(() => {
        navigateToProductHome();
      })
      .catch(() => { setError(true); });
  };
  return (
    <div className='App container py-3'>
      <NavBar />
      <div className='CreateComponent container py-3'>

        {!componentType &&
          <ComponentTypeSelection 
          onComponentTypeSelected={setComponentType} 
          heading="Getting Started Creating Your Component" 
          subHeading='First, start by selecting the type of component you want to create.'/>
        }

        {(componentType == "RDS" && !formFilledOut) &&
          <RDSComponentCreation setName={setName} finishForm={finishForm} setAttributes={setAttributes} />
        }
        {(componentType == "EC2" && !formFilledOut) &&
          <EC2ComponentCreation setName={setName} finishForm={finishForm} setAttributes={setAttributes} />
        }
        {(componentType == "OPENVPN" && !formFilledOut) &&
          <OpenVpComponentCreation setName={setName} finishForm={finishForm} setAttributes={setAttributes} />
        }
        {formFilledOut &&
          <ConfirmComponentCreate productName={params.name} name={name} attributes={attributes}
            onSubmit={dispatchCreateComponent}
            technology={componentType}
          />
        }
      </div>
    </div >
  );
}




