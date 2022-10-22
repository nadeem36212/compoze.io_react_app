
import React, { useState } from 'react';

import NavBar from "../../../navigation/navbar";

import { useHistory, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import routes from '../../../routes';
import { createComponent } from '../componentSlice';
import ConfirmComponentCreate from './ConfirmComponentCreate';
import EC2FromTemplateCreationPage from './template/EC2FromTemplateCreationPage';
import { selectTemplates } from '../../templates/templateSlice';
import RDSComponentCreation from './rds/RDSComponentCreation';


export default function CreateComponentTemplatePage() {
  const [attributes, setAttributes] = useState<any>({})
  const [error, setError] = useState(false)
  const [name, setName] = useState('')
  const [formFilledOut, setFormFilledOut] = useState(false)

  const params = useParams<{ name: string, templateId: string }>();

  const history = useHistory();
  const dispatch = useAppDispatch();

  const templates = useAppSelector(selectTemplates);
  const templateId = params.templateId
  const template = templates.find(t => t.id === templateId)!;

  const navigateToProductHome = () => {
    history.push(routes.PRODUCTDETAILS.path.replace(':name', params.name));
  }

  const finishForm = () => {
    setFormFilledOut(true);
  }

  const dispatchCreateComponent = (productName: string, name: string, technology: string, attributes: any) => {

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

        {(template && !formFilledOut && template.technology === "EC2") &&
          <EC2FromTemplateCreationPage setName={setName} finishForm={finishForm} setAttributes={setAttributes} template={template} />
        }
        {(template && !formFilledOut && template.technology === "RDS") &&
          <RDSComponentCreation setName={setName} finishForm={finishForm} setAttributes={setAttributes} template={template} />
        }
        {formFilledOut &&
          <ConfirmComponentCreate productName={params.name} name={name} attributes={attributes}
            onSubmit={dispatchCreateComponent}
            technology={template.technology}
          />
        }
      </div>
    </div >
  );
}




