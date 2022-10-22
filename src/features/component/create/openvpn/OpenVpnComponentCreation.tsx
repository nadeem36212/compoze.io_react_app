import { useState } from "react";
import CreateForm from "../../../products/create/CreateForm";
import InputParameter from "../selections/InputParameter";
import SelectComponentName from "../selections/SelectComponentName";

interface OpenVpnComponentCreationProps {
    finishForm: () => void
    setName: (name: string) => void
    setAttributes: (attributes: any) => void
}
export default function OpenVpComponentCreation(props: OpenVpnComponentCreationProps) {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [adminPassword, setAdminPassword] = useState('')

    const selectComponentName = <SelectComponentName label="What would you like to name your OpenVPN Instance?"
        setName={props.setName} />

    const usernameInput = <InputParameter onChange={(value: string) => {
        setUserName(value)
    }} label={"Please provide the OpenVPN user name you will use to login with"} helperText={"OpenVPN is not a valid username"} placeHolder={"User Name"} type={"text"} />

    const passwordInput = <InputParameter onChange={(value: string) => {
        setPassword(value)
    }} label={"Please provide a password for your OpenVPN"} helperText={"Store this password securely"} placeHolder={"Password"} type={"password"} />

    const adminPasswordInput = <InputParameter onChange={(value: string) => {
        setAdminPassword(value)
    }} label={"Please provide a password for your OpenVPN admin user"} helperText={"Store this password securely"} placeHolder={"Password"} type={"password"} />


    const steps = [
        { label: 'Provide a Name', content: selectComponentName },
        { label: 'User Name', content: usernameInput },
        { label: 'Password', content: passwordInput },
        { label: 'Admin Password', content: adminPasswordInput },
    ];
    return (
        <CreateForm heading="Create Your OpenVPN Component" steps={steps} finishForm={() => {
            props.setAttributes({
                openVpnUserName: userName,
                openVpnUserPassword: password,
                openVpnAdminPassword: adminPassword
            })
            props.finishForm()
        }} />
    )
}