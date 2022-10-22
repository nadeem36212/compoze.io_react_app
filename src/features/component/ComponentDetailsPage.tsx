import { Spinner, useInterval } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import NavBar from "../../navigation/navbar";
import routes from "../../routes";
import ComponentDetails from "./ComponentDetails";
import { Component, deleteComponent, fetchComponent, selectComponent } from "./componentSlice";

export default function ComponentDetailsPage() {
    const history = useHistory();

    const params = useParams<{ productName: string, componentName: string }>();
    const dispatch = useAppDispatch();
    const component: Component | undefined = useAppSelector(selectComponent);
    // const [component, setComponent] = useState({
    //     name: 'lorem',
    //     technology: 'technology',
    //     status: "status",
    //     attributes: "attribute",
    // })

    useEffect(() => {
        dispatch(fetchComponent({ productName: params.productName, componentName: params.componentName }));
    }, []);


    const deleteCurrentComponent = () => {
        dispatch(deleteComponent({ productName: params.productName, componentName: params.componentName }))
        history.push(routes.PRODUCTDETAILS.path.replace(':name', params.productName));

    }

    useInterval(() => {
        dispatch(fetchComponent({ productName: params.productName, componentName: params.componentName }));
    }, 5000);    
    return (
        <div className=' py-3'>
            {/* <NavBar /> */}
            {component  ? (
                <div className='ComplianceDetailsPage  py-3'>
                    <ComponentDetails onDelete={deleteCurrentComponent} component={component} />

                </div>
            ) : (
                <div>
                    Loading <Spinner />
                </div>
            )}
        </div>
    );
}
